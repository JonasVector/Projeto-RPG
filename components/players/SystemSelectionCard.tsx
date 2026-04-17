"use client";

import Link from "next/link";
import SystemIcon from "@/components/ui/SystemIcon";

interface SystemSelectionCardProps {
  href: string;
  systemId: string;
  label: string;
  description: string;
  count: number;
  accent: string;
  bg: string;
}

export default function SystemSelectionCard({
  href,
  systemId,
  label,
  description,
  count,
  accent,
  bg,
}: SystemSelectionCardProps) {
  return (
    <Link href={href} className="block group">
      <div
        className="border p-5 transition-all duration-200 group-hover:translate-y-[-2px] flex items-center gap-5"
        style={{
          background: bg,
          borderColor: `${accent}35`,
          borderLeftWidth: "3px",
          borderLeftColor: accent,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = accent;
          el.style.boxShadow = `0 4px 20px ${accent}20`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${accent}35`;
          el.style.boxShadow = "none";
        }}
      >
        {/* Icon */}
        <div
          className="flex-shrink-0 w-14 h-14 flex items-center justify-center border"
          style={{
            background: `${accent}10`,
            borderColor: `${accent}40`,
          }}
        >
          <SystemIcon systemId={systemId} size={36} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div
            className="font-display font-bold text-base tracking-wide"
            style={{ color: "var(--color-rpg-gold-light)" }}
          >
            {label}
          </div>
          {description && (
            <div
              className="font-mono text-[10px] tracking-wider mt-0.5"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {description}
            </div>
          )}
          <div
            className="font-mono text-[10px] uppercase tracking-widest mt-1"
            style={{ color: accent }}
          >
            {count} personagem{count !== 1 ? "s" : ""} →
          </div>
        </div>
      </div>
    </Link>
  );
}
