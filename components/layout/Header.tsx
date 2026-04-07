import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-50" style={{ borderColor: "var(--color-rpg-border)", background: "var(--color-rpg-surface)/90", backdropFilter: "blur(8px)" }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-wider transition-colors" style={{ color: "var(--color-rpg-gold-light)" }}>
          FORGE RPG
        </Link>
        <nav className="flex gap-6 font-mono text-xs tracking-widest uppercase">
          <Link href="/" className="transition-colors" style={{ color: "var(--color-rpg-text-muted)" }}>
            Home
          </Link>
          <Link href="/sistemas-de-rpg" className="transition-colors" style={{ color: "var(--color-rpg-text-muted)" }}>
            Sistemas
          </Link>
        </nav>
      </div>
    </header>
  );
}
