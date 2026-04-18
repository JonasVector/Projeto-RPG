/**
 * Single source of truth for all RPG system metadata.
 * Import from here — never duplicate in pages or components.
 */

export interface SystemMeta {
  id: string;
  label: string;
  /** Unicode fallback shown when the PNG fails or isn't desired. */
  icon: string;
  /** PNG asset under /public. Single source of truth for system logos. */
  pngIcon: string;
  /** If true, SystemIcon boosts brightness/contrast (for dark-on-dark assets). */
  iconNeedsBoost?: boolean;
  decorIcon: string;
  description: string;
  genre: string;
  accent: string;
  accentMid: string;
  accentBright: string;
  glow: string;
  glowStrong: string;
  bgClass: string;
}

export const SYSTEMS: Record<string, SystemMeta> = {
  dnd: {
    id: "dnd",
    label: "D&D 5e",
    icon: "⚔",
    pngIcon: "/icons/D&DIcon.png",
    decorIcon: "✕",
    description: "Dungeons & Dragons 5ª Edição",
    genre: "Alta Fantasia Medieval",
    accent: "#8b0000",
    accentMid: "#b22222",
    accentBright: "#d63031",
    glow: "rgba(139,0,0,0.35)",
    glowStrong: "rgba(139,0,0,0.55)",
    bgClass: "theme-bg-radial-dnd",
  },
  daggerheart: {
    id: "daggerheart",
    label: "Daggerheart",
    icon: "◆",
    pngIcon: "/icons/Daggerheart_logo_2024.png",
    decorIcon: "◆",
    description: "Sistema narrativo de fantasia",
    genre: "Fantasia Narrativa • Hope & Fear",
    accent: "#c24d2c",
    accentMid: "#d4684a",
    accentBright: "#e8765e",
    glow: "rgba(194,77,44,0.35)",
    glowStrong: "rgba(194,77,44,0.55)",
    bgClass: "theme-bg-radial-daggerheart",
  },
  vampiro: {
    id: "vampiro",
    label: "Vampiro: A Máscara",
    icon: "✦",
    pngIcon: "/icons/VampiroIcon.png",
    iconNeedsBoost: true,
    decorIcon: "✕",
    description: "Horror Gótico • Mundo das Trevas",
    genre: "Horror Gótico • Mundo das Trevas",
    accent: "#6e0010",
    accentMid: "#9a0018",
    accentBright: "#cc0020",
    glow: "rgba(110,0,16,0.45)",
    glowStrong: "rgba(110,0,16,0.65)",
    bgClass: "theme-bg-radial-vampiro",
  },
  candela: {
    id: "candela",
    label: "Candela Obscura",
    icon: "◉",
    pngIcon: "/icons/CandelaIcon.png",
    decorIcon: "◉",
    description: "Horror Investigativo • Era Vitoriana",
    genre: "Horror Investigativo • Era Vitoriana",
    accent: "#c9892e",
    accentMid: "#d4a050",
    accentBright: "#e8b86d",
    glow: "rgba(201,137,46,0.38)",
    glowStrong: "rgba(201,137,46,0.58)",
    bgClass: "theme-bg-radial-candela",
  },
  sacramento: {
    id: "sacramento",
    label: "Sacramento",
    icon: "⬡",
    pngIcon: "/icons/SacramentoIcon.png",
    iconNeedsBoost: true,
    decorIcon: "⬡",
    description: "Faroeste Brasileiro • d6 + Atributo",
    genre: "Faroeste Brasileiro • d6 + Atributo",
    accent: "#4a7fa8",
    accentMid: "#5e97c0",
    accentBright: "#74aed4",
    glow: "rgba(74,127,168,0.35)",
    glowStrong: "rgba(74,127,168,0.55)",
    bgClass: "theme-bg-radial-sacramento",
  },
  avatar: {
    id: "avatar",
    label: "Avatar Legends",
    icon: "☯",
    pngIcon: "/icons/AvatarIcon.png",
    decorIcon: "☯",
    description: "As Quatro Nações • Dobramento de Elementos",
    genre: "As Quatro Nações • Dobramento de Elementos",
    accent: "#7aa87a",
    accentMid: "#8cc08c",
    accentBright: "#a0d4a0",
    glow: "rgba(122,168,122,0.32)",
    glowStrong: "rgba(122,168,122,0.52)",
    bgClass: "theme-bg-radial-avatar",
  },
};

export function getSystem(id: string): SystemMeta {
  return (
    SYSTEMS[id] ?? {
      id,
      label: id,
      icon: "⊛",
      pngIcon: "",
      decorIcon: "✦",
      description: "Sistema desconhecido",
      genre: "",
      accent: "#b87333",
      accentMid: "#c9892e",
      accentBright: "#e8c85a",
      glow: "rgba(184,115,51,0.3)",
      glowStrong: "rgba(184,115,51,0.5)",
      bgClass: "",
    }
  );
}

/** All known system IDs in display order */
export const SYSTEM_IDS = Object.keys(SYSTEMS);
