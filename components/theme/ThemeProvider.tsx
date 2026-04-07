"use client";

import { type ReactNode, useMemo } from "react";

export type SystemTheme = "dnd" | "daggerheart" | "vampiro";

interface SystemThemeConfig {
  theme: SystemTheme;
  label: string;
  icon: string;
  decorIcon: string;
  bgClass: string;
}

export const THEME_CONFIG: Record<SystemTheme, SystemThemeConfig> = {
  dnd: {
    theme: "dnd",
    label: "D&D 5e",
    icon: "\u{1F409}",
    decorIcon: "\u2715",
    bgClass: "theme-bg-radial-dnd",
  },
  daggerheart: {
    theme: "daggerheart",
    label: "Daggerheart",
    icon: "\u{1F49A}",
    decorIcon: "\u25C6",
    bgClass: "theme-bg-radial-daggerheart",
  },
  vampiro: {
    theme: "vampiro",
    label: "Vampiro: A M\u00E1scara",
    icon: "\u{1FA78}",
    decorIcon: "\u2715",
    bgClass: "theme-bg-radial-vampiro",
  },
};

export function getThemeConfig(system: string): SystemThemeConfig {
  return (
    THEME_CONFIG[system as SystemTheme] || {
      theme: "dnd" as SystemTheme,
      label: system,
      icon: "\u2699",
      decorIcon: "\u2726",
      bgClass: "",
    }
  );
}

export function getSystemTheme(system: string): SystemTheme {
  return THEME_CONFIG[system as SystemTheme]?.theme || "dnd";
}

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
