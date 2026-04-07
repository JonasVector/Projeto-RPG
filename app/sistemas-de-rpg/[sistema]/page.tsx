import { getCharactersBySystem, getSystemList } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SystemThemeProvider } from "@/components/theme/ThemeProvider";
import { SYSTEM_LABELS } from "@/lib/system-labels";

export async function generateStaticParams() {
  return getSystemList().map((system) => ({ system }));
}

export default async function SystemPage({ params }: { params: Promise<{ sistema: string }> }) {
  const { sistema } = await params;
  const characters = getCharactersBySystem(sistema);
  const label = SYSTEM_LABELS[sistema] || sistema;

  if (!SYSTEM_LABELS[sistema]) {
    notFound();
  }

  return (
    <SystemThemeProvider system={sistema}>
      <div className="min-h-screen">
        {/* Back nav */}
        <nav className="px-4 sm:px-6 py-3 border-b" style={{ borderColor: "var(--color-theme-border)", background: "var(--color-theme-surface)" }}>
          <Link
            href="/sistemas-de-rpg"
            className="font-mono text-[10px] tracking-widest uppercase transition-colors"
            style={{ color: "var(--color-theme-text-dim)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-theme-brand-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-theme-text-dim)")}
          >
            ← Ver todos os sistemas
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1
            className="font-display font-bold text-4xl tracking-wider"
            style={{ color: "var(--color-theme-bone)", textShadow: "0 0 50px var(--color-theme-glow)" }}
          >
            {label}
          </h1>
          <p className="font-mono text-sm mt-2" style={{ color: "var(--color-theme-text-dim)" }}>
            {characters.length} personagem{characters.length !== 1 ? "s" : ""}
          </p>

          {characters.length === 0 ? (
            <div className="text-center py-16 border mt-8" style={{ borderColor: "var(--color-theme-border)", background: "var(--color-theme-card)" }}>
              <span className="text-4xl block mb-4 opacity-30">📜</span>
              <p style={{ color: "var(--color-theme-text-dim)" }}>
                Nenhum personagem neste sistema ainda.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {characters.map((ch) => (
                <CharacterCard key={ch.id} character={ch} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SystemThemeProvider>
  );
}
