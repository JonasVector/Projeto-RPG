import { getPlayer, getAllPlayers } from "@/lib/players";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";
import { getSystem } from "@/lib/systems";
import SystemSelectionCard from "@/components/players/SystemSelectionCard";
import CreateSheetModal from "@/components/players/CreateSheetModal";

export async function generateStaticParams() {
  const players = getAllPlayers();
  return players.map((p) => ({ slug: p.id }));
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = getPlayer(slug);
  if (!player) notFound();

  // Group characters by system
  const bySystem: Record<string, number> = {};
  for (const ch of player.characters) {
    bySystem[ch.system] = (bySystem[ch.system] || 0) + 1;
  }
  const systems = Object.keys(bySystem);

  const accent = "#b87333";
  const border = "rgba(184,115,51,0.25)";
  const bg = "#13100c";

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="relative overflow-hidden border-b"
        style={{
          minHeight: "38vh",
          background: "linear-gradient(165deg, #050305 0%, #100a08 55%, #050305 100%)",
          borderColor: "rgba(184,115,51,0.18)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 60px, rgba(184,115,51,0.015) 60px, rgba(184,115,51,0.015) 61px)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.07) 0%, transparent 55%)`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-14 max-w-5xl mx-auto">
          <Link
            href="/jogadores"
            className="font-mono text-[10px] tracking-widest uppercase mb-6 inline-block transition-opacity hover:opacity-70"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            ← Jogadores
          </Link>

          <OrnamentLine color={accent} opacity={0.45} width={160} />

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mt-3">
            {/* Avatar sigil */}
            <div
              className="flex-shrink-0 w-20 h-20 border-2 flex items-center justify-center font-display text-4xl font-bold animate-fade-rise"
              style={{
                background: `rgba(184,115,51,0.06)`,
                borderColor: accent,
                color: accent,
              }}
            >
              {player.displayName.charAt(0).toUpperCase()}
            </div>

            <div className="animate-fade-rise-d1 flex-1">
              <div
                className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                {player.role}
              </div>
              <h1
                className="font-display font-bold text-3xl sm:text-5xl tracking-wider glow-pulse-gold"
                style={{ color: "var(--color-rpg-gold-light)" }}
              >
                {player.displayName}
              </h1>
              <p
                className="font-mono text-xs mt-1"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                Ativo desde {player.activeSince} · {player.stats.totalCharacters} personagens
              </p>
            </div>

            {/* Primary CTA */}
            <div className="animate-fade-rise-d2 flex-shrink-0">
              <CreateSheetModal
                playerId={player.id}
                playerName={player.displayName}
                trigger={
                  <button
                    className="shimmer-btn font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3 border transition-all"
                    style={{
                      borderColor: accent,
                      color: accent,
                      background: "rgba(184,115,51,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    + Nova Ficha de RPG
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </header>

      {/* Tags bar */}
      {player.tags.length > 0 && (
        <div
          className="border-b px-6 py-3 flex flex-wrap gap-2 max-w-5xl mx-auto"
          style={{ borderColor: border, background: bg }}
        >
          {player.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border"
              style={{
                borderColor: border,
                color: "var(--color-rpg-text-muted)",
                background: "rgba(184,115,51,0.04)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Bio */}
        {player.bio && (
          <section>
            <h2 className="section-title" style={{ color: accent, borderColor: border }}>
              Sobre o Jogador
            </h2>
            <div
              className="p-6 border"
              style={{
                background: bg,
                borderColor: border,
                borderTopWidth: "2px",
                borderTopColor: accent,
              }}
            >
              <p className="text-base leading-relaxed" style={{ color: "var(--color-rpg-text-muted)" }}>
                {player.bio}
              </p>
            </div>
          </section>
        )}

        {/* System selection */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title" style={{ color: accent, borderColor: border, borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
              Sistemas
            </h2>
            <CreateSheetModal
              playerId={player.id}
              playerName={player.displayName}
              trigger={
                <button
                  className="font-mono text-[10px] uppercase tracking-widest border px-3 py-1.5 transition-all hover:opacity-80"
                  style={{
                    borderColor: border,
                    color: "var(--color-rpg-text-muted)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  + Nova Ficha
                </button>
              }
            />
          </div>

          {systems.length === 0 ? (
            <div
              className="border p-10 text-center"
              style={{ borderColor: border, background: bg }}
            >
              <span className="font-display text-4xl block mb-3 opacity-15">✦</span>
              <p className="font-mono text-sm mb-4" style={{ color: "var(--color-rpg-text-muted)" }}>
                Nenhuma ficha criada ainda.
              </p>
              <CreateSheetModal
                playerId={player.id}
                playerName={player.displayName}
                trigger={
                  <button
                    className="shimmer-btn font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 border transition-all"
                    style={{
                      borderColor: accent,
                      color: accent,
                      background: "rgba(184,115,51,0.07)",
                      cursor: "pointer",
                    }}
                  >
                    + Criar primeira ficha
                  </button>
                }
              />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {systems.map((system, i) => {
                const meta = getSystem(system);
                return (
                  <div
                    key={system}
                    className="card-enter"
                    style={{ "--card-i": i } as React.CSSProperties}
                  >
                    <SystemSelectionCard
                      href={`/jogadores/${slug}/${system}`}
                      systemId={system}
                      label={meta.label}
                      description={meta.description}
                      count={bySystem[system]}
                      accent={meta.accent}
                      bg={bg}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Stats */}
        <section>
          <h2 className="section-title" style={{ color: accent, borderColor: border }}>
            Estatísticas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox
              label="Total de Personagens"
              value={player.stats.totalCharacters}
              accent={accent}
              border={border}
              bg={bg}
              highlight
            />
            <StatBox
              label="Sistema Principal"
              value={
                player.stats.primarySystem
                  ? getSystem(player.stats.primarySystem).label.toUpperCase()
                  : "—"
              }
              accent={accent}
              border={border}
              bg={bg}
              highlight
            />
            <StatBox
              label="Ativo Desde"
              value={player.activeSince}
              accent={accent}
              border={border}
              bg={bg}
            />
            <StatBox
              label="Ingressou"
              value={player.joinedAt}
              accent={accent}
              border={border}
              bg={bg}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function StatBox({
  label,
  value,
  highlight,
  accent,
  border,
  bg,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  accent: string;
  border: string;
  bg: string;
}) {
  return (
    <div
      className="text-center p-4 border"
      style={{
        background: highlight ? `${accent}08` : bg,
        borderColor: highlight ? accent : border,
      }}
    >
      <span
        className="font-mono text-[9px] uppercase tracking-widest block mb-1"
        style={{ color: "var(--color-rpg-text-muted)" }}
      >
        {label}
      </span>
      <span
        className="font-display font-bold text-lg block"
        style={{ color: highlight ? "var(--color-rpg-gold-light)" : "var(--color-rpg-text)" }}
      >
        {value}
      </span>
    </div>
  );
}
