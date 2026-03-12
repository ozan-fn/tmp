import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { CalendarDays, Clock } from 'lucide-react';

const BASE_URL = 'https://perschat.my.id';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug, status: 'published' },
    });

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const plainText = post.content.replace(/[#*`_~>\[\]!]/g, '').slice(0, 160);

    return {
        title: post.title,
        description: plainText,
        openGraph: {
            title: post.title,
            description: plainText,
            images: post.thumbnail ? [post.thumbnail] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug, status: 'published' },
        include: {
            postTags: {
                include: { tag: true },
            },
        },
    });

    if (!post) {
        notFound();
    }

    const htmlContent = md.render(post.content);

    const plainTextDesc = post.content
        .replace(/[#*`_~>\[\]!]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: plainTextDesc,
        image: post.thumbnail ?? `${BASE_URL}/og-image.png`,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            '@type': 'Person',
            name: 'Ozan',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Perschat',
            url: BASE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/og-image.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blog/${post.slug}`,
        },
        keywords: post.postTags.map((pt) => pt.tag.name).join(', '),
    };

    const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(post.createdAt));

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12 md:px-24 lg:px-48">
                <article className="max-w-4xl mx-auto space-y-10">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

                    {/* Header */}
                    <header className="space-y-6">
                        {/* Tags */}
                        {post.postTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.postTags.map(({ tag }) => (
                                    <Link key={tag.id} href={`/blog/tag/${encodeURIComponent(tag.name)}`} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">{post.title}</h1>

                        <div className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {readingTime} menit baca
                            </span>
                        </div>

                        {/* Thumbnail */}
                        {post.thumbnail && (
                            <div className="w-full aspect-video rounded-2xl overflow-hidden border dark:border-zinc-800">
                                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <hr className="border-zinc-200 dark:border-zinc-800" />
                    </header>

                    {/* Content */}
                    <div
                        className="prose prose-zinc dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:rounded-2xl
                        prose-blockquote:border-l-blue-500 prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400
                        prose-img:rounded-xl prose-img:shadow-md
                        prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
                        prose-li:my-1"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />

                    {/* Footer */}
                    {post.postTags.length > 0 && (
                        <footer className="pt-8 border-t dark:border-zinc-800 flex flex-wrap gap-2">
                            {post.postTags.map(({ tag }) => (
                                <Link key={tag.id} href={`/blog/tag/${encodeURIComponent(tag.name)}`} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    # {tag.name}
                                </Link>
                            ))}
                        </footer>
                    )}
                </article>
            </div>
        </>
    );
}
