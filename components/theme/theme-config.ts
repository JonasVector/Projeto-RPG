export type SystemTheme = "dnd" | "daggerheart" | "vampiro" | "candela" | "sacramento" | "avatar";

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
    icon: "⚔",
    decorIcon: "✕",
    bgClass: "theme-bg-radial-dnd",
  },
  daggerheart: {
    theme: "daggerheart",
    label: "Daggerheart",
    icon: "◆",
    decorIcon: "◆",
    bgClass: "theme-bg-radial-daggerheart",
  },
  vampiro: {
    theme: "vampiro",
    label: "Vampiro: A Máscara",
    icon: "✦",
    decorIcon: "✕",
    bgClass: "theme-bg-radial-vampiro",
  },
  candela: {
    theme: "candela",
    label: "Candela Obscura",
    icon: "◉",
    decorIcon: "◉",
    bgClass: "theme-bg-radial-candela",
  },
  sacramento: {
    theme: "sacramento",
    label: "Sacramento",
    icon: "⬡",
    decorIcon: "⬡",
    bgClass: "theme-bg-radial-sacramento",
  },
  avatar: {
    theme: "avatar",
    label: "Avatar Legends",
    icon: "☯",
    decorIcon: "☯",
    bgClass: "theme-bg-radial-avatar",
  },
};

export function getThemeConfig(system: string): SystemThemeConfig {
  return (
    THEME_CONFIG[system as SystemTheme] || {
      theme: "dnd" as SystemTheme,
      label: system,
      icon: "⊛",
      decorIcon: "✦",
      bgClass: "",
    }
  );
}

export function getSystemTheme(system: string): SystemTheme {
  return THEME_CONFIG[system as SystemTheme]?.theme || "dnd";
}
