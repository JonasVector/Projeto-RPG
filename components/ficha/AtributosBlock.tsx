interface Attribute {
  valor: number;
  mod: number;
}

interface AtributosBlockProps {
  atributos: Record<string, Attribute>;
  accent?: string;
  border?: string;
}

const attrNames: Record<string, string> = {
  forca: "Força",
  destreza: "Destreza",
  constituicao: "Constituição",
  inteligencia: "Inteligência",
  sabedoria: "Sabedoria",
  carisma: "Carisma",
};

export default function AtributosBlock({ atributos, accent, border }: AtributosBlockProps) {
  const entries = Object.entries(atributos);

  // Find peak stat
  let peakKey = "";
  let peakVal = -999;
  for (const [key, attr] of entries) {
    if (attr.valor > peakVal) {
      peakVal = attr.valor;
      peakKey = key;
    }
  }

  const accentColor = accent || "var(--color-rpg-bronze)";
  const borderColor = border || "var(--color-rpg-border)";

  return (
    <section>
      <h2 className="section-title" style={{ color: accentColor, borderColor }}>Atributos</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {entries.map(([key, attr]) => {
          const isPeak = key === peakKey;
          return (
            <div
              key={key}
              className="text-center p-3 pb-2 relative border transition-colors duration-200 hover:border-[var(--color-theme-brand-mid)]"
              style={{
                background: isPeak
                  ? "linear-gradient(135deg, var(--color-theme-card, var(--color-rpg-surface-raised)) 0%, rgba(139,0,0,0.12) 100%)"
                  : "var(--color-rpg-surface-raised)",
                borderColor: isPeak ? accentColor : borderColor,
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `${accentColor}60` }} />
              <span className="font-mono text-xs uppercase tracking-widest block text-xs" style={{ color: isPeak ? "var(--color-theme-bone-dim, var(--color-rpg-text-muted))" : "var(--color-rpg-text-muted)" }}>
                {attrNames[key] || key}
              </span>
              <span
                className="font-display font-extrabold text-2xl block my-1"
                style={{
                  color: isPeak ? "var(--color-theme-brand-bright, var(--color-rpg-gold-light))" : "var(--color-rpg-text)",
                  textShadow: isPeak ? "0 0 14px rgba(214,48,49,0.3)" : isPeak ? "0 0 14px rgba(201,162,39,0.4)" : "none",
                }}
              >
                {attr.valor}
              </span>
              <span className="font-mono text-sm font-bold block" style={{ color: "var(--color-theme-brand-bright, var(--color-rpg-bronze))" }}>
                {attr.mod >= 0 ? `+${attr.mod}` : attr.mod}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
