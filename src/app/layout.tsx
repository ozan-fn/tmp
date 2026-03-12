import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'TechInsights - Tutorial Pemrograman & Teknologi Modern',
        template: '%s | TechInsights',
    },
    description: 'Kuasai Golang, Next.js, dan cloud computing dengan panduan praktis dan mendalam.',
    keywords: ['tutorial pemrograman', 'belajar golang', 'next.js indonesia', 'coding tutorial', 'developer blog'],
    authors: [{ name: 'Ozan', url: 'https://perschat.my.id' }],
    creator: 'Ozan',
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://perschat.my.id',
        siteName: 'TechInsights',
        title: 'TechInsights - Tutorial Pemrograman & Teknologi Modern',
        description: 'Panduan belajar software engineering terbaik untuk developer Indonesia.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'TechInsights Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TechInsights - Tutorial Pemrograman & Teknologi Modern',
        description: 'Panduan belajar software engineering terbaik.',
        creator: '@ozan',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn('font-sans', inter.variable)} suppressHydrationWarning>
            <head>
                <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1777096429478325" crossOrigin="anonymous" strategy="afterInteractive" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <Navbar />
                    {children}
                    <Footer />

                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
