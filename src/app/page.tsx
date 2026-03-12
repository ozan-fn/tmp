import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { PostCard, GRADIENT_FALLBACKS } from '@/components/post-card';
import { extractExcerpt } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Perschat - Blog Teknologi & Pemrograman',
    description: 'Blog teknologi, pemrograman, dan tutorial developer. Artikel seputar web, backend, cloud, dan lainnya.',
};

const GRADIENT_CLASS = 'bg-linear-to-br';

export default async function Home() {
    const posts = await prisma.post.findMany({
        where: { status: 'published' },
        include: {
            postTags: {
                include: { tag: true },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: 6,
    });

    const featuredPost = posts[0] ?? null;
    const restPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-widest uppercase">Blog Teknologi & Developer</div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                        Kuasai Teknologi <br className="hidden md:block" />
                        <span className="text-blue-600">Masa Depan</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">Temukan artikel dan tutorial seputar pemrograman, web development, cloud, dan teknologi terkini untuk developer Indonesia.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20">
                        Jelajahi Artikel
                    </Link>
                    <Link href="/about" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 px-8 py-3 rounded-full font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                        Tentang Kami
                    </Link>
                </div>
            </section>

            {/* Articles Section */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <div className="flex justify-between items-end mb-10">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Artikel Terbaru</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Pelajari topik-topik terhangat di dunia engineering.</p>
                    </div>
                    <Link href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline hidden sm:block">
                        Lihat semua →
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
                        <span className="text-5xl">📝</span>
                        <p className="text-zinc-500 dark:text-zinc-400">Belum ada artikel yang dipublikasikan.</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Featured Post */}
                        {featuredPost && (
                            <div className="relative group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-xl dark:hover:shadow-zinc-900 transition-all duration-300">
                                {/* Thumbnail */}
                                <div className="aspect-video md:aspect-auto overflow-hidden">
                                    {featuredPost.thumbnail ? (
                                        <img src={featuredPost.thumbnail} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className={`w-full h-full min-h-52 ${GRADIENT_CLASS} ${GRADIENT_FALLBACKS[0]} flex items-center justify-center`}>
                                            <span className="text-6xl opacity-80">📖</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col justify-center space-y-4">
                                    {/* Tags */}
                                    <div className="relative z-10 flex flex-wrap gap-2">
                                        {featuredPost.postTags.slice(0, 3).map(({ tag }) => (
                                            <Link key={tag.id} href={`/blog/tag/${encodeURIComponent(tag.name)}`} className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                                        <Link href={`/blog/${featuredPost.slug}`} className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors after:absolute after:inset-0 after:z-0">
                                            {featuredPost.title}
                                        </Link>
                                    </h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">{extractExcerpt(featuredPost.content)}</p>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 pt-1 relative">
                                        <span>
                                            {new Intl.DateTimeFormat('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }).format(new Date(featuredPost.createdAt))}
                                        </span>
                                        <span>·</span>
                                        <span>{Math.max(1, Math.ceil(featuredPost.content.split(/\s+/).length / 200))} menit baca</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rest Posts Grid */}
                        {restPosts.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {restPosts.map((post, index) => (
                                    <PostCard key={post.id} post={post} gradientFallback={GRADIENT_FALLBACKS[(index + 1) % GRADIENT_FALLBACKS.length]} excerptLength={100} />
                                ))}
                            </div>
                        )}

                        {/* Mobile: Lihat semua */}
                        <div className="flex justify-center sm:hidden pt-2">
                            <Link href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                Lihat semua artikel →
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
