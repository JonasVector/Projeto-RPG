import Link from "next/link";

export default function Header() {
  return (
    <header
      className="border-b sticky top-0 z-50 backdrop-blur-md"
      style={{
        borderColor: "var(--color-rpg-border)",
        background: "rgba(5,3,5,0.85)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-lg tracking-[0.15em] transition-colors hover:text-[#e8c85a]"
          style={{ color: "var(--color-rpg-gold-light)" }}
        >
          AKASHARIUM
        </Link>
        <nav className="flex gap-6 font-mono text-[10px] tracking-widest uppercase">
          <Link
            href="/"
            className="transition-colors hover:text-[var(--color-rpg-gold-light)]"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            Home
          </Link>
          <Link
            href="/sistemas-de-rpg"
            className="transition-colors hover:text-[var(--color-rpg-gold-light)]"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            Sistemas
          </Link>
        </nav>
      </div>
    </header>
  );
}
