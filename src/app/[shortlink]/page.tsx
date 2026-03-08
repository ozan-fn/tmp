import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ChatLanding from "./chat-client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ shortlink: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { shortlink } = await params;

    const link = await prisma.link.findUnique({
        where: { shortlink },
    });

    if (!link) return {};

    const title = link.customNama || link.nama;
    const description = "آپ کو چیٹ روم میں خوش آمدید کہا جاتا ہے۔ ابھی شامل ہونے کے لیے کلک کریں۔";
    const imageUrl = "https://i.ibb.co/V0jFWPTH/Frame-330984-6.png";

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `https://${process.env.NEXT_PUBLIC_DOMAIN || "yourdomain.com"}/${shortlink}`,
            siteName: "Chat Room",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [imageUrl],
        },
    };
}

export default async function ShortlinkPage({ params }: Props) {
    const { shortlink } = await params;

    const link = await prisma.link.findUnique({
        where: {
            shortlink: shortlink,
        },
    });

    if (!link) {
        notFound();
    }

    return <ChatLanding linkAds={link.linkads} nama={link.customNama || link.nama} />;
}
