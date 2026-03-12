import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function extractExcerpt(markdown: string, maxLength = 130): string {
    const plain = markdown
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/^[-*>]+\s*/gm, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (plain.length <= maxLength) return plain;

    return (
        plain
            .slice(0, maxLength)
            .trimEnd()
            .replace(/[,،،.]$/, '') + '...'
    );
}
