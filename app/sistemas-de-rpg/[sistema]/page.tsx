import { getCharactersBySystem, getSystemList } from "@/lib/characters";
import { getAllPlayers } from "@/lib/players";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SystemThemeProvider } from "@/components/theme/ThemeProvider";
import { getThemeConfig, type SystemTheme } from "@/components/theme/theme-config";
import { getSystem } from "@/lib/systems";
import OrnamentLine from "@/components/ui/OrnamentLine";
import SystemWatermark from "@/components/theme/SystemWatermark";
import SystemSeparator from "@/components/theme/SystemSeparator";
import { SystemPlayerCard, CharMiniCard } from "@/components/sistemas/SystemPlayerCard";

export async function generateStaticParams() {
  return getSystemList().map((system) => ({ system }));
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ sistema: string }>;
}) {
  const { sistema } = await params;
  const meta = getSystem(sistema);
  const themeConfig = getThemeConfig(sistema);
  const theme = themeConfig.theme as SystemTheme;

  const knownSystems = getSystemList();
  if (!knownSystems.includes(sistema as never)) notFound();

  const allChars = getCharactersBySystem(sistema);
  const players = getAllPlayers();

  // Players that have characters in this system
  const playersInSystem = players
    .map((p) => {
      const chars = p.characters.filter((c) => c.system === sistema);
      return chars.length > 0 ? { player: p, chars } : null;
    })
    .filter(Boolean) as {
      player: (typeof players)[0];
      chars: (typeof players)[0]["characters"];
    }[];

  // Orphan sheets not linked to any player
  const linkedSlugs = new Set(
    playersInSystem.flatMap((e) => e.chars.map((c) => c.slug))
  );
  const orphanChars = allChars.filter((c) => !linkedSlugs.has(c.id));

  const accent = meta.accent;
  const border = `${accent}30`;

  return (
    <SystemThemeProvider system={sistema}>
      <div className="min-h-screen">
        {/* Hero */}
        <header
          className="system-hero-bg relative overflow-hidden flex flex-col border-b"
          style={{ minHeight: "32vh", borderColor: border }}
        >
          <SystemWatermark theme={theme} />

          <div className="relative z-10 flex flex-col justify-end flex-1 px-6 pb-8 pt-12 max-w-5xl mx-auto w-full">
            <Link
              href="/sistemas-de-rpg"
              className="font-mono text-[10px] tracking-widest uppercase transition-opacity mb-6 inline-block hover:opacity-70"
              style={{ color: "var(--color-theme-text-dim)" }}
            >
              ← Todos os sistemas
            </Link>

            <div className="animate-fade-rise">
              <OrnamentLine color={accent} opacity={0.45} width={180} />
            </div>

            <div className="flex items-end justify-between gap-4 mt-2">
              <div>
                <h1
                  className={`font-display font-bold text-4xl md:text-5xl tracking-wider mt-2 animate-fade-rise-d1 ${
                    theme === "vampiro" ? "glow-pulse-vampire" : "glow-pulse-gold"
                  }`}
                  style={{
                    color: "var(--color-theme-bone)",
                    textShadow: `0 0 50px var(--color-theme-glow)`,
                  }}
                >
                  {meta.label}
                </h1>
                <p
                  className="font-mono text-xs mt-2 animate-fade-rise-d2"
                  style={{ color: "var(--color-theme-text-dim)" }}
                >
                  {meta.genre}
                </p>
              </div>
              <div
                className="animate-fade-rise-d1 flex-shrink-0 text-right font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--color-theme-text-dim)" }}
              >
                <span
                  className="font-display font-bold text-2xl block"
                  style={{ color: accent }}
                >
                  {allChars.length}
                </span>
                personagem{allChars.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-6 py-10">
          <SystemSeparator theme={theme} />

          {/* Player-focused view CTA */}
          <div
            className="mb-8 p-4 border rounded-lg"
            style={{
              background: "var(--color-theme-surface)",
              borderColor: `${accent}30`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3
                  className="font-display font-semibold text-lg"
                  style={{ color: "var(--color-theme-bone)" }}
                >
                  Visualização por Jogador
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--color-theme-text-dim)" }}
                >
                  Veja as fichas de personagens organizadas por jogador
                </p>
              </div>
              <Link
                href={`/sistemas-de-rpg/${sistema}/jogadores`}
                className="inline-flex items-center gap-2 px-4 py-2 border font-mono text-sm uppercase tracking-wider transition-all hover:opacity-90"
                style={{
                  borderColor: accent,
                  color: accent,
                  background: `${accent}10`,
                }}
              >
                Selecionar jogador
                <span style={{ color: accent }}>→</span>
              </Link>
            </div>
          </div>

          {allChars.length === 0 ? (
            <div
              className="text-center py-16 border mt-4"
              style={{
                borderColor: "var(--color-theme-border)",
                background: "var(--color-theme-card)",
              }}
            >
              <span className="font-display text-4xl block mb-4 opacity-20">✦</span>
              <p style={{ color: "var(--color-theme-text-dim)" }}>
                Nenhum personagem neste sistema ainda.
              </p>
            </div>
          ) : (
            <div className="space-y-6 mt-2">
              {/* Players with sheets */}
              {playersInSystem.map(({ player, chars }, pi) => (
                <SystemPlayerCard
                  key={player.id}
                  player={{
                    id: player.id,
                    displayName: player.displayName,
                    role: player.role,
                  }}
                  chars={chars}
                  sistema={sistema}
                  accent={accent}
                  border={border}
                  index={pi}
                />
              ))}

              {/* Orphan sheets */}
              {orphanChars.length > 0 && (
                <section>
                  <div
                    className="flex items-center gap-3 mb-4"
                    style={{ color: "var(--color-theme-text-dim)" }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest flex-shrink-0">
                      Não Atribuído
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "var(--color-theme-border)" }}
                    />
                    <span className="font-mono text-[10px] flex-shrink-0">
                      {orphanChars.length} ficha{orphanChars.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {orphanChars.map((ch, i) => (
                      <div
                        key={ch.id}
                        className="card-enter"
                        style={{ "--card-i": i } as React.CSSProperties}
                      >
                        <CharMiniCard
                          href={`/sistemas-de-rpg/${sistema}/personagens/${ch.id}`}
                          label={ch.name}
                          sub={`${ch.class || "—"} · Nv ${ch.level}`}
                          accent={accent}
                          systemId={sistema}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </main>
      </div>
    </SystemThemeProvider>
  );
}
