"use client";

import Link from "next/link";

interface SystemCardProps {
  system: string;
  label: string;
  icon: string;
  count: number;
  accent: string;
  glow: string;
  index: number;
}

export default function SystemCard({ system, label, icon, count, accent, glow, index }: SystemCardProps) {
  return (
    <Link
      href={`/sistemas-de-rpg/${system}`}
      className="system-card group block border p-6 card-enter"
      style={
        {
          background: "var(--color-rpg-surface-raised)",
          borderColor: "var(--color-rpg-border)",
          borderTop: `2px solid ${accent}`,
          "--card-i": index,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${glow}`;
        (e.currentTarget as HTMLAnchorElement).style.background = `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, var(--color-rpg-surface-raised) 70%)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-rpg-surface-raised)";
      }}
    >
      <span
        className="text-3xl block mb-3 transition-all duration-300 group-hover:scale-110"
        style={{ filter: `drop-shadow(0 0 8px ${accent}99)` }}
      >
        {icon}
      </span>
      <h3
        className="font-display font-semibold text-lg"
        style={{ color: "var(--color-rpg-gold-light)" }}
      >
        {label}
      </h3>
      <span
        className="font-mono text-xs block mt-2"
        style={{ color: "var(--color-rpg-bronze)" }}
      >
        {count > 0 ? `${count} personagem${count !== 1 ? "s" : ""}` : "Nenhum personagem"}
      </span>
    </Link>
  );
}
