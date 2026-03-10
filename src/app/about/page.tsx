import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami (About Us)",
    description: "Cari tahu lebih lanjut tentang visi dan misi kami.",
};

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans px-6 py-12 md:px-24 lg:px-48">
            <article className="max-w-4xl mx-auto space-y-6 leading-relaxed text-center">
                <h1 className="text-3xl font-extrabold text-zinc-900">Tentang Kami</h1>
                <p className="text-xl text-zinc-600">Selamat datang di platform kami, sumber terpercaya untuk informasi teknologi dan pengembangan perangkat lunak modern.</p>

                <hr className="border-zinc-200" />

                <section className="space-y-4 text-left">
                    <h2 className="text-2xl font-bold">Visi Kami</h2>
                    <p>Visi kami adalah memberikan konten edukasi teknologi yang berkualitas tinggi, mudah diakses, dan relevan dengan perkembangan industri saat ini, terutama bagi pengembang pemula hingga tingkat menengah.</p>
                </section>

                <section className="space-y-4 text-left">
                    <h2 className="text-2xl font-bold">Misi Kami</h2>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                        <li>Membangun komunitas pembelajar yang bersemangat dalam dunia teknologi.</li>
                        <li>Menyediakan sumber daya dan panduan praktis untuk bahasa pemrograman modern seperti Golang, Next.js, dan lainnya.</li>
                        <li>Terus memperbarui konten seiring dengan perubahan cepat dalam lanskap infrastruktur cloud dan pengembangan aplikasi.</li>
                    </ul>
                </section>

                <p className="pt-12 text-zinc-500">Terima kasih telah bergabung dalam perjalanan kami pengembangan perangkat lunak ini!</p>
            </article>
        </div>
    );
}
