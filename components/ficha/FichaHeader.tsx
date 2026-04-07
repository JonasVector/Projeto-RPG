interface FichaHeaderProps {
  nome: string;
  titulo?: string;
  raca: string;
  classe: string;
  nivel: number;
  subclasse?: string;
  system?: string;
}

export default function FichaHeader({ nome, titulo, raca, classe, nivel, subclasse, system }: FichaHeaderProps) {
  const tags = [
    `${classe} ${nivel}`,
    subclasse,
    raca,
  ].filter(Boolean);

  const isVampiro = system === "vampiro";
  const accentColor = isVampiro
    ? "var(--color-theme-brand-bright, #d63031)"
    : "var(--color-rpg-bronze)";
  const borderColor = isVampiro
    ? "var(--color-theme-border, rgba(139,0,0,0.35))"
    : "var(--color-rpg-border)";
  const bgGradient = isVampiro
    ? "linear-gradient(170deg, #0a0404 0%, #180909 50%, #0a0404 100%)"
    : undefined;

  return (
    <header
      className="border-b-2 p-8 md:p-10"
      style={{
        borderColor: accentColor,
        background: bgGradient || "var(--color-rpg-bg)",
      }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="flex-shrink-0 w-32 h-40 border flex flex-col items-center justify-center"
          style={{ borderColor: `${accentColor}40`, background: isVampiro ? "#0a0404" : "var(--color-rpg-bg)" }}
        >
          <span className="text-6xl opacity-20 block" style={{ color: isVampiro ? accentColor : "var(--color-rpg-gold-light)" }}>
            {isVampiro ? "\u2715" : "\u2699"}
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase mt-2"
            style={{ color: isVampiro ? accentColor : "var(--color-rpg-bronze)/50" }}
          >
            {subclasse || classe}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <span
            className="font-mono text-xs tracking-widest uppercase mb-2"
            style={{ color: accentColor, opacity: 0.8 }}
          >
            Ficha de Personagem {isVampiro ? "\u00B7 Vampiro" : "\u00B7 D&D 5e"}
          </span>
          <h1
            className="font-display font-extrabold text-3xl md:text-4xl tracking-wide leading-tight"
            style={{
              color: "var(--color-rpg-gold-light)",
              textShadow: isVampiro
                ? "0 0 50px rgba(139,0,0,0.5), 0 0 20px rgba(214,48,49,0.3)"
                : "0 0 50px rgba(201,162,39,0.35)",
            }}
          >
            {nome}
          </h1>
          {titulo && (
            <p className="font-body italic text-lg mt-1 tracking-wide" style={{ color: isVampiro ? accentColor : "var(--color-rpg-copper)" }}>
              {titulo}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs tracking-widest uppercase px-3 py-1 border rounded-sm"
                style={{
                  borderColor,
                  background: isVampiro ? "var(--color-theme-glow, rgba(139,0,0,0.12))" : "var(--color-rpg-bronze/10)",
                  color: isVampiro ? "var(--color-theme-text-dim, #6a5e52)" : "var(--color-rpg-text-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
