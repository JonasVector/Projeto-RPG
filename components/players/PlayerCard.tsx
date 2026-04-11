"use client";

import Link from "next/link";

interface Player {
  id: string;
  displayName: string;
  role: string;
  bio: string;
  activeSince: string;
  stats: {
    totalCharacters: number;
    primarySystem: string;
    [key: string]: unknown;
  };
}

export default function PlayerCard({ player }: { player: Player }) {
  const accent = "var(--color-rpg-bronze)";
  const border = "var(--color-rpg-border)";
  const bg = "var(--color-rpg-surface-raised)";

  return (
    <Link href={`/jogadores/${player.id}`} className="block group">
      <div
        className="border rounded p-6 transition-all duration-200 group-hover:translate-y-[-2px]"
        style={{
          background: bg,
          borderColor: border,
          boxShadow: `0 0 0 1px transparent`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = accent;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px rgba(184,115,51,0.15)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = border;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px transparent`;
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div
              className="font-mono text-[10px] tracking-widest uppercase mb-1"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {player.role}
            </div>
            <h2
              className="font-display text-2xl font-bold tracking-wider"
              style={{ color: "var(--color-rpg-gold-light)" }}
            >
              {player.displayName}
            </h2>
          </div>
          <div
            className="flex-shrink-0 w-12 h-12 rounded border flex items-center justify-center font-display text-xl font-bold"
            style={{
              background: `rgba(184,115,51,0.08)`,
              borderColor: accent,
              color: accent,
            }}
          >
            {player.displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Bio */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--color-rpg-text-muted)" }}
        >
          {player.bio}
        </p>

        {/* Stats strip */}
        <div
          className="grid grid-cols-3 gap-3 pt-4 border-t"
          style={{ borderColor: border }}
        >
          <div className="text-center">
            <span
              className="font-display font-bold text-xl block"
              style={{ color: accent }}
            >
              {player.stats.totalCharacters}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest block"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Personagens
            </span>
          </div>
          <div className="text-center">
            <span
              className="font-display font-bold text-xl block uppercase"
              style={{ color: accent }}
            >
              {player.stats.primarySystem}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest block"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Sistema Principal
            </span>
          </div>
          <div className="text-center">
            <span
              className="font-display font-bold text-xl block"
              style={{ color: accent }}
            >
              {player.activeSince}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest block"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Desde
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
