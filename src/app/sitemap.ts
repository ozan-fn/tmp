import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const BASE_URL = 'https://perschat.my.id';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, tags] = await Promise.all([
        prisma.post.findMany({
            where: { status: 'published' },
            select: { slug: true, updatedAt: true, thumbnail: true },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.tag.findMany({
            select: { name: true },
        }),
    ]);

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.8,
        ...(post.thumbnail ? { images: [post.thumbnail] } : {}),
    }));

    const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
        url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
    }));

    return [...staticPages, ...postPages, ...tagPages];
}
