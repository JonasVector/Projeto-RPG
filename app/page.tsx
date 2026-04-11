import { getAllCharacters, getSystemList } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";
import HomeHero from "@/components/home/HomeHero";
import OrnamentLine from "@/components/ui/OrnamentLine";
import SystemCard from "@/components/home/SystemCard";

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

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <HomeHero characterCount={characters.length} />

      {/* Systems Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="section-title-ornate text-center justify-center">
          Sistemas Disponíveis
        </h2>

        <div className="grid sm:grid-cols-3 gap-5 mt-8">
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

      {/* Characters Section */}
      {characters.length > 0 && (
        <section id="personagens" className="max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-2">
            <OrnamentLine color="var(--color-rpg-bronze)" opacity={0.25} width={300} />
          </div>
          <h2 className="section-title-ornate justify-center">
            Personagens
            <span
              className="font-mono text-xs normal-case tracking-wider"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {characters.length} encontrado{characters.length !== 1 ? "s" : ""}
            </span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {characters.map((ch, i) => (
              <div
                key={ch.system + "-" + ch.id}
                className="card-enter"
                style={{ "--card-i": i } as React.CSSProperties}
              >
                <CharacterCard character={ch} />
              </div>
            ))}
          </div>
        </section>
      )}

      {characters.length === 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div
            className="text-center py-16 border"
            style={{
              borderColor: "var(--color-rpg-border)",
              background: "var(--color-rpg-surface-raised)",
            }}
          >
            <span className="font-display text-4xl block mb-4 opacity-20">✦</span>
            <p className="text-lg" style={{ color: "var(--color-rpg-text-muted)" }}>
              Nenhum personagem criado ainda.
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-rpg-text-muted)", opacity: 0.5 }}
            >
              Adicione arquivos JSON em{" "}
              <code style={{ color: "var(--color-rpg-bronze)" }}>
                content/sistemas-de-rpg/
              </code>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
