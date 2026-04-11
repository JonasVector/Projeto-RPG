import { getSystemList, getAllCharacters } from "@/lib/characters";
import SistemasHero from "@/components/sistemas/SistemasHero";
import SistemaCard from "@/components/sistemas/SistemaCard";

const SYSTEM_ACCENT: Record<string, string> = {
  dnd:        "#8b0000",
  daggerheart:"#c24d2c",
  vampiro:    "#6e0010",
  candela:    "#c9892e",
  sacramento: "#4a7fa8",
  avatar:     "#7aa87a",
};

const SYSTEM_GLOW: Record<string, string> = {
  dnd:        "rgba(139,0,0,0.4)",
  daggerheart:"rgba(194,77,44,0.4)",
  vampiro:    "rgba(110,0,16,0.5)",
  candela:    "rgba(201,137,46,0.4)",
  sacramento: "rgba(74,127,168,0.4)",
  avatar:     "rgba(122,168,122,0.38)",
};

const SYSTEM_DESC: Record<string, string> = {
  dnd:        "Masmorra & Dragões • Alta Fantasia Medieval",
  daggerheart:"Fantasia Narrativa • Hope & Fear",
  vampiro:    "Horror Gótico • Mundo das Trevas",
  candela:    "Horror Investigativo • Era Vitoriana",
  sacramento: "Investigação e Intriga • Sistema Único",
  avatar:     "As Quatro Nações • Dobramento de Elementos",
};

export default function SistemasDeRPG() {
  const systems = getSystemList();
  const characters = getAllCharacters();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <SistemasHero />

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((sys, i) => {
            const count = characters.filter((c) => c.system === sys).length;
            const accent = SYSTEM_ACCENT[sys] || "#b87333";
            const glow = SYSTEM_GLOW[sys] || "rgba(184,115,51,0.3)";
            const desc = SYSTEM_DESC[sys] || "";

            return (
              <SistemaCard
                key={sys}
                sys={sys}
                count={count}
                accent={accent}
                glow={glow}
                desc={desc}
                index={i}
              />
            );
          })}
        </div>

        {systems.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            <span className="font-display text-4xl block mb-4 opacity-20">⊛</span>
            <p className="text-lg">Nenhum sistema configurado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
