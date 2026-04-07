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
    <nav
      className="font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2 px-4 sm:px-10 py-3"
      style={{ color: "var(--color-theme-text-dim, var(--color-rpg-text-muted))", opacity: 0.6 }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-40">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:opacity-100 transition-opacity">
              {item.label}
            </Link>
          ) : (
            <span className="opacity-100" style={{ color: "var(--color-theme-bone-dim, var(--color-rpg-copper))" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
