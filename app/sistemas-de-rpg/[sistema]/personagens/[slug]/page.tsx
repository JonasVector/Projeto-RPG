import { getCharacter } from "@/lib/characters";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FichaView from "@/components/ficha/FichaView";
import DnDFichaSheet from "@/components/ficha/DnDFichaSheet";
import { SystemThemeProvider } from "@/components/theme/ThemeProvider";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SYSTEM_LABELS } from "@/lib/system-labels";

export async function generateStaticParams() {
  const { getSystemList, getAllCharacters } = await import("@/lib/characters");
  const systems = getSystemList();
  const result: { sistema: string; slug: string }[] = [];
  for (const system of systems) {
    const chars = getAllCharacters(system);
    for (const ch of chars) {
      result.push({ sistema: system, slug: ch.id });
    }
  }
  return result;
}

export default async function CharacterPage({ params }: { params: Promise<{ sistema: string; slug: string }> }) {
  const { sistema, slug } = await params;
  const character = getCharacter(sistema, slug);

  if (!character) {
    notFound();
  }

  const ficha = character.ficha.personagem;
  const characterName = ficha.nome || slug;
  const systemLabel = SYSTEM_LABELS[sistema] || sistema;

  return (
    <SystemThemeProvider system={sistema}>
      <div className="min-h-screen">
        {/* Back nav */}
        <nav className="px-4 sm:px-10 py-3 border-b" style={{ borderColor: "var(--color-theme-border)", background: "var(--color-theme-surface)" }}>
          <Link
            href={`/sistemas-de-rpg/${sistema}`}
            className="font-mono text-[10px] tracking-widest uppercase transition-colors"
            style={{ color: "var(--color-theme-text-dim)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-theme-brand-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-theme-text-dim)")}
          >
            ← Voltar para {systemLabel}
          </Link>
        </nav>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sistemas", href: "/sistemas-de-rpg" },
            { label: systemLabel, href: `/sistemas-de-rpg/${sistema}` },
            { label: characterName },
          ]}
        />

        {/* Edit button */}
        <div className="flex justify-end px-4 sm:px-10 my-3">
          <Link
            href={`/sistemas-de-rpg/${sistema}/personagens/${slug}/edit`}
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors"
            style={{
              borderColor: "var(--color-theme-brand)",
              color: "var(--color-theme-brand-bright)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-theme-glow)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Editar Ficha
          </Link>
        </div>

        {/* Character Sheet */}
        {sistema === "dnd" ? (
          <DnDFichaSheet ficha={character.ficha} />
        ) : (
          <div className="px-4 sm:px-6">
            <FichaView ficha={character.ficha} system={sistema} />
          </div>
        )}
      </div>
    </SystemThemeProvider>
  );
}
