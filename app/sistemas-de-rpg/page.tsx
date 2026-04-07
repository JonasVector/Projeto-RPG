import { getSystemList, getAllCharacters } from "@/lib/characters";
import Link from "next/link";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";

export default function SistemasDeRPG() {
  const systems = getSystemList();
  const characters = getAllCharacters();

  return (
    <div className="min-h-screen relative" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: "var(--color-rpg-border)" }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-6" style={{ color: "var(--color-rpg-bronze)", opacity: 0.6 }}>
            Multiverso de RPG
          </span>
          <h1
            className="font-display font-extrabold text-4xl md:text-5xl tracking-wider"
            style={{
              color: "var(--color-rpg-gold-light)",
              textShadow: "0 0 50px rgba(201,162,39,0.3)",
            }}
          >
            Sistemas de RPG
          </h1>
          <p className="text-lg mt-3" style={{ color: "var(--color-rpg-text-muted)" }}>
            Selecione um sistema para ver seus personagens
          </p>
        </div>
      </section>

      {/* Systems list */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-4">
          {systems.map((sys) => {
            const count = characters.filter((c) => c.system === sys).length;
            return (
              <Link
                key={sys}
                href={`/sistemas-de-rpg/${sys}`}
                className="group block border p-6 transition-all duration-300"
                style={{
                  background: "var(--color-rpg-surface-raised)",
                  borderColor: "var(--color-rpg-border)",
                  borderLeft: "3px solid var(--color-rpg-bronze)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">{SYSTEM_ICONS[sys] || "⚙"}</span>
                  <div>
                    <h2
                      className="font-display font-semibold text-xl transition-colors group-hover:text-[var(--color-rpg-gold)]"
                      style={{ color: "var(--color-rpg-gold-light)" }}
                    >
                      {SYSTEM_LABELS[sys] || sys}
                    </h2>
                    <p className="font-mono text-xs mt-1 tracking-wider uppercase" style={{ color: "var(--color-rpg-text-muted)" }}>
                      {count} personagem{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {systems.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--color-rpg-text-muted)" }}>
            <span className="text-4xl block mb-4 opacity-30">📜</span>
            <p className="text-lg">Nenhum sistema configurado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
