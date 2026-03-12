import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, thumbnail, content, tags, status } = body;

        // 1. Get Old Post (for handling media)
        const oldPost = await prisma.post.findUnique({
            where: { id },
        });

        if (!oldPost) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const oldImageUrls = extractImageUrls(oldPost.content);
        if (oldPost.thumbnail) oldImageUrls.push(oldPost.thumbnail);

        // 2. Update Post
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                thumbnail,
                content,
                ...(status !== undefined && { status }),
            },
        });

        // 3. Handle Tags Replace
        if (tags && Array.isArray(tags)) {
            // 3a. Remove all old tags for this post
            await prisma.postTag.deleteMany({
                where: { postId: id },
            });

            // 3b. Add new tags
            for (const tagName of tags) {
                const tag = await prisma.tag.upsert({
                    where: { name: tagName },
                    update: {},
                    create: { name: tagName },
                });

                await prisma.postTag.create({
                    data: {
                        postId: id,
                        tagId: tag.id,
                    },
                });
            }
        }

        // 4. Update Media status
        const currentImageUrls = extractImageUrls(content);
        if (thumbnail) currentImageUrls.push(thumbnail);

        // 4a. Images that are still in content -> Ensure Active
        if (currentImageUrls.length > 0) {
            await prisma.media.updateMany({
                where: {
                    url: { in: currentImageUrls },
                    status: 'inactive',
                },
                data: {
                    status: 'active',
                },
            });
        }

        // 4b. Images that were removed -> Set Inactive (maybe? usually safer)
        const removedImageUrls = oldImageUrls.filter((url) => !currentImageUrls.includes(url));
        if (removedImageUrls.length > 0) {
            await prisma.media.updateMany({
                where: {
                    url: { in: removedImageUrls },
                    status: 'active',
                },
                data: {
                    status: 'inactive',
                },
            });
        }

        return NextResponse.json(updatedPost);
    } catch (error: any) {
        console.error('Error updating post:', error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const imageUrls = extractImageUrls(post.content);
        if (post.thumbnail) imageUrls.push(post.thumbnail);

        // Set removed images as inactive
        if (imageUrls.length > 0) {
            await prisma.media.updateMany({
                where: {
                    url: { in: imageUrls },
                    status: 'active',
                },
                data: {
                    status: 'inactive',
                },
            });
        }

        // Delete post_tags first (cascade)
        await prisma.postTag.deleteMany({
            where: { postId: id },
        });

        // Delete Post
        await prisma.post.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        if (!status || !['draft', 'published'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const post = await prisma.post.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post status:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

function extractImageUrls(markdown: string): string[] {
    const urls: string[] = [];
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = imageRegex.exec(markdown)) !== null) {
        urls.push(match[1]);
    }
    return urls;
}
