import Link from "next/link";
import type { CharacterMetadata } from "@/types/character";
import { getSystemTheme } from "@/components/theme/ThemeProvider";

interface CharacterCardProps {
  character: CharacterMetadata;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  getSystemTheme(character.system); // register theme usage

  return (
    <Link
      href={`/sistemas-de-rpg/${character.system}/personagens/${character.id}`}
      className="group block border transition-all duration-300 hover:shadow-lg"
      style={{
        background: "var(--color-theme-card)",
        borderColor: "var(--color-theme-border)",
        borderLeft: "3px solid var(--color-theme-brand)",
        padding: "20px",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3
          className="font-display font-semibold text-lg leading-tight transition-colors"
          style={{ color: "var(--color-theme-bone)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-theme-brand-bright)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-theme-bone)")}
        >
          {character.name}
        </h3>
        <span
          className="text-[10px] tracking-[2px] px-2 py-0.5 font-mono"
          style={{
            border: "1px solid var(--color-theme-border)",
            color: "var(--color-theme-bone-dim)",
            background: "var(--color-theme-glow)",
          }}
        >
          Nv {character.level}
        </span>
      </div>
      <p className="text-xs font-mono tracking-wide" style={{ color: "var(--color-theme-text-dim)" }}>
        {character.race} &middot; {character.class}
      </p>
    </Link>
  );
}
