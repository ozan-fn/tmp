import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hubungi Kami (Contact Us)",
    description: "Hubungi kami jika Anda memiliki pertanyaan atau masukan.",
};

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans px-6 py-12 md:px-24 lg:px-48">
            <article className="max-w-4xl mx-auto space-y-8 leading-relaxed text-center">
                <header className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-zinc-900">Hubungi Kami</h1>
                    <p className="text-xl text-zinc-600">Kami selalu terbuka terhadap masukan, pertanyaan, atau kerja sama potensial.</p>
                </header>

                <hr className="border-zinc-200" />

                <section className="space-y-6 text-left">
                    <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-xl space-y-4">
                        <h2 className="text-2xl font-bold">Informasi Kontak</h2>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 font-medium">📬 Email:</p>
                            <p className="text-zinc-600">admin@domain-anda.com</p>

                            <p className="flex items-center gap-2 font-medium pt-4">📍 Lokasi:</p>
                            <p className="text-zinc-600">Jakarta, Indonesia</p>
                        </div>
                    </div>

                    <p>Silakan kirimkan pesan kepada kami melalui alamat email di atas. Kami akan berusaha merespons sesegera mungkin, biasanya dalam waktu 1-2 hari kerja.</p>
                </section>

                <p className="pt-12 text-zinc-500">Terima kasih atas minat Anda pada platform kami.</p>
            </article>
        </div>
    );
}
