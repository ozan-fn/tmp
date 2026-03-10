import { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
    title: "Kebijakan Privasi (Privacy Policy)",
    description: "Halaman Kebijakan Privasi untuk platform tutorial kami.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12 md:px-24 lg:px-48 text-justify">
            <article className="max-w-4xl mx-auto space-y-6 leading-relaxed">
                <Breadcrumbs items={[{ label: "Kebijakan Privasi" }]} />

                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Kebijakan Privasi</h1>
                <p className="text-sm italic">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>

                <section className="space-y-4">
                    <p>Di platform tutorial pemrograman kami, kami sangat menghargai privasi pengunjung. Dokumen ini merincikan bagaimana kami mengelola informasi Anda.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50 border-b-2 dark:border-zinc-800 pb-2 text-blue-600">Log Files</h2>
                    <p>Seperti situs tutorial lainnya, kami menggunakan log files untuk mencatat aktivitas pengunjung yang standar dilakukan oleh penyedia hosting. Informasi ini meliputi alamat IP, jenis browser, ISP, stempel waktu, dan jalur rujukan/keluar untuk keperluan analisis tren situs.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50 border-b-2 dark:border-zinc-800 pb-2 text-blue-600">Cookies dan Iklan</h2>
                    <p>Situs ini menggunakan cookie untuk menyimpan informasi tentang preferensi pengunjung. Kami juga menggunakan partner periklanan seperti Google AdSense yang mungkin menggunakan cookie DART untuk menayangkan iklan yang relevan berdasar riwayat kunjungan Anda.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50 border-b-2 dark:border-zinc-800 pb-2 text-blue-600">Persetujuan</h2>
                    <p>Dengan terus menggunakan situs kami, Anda menyatakan setuju dengan Kebijakan Privasi ini. Jika ada pertanyaan lebih lanjut tentang pengelolaan data ini, Anda dapat menghubungi kami melalui email me@ozan.my.id.</p>
                </section>
            </article>
        </div>
    );
}
