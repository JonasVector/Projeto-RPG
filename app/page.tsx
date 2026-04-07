import { getAllCharacters } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import Link from "next/link";

export default function Home() {
  const characters = getAllCharacters();

  return (
    <div className="min-h-screen bg-rpg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rpg-border">
        <div className="absolute inset-0 bg-gradient-to-br from-rpg-bg via-rpg-surface-raised to-rpg-bg" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rpg-bronze/60 block mb-6">
            Central de Fichas &middot; Local &middot; Multi-Sistema
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-rpg-gold-light tracking-wide leading-tight"
              style={{ textShadow: "0 0 60px rgba(201,162,39,0.3)" }}>
            FORGE RPG
          </h1>
          <p className="font-body text-rpg-text-muted text-lg mt-4 max-w-xl mx-auto leading-relaxed italic">
            Gerencie fichas de personagens de múltiplos sistemas de RPG em um único lugar.
            Visualize, edite e organize suas aventuras localmente.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sistemas-de-rpg"
              className="font-mono text-sm uppercase tracking-widest px-8 py-3 bg-rpg-bronze/20 border border-rpg-bronze text-rpg-bronze hover:bg-rpg-bronze/30 transition-colors rounded"
            >
              Ver Sistemas
            </Link>
            {characters.length > 0 && (
              <a
                href="#personagens"
                className="font-mono text-sm uppercase tracking-widest px-8 py-3 border border-rpg-border text-rpg-text-muted hover:border-rpg-bronze/50 hover:text-rpg-bronze transition-colors rounded"
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
          <SystemCard system="dnd" label="D&D 5e" desc="Dungeons & Dragons 5e" count={characters.filter(c => c.system === "dnd").length} />
          <SystemCard system="vampiro" label="Vampiro" desc="Vampiro: A Máscara" count={characters.filter(c => c.system === "vampiro").length} />
          <SystemCard system="daggerheart" label="Daggerheart" desc="Daggerheart RPG" count={characters.filter(c => c.system === "daggerheart").length} />
        </div>
      </section>

      {/* Characters */}
      <section id="personagens" className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="section-title">
          Personagens
          <span className="ml-2 font-mono text-xs text-rpg-text-muted normal-case tracking-wider">
            {characters.length} encontrado{characters.length !== 1 ? "s" : ""}
          </span>
        </h2>
        {characters.length === 0 ? (
          <div className="text-center py-16 bg-rpg-surface-raised border border-rpg-border rounded-lg">
            <span className="text-4xl block mb-4 opacity-30">📜</span>
            <p className="text-rpg-text-muted text-lg">Nenhum personagem criado ainda.</p>
            <p className="text-rpg-text-muted/50 text-sm mt-1">Adicione arquivos JSON em <code className="text-rpg-bronze">content/sistemas-de-rpg/</code></p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {characters.map((ch) => (
              <CharacterCard key={ch.system + "-" + ch.id} character={ch} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SystemCard({ system, label, desc, count }: { system: string; label: string; desc: string; count: number }) {
  return (
    <Link
      href={`/sistemas-de-rpg/${system}`}
      className="block bg-rpg-surface-raised border border-rpg-border rounded-lg p-5 hover:border-rpg-bronze/50 transition-all duration-200 group"
    >
      <h3 className="font-display font-semibold text-lg text-rpg-gold-light group-hover:text-rpg-gold transition-colors">
        {label}
      </h3>
      <p className="font-body text-sm text-rpg-text-muted mt-1">{desc}</p>
      <span className="font-mono text-xs text-rpg-bronze mt-3 block">
        {count > 0 ? `${count} personagem${count !== 1 ? "s" : ""}` : "Nenhum personagem"}
      </span>
    </Link>
  );
}
