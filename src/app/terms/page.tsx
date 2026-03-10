import { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
    title: "Syarat dan Ketentuan (Terms of Service)",
    description: "Syarat penggunaan platform tutorial pemrograman.",
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12 md:px-24 lg:px-48 text-justify">
            <article className="max-w-4xl mx-auto space-y-6 leading-relaxed">
                <Breadcrumbs items={[{ label: "Syarat & Ketentuan" }]} />

                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Syarat dan Ketentuan</h1>
                <p className="text-sm italic">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>

                <section className="space-y-4">
                    <p>Selamat datang di platform tutorial pemrograman kami yang dikelola secara individu. Dengan mengakses situs ini, kami menganggap Anda telah menerima syarat dan ketentuan ini secara penuh.</p>
                </section>

                <section className="space-y-4 shadow-sm p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border-l-4 border-blue-500">
                    <h2 className="text-2xl font-bold dark:text-zinc-50 text-blue-600">Hak Milik Intelektual</h2>
                    <p>Kecuali dinyatakan lain, pembuat platform ini memiliki hak kekayaan intelektual untuk semua materi di situs ini. Anda dapat melihat dan/atau mencetak halaman dari situs ini untuk penggunaan pribadi Anda sendiri dengan tunduk pada batasan yang ditetapkan dalam syarat dan ketentuan ini.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50 border-b-2 dark:border-zinc-800 pb-2 text-blue-600">Batasan Tanggung Jawab</h2>
                    <p>Informasi yang disediakan di situs ini bersifat tutorial dan edukatif. Meskipun kami berusaha menjaga keakuratan, kami tidak bertanggung jawab atas segala kerugian yang mungkin timbul akibat penerapan kode atau informasi dari situs kami tanpa konsultasi profesional lebih lanjut.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold dark:text-zinc-50 border-b-2 dark:border-zinc-800 pb-2 text-blue-600">Kontak Pengguna</h2>
                    <p>Untuk pertanyaan, masukan, atau keluhan terkait konten kami, Anda dapat menghubungi pengelola secara langsung melalui email me@ozan.my.id.</p>
                </section>

                <section className="space-y-4">
                    <p>Kami berhak mengganti atau merevisi ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya untuk mengikuti perkembangan regulasi platform blogger dan periklanan.</p>
                </section>
            </article>
        </div>
    );
}
