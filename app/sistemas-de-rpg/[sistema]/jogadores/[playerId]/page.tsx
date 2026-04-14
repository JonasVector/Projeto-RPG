import { getSystemList, getCharactersBySystem } from "@/lib/characters";
import { getPlayer } from "@/lib/players";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SystemThemeProvider } from "@/components/theme/ThemeProvider";
import { getThemeConfig, type SystemTheme } from "@/components/theme/theme-config";
import { getSystem } from "@/lib/systems";
import OrnamentLine from "@/components/ui/OrnamentLine";
import SystemWatermark from "@/components/theme/SystemWatermark";
import SystemSeparator from "@/components/theme/SystemSeparator";
import { SystemPlayerCard } from "@/components/sistemas/SystemPlayerCard";
import { CharMiniCardClient } from "@/components/sistemas/CharMiniCardClient";

export default async function SystemPlayerCharacterPage({
  params,
}: {
  params: Promise<{ sistema: string; playerId: string }>;
}) {
  const { sistema, playerId } = await params;
  const meta = getSystem(sistema);
  const themeConfig = getThemeConfig(sistema);
  const theme = themeConfig.theme as SystemTheme;

  const knownSystems = getSystemList();
  if (!knownSystems.includes(sistema as never)) notFound();

  const player = getPlayer(playerId);
  if (!player) notFound();

  const allChars = getCharactersBySystem(sistema);

  // Get only this player's characters in this system
  const playerCharsInSystem = player.characters
    .filter((c) => c.system === sistema)
    .map((charRef) => {
      // Find the full character data from allChars
      return allChars.find((c) => c.id === charRef.slug);
    })
    .filter(Boolean); // Remove undefined if character doesn't exist

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
              href={`/sistemas-de-rpg/${sistema}/jogadores`}
              className="font-mono text-[10px] tracking-widest uppercase transition-opacity mb-6 inline-block hover:opacity-70"
              style={{ color: "var(--color-theme-text-dim)" }}
            >
              ← Voltar para jogadores
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
                  {player.displayName}
                </h1>
                <p
                  className="font-mono text-xs mt-2 animate-fade-rise-d2"
                  style={{ color: "var(--color-theme-text-dim)" }}
                >
                  {meta.label} · {playerCharsInSystem.length} ficha{playerCharsInSystem.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-6 py-10">
          <SystemSeparator theme={theme} />

          {playerCharsInSystem.length === 0 ? (
            <div
              className="text-center py-16 border mt-4"
              style={{
                borderColor: "var(--color-theme-border)",
                background: "var(--color-theme-card)",
              }}
            >
              <span className="font-display text-4xl block mb-4 opacity-20">✦</span>
              <p style={{ color: "var(--color-theme-text-dim)" }}>
                Nenhuma ficha encontrada para este jogador neste sistema.
              </p>
            </div>
          ) : (
            <div className="space-y-6 mt-2">
              {/* Character list for this player in this system */}
              <section>
                <div
                  className="flex items-center gap-3 mb-4"
                  style={{ color: "var(--color-theme-text-dim)" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest flex-shrink-0">
                    Fichas de {player.displayName}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "var(--color-theme-border)" }}
                  />
                  <span className="font-mono text-[10px] flex-shrink-0">
                    {playerCharsInSystem.length} ficha{playerCharsInSystem.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {playerCharsInSystem.map((ch, i) => (
                    <div
                      key={ch?.id}
                      className="card-enter"
                      style={{ "--card-i": i } as React.CSSProperties}
                    >
                      <CharMiniCardClient
                        href={`/sistemas-de-rpg/${sistema}/personagens/${ch?.id}`}
                        label={ch?.name || "Ficha Desconhecida"}
                        sub={`${ch?.class || "—"} · Nv ${ch?.level || "?"}`}
                        accent={accent}
                        systemId={sistema}
                        statusDot={false}
                        statusActive={false}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </SystemThemeProvider>
  );
}