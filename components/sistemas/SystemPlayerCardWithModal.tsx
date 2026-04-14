"use client";

import Link from "next/link";
import CreateSheetModal from "@/components/players/CreateSheetModal";

interface SystemPlayerCardWithModalProps {
  player: {
    id: string;
    displayName: string;
    role: string;
    characterCount: number;
  };
  sistema: string;
  accent: string;
  index: number;
}

export function SystemPlayerCardWithModal({
  player,
  sistema,
  accent,
  index
}: SystemPlayerCardWithModalProps) {
  return (
    <div className="relative">
      <Link
        key={player.id}
        href={`/sistemas-de-rpg/${sistema}/jogadores/${player.id}`}
        className="block border p-5 transition-all duration-200 hover:-translate-y-0.5 group"
        style={{
          background: "var(--color-theme-card)",
          borderColor: `${accent}22`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = `${accent}55`;
          el.style.boxShadow = `0 4px 16px ${accent}14`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = `${accent}22`;
          el.style.boxShadow = "none";
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center font-display font-bold border text-lg"
            style={{
              background: `${accent}10`,
              borderColor: `${accent}40`,
              color: accent,
            }}
          >
            {player.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="font-display font-semibold text-base truncate"
              style={{ color: "var(--color-theme-text)" }}
            >
              {player.displayName}
            </div>
            <div
              className="font-mono text-[10px] uppercase tracking-widest mt-1"
              style={{ color: "var(--color-theme-text-dim)" }}
            >
              {player.role} · {player.characterCount} ficha{player.characterCount !== 1 ? "s" : ""} no sistema
            </div>
          </div>
          <span
            className="font-mono text-sm opacity-30 group-hover:opacity-60 transition-opacity flex-shrink-0"
            style={{ color: accent }}
          >
            →
          </span>
        </div>
      </Link>

      {/* Create Sheet button positioned below the card */}
      <div className="mt-2">
        <CreateSheetModal
          playerId={player.id}
          playerName={player.displayName}
          lockedSystem={sistema}
          trigger={
            <button
              className="w-full font-mono text-[10px] uppercase tracking-widest border px-3 py-1.5 transition-all hover:opacity-80"
              style={{
                borderColor: `${accent}30`,
                color: "var(--color-theme-text-dim)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              + Criar Ficha
            </button>
          }
        />
      </div>
    </div>
  );
}