import Link from "next/link";
import type { CharacterMetadata } from "@/types/character";

interface CharacterCardProps {
  character: CharacterMetadata;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/sistemas-de-rpg/${character.system}/personagens/${character.id}`}
      className="group block bg-rpg-surface-raised border border-rpg-border rounded-lg p-5 hover:border-rpg-bronze/50 transition-all duration-300 hover:shadow-lg hover:shadow-rpg-bronze/5"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-semibold text-rpg-gold-light text-lg group-hover:text-rpg-gold transition-colors leading-tight">
          {character.name}
        </h3>
        <span className="font-mono text-xs text-rpg-bronze border border-rpg-border px-2 py-0.5 rounded">
          Nv {character.level}
        </span>
      </div>
      <p className="font-mono text-xs text-rpg-text-muted tracking-wide">
        {character.race} &middot; {character.class}
      </p>
      <p className="text-xs text-rpg-text-muted/60 mt-2 font-mono italic">
        {character.system}
      </p>
    </Link>
  );
}
