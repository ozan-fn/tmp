"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Script from "next/script";

export default function ChatLanding({ linkAds, nama, adScript }: { linkAds: string; nama: string; adScript?: string | null }) {
    useEffect(() => {
        // Efek partikel/confetti saat halaman dimuat
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            {/* {adScript && <Script src={adScript} strategy="beforeInteractive" />} */}
            {/* Background Animated Particles (CSS Only) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-blue-500/10 blur-2xl"
                        style={{
                            width: Math.random() * 150 + 100,
                            height: Math.random() * 150 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-lg">
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-10 shadow-xl text-center text-slate-100">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="inline-block mb-6 p-4 bg-slate-800/50 rounded-full border border-slate-700">
                        <MessageCircle size={48} className="text-blue-400" />
                    </motion.div>

                    <h1 className="text-4xl font-bold mb-6 tracking-tight font-serif" dir="rtl">
                        خوش آمدید! 👋
                    </h1>

                    <p className="text-xl mb-10 text-slate-300 leading-relaxed font-medium font-serif" dir="rtl">
                        آپ اپنی منزل پر پہنچ چکے ہیں!
                        <br />
                        چیٹ روم <span className="text-blue-400 font-bold">"{nama}"</span> میں شامل ہونے کے لیے نیچے دیئے گئے بٹن پر کلک کریں۔
                    </p>

                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button asChild className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-500 text-white border-none rounded-2xl shadow-lg transition-all duration-300 font-serif" dir="rtl">
                            <a href={linkAds} rel="noopener noreferrer">
                                ابھی چیٹ شروع کریں
                                <Send className="mr-3 scale-x-[-1] group-hover:translate-x-[-4px] transition-transform" />
                            </a>
                        </Button>
                    </motion.div>

                    <p className="mt-8 text-sm text-slate-500 font-serif" dir="rtl">
                        بہترین تجربے کے لیے انٹرنیٹ کنکشن مستحکم رکھیں ✨
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
