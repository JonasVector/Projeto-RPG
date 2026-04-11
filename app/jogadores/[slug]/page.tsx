import { getPlayer, getAllPlayers } from "@/lib/players";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";

export async function generateStaticParams() {
  const players = getAllPlayers();
  return players.map((p) => ({ slug: p.id }));
}

const SYSTEM_ACCENT: Record<string, string> = {
  dnd:        "#8b0000",
  daggerheart:"#c24d2c",
  vampiro:    "#6e0010",
  candela:    "#c9892e",
  sacramento: "#4a7fa8",
  avatar:     "#7aa87a",
};

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = getPlayer(slug);
  if (!player) notFound();

  // Group characters by system
  const bySystem: Record<string, typeof player.characters> = {};
  for (const ch of player.characters) {
    if (!bySystem[ch.system]) bySystem[ch.system] = [];
    bySystem[ch.system].push(ch);
  }

  const accent = "#b87333";
  const border = "rgba(184,115,51,0.25)";
  const bg = "#15120d";

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="relative overflow-hidden"
        style={{
          minHeight: "40vh",
          background: "linear-gradient(165deg, #050305 0%, #100a08 50%, #050305 100%)",
          borderBottom: `2px solid ${accent}`,
        }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 60px, rgba(184,115,51,0.015) 60px, rgba(184,115,51,0.015) 61px)`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-14 max-w-4xl mx-auto">
          <Link
            href="/jogadores"
            className="font-mono text-[10px] tracking-widest uppercase mb-6 inline-block transition-colors hover:opacity-80"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            ← Jogadores
          </Link>

          <OrnamentLine color={accent} opacity={0.45} width={160} />

          <div className="flex items-end gap-8 mt-3">
            {/* Avatar sigil */}
            <div
              className="flex-shrink-0 w-20 h-20 rounded border-2 flex items-center justify-center font-display text-4xl font-bold animate-fade-rise"
              style={{
                background: `rgba(184,115,51,0.06)`,
                borderColor: accent,
                color: accent,
              }}
            >
              {player.displayName.charAt(0).toUpperCase()}
            </div>

            <div className="animate-fade-rise-d1">
              <div
                className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                {player.role}
              </div>
              <h1
                className="font-display font-bold text-5xl tracking-wider glow-pulse-gold"
                style={{ color: "var(--color-rpg-gold-light)" }}
              >
                {player.displayName}
              </h1>
              <p
                className="font-mono text-xs mt-1"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                Ativo desde {player.activeSince} &bull; {player.stats.totalCharacters} personagens
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Meta bar */}
      <div
        className="border-b px-6 py-3 flex flex-wrap gap-6 font-mono text-xs max-w-4xl mx-auto"
        style={{ borderColor: border, background: bg }}
      >
        {player.tags.map((tag) => (
          <span
            key={tag}
            className="uppercase tracking-widest px-3 py-1 border"
            style={{
              borderColor: border,
              color: "var(--color-rpg-text-muted)",
              background: "rgba(184,115,51,0.05)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">

        {/* Bio */}
        {player.bio && (
          <section>
            <h2
              className="section-title"
              style={{ color: accent, borderColor: border }}
            >
              Sobre o Jogador
            </h2>
            <div
              className="rounded p-6 border"
              style={{
                background: bg,
                borderColor: border,
                borderTopWidth: "3px",
                borderTopColor: accent,
              }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                {player.bio}
              </p>
            </div>
          </section>
        )}

        {/* Stats */}
        <section>
          <h2 className="section-title" style={{ color: accent, borderColor: border }}>
            Estatísticas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox label="Total de Personagens" value={player.stats.totalCharacters} accent={accent} border={border} bg={bg} highlight />
            <StatBox label="Sistema Principal" value={(SYSTEM_LABELS[player.stats.primarySystem] || player.stats.primarySystem).toUpperCase()} accent={accent} border={border} bg={bg} highlight />
            <StatBox label="Ativo Desde" value={player.activeSince} accent={accent} border={border} bg={bg} />
            <StatBox label="Ingressou" value={player.joinedAt} accent={accent} border={border} bg={bg} />
          </div>
        </section>

        {/* Characters by system */}
        {Object.entries(bySystem).map(([system, characters]) => {
          const sysAccent = SYSTEM_ACCENT[system] || accent;
          const sysLabel = SYSTEM_LABELS[system] || system;
          const sysIcon = SYSTEM_ICONS[system] || "⊛";

          return (
            <section key={system}>
              <h2
                className="section-title"
                style={{ color: sysAccent, borderColor: `${sysAccent}40` }}
              >
                <span className="font-mono">{sysIcon}</span>
                {sysLabel}
                <span
                  className="font-mono text-xs ml-auto opacity-60"
                  style={{ color: "var(--color-rpg-text-muted)" }}
                >
                  {characters.length} personagem{characters.length !== 1 ? "s" : ""}
                </span>
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {characters.map((ch) => (
                  <Link
                    key={ch.slug}
                    href={`/sistemas-de-rpg/${ch.system}/personagens/${ch.slug}`}
                    className="block group"
                  >
                    <div
                      className="border rounded p-4 transition-all duration-200 flex items-center gap-4 group-hover:translate-y-[-1px]"
                      style={{
                        background: bg,
                        borderColor: `${sysAccent}35`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = sysAccent;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 16px ${sysAccent}20`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${sysAccent}35`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      {/* System icon */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded border flex items-center justify-center font-display font-bold"
                        style={{
                          background: `${sysAccent}10`,
                          borderColor: `${sysAccent}40`,
                          color: sysAccent,
                        }}
                      >
                        {sysIcon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className="font-display font-semibold text-sm tracking-wide truncate"
                          style={{ color: "var(--color-rpg-text)" }}
                        >
                          {ch.label}
                        </div>
                        <div
                          className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 mt-0.5"
                          style={{ color: "var(--color-rpg-text-muted)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{
                              background: ch.status === "active" ? sysAccent : "var(--color-rpg-text-muted)",
                            }}
                          />
                          {ch.status === "active" ? "Ativo" : ch.status === "retired" ? "Aposentado" : "NPC"}
                        </div>
                      </div>

                      <span
                        className="font-mono text-xs opacity-40 group-hover:opacity-80 transition-opacity"
                        style={{ color: sysAccent }}
                      >
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
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
      className="text-center p-4 rounded border"
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
