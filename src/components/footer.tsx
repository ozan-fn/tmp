'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/contact', label: 'Kontak' },
];

const legalLinks = [
    { href: '/privacy', label: 'Kebijakan Privasi' },
    { href: '/terms', label: 'Syarat & Ketentuan' },
];

const HIDDEN_PATHS = ['/dashboard', '/login'];

export function Footer() {
    const pathname = usePathname();

    const isHidden = HIDDEN_PATHS.some((path) => pathname.startsWith(path));
    if (isHidden) return null;

    return (
        <footer className="w-full mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                    {/* Brand */}
                    <div className="space-y-5 md:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
                            <Image src="/logo.png" alt="Perschat" width={36} height={36} className="rounded-md" />
                            <span className="text-zinc-900 dark:text-zinc-50 font-extrabold">Perschat</span>
                        </Link>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Blog teknologi, pemrograman, dan tutorial untuk developer Indonesia. Temukan artikel seputar web development, cloud, backend, dan lainnya.</p>

                        <div className="space-y-2 pt-1">
                            <a href="mailto:me@ozan.my.id" className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span>me@ozan.my.id</span>
                            </a>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span>Indonesia</span>
                            </div>
                            <a href="https://perschat.my.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <ExternalLink className="w-4 h-4 shrink-0" />
                                <span>perschat.my.id</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigasi */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Navigasi</h3>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={cn('text-sm transition-colors', pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400')}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">Legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={cn('text-sm transition-colors', pathname === link.href ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400')}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center sm:text-left">
                        © {new Date().getFullYear()} <span className="font-medium text-zinc-500 dark:text-zinc-400">Perschat</span> · perschat.my.id · Semua hak dilindungi undang-undang.
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        Dibuat dengan ❤️ oleh{' '}
                        <a href="mailto:me@ozan.my.id" className="font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Ozan
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
