import FichaIframe from "@/components/ficha/FichaIframe";
import FichaView from "@/components/ficha/FichaView";
import type { DnDFicha } from "@/types/character";

const LEGACY_SLUGS = new Set([
  "Nahida_Lesser_Lord_Kusanali",
  "Arlecchino_The_Knave_v2",
  "Corven_Cogspire_Ficha",
  "Build_Klein_Moretti_v2",
]);

interface DnDFichaSheetProps {
  ficha: DnDFicha;
  slug: string;
}

export default function DnDFichaSheet({ ficha, slug }: DnDFichaSheetProps) {
  if (LEGACY_SLUGS.has(slug)) {
    return <FichaIframe src={`/fichas/${slug}.html`} />;
  }
  return (
    <div className="px-4 sm:px-10">
      <FichaView ficha={ficha as Record<string, any>} system="dnd" />
    </div>
  );
}
