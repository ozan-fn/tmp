import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                <span className="mr-1">🏠</span> Beranda
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <span className="text-zinc-300 dark:text-zinc-700">/</span>
                    {item.href ? (
                        <Link href={item.href} className="hover:text-blue-600 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[150px] md:max-w-none">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
