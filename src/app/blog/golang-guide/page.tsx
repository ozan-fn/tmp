import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mengenal Golang: Panduan Lengkap dari Sejarah, Fitur, hingga Masa Depan",
    description: "Pelajari secara mendalam apa itu Golang, fitur utamanya seperti Concurrency, kelebihannya dibanding bahasa lain, dan jawaban atas pertanyaan umum (FAQ) tentang Go.",
};

export default function GolangArticle() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12 md:px-24 lg:px-48">
            <article className="max-w-4xl mx-auto space-y-12 leading-relaxed">
                {/* Header Section */}
                <header className="space-y-6 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">Panduan Lengkap 2026</div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">Mengenal Golang: Bahasa Pemrograman Masa Depan dari Google</h1>
                    <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 italic max-w-2xl mx-auto leading-relaxed">Explorasi Mendalam Tentang Efisiensi, Skalabilitas, dan Keajaiban Concurrency dalam Ekosistem Go.</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
                        <span>Waktu Baca: 15 Menit</span>
                        <span>•</span>
                        <span>Diterbitkan: 10 Maret 2026</span>
                    </div>
                    <hr className="border-zinc-200 dark:border-zinc-800" />
                </header>

                {/* Bagian 1: Definisi & Visi */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 pl-4">1. Apa itu Golang Sebenarnya?</h2>
                    <p className="text-lg">
                        <strong className="font-bold">Golang</strong>, atau yang secara resmi disebut sebagai <strong className="font-bold text-blue-600">Go</strong>, adalah bahasa pemrograman <span className="italic">statically typed</span> dan <span className="italic">compiled</span> yang dikembangkan di Google oleh Robert Griesemer, Rob Pike, dan Ken Thompson. Meskipun sering dianggap sebagai bahasa baru, Go sebenarnya
                        lahir dari rasa frustrasi terhadap kompleksitas bahasa sistem tradisional seperti C++ dan Java yang cenderung lambat dalam proses kompilasi dan sulit dalam menangani sistem terdistribusi skala besar.
                    </p>
                    <p>Visi utama Go adalah menyederhanakan proses pengembangan perangkat lunak tanpa mengorbankan performa. Go menggabungkan kemudahan penulisan kode seperti Python dengan kecepatan eksekusi yang mendekati C++. Ini adalah bahasa yang dirancang untuk era modern: era cloud computing, microservices, dan prosesor multi-core.</p>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <h4 className="font-bold mb-2">Filosofi Desain Go:</h4>
                        <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400 italic">
                            <li>"Lebih Sedikit Itu Lebih Baik" (Less is more)</li>
                            <li>Kejelasan lebih penting daripada kepintaran (Clarity is better than cleverness)</li>
                            <li>Kompilasi harus secepat kilat agar pengembang tetap produktif.</li>
                        </ul>
                    </div>
                </section>

                {/* Bagian 2: Sejarah & Evolusi */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 pl-4">2. Sejarah dan Evolusi Sang Gopher</h2>
                    <p>Proyek Go dimulai pada September 2007 sebagai proyek sampingan di Google. Fokus utamanya adalah memperbaiki masalah-masalah infrastruktur Google yang sangat masif. Bahasa ini diumumkan ke publik pada November 2009, dan versi stabil pertamanya (Go 1) dirilis pada Maret 2012.</p>
                    <p>
                        Salah satu pencapaian terbesar dalam sejarah Go adalah peluncuran <strong className="font-bold">Go Modules</strong> yang mereformasi cara pengembang mengelola dependensi pihak ketiga secara konsisten. Hingga tahun 2026 ini, Go telah mencapai maturitas yang luar biasa dengan dukungan penuh untuk Generics (sejak versi 1.18) yang menjawab keluhan terbesar para pengembang selama bertahun-tahun.
                    </p>
                </section>

                {/* Bagian 3: Fitur Teknis Mendalam */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 pl-4">3. Mengapa Go Sangat Berbeda? (Fitur Teknis)</h2>

                    <div className="space-y-6">
                        <div className="group p-6 border dark:border-zinc-800 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="text-2xl">⚡</span> Concurrency Melalui Goroutines
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                                Inilah "senjata rahasia" Go. Ribuan bahasa pemrograman lain menggunakan <span className="italic">OS Threads</span> yang sangat berat (bisa memakan 1MB memori per thread). Go menggunakan <strong className="font-bold">Goroutines</strong> yang hanya memakan sekitar 2KB memori. Akibatnya, Anda bisa menjalankan 100.000 goroutine secara bersamaan di laptop biasa tanpa hambatan berarti.
                            </p>
                        </div>

                        <div className="group p-6 border dark:border-zinc-800 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="text-2xl">📡</span> Channels: Komunikasi Antar Proses
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                                Go memiliki mantra: <span className="italic italic-none italic-none italic-none italic-none italic-none italic-none font-medium italic-none">"Jangan berkomunikasi dengan berbagi memori; melainkan, berbagi memori dengan berkomunikasi."</span> Channels memungkinkan data berpindah aman antar Goroutine tanpa perlu lock manual (mutex) yang sering menyebabkan deadlock.
                            </p>
                        </div>

                        <div className="group p-6 border dark:border-zinc-800 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="text-2xl">📦</span> Single Binary & Cross Compilation
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">Go mengompilasi semua kode dan dependensi ke dalam satu file binary mandiri. Tidak perlu menginstal runtime (seperti JDK pada Java atau Interpreter pada Python) di server tujuan. Cukup salin file binary tersebut, dan aplikasi Anda berjalan seketika di Linux, Windows, atau Docker.</p>
                        </div>
                    </div>
                </section>

                {/* Bagian 4: Use Cases */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 pl-4">4. Kapan Harus Menggunakan Go?</h2>
                    <p>Go tidak dirancang untuk membuat video game AAA atau AI tingkat tinggi (tugas itu masih didominasi C++ dan Python). Namun, Go adalah raja di domain berikut:</p>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="p-4 bg-zinc-50 dark:bg-zinc-900/20 border dark:border-zinc-800 rounded-xl">
                            <strong className="block text-blue-600">Microservices:</strong> Kompabilitas tinggi dengan protokol gRPC dan efisiensi memori yang rendah.
                        </li>
                        <li className="p-4 bg-zinc-50 dark:bg-zinc-900/20 border dark:border-zinc-800 rounded-xl">
                            <strong className="block text-blue-600">Cloud Infrastructure:</strong> Docker, Kubernetes, dan Terraform semuanya ditulis dalam Go.
                        </li>
                        <li className="p-4 bg-zinc-50 dark:bg-zinc-900/20 border dark:border-zinc-800 rounded-xl">
                            <strong className="block text-blue-600">Backend API:</strong> Sangat tangguh menangani ribuan request per detik dengan latensi rendah.
                        </li>
                        <li className="p-4 bg-zinc-50 dark:bg-zinc-900/20 border dark:border-zinc-800 rounded-xl">
                            <strong className="block text-blue-600">CLI Tools:</strong> Kecepatan kompilasi dan distribusi binary tunggal memudahkan pembuatan alat terminal yang poweful.
                        </li>
                    </ul>
                </section>

                {/* Bagian 5: FAQ yang Diperluas */}
                <section className="space-y-8 bg-zinc-50 dark:bg-zinc-900/30 p-8 rounded-3xl border dark:border-zinc-800">
                    <h2 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-50">Pertanyaan yang Sering Diajukan (FAQ)</h2>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-blue-500 mb-2">Apakah Go benar-benar lebih cepat dari Java?</h4>
                            <p className="text-zinc-600 dark:text-zinc-400">Dalam banyak kasus, Ya. Terutama dalam penggunaan memori dan startup time. Go tidak memiliki overhead VM (Virtual Machine). Namun, Java masih unggul dalam optimasi JIT (Just-In-Time) untuk komputasi matematika yang sangat repetitif.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-blue-500 mb-2">Mengapa Go tidak memiliki class/inheritance?</h4>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Go memilih pendekatan <strong className="font-bold">Composition over Inheritance</strong>. Go menggunakan Struct dan Interface untuk mencapai polimorfisme. Ini menghasilkan kode yang lebih mudah didebug dan lebih sedikit "trap" hirarki objek yang rumit.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-blue-500 mb-2">Apakah Garbage Collector di Go menyebabkan jeda (latency)?</h4>
                            <p className="text-zinc-600 dark:text-zinc-400">Tim Go telah menghabiskan waktu bertahun-tahun untuk mengoptimalkan GC agar memiliki jeda di bawah 1 milidetik. Inilah alasan mengapa Go sangat populer untuk sistem low-latency.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-blue-500 mb-2">Di mana saya bisa mulai belajar?</h4>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Mulailah dengan{" "}
                                <a href="https://go.dev/tour/" className="underline text-blue-600">
                                    A Tour of Go
                                </a>
                                . Ini adalah tutorial interaktif langsung di browser yang sangat direkomendasikan untuk pemula.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Bagian Penutup */}
                <footer className="space-y-6 pt-12 border-t dark:border-zinc-800">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Kesimpulan Masa Depan</h2>
                    <p className="text-lg">Golang bukan sekadar tren teknologi, melainkan jawaban atas evolusi perangkat keras yang bergerak ke arah multi-core dan sistem cloud. Dengan ekosistem yang solid, performa yang tak terbantahkan, dan dukungan penuh dari raksasa teknologi seperti Google, Go akan tetap menjadi pilihan utama bagi arsitek software selama puluhan tahun ke depan.</p>
                    <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white">
                        <h4 className="text-xl font-bold mb-2">Sudah Siap Menjadi Gopher?</h4>
                        <p className="opacity-90 leading-relaxed mb-6">Jangan biarkan rasa takut akan tantangan teknis menghentikan Anda. Bergabunglah dengan jutaan pengembang lainnya dan mulailah membangun aplikasi yang cepat, aman, dan skalabel hari ini.</p>
                        <a href="https://go.dev/dl/" className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-zinc-100 transition-all inline-block shadow-lg">
                            Download Go SEKARANG
                        </a>
                    </div>
                </footer>
            </article>
        </div>
    );
}
