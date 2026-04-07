"use client";

import { type ReactNode, useMemo } from "react";
import { getThemeConfig, getSystemTheme } from "./theme-config";

export type { SystemTheme, SystemThemeConfig } from "./theme-config";
export { THEME_CONFIG, getThemeConfig, getSystemTheme } from "./theme-config";

interface ThemeProviderProps {
  system: string;
  children: ReactNode;
}

export function SystemThemeProvider({ system, children }: ThemeProviderProps) {
  const theme = getSystemTheme(system);
  const config = getThemeConfig(system);

  // Seeded random for consistent particles (deterministic per render)
  const particles = useMemo(() => {
    const seed = system.length * 1000;
    return Array.from({ length: 20 }, (_, i) => {
      const s = seed + i * 137;
      return {
        id: i,
        left: (s * 7) % 100,
        size: 1 + ((s * 13) % 30) / 10,
        duration: 8 + ((s * 19) % 14),
        delay: (s * 23) % 12,
      };
    });
  }, [system]);

  return (
    <div data-system-theme={theme} className="min-h-screen relative">
      {/* Background texture */}
      {(theme === "dnd" || theme === "vampiro") && (
        <div className="page-pattern absolute inset-0 pointer-events-none z-0" />
      )}
      <div className={`absolute inset-0 pointer-events-none z-0 ${config.bgClass}`} />

      {/* Ember particles */}
      <div className="ember-bg" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="ember"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              background:
                theme === "daggerheart"
                  ? "var(--color-theme-ember)"
                  : (p.id % 2 === 0)
                  ? "var(--color-theme-ember)"
                  : "var(--color-theme-brand-bright)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
