import { getAllCharacters, getSystemList } from "@/lib/characters";
import { getAllPlayers } from "@/lib/players";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";
import HomeHero from "@/components/home/HomeHero";
import OrnamentLine from "@/components/ui/OrnamentLine";
import SystemCard from "@/components/home/SystemCard";
import PlayerCard from "@/components/players/PlayerCard";

const SYSTEM_ACCENT: Record<string, string> = {
  dnd:        "#8b0000",
  daggerheart:"#c24d2c",
  vampiro:    "#6e0010",
  candela:    "#c9892e",
  sacramento: "#4a7fa8",
  avatar:     "#7aa87a",
};

const SYSTEM_GLOW: Record<string, string> = {
  dnd:        "rgba(139,0,0,0.35)",
  daggerheart:"rgba(194,77,44,0.35)",
  vampiro:    "rgba(110,0,16,0.45)",
  candela:    "rgba(201,137,46,0.38)",
  sacramento: "rgba(74,127,168,0.35)",
  avatar:     "rgba(122,168,122,0.32)",
};

export default function Home() {
  const characters = getAllCharacters();
  const systems = getSystemList();
  const players = getAllPlayers();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <HomeHero characterCount={characters.length} />

      {/* Players Section — primary entry point for browsing sheets */}
      {players.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="section-title-ornate text-center justify-center">
            Jogadores
          </h2>
          <p
            className="font-mono text-[11px] tracking-widest uppercase text-center mt-2 mb-8"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            Selecione um jogador para ver suas fichas
          </p>

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
        </section>
      )}

      {/* Systems Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-2">
          <OrnamentLine color="var(--color-rpg-bronze)" opacity={0.25} width={300} />
        </div>
        <h2 className="section-title-ornate text-center justify-center">
          Sistemas Disponíveis
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {systems.map((sys, i) => {
            const count = characters.filter((c) => c.system === sys).length;
            return (
              <SystemCard
                key={sys}
                system={sys}
                label={SYSTEM_LABELS[sys] || sys}
                icon={SYSTEM_ICONS[sys] || "⚙"}
                count={count}
                accent={SYSTEM_ACCENT[sys] || "#b87333"}
                glow={SYSTEM_GLOW[sys] || "rgba(184,115,51,0.3)"}
                index={i}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
