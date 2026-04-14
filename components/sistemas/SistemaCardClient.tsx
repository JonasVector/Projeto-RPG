"use client";

import Link from "next/link";
import SystemIcon from "@/components/ui/SystemIcon";
import { SYSTEM_LABELS } from "@/lib/system-labels";

interface SistemaCardClientProps {
  sys: string;
  count: number;
  accent: string;
  glow: string;
  desc: string;
  index: number;
}

export default function SistemaCardClient({ sys, count, accent, glow, desc, index }: SistemaCardClientProps) {
  return (
    <Link
      href={`/sistemas-de-rpg/${sys}/jogadores`}
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
      <div className="flex justify-center mb-4 transition-all duration-300 group-hover:scale-110">
        <SystemIcon systemId={sys} size={96} className="transition-all duration-300" />
      </div>
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