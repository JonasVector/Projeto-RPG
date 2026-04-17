"use client";

import Link from "next/link";
import SystemIcon from "@/components/ui/SystemIcon";

interface CharacterCardProps {
  slug: string;
  system: string;
  label: string;
  status: string;
  sysAccent: string;
  bg: string;
}

export default function CharacterCard({
  slug,
  system,
  label,
  status,
  sysAccent,
  bg,
}: CharacterCardProps) {
  return (
    <Link href={`/sistemas-de-rpg/${system}/personagens/${slug}`} className="block group">
      <div
        className="border rounded p-4 transition-all duration-200 flex items-center gap-4 group-hover:translate-y-[-1px]"
        style={{
          background: bg,
          borderColor: `${sysAccent}35`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = sysAccent;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 16px ${sysAccent}20`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${sysAccent}35`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* System icon */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded border flex items-center justify-center"
          style={{
            background: `${sysAccent}10`,
            borderColor: `${sysAccent}40`,
          }}
        >
          <SystemIcon systemId={system} size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="font-display font-semibold text-sm tracking-wide truncate"
            style={{ color: "var(--color-rpg-text)" }}
          >
            {label}
          </div>
          <div
            className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 mt-0.5"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{
                background:
                  status === "active" ? sysAccent : "var(--color-rpg-text-muted)",
              }}
            />
            {status === "active" ? "Ativo" : status === "retired" ? "Aposentado" : "NPC"}
          </div>
        </div>

        <span
          className="font-mono text-xs opacity-40 group-hover:opacity-80 transition-opacity"
          style={{ color: sysAccent }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
