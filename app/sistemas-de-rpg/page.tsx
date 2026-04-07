import { getAllCharacters, getSystemList } from "@/lib/characters";
import Link from "next/link";

const SYSTEM_LABELS: Record<string, string> = {
  dnd: "D&D 5e",
  vampiro: "Vampiro: A Máscara",
  daggerheart: "Daggerheart",
};

export default function SistemasDeRPG() {
  const systems = getSystemList();

  return (
    <div className="min-h-screen bg-rpg-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display font-bold text-3xl text-rpg-gold-light tracking-wide mb-2">
          Sistemas de RPG
        </h1>
        <p className="font-body text-rpg-text-muted text-lg mb-10">
          Selecione um sistema para ver seus personagens
        </p>

        <div className="grid gap-4">
          {systems.map((sys) => (
            <Link
              key={sys}
              href={`/sistemas-de-rpg/${sys}`}
              className="group block bg-rpg-surface-raised border border-rpg-border rounded-lg p-6 hover:border-rpg-bronze/50 transition-all"
            >
              <h2 className="font-display font-semibold text-xl text-rpg-gold-light group-hover:text-rpg-gold transition-colors">
                {SYSTEM_LABELS[sys] || sys}
              </h2>
              <p className="font-mono text-xs text-rpg-text-muted mt-1 tracking-wider uppercase">
                Ver personagens
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
