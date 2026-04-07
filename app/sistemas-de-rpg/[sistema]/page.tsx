import { getCharactersBySystem, getSystemList } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SystemThemeProvider, getThemeConfig, type SystemTheme } from "@/components/theme/ThemeProvider";
import { SYSTEM_LABELS } from "@/lib/system-labels";
import OrnamentLine from "@/components/ui/OrnamentLine";
import SystemWatermark from "@/components/theme/SystemWatermark";
import SystemSeparator from "@/components/theme/SystemSeparator";

export async function generateStaticParams() {
  return getSystemList().map((system) => ({ system }));
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ sistema: string }>;
}) {
  const { sistema } = await params;
  const characters = getCharactersBySystem(sistema);
  const label = SYSTEM_LABELS[sistema];

  if (!label) notFound();

  const config = getThemeConfig(sistema);
  const theme = config.theme as SystemTheme;

  return (
    <SystemThemeProvider system={sistema}>
      <div className="min-h-screen">
        {/* Hero */}
        <header className="system-hero-bg relative overflow-hidden" style={{ minHeight: "36vh" }}>
          <SystemWatermark theme={theme} />

          <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-8 pt-12 max-w-4xl mx-auto">
            <Link
              href="/sistemas-de-rpg"
              className="font-mono text-[10px] tracking-widest uppercase transition-colors mb-6 inline-block hover:text-[var(--color-theme-brand-bright)]"
              style={{
                color: "var(--color-theme-text-dim)",
              }}
            >
              ← Todos os sistemas
            </Link>

            <div className="animate-fade-rise">
              <OrnamentLine
                color="var(--color-theme-brand)"
                opacity={0.45}
                width={180}
              />
            </div>

            <h1
              className={`font-display font-bold text-4xl md:text-5xl tracking-wider mt-2 animate-fade-rise-d1 ${
                theme === "vampiro" ? "glow-pulse-vampire" : "glow-pulse-gold"
              }`}
              style={{
                color: "var(--color-theme-bone)",
                textShadow: "0 0 50px var(--color-theme-glow)",
              }}
            >
              {label}
            </h1>

            <p
              className="font-mono text-xs mt-2 animate-fade-rise-d2"
              style={{ color: "var(--color-theme-text-dim)" }}
            >
              {characters.length} personagem{characters.length !== 1 ? "s" : ""}
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-10">
          <SystemSeparator theme={theme} />

          {characters.length === 0 ? (
            <div
              className="text-center py-16 border mt-4"
              style={{
                borderColor: "var(--color-theme-border)",
                background: "var(--color-theme-card)",
              }}
            >
              <span className="text-4xl block mb-4 opacity-30">📜</span>
              <p style={{ color: "var(--color-theme-text-dim)" }}>
                Nenhum personagem neste sistema ainda.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {characters.map((ch, i) => (
                <div
                  key={ch.id}
                  className="card-enter"
                  style={{ "--card-i": i } as React.CSSProperties}
                >
                  <CharacterCard character={ch} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </SystemThemeProvider>
  );
}
