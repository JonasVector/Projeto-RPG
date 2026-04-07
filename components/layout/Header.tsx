import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-rpg-border bg-rpg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl text-rpg-gold-light tracking-wider hover:text-rpg-gold transition-colors">
          FORGE RPG
        </Link>
        <nav className="flex gap-6 font-mono text-xs tracking-widest uppercase">
          <Link href="/" className="text-rpg-text-muted hover:text-rpg-bronze transition-colors">
            Home
          </Link>
          <Link href="/sistemas-de-rpg" className="text-rpg-text-muted hover:text-rpg-bronze transition-colors">
            Sistemas
          </Link>
        </nav>
      </div>
    </header>
  );
}
