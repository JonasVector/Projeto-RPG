"use client";

import Link from "next/link";
import SystemIcon from "@/components/ui/SystemIcon";

export function CharMiniCardClient({
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
      {systemId && (
        <SystemIcon systemId={systemId} size={20} className="flex-shrink-0" />
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