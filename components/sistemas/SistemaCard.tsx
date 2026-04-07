"use client";

import Link from "next/link";
import { SYSTEM_LABELS, SYSTEM_ICONS } from "@/lib/system-labels";

interface SistemaCardProps {
  sys: string;
  count: number;
  accent: string;
  glow: string;
  desc: string;
  index: number;
}

export default function SistemaCard({ sys, count, accent, glow, desc, index }: SistemaCardProps) {
  return (
    <Link
      href={`/sistemas-de-rpg/${sys}`}
      className="system-card group block border p-7 card-enter"
      style={
        {
          background: "var(--color-rpg-surface-raised)",
          borderColor: "var(--color-rpg-border)",
          borderTop: `3px solid ${accent}`,
          "--card-i": index,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 10px 40px ${glow}`;
        (e.currentTarget as HTMLAnchorElement).style.background = `radial-gradient(ellipse at 50% 0%, ${accent}20 0%, var(--color-rpg-surface-raised) 70%)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-rpg-surface-raised)";
      }}
    >
      <span
        className="text-4xl block mb-4 transition-all duration-300 group-hover:scale-110 text-center"
        style={{ filter: `drop-shadow(0 0 10px ${accent}aa)` }}
      >
        {SYSTEM_ICONS[sys] || "⚙"}
      </span>
      <h2
        className="font-display font-semibold text-xl text-center"
        style={{ color: "var(--color-rpg-gold-light)" }}
      >
        {SYSTEM_LABELS[sys] || sys}
      </h2>
      {desc && (
        <p
          className="font-mono text-[10px] tracking-wider uppercase text-center mt-2"
          style={{ color: "var(--color-rpg-text-muted)", opacity: 0.7 }}
        >
          {desc}
        </p>
      )}
      <p
        className="font-mono text-xs text-center mt-3"
        style={{ color: accent, opacity: 0.85 }}
      >
        {count > 0
          ? `${count} personagem${count !== 1 ? "s" : ""}`
          : "Nenhum personagem"}
      </p>
    </Link>
  );
}
