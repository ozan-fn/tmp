import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
    title: 'Tentang Kami (About Us)',
    description: 'Cari tahu lebih lanjut tentang visi dan misi kami.',
};

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12 md:px-24 lg:px-48 text-justify">
            <article className="max-w-4xl mx-auto space-y-6 leading-relaxed">
                <Breadcrumbs items={[{ label: 'Tentang Kami' }]} />

                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 text-center">Tentang Kami</h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 text-center italic">Tutorial Pemrograman & Teknologi Modern</p>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50">Visi & Misi</h2>
                    <p>Selamat datang! Situs ini dibangun dengan visi untuk menyediakan tutorial teknologi yang berkualitas, praktis, dan mudah dipahami oleh semua kalangan pengembang perangkat lunak.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50">Fokus Kami</h2>
                    <p>Kami berfokus pada penyajian artikel dan tutorial mendalam seputar dunia teknologi dan pemrograman, mulai dari web development, backend, hingga infrastruktur cloud. Konten kami dirancang untuk semua level developer Indonesia yang ingin terus berkembang.</p>
                </section>

                <p className="pt-12 text-zinc-500 text-center">Terima kasih telah belajar bersama kami!</p>
            </article>
        </div>
    );
}
