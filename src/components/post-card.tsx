import Link from 'next/link';
import { extractExcerpt } from '@/lib/utils';

export const GRADIENT_FALLBACKS = [
    'from-blue-500 to-indigo-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-rose-600',
    'from-cyan-500 to-blue-600',
    'from-pink-500 to-rose-600',
];

interface PostCardTag {
    id: string;
    name: string;
}

export interface PostCardPost {
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
    content: string;
    createdAt: Date;
    postTags: { tag: PostCardTag }[];
}

interface PostCardProps {
    post: PostCardPost;
    gradientFallback?: string;
    excerptLength?: number;
}

export function PostCard({ post, gradientFallback, excerptLength = 120 }: PostCardProps) {
    const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
    const gradient = gradientFallback ?? GRADIENT_FALLBACKS[0];

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(post.createdAt));

    return (
        <div className="relative group flex flex-col rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg dark:hover:shadow-zinc-900/50 transition-all duration-300">
            {/* Thumbnail */}
            <div className="aspect-video overflow-hidden shrink-0">
                {post.thumbnail ? (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className={`w-full h-full bg-linear-to-br ${gradient} flex items-center justify-center`}
                    >
                        <span className="text-4xl opacity-80">📄</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 space-y-3">
                {/* Tags — relative z-10 agar berada di atas stretched link */}
                {post.postTags.length > 0 && (
                    <div className="relative z-10 flex flex-wrap gap-1.5">
                        {post.postTags.slice(0, 3).map(({ tag }) => (
                            <Link
                                key={tag.id}
                                href={`/blog/tag/${encodeURIComponent(tag.name)}`}
                                className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {tag.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Title — after:absolute after:inset-0 membuat seluruh card bisa diklik */}
                <h2 className="font-bold text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors after:absolute after:inset-0"
                    >
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-1">
                    {extractExcerpt(post.content, excerptLength)}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 pt-1 mt-auto border-t border-zinc-100 dark:border-zinc-800">
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span>{readingTime} menit baca</span>
                </div>
            </div>
        </div>
    );
}
