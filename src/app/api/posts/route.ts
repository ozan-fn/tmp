import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                postTags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, slug, thumbnail, content, tags, status } = body;

        // 1. Create Post
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                thumbnail,
                content,
                status: status ?? 'draft',
            },
        });

        // 2. Handle Tags
        if (tags && Array.isArray(tags)) {
            for (const tagName of tags) {
                // Find or Create Tag
                const tag = await prisma.tag.upsert({
                    where: { name: tagName },
                    update: {},
                    create: { name: tagName },
                });

                // Link Tag to Post
                await prisma.postTag.create({
                    data: {
                        postId: post.id,
                        tagId: tag.id,
                    },
                });
            }
        }

        // 3. Handle Media Status Change (Inactive -> Active)
        // Extract Image URLs from content and thumbnail
        const imageUrls = extractImageUrls(content);
        if (thumbnail) imageUrls.push(thumbnail);

        if (imageUrls.length > 0) {
            await prisma.media.updateMany({
                where: {
                    url: { in: imageUrls },
                    status: 'inactive',
                },
                data: {
                    status: 'active',
                },
            });
        }

        return NextResponse.json(post);
    } catch (error: any) {
        console.error('Error creating post:', error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }
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
