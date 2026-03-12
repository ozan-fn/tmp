import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
    title: 'Hubungi Kami (Contact Us)',
    description: 'Hubungi kami jika Anda memiliki pertanyaan atau masukan.',
};

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12 md:px-24 lg:px-48">
            <article className="max-w-4xl mx-auto space-y-8 leading-relaxed text-center">
                <Breadcrumbs items={[{ label: 'Hubungi Kami' }]} />

                <header className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Hubungi Kami</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">Kami selalu terbuka terhadap masukan, pertanyaan, atau kerja sama potensial.</p>
                </header>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                <section className="space-y-6 text-left">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl space-y-4 text-left">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Informasi Kontak</h2>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100">📬 Email:</p>
                            <p className="text-zinc-600 dark:text-zinc-400">me@ozan.my.id</p>

                            <p className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 pt-4">📍 Lokasi:</p>
                            <p className="text-zinc-600 dark:text-zinc-400">Indonesia</p>
                        </div>
                    </div>

                    <p className="text-zinc-700 dark:text-zinc-300">Silakan kirimkan pesan kepada kami melalui alamat email di atas. Kami akan berusaha merespons sesegera mungkin, biasanya dalam waktu 1-2 hari kerja.</p>
                </section>

                <p className="pt-12 text-zinc-500 dark:text-zinc-400">Terima kasih atas minat Anda pada platform kami.</p>
            </article>
        </div>
    );
}
