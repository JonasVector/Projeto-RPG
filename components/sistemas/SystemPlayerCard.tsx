"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SystemIcon from "@/components/ui/SystemIcon";
import { CharMiniCardClient } from "./CharMiniCardClient";

interface CharRef {
  system: string;
  slug: string;
  label: string;
  status: string;
}

interface PlayerEntry {
  id: string;
  displayName: string;
  role: string;
}

interface SystemPlayerCardProps {
  player: PlayerEntry;
  chars: CharRef[];
  sistema: string;
  accent: string;
  border: string;
  index: number;
  systemIcon: string;
}

export function SystemPlayerCard({
  player,
  chars,
  sistema,
  accent,
  border,
  index,
  systemIcon,
}: SystemPlayerCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="border overflow-hidden"
      style={{
        background: "var(--color-theme-surface)",
        borderColor: border,
        borderTop: `2px solid ${accent}`,
      }}
    >
      {/* Player header — links to player's sheet list for this system */}
      <Link
        href={`/sistemas-de-rpg/${sistema}/jogadores/${player.id}`}
        className="flex items-center gap-4 px-5 py-4 border-b transition-all duration-150 group hover:opacity-80"
        style={{ borderColor: border }}
      >
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-display font-bold border text-base"
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
            className="font-display font-semibold text-base tracking-wide truncate"
            style={{ color: "var(--color-theme-bone)" }}
          >
            {player.displayName}
          </div>
          <div
            className="font-mono text-[9px] uppercase tracking-widest"
            style={{ color: "var(--color-theme-text-dim)" }}
          >
            {player.role} · {chars.length} personagem{chars.length !== 1 ? "s" : ""} neste sistema
          </div>
        </div>
        <span
          className="font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity flex-shrink-0"
          style={{ color: accent }}
        >
          →
        </span>
      </Link>

      {/* Sheet list */}
      <div className="p-4 grid gap-2 sm:grid-cols-2">
        {chars.map((ch) => (
          <CharMiniCard
            key={ch.slug}
            href={`/sistemas-de-rpg/${sistema}/personagens/${ch.slug}`}
            label={ch.label}
            sub={
              ch.status === "active"
                ? "Ativo"
                : ch.status === "retired"
                ? "Aposentado"
                : "NPC"
            }
            accent={accent}
            systemId={ch.system}
            statusDot
            statusActive={ch.status === "active"}
          />
        ))}
      </div>
    </motion.section>
  );
}

export function CharMiniCard({
  href,
  label,
  sub,
  accent,
  systemId,
  statusDot,
  statusActive,
}: {
  href: string;
  label: string;
  sub: string;
  accent: string;
  systemId?: string;
  statusDot?: boolean;
  statusActive?: boolean;
}) {
  return (
    <CharMiniCardClient
      href={href}
      label={label}
      sub={sub}
      accent={accent}
      systemId={systemId}
      statusDot={statusDot}
      statusActive={statusActive}
    />
  );
}
