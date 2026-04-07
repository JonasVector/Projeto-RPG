interface FichaHeaderProps {
  nome: string;
  titulo?: string;
  raca: string;
  classe: string;
  nivel: number;
  subclasse?: string;
}

export default function FichaHeader({ nome, titulo, raca, classe, nivel, subclasse }: FichaHeaderProps) {
  const tags = [
    `${classe} ${nivel}`,
    subclasse,
    raca,
  ].filter(Boolean);

  return (
    <header className="border-b-2 border-rpg-bronze bg-gradient-to-br from-rpg-bg to-rpg-surface-raised p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-32 h-40 bg-rpg-bg border border-rpg-bronze/40 rounded-lg flex flex-col items-center justify-center">
          <span className="text-6xl opacity-20 text-rpg-gold-light">⚙</span>
          <span className="font-mono text-xs tracking-widest text-rpg-bronze/50 uppercase mt-2">{subclasse || classe}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-mono text-xs tracking-widest text-rpg-bronze uppercase mb-2 opacity-80">
            Ficha de Personagem &middot; D&D 5e
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-rpg-gold-light tracking-wide leading-tight"
              style={{ textShadow: "0 0 50px rgba(201,162,39,0.35)" }}>
            {nome}
          </h1>
          {titulo && (
            <p className="font-body italic text-rpg-copper text-lg mt-1 tracking-wide">
              {titulo}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-xs tracking-widest uppercase px-3 py-1 border border-rpg-border bg-rpg-bronze/10 text-rpg-text-muted rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
