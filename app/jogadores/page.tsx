import { getAllPlayers } from "@/lib/players";
import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";
import PlayerCard from "@/components/players/PlayerCard";

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
