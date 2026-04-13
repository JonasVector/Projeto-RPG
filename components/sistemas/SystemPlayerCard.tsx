"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
        href={`/jogadores/${player.id}/${sistema}`}
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
  icon,
  statusDot,
  statusActive,
}: {
  href: string;
  label: string;
  sub: string;
  accent: string;
  icon?: string;
  statusDot?: boolean;
  statusActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 border p-3 transition-all duration-150 group hover:-translate-y-0.5"
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
      {icon && (
        <span className="text-base flex-shrink-0" style={{ color: accent }}>
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div
          className="font-display font-semibold text-sm truncate"
          style={{ color: "var(--color-theme-text)" }}
        >
          {label}
        </div>
        <div
          className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5 mt-0.5"
          style={{ color: "var(--color-theme-text-dim)" }}
        >
          {statusDot && (
            <span
              className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
              style={{
                background: statusActive
                  ? accent
                  : "var(--color-theme-text-dim)",
              }}
            />
          )}
          {sub}
        </div>
      </div>
      <span
        className="font-mono text-xs opacity-25 group-hover:opacity-60 transition-opacity flex-shrink-0"
        style={{ color: accent }}
      >
        →
      </span>
    </Link>
  );
}
