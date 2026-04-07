import { getAllCharacters, getSystemList, getCharactersBySystem } from "@/lib/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { notFound } from "next/navigation";

const SYSTEM_LABELS: Record<string, string> = {
  dnd: "D&D 5e",
  vampiro: "Vampiro: A Máscara",
  daggerheart: "Daggerheart",
};

export async function generateStaticParams() {
  return getSystemList().map((system) => ({ system }));
}

export default async function SystemPage({ params }: { params: Promise<{ sistema: string }> }) {
  const { sistema } = await params;
  const characters = getCharactersBySystem(sistema);
  const label = SYSTEM_LABELS[sistema] || sistema;

  if (!SYSTEM_LABELS[sistema]) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-rpg-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sistemas", href: "/sistemas-de-rpg" },
            { label },
          ]}
        />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-rpg-gold-light tracking-wide">
              {label}
            </h1>
            <p className="font-mono text-sm text-rpg-text-muted mt-1">
              {characters.length} personagem{characters.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-rpg-text-muted text-lg">
              Nenhum personagem neste sistema ainda.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {characters.map((ch) => (
              <CharacterCard key={ch.id} character={ch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
