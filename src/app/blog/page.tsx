import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { PostCard, GRADIENT_FALLBACKS } from '@/components/post-card';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Semua artikel teknologi dan pemrograman dari Perschat.',
};

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: { status: 'published' },
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
            <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 space-y-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Blog</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg">{posts.length > 0 ? `${posts.length} artikel tersedia — pemrograman, teknologi, dan lainnya.` : 'Belum ada artikel yang dipublikasikan.'}</p>
                <div className="h-1 w-12 rounded-full bg-blue-600" />
            </section>

            {/* Articles */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                        <span className="text-6xl">📭</span>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">Belum ada artikel</p>
                        <p className="text-zinc-400 dark:text-zinc-500 text-sm">Artikel akan muncul di sini setelah dipublikasikan.</p>
                        <Link href="/" className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <PostCard key={post.id} post={post} gradientFallback={GRADIENT_FALLBACKS[index % GRADIENT_FALLBACKS.length]} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
