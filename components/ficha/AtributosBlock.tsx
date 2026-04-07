interface Attribute {
  valor: number;
  mod: number;
}

interface AtributosBlockProps {
  atributos: Record<string, Attribute>;
}

const attrNames: Record<string, string> = {
  forca: "Força",
  destreza: "Destreza",
  constituicao: "Constituição",
  inteligencia: "Inteligência",
  sabedoria: "Sabedoria",
  carisma: "Carisma",
};

export default function AtributosBlock({ atributos }: AtributosBlockProps) {
  const entries = Object.entries(atributos);

  return (
    <section>
      <h2 className="section-title">Atributos</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {entries.map(([key, attr]) => (
          <div
            key={key}
            className="bg-rpg-surface-raised border border-rpg-border text-center p-3 pb-2 relative rounded"
          >
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rpg-bronze/40" />
            <span className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted block text-xs">
              {attrNames[key] || key}
            </span>
            <span className={`font-display font-extrabold text-2xl block my-1 ${key === "inteligencia" ? "text-rpg-gold-light" : "text-rpg-text"}`}
              style={key === "inteligencia" ? { textShadow: "0 0 14px rgba(201,162,39,0.4)" } : undefined}>
              {attr.valor}
            </span>
            <span className="font-mono text-sm text-rpg-bronze block">
              {attr.mod >= 0 ? `+${attr.mod}` : attr.mod}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
