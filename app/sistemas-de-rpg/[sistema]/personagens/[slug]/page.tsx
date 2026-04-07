import { getCharacter, getSystemList } from "@/lib/characters";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FichaView from "@/components/ficha/FichaView";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const systems = getSystemList();
  const result: { sistema: string; slug: string }[] = [];
  for (const system of systems) {
    const chars = require("@/lib/characters").getAllCharacters(system);
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

  return (
    <div className="min-h-screen bg-rpg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sistemas", href: "/sistemas-de-rpg" },
            { label: ficha.classe, href: `/sistemas-de-rpg/${sistema}` },
            { label: ficha.nome },
          ]}
        />

        <div className="flex justify-end mb-4">
          <Link
            href={`/sistemas-de-rpg/${sistema}/personagens/${slug}/edit`}
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-rpg-bronze text-rpg-bronze hover:bg-rpg-bronze/10 transition-colors rounded"
          >
            Editar Ficha
          </Link>
        </div>

        <FichaView ficha={character.ficha} />
      </div>
    </div>
  );
}
