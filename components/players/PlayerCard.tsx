"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getSystem } from "@/lib/systems";

interface Player {
  id: string;
  displayName: string;
  role: string;
  bio: string;
  activeSince: string;
  stats: {
    totalCharacters: number;
    primarySystem: string;
    favoriteSystems?: string[];
    [key: string]: unknown;
  };
  tags?: string[];
}

export default function PlayerCard({ player }: { player: Player }) {
  const accent = "var(--color-rpg-bronze)";
  const accentHex = "#b87333";
  const border = "rgba(184,115,51,0.22)";
  const bg = "#13100c";

  const primaryMeta = player.stats.primarySystem
    ? getSystem(player.stats.primarySystem)
    : null;

  return (
    <Link href={`/jogadores/${player.id}`} className="block group">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="border relative overflow-hidden"
        style={{
          background: bg,
          borderColor: border,
          borderTop: `2px solid ${accentHex}`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${accentHex}55`;
          el.style.boxShadow = `0 8px 32px rgba(184,115,51,0.14)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = border;
          el.style.boxShadow = "none";
        }}
      >
        {/* Subtle top-right glow */}
        <div
          className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at top right, ${accentHex}18, transparent 70%)`,
          }}
        />

        <div className="p-6 relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div
                className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                {player.role}
              </div>
              <h2
                className="font-display text-2xl font-bold tracking-wider truncate"
                style={{ color: "var(--color-rpg-gold-light)" }}
              >
                {player.displayName}
              </h2>
            </div>
            {/* Sigil avatar */}
            <div
              className="flex-shrink-0 w-12 h-12 border-2 flex items-center justify-center font-display text-xl font-bold transition-all duration-200"
              style={{
                background: `rgba(184,115,51,0.08)`,
                borderColor: accentHex,
                color: accent,
              }}
            >
              {player.displayName.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Bio */}
          {player.bio && (
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-2"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {player.bio}
            </p>
          )}

          {/* Primary system badge */}
          {primaryMeta && (
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest border px-2 py-1"
                style={{
                  borderColor: `${primaryMeta.accent}35`,
                  color: primaryMeta.accent,
                  background: `${primaryMeta.accent}08`,
                }}
              >
                <span>{primaryMeta.icon}</span>
                {primaryMeta.label}
              </span>
            </div>
          )}

          {/* Stats strip */}
          <div
            className="grid grid-cols-3 gap-3 pt-4 border-t"
            style={{ borderColor: "rgba(184,115,51,0.15)" }}
          >
            <StatChip label="Personagens" value={player.stats.totalCharacters} accent={accentHex} />
            <StatChip
              label="Sistema"
              value={primaryMeta?.label?.split(" ")[0].toUpperCase() ?? "—"}
              accent={accentHex}
            />
            <StatChip label="Desde" value={player.activeSince} accent={accentHex} />
          </div>
        </div>

        {/* Bottom hover bar */}
        <div
          className="h-0.5 w-0 group-hover:w-full transition-all duration-300"
          style={{ background: `linear-gradient(to right, ${accentHex}, transparent)` }}
        />
      </motion.div>
    </Link>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="text-center">
      <span
        className="font-display font-bold text-lg block"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span
        className="font-mono text-[9px] uppercase tracking-widest block"
        style={{ color: "var(--color-rpg-text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}
