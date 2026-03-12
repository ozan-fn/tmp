import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

function truncateLabel(label: string, max = 40): string {
    if (label.length <= max) return label;
    return label.slice(0, max).trimEnd() + '…';
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center flex-wrap gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center shrink-0">
                <span className="mr-1">🏠</span> Beranda
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
                    {item.href ? (
                        <Link href={item.href} className="hover:text-blue-600 transition-colors shrink-0">
                            {truncateLabel(item.label)}
                        </Link>
                    ) : (
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{truncateLabel(item.label)}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
