import FichaView from "@/components/ficha/FichaView";
import type { DnDFicha } from "@/types/character";

interface DnDFichaSheetProps {
  ficha: DnDFicha;
}

export default function DnDFichaSheet({ ficha }: DnDFichaSheetProps) {
  return (
    <div className="px-4 sm:px-10">
      <FichaView ficha={ficha as Record<string, any>} system="dnd" />
    </div>
  );
}
