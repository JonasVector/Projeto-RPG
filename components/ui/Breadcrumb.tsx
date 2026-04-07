import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="font-mono text-xs tracking-widest uppercase text-rpg-text-muted/60 mb-8 flex items-center gap-2">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-rpg-bronze/40">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-rpg-bronze transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-rpg-copper">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
