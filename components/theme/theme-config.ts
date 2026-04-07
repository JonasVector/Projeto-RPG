export type SystemTheme = "dnd" | "daggerheart" | "vampiro";

export interface SystemThemeConfig {
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
