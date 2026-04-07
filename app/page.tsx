import { getAllCharacters, getSystemList } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import Link from "next/link";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";

export default function Home() {
  const characters = getAllCharacters();
  const systems = getSystemList();

  return (
    <div className="min-h-screen relative" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--color-rpg-border)" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(139,0,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(184,115,51,0.06) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] block mb-6"
            style={{ color: "var(--color-rpg-bronze)", opacity: 0.6 }}
          >
            Central de Fichas &middot; Local &middot; Multi-Sistema
          </span>
          <h1
            className="font-display font-extrabold text-4xl md:text-6xl tracking-wide leading-tight"
            style={{
              color: "var(--color-rpg-gold-light)",
              textShadow: "0 0 60px rgba(201,162,39,0.3)",
            }}
          >
            FORGE RPG
          </h1>
          <p className="font-body italic text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--color-rpg-text-muted)" }}>
            Gerencie fichas de personagens de múltiplos sistemas de RPG em um único lugar.
            Visualize, edite e organize suas aventuras localmente.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sistemas-de-rpg"
              className="font-mono text-xs uppercase tracking-[0.2em] px-8 py-3 border transition-colors hover:bg-[rgba(184,115,51,0.3)]"
              style={{
                background: "rgba(184,115,51,0.2)",
                borderColor: "var(--color-rpg-bronze)",
                color: "var(--color-rpg-bronze)",
              }}
            >
              Ver Sistemas
            </Link>
            {characters.length > 0 && (
              <a
                href="#personagens"
                className="font-mono text-xs uppercase tracking-[0.2em] px-8 py-3 border transition-colors"
                style={{
                  borderColor: "var(--color-rpg-border)",
                  color: "var(--color-rpg-text-muted)",
                }}
              >
                Ver Personagens ({characters.length})
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Systems Quick Links */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="section-title">Sistemas Disponíveis</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {systems.map((sys) => {
            const count = characters.filter((c) => c.system === sys).length;
            return <SystemCard key={sys} system={sys} label={SYSTEM_LABELS[sys] || sys} icon={SYSTEM_ICONS[sys] || "⚙"} count={count} />;
          })}
        </div>
      </section>

      {/* Characters */}
      {characters.length > 0 && (
        <section id="personagens" className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="section-title">
            Personagens
            <span className="ml-2 font-mono text-xs normal-case tracking-wider" style={{ color: "var(--color-rpg-text-muted)" }}>
              {characters.length} encontrado{characters.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {characters.map((ch) => (
              <CharacterCard key={ch.system + "-" + ch.id} character={ch} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {characters.length === 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="text-center py-16 border" style={{ borderColor: "var(--color-rpg-border)", background: "var(--color-rpg-surface-raised)" }}>
            <span className="text-4xl block mb-4 opacity-30">📜</span>
            <p className="text-lg" style={{ color: "var(--color-rpg-text-muted)" }}>Nenhum personagem criado ainda.</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-rpg-text-muted)", opacity: 0.5 }}>
              Adicione arquivos JSON em <code style={{ color: "var(--color-rpg-bronze)" }}>content/sistemas-de-rpg/</code>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

function SystemCard({ system, label, icon, count }: { system: string; label: string; icon: string; count: number }) {
  return (
    <Link
      href={`/sistemas-de-rpg/${system}`}
      className="group block border p-5 transition-all duration-200"
      style={{
        background: "var(--color-rpg-surface-raised)",
        borderColor: "var(--color-rpg-border)",
      }}
    >
      <span className="text-2xl block mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
      <h3
        className="font-display font-semibold text-lg transition-colors"
        style={{ color: "var(--color-rpg-gold-light)" }}
      >
        {label}
      </h3>
      <span className="font-mono text-xs block mt-3" style={{ color: "var(--color-rpg-bronze)" }}>
        {count > 0 ? `${count} personagem${count !== 1 ? "s" : ""}` : "Nenhum personagem"}
      </span>
    </Link>
  );
}
