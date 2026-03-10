import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kebijakan Privasi (Privacy Policy)",
    description: "Halaman Kebijakan Privasi untuk situs kami.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans px-6 py-12 md:px-24 lg:px-48">
            <article className="max-w-4xl mx-auto space-y-6 leading-relaxed">
                <h1 className="text-3xl font-extrabold text-zinc-900">Kebijakan Privasi</h1>
                <p>Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>

                <section className="space-y-4">
                    <p>Di situs kami, yang dapat diakses dari domain ini, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh kami dan bagaimana kami menggunakannya.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Log Files</h2>
                    <p>
                        Kami mengikuti prosedur standar menggunakan file log. File-file ini mencatat pengunjung ketika mereka mengunjungi situs web. Semua perusahaan hosting melakukan ini dan merupakan bagian dari analisis layanan hosting. Informasi yang dikumpulkan oleh file log termasuk alamat protokol internet (IP), jenis browser, Penyedia Layanan Internet (ISP), stempel tanggal dan waktu, halaman rujukan/keluar, dan
                        mungkin jumlah klik.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Google DoubleClick DART Cookie</h2>
                    <p>Google adalah salah satu vendor pihak ketiga di situs kami. Google juga menggunakan cookie, yang dikenal sebagai cookie DART, untuk menayangkan iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke situs kami dan situs lain di internet.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Kebijakan Privasi Pihak Ketiga</h2>
                    <p>Kebijakan Privasi kami tidak berlaku untuk pengiklan atau situs web lain. Oleh karena itu, kami menyarankan Anda untuk berkonsultasi dengan masing-masing Kebijakan Privasi dari server iklan pihak ketiga ini untuk informasi lebih rinci.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Persetujuan</h2>
                    <p>Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui syarat dan ketentuannya.</p>
                </section>
            </article>
        </div>
    );
}
