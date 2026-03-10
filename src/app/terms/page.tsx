import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Syarat dan Ketentuan (Terms of Service)",
    description: "Halaman Syarat dan Ketentuan untuk situs kami.",
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans px-6 py-12 md:px-24 lg:px-48">
            <article className="max-w-4xl mx-auto space-y-6 leading-relaxed text-justify">
                <h1 className="text-3xl font-extrabold text-zinc-900">Syarat dan Ketentuan</h1>
                <p>Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>

                <p>Selamat datang di situs kami! Dengan mengakses situs web ini, kami menganggap Anda menerima syarat dan ketentuan ini. Jangan melanjutkan penggunaan situs ini jika Anda tidak setuju untuk mengambil semua syarat dan ketentuan yang tercantum di halaman ini.</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Lisensi Konten</h2>
                    <p>Kecuali dinyatakan lain, kami memiliki hak kekayaan intelektual untuk semua materi di situs ini. Semua hak kekayaan intelektual dilindungi undang-undang. Anda dapat mengakses materi ini untuk penggunaan pribadi Anda sendiri dengan batasan yang diatur dalam syarat dan ketentuan ini.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Batasan Tanggung Jawab</h2>
                    <p>Informasi yang diberikan di situs ini hanya untuk tujuan informasi umum. Meskipun kami berusaha menjaga agar informasi tetap mutakhir dan benar, kami tidak memberikan pernyataan atau jaminan dalam bentuk apa pun tentang kelengkapan, keakuratan, atau ketersediaan dalam situs web ini.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Perubahan Ketentuan</h2>
                    <p>Kami berhak merevisi syarat dan ketentuan ini sewaktu-waktu. Dengan menggunakan situs web ini, Anda diharapkan meninjau syarat dan ketentuan ini secara teratur.</p>
                </section>
            </article>
        </div>
    );
}
