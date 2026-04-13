import { getPlayer, getAllPlayers } from "@/lib/players";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";
import CharacterCard from "@/components/players/CharacterCard";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";

export async function generateStaticParams() {
  const players = getAllPlayers();
  const params: { slug: string; sistema: string }[] = [];
  for (const player of players) {
    const systems = new Set(player.characters.map((c) => c.system));
    for (const sistema of systems) {
      params.push({ slug: player.id, sistema });
    }
  }
  return params;
}

const SYSTEM_ACCENT: Record<string, string> = {
  dnd:        "#8b0000",
  daggerheart:"#c24d2c",
  vampiro:    "#6e0010",
  candela:    "#c9892e",
  sacramento: "#4a7fa8",
  avatar:     "#7aa87a",
};

export default async function PlayerSystemPage({
  params,
}: {
  params: Promise<{ slug: string; sistema: string }>;
}) {
  const { slug, sistema } = await params;
  const player = getPlayer(slug);
  if (!player) notFound();

  const characters = player.characters.filter((c) => c.system === sistema);
  if (characters.length === 0) notFound();

  const sysAccent = SYSTEM_ACCENT[sistema] || "#b87333";
  const sysLabel = SYSTEM_LABELS[sistema] || sistema;
  const sysIcon = SYSTEM_ICONS[sistema] || "⊛";
  const border = `${sysAccent}35`;
  const bg = "#15120d";

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="relative overflow-hidden"
        style={{
          minHeight: "32vh",
          background: "linear-gradient(165deg, #050305 0%, #100a08 50%, #050305 100%)",
          borderBottom: `2px solid ${sysAccent}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 60px, ${sysAccent}18 60px, ${sysAccent}18 61px)`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-14 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div
            className="font-mono text-[10px] tracking-widest uppercase mb-6 flex items-center gap-2 flex-wrap"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            <Link href="/jogadores" className="hover:opacity-80 transition-opacity">
              Jogadores
            </Link>
            <span className="opacity-40">/</span>
            <Link href={`/jogadores/${slug}`} className="hover:opacity-80 transition-opacity">
              {player.displayName}
            </Link>
            <span className="opacity-40">/</span>
            <span style={{ color: sysAccent }}>{sysLabel}</span>
          </div>

          <OrnamentLine color={sysAccent} opacity={0.45} width={160} />

          <div className="flex items-end gap-5 mt-3">
            <div
              className="flex-shrink-0 w-16 h-16 flex items-center justify-center font-display text-3xl border-2 animate-fade-rise"
              style={{
                background: `${sysAccent}10`,
                borderColor: sysAccent,
                color: sysAccent,
              }}
            >
              {sysIcon}
            </div>

            <div className="animate-fade-rise-d1">
              <div
                className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                {player.displayName} &bull; {sysLabel}
              </div>
              <h1
                className="font-display font-bold text-3xl sm:text-4xl tracking-wider"
                style={{ color: "var(--color-rpg-gold-light)" }}
              >
                Personagens
              </h1>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--color-rpg-text-muted)" }}>
                {characters.length} personagem{characters.length !== 1 ? "s" : ""} em {sysLabel}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Characters grid */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          {characters.map((ch, i) => (
            <div
              key={ch.slug}
              className="card-enter"
              style={{ "--card-i": i } as React.CSSProperties}
            >
              <CharacterCard
                slug={ch.slug}
                system={ch.system}
                label={ch.label}
                status={ch.status}
                sysAccent={sysAccent}
                sysIcon={sysIcon}
                bg={bg}
              />
            </div>
          ))}
        </div>

        {/* Also browse via system page link */}
        <div className="mt-10 pt-6 border-t" style={{ borderColor: border }}>
          <Link
            href={`/sistemas-de-rpg/${sistema}`}
            className="font-mono text-[10px] tracking-widest uppercase transition-colors hover:opacity-80"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            Ver todos os personagens em {sysLabel} →
          </Link>
        </div>
      </main>
    </div>
  );
}
