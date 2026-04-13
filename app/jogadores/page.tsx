import { getAllPlayers } from "@/lib/players";
import PlayerCard from "@/components/players/PlayerCard";
import OrnamentLine from "@/components/ui/OrnamentLine";
import CreatePlayerModal from "@/components/players/CreatePlayerModal";

export default function JogadoresPage() {
  const players = getAllPlayers();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <header
        className="hero-bg relative overflow-hidden border-b"
        style={{ minHeight: "30vh", borderColor: "rgba(184,115,51,0.18)" }}
      >
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-14 max-w-5xl mx-auto">
          <OrnamentLine color="var(--color-rpg-bronze)" opacity={0.4} width={160} />
          <div className="flex items-end justify-between gap-4 mt-2">
            <div>
              <h1
                className="font-display font-bold text-4xl md:text-5xl tracking-wider glow-pulse-gold"
                style={{ color: "var(--color-rpg-gold-light)" }}
              >
                Jogadores
              </h1>
              <p className="font-mono text-xs mt-2" style={{ color: "var(--color-rpg-text-muted)" }}>
                {players.length} jogador{players.length !== 1 ? "es" : ""} registrado{players.length !== 1 ? "s" : ""}
              </p>
            </div>
            {/* Create Player — floated to header top-right */}
            <CreatePlayerModal
              trigger={
                <button
                  className="shimmer-btn font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 border transition-all flex-shrink-0"
                  style={{
                    borderColor: "var(--color-rpg-bronze)",
                    color: "var(--color-rpg-bronze)",
                    background: "rgba(184,115,51,0.07)",
                    cursor: "pointer",
                  }}
                >
                  + Novo Jogador
                </button>
              }
            />
          </div>
        </div>
      </header>

      {/* Players Grid */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {players.length === 0 ? (
          <div
            className="text-center py-20 border"
            style={{
              borderColor: "var(--color-rpg-border)",
              background: "var(--color-rpg-surface-raised)",
            }}
          >
            <span className="font-display text-5xl block mb-4 opacity-15">✦</span>
            <p className="font-mono text-sm" style={{ color: "var(--color-rpg-text-muted)" }}>
              Nenhum jogador cadastrado ainda.
            </p>
            <div className="mt-6">
              <CreatePlayerModal
                trigger={
                  <button
                    className="shimmer-btn font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 border transition-all"
                    style={{
                      borderColor: "var(--color-rpg-bronze)",
                      color: "var(--color-rpg-bronze)",
                      background: "rgba(184,115,51,0.07)",
                      cursor: "pointer",
                    }}
                  >
                    + Criar primeiro jogador
                  </button>
                }
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
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
