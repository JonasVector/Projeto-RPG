import { getSystemList, getAllCharacters } from "@/lib/characters";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";
import SistemasHero from "@/components/sistemas/SistemasHero";
import SistemaCard from "@/components/sistemas/SistemaCard";

const SYSTEM_ACCENT: Record<string, string> = {
  dnd: "#8b0000",
  daggerheart: "#c24d2c",
  vampiro: "#6e0010",
};

const SYSTEM_GLOW: Record<string, string> = {
  dnd: "rgba(139,0,0,0.4)",
  daggerheart: "rgba(194,77,44,0.4)",
  vampiro: "rgba(110,0,16,0.5)",
};

const SYSTEM_DESC: Record<string, string> = {
  dnd: "Masmorra & Dragões • Alta Fantasia Medieval",
  daggerheart: "Fantasia Narrativa • Hope & Fear",
  vampiro: "Horror Gótico • Mundo das Trevas",
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
            <span className="text-4xl block mb-4 opacity-30">📜</span>
            <p className="text-lg">Nenhum sistema configurado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
