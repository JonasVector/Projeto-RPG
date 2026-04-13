import { getSystemList, getAllCharacters } from "@/lib/characters";
import { getSystem } from "@/lib/systems";
import SistemaCard from "@/components/sistemas/SistemaCard";
import OrnamentLine from "@/components/ui/OrnamentLine";

export default function SistemasDeRPG() {
  const systemIds = getSystemList();
  const characters = getAllCharacters();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <header
        className="hero-bg relative overflow-hidden border-b"
        style={{ minHeight: "30vh", borderColor: "rgba(184,115,51,0.18)" }}
      >
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-14 max-w-5xl mx-auto">
          <OrnamentLine color="var(--color-rpg-bronze)" opacity={0.4} width={160} />
          <h1
            className="font-display font-bold text-4xl md:text-5xl tracking-wider mt-2 glow-pulse-gold"
            style={{ color: "var(--color-rpg-gold-light)" }}
          >
            Sistemas de RPG
          </h1>
          <p className="font-mono text-xs mt-2" style={{ color: "var(--color-rpg-text-muted)" }}>
            {systemIds.length} sistema{systemIds.length !== 1 ? "s" : ""} · {characters.length} fichas no total
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {systemIds.length === 0 ? (
          <div
            className="text-center py-20 border"
            style={{
              borderColor: "var(--color-rpg-border)",
              color: "var(--color-rpg-text-muted)",
            }}
          >
            <span className="font-display text-4xl block mb-4 opacity-20">⊛</span>
            <p className="font-mono text-sm">Nenhum sistema configurado ainda.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {systemIds.map((sys, i) => {
              const meta = getSystem(sys);
              const count = characters.filter((c) => c.system === sys).length;
              return (
                <SistemaCard
                  key={sys}
                  sys={sys}
                  count={count}
                  accent={meta.accent}
                  glow={meta.glow}
                  desc={meta.genre}
                  index={i}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
