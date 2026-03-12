import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { PostCard, GRADIENT_FALLBACKS } from '@/components/post-card';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface TagPageProps {
    params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag } = await params;
    const decoded = decodeURIComponent(tag);

    return {
        title: `Tag: ${decoded}`,
        description: `Semua artikel dengan tag "${decoded}" — Perschat`,
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params;
    const decoded = decodeURIComponent(tag);

    const tagRecord = await prisma.tag.findUnique({
        where: { name: decoded },
    });

    if (!tagRecord) notFound();

    const posts = await prisma.post.findMany({
        where: {
            status: 'published',
            postTags: {
                some: { tagId: tagRecord.id },
            },
        },
        include: {
            postTags: {
                include: { tag: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 pt-12 pb-10 space-y-5">
                <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: `Tag: ${decoded}` }]} />

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold"># {decoded}</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Artikel dengan tag &ldquo;{decoded}&rdquo;</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">{posts.length > 0 ? `${posts.length} artikel ditemukan` : 'Belum ada artikel dengan tag ini.'}</p>
                    <div className="h-1 w-12 rounded-full bg-blue-600" />
                </div>
            </section>

            {/* Articles */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                        <span className="text-6xl">🏷️</span>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">Belum ada artikel dengan tag ini</p>
                        <Link href="/blog" className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            ← Lihat semua artikel
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post, index) => (
                                <PostCard key={post.id} post={post} gradientFallback={GRADIENT_FALLBACKS[index % GRADIENT_FALLBACKS.length]} />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Link href="/blog" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                ← Lihat semua artikel
                            </Link>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
