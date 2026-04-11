import { getAllPlayers } from "@/lib/players";
import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";

export default function JogadoresPage() {
  const players = getAllPlayers();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <header className="hero-bg relative overflow-hidden" style={{ minHeight: "32vh" }}>
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-14 max-w-4xl mx-auto">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-widest uppercase mb-6 inline-block transition-colors"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            ← Início
          </Link>
          <OrnamentLine color="var(--color-rpg-bronze)" opacity={0.4} width={160} />
          <h1
            className="font-display font-bold text-4xl md:text-5xl tracking-wider mt-2 glow-pulse-gold"
            style={{ color: "var(--color-rpg-gold-light)" }}
          >
            Jogadores
          </h1>
          <p className="font-mono text-xs mt-2" style={{ color: "var(--color-rpg-text-muted)" }}>
            {players.length} jogador{players.length !== 1 ? "es" : ""} registrado{players.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      {/* Players Grid */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {players.length === 0 ? (
          <div
            className="text-center py-16 border"
            style={{
              borderColor: "var(--color-rpg-border)",
              background: "var(--color-rpg-surface-raised)",
            }}
          >
            <span className="font-display text-4xl block mb-4 opacity-20">✦</span>
            <p style={{ color: "var(--color-rpg-text-muted)" }}>
              Nenhum jogador cadastrado ainda.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {players.map((player, i) => (
              <div
                key={player.id}
                className="card-enter"
                style={{ "--card-i": i } as React.CSSProperties}
              >
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function PlayerCard({ player }: { player: ReturnType<typeof getAllPlayers>[number] }) {
  const accent = "var(--color-rpg-bronze)";
  const border = "var(--color-rpg-border)";
  const bg = "var(--color-rpg-surface-raised)";

  return (
    <Link href={`/jogadores/${player.id}`} className="block group">
      <div
        className="border rounded p-6 transition-all duration-200 group-hover:translate-y-[-2px]"
        style={{
          background: bg,
          borderColor: border,
          boxShadow: `0 0 0 1px transparent`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = accent;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px rgba(184,115,51,0.15)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = border;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px transparent`;
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div
              className="font-mono text-[10px] tracking-widest uppercase mb-1"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {player.role}
            </div>
            <h2
              className="font-display text-2xl font-bold tracking-wider"
              style={{ color: "var(--color-rpg-gold-light)" }}
            >
              {player.displayName}
            </h2>
          </div>
          <div
            className="flex-shrink-0 w-12 h-12 rounded border flex items-center justify-center font-display text-xl font-bold"
            style={{
              background: `rgba(184,115,51,0.08)`,
              borderColor: accent,
              color: accent,
            }}
          >
            {player.displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Bio */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--color-rpg-text-muted)" }}
        >
          {player.bio}
        </p>

        {/* Stats strip */}
        <div
          className="grid grid-cols-3 gap-3 pt-4 border-t"
          style={{ borderColor: border }}
        >
          <div className="text-center">
            <span
              className="font-display font-bold text-xl block"
              style={{ color: accent }}
            >
              {player.stats.totalCharacters}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest block"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Personagens
            </span>
          </div>
          <div className="text-center">
            <span
              className="font-display font-bold text-xl block uppercase"
              style={{ color: accent }}
            >
              {player.stats.primarySystem}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest block"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Sistema Principal
            </span>
          </div>
          <div className="text-center">
            <span
              className="font-display font-bold text-xl block"
              style={{ color: accent }}
            >
              {player.activeSince}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest block"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Desde
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
