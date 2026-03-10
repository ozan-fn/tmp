import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "TechInsights - Panduan Belajar Pemrograman Modern",
    description: "Tempat belajar Golang, Next.js, dan teknologi web modern dengan panduan lengkap dan mudah dipahami.",
};

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
            {/* Hero Section */}
            <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Kuasai Teknologi Masa Depan</h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400">Dapatkan panduan mendalam tentang pengembangan software, mulai dari infrastruktur cloud hingga sistem terdistribusi menggunakan Golang.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/blog/golang-guide" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20">
                        Mulai Belajar Go
                    </Link>
                    <Link href="/about" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-3 rounded-full font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                        Tentang Kami
                    </Link>
                </div>
            </main>

            {/* Featured Articles / Preview Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Artikel Terbaru</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">Pelajari topik-topik terhangat di dunia engineering.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <Link href="/blog/golang-guide" className="group block space-y-4">
                        <div className="aspect-video bg-blue-100 dark:bg-blue-900/20 rounded-2xl overflow-hidden flex items-center justify-center border border-blue-200 dark:border-blue-800 transition-transform group-hover:scale-[1.02]">
                            <span className="text-4xl">🐹</span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">Apa itu Golang? Panduan Lengkap 2026</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 text-sm leading-relaxed">Pelajari mengapa Google menciptakan Go dan bagaimana ia menjadi tulang punggung infrastruktur cloud modern saat ini.</p>
                        </div>
                    </Link>

                    {/* Placeholder Cards for Content Density (AdSense likes content density) */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-3">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">🚀</div>
                        <h3 className="font-bold">Next.js 15 & React 19</h3>
                        <p className="text-sm text-zinc-500">Panduan implementasi Server Components untuk performa maksimal. (Coming Soon)</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-3">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">☁️</div>
                        <h3 className="font-bold">Deployment & DevOps</h3>
                        <p className="text-sm text-zinc-500">Mempelajari CI/CD pipeline menggunakan GitHub Actions dan Docker. (Coming Soon)</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
