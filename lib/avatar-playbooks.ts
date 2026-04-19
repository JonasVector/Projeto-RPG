/**
 * Avatar Legends playbook registry.
 * Maps PT playbook name (as stored in schemas/avatar.json options) to its
 * English counterpart and balance principles (translated to PT).
 *
 * Source: Avatar Legends core book + Wan Shi Tong's Adventure Guide (expansion).
 * Principles are rendered on the Equilíbrio section of the character sheet.
 */

export interface PlaybookMeta {
  ptName: string;
  enName: string;
  principioA: string;
  principioB: string;
  /** Marks expansion (Wan Shi Tong's) or unconfirmed PT→EN mappings. */
  unconfirmed?: boolean;
}

export const PLAYBOOKS: Record<string, PlaybookMeta> = {
  "O Resoluto": {
    ptName: "O Resoluto",
    enName: "The Adamant",
    principioA: "Moderação",
    principioB: "Resultados",
  },
  "O Audaz": {
    ptName: "O Audaz",
    enName: "The Bold",
    principioA: "Lealdade",
    principioB: "Confiança",
  },
  "O Predestinado": {
    ptName: "O Predestinado",
    enName: "The Destined",
    principioA: "Paciência",
    principioB: "Determinação",
  },
  "O Guardião": {
    ptName: "O Guardião",
    enName: "The Guardian",
    principioA: "Autossuficiência",
    principioB: "Confiança",
  },
  "O Martelo": {
    ptName: "O Martelo",
    enName: "The Hammer",
    principioA: "Força",
    principioB: "Cuidado",
  },
  "O Ícone": {
    ptName: "O Ícone",
    enName: "The Icon",
    principioA: "Papel",
    principioB: "Liberdade",
  },
  "O Idealista": {
    ptName: "O Idealista",
    enName: "The Idealist",
    principioA: "Perdão",
    principioB: "Ação",
  },
  "O Pilar": {
    ptName: "O Pilar",
    enName: "The Pillar",
    principioA: "Apoio",
    principioB: "Liderança",
  },
  "O Prodígio": {
    ptName: "O Prodígio",
    enName: "The Prodigy",
    principioA: "Excelência",
    principioB: "Comunidade",
  },
  "O Pícaro": {
    ptName: "O Pícaro",
    enName: "The Rogue",
    principioA: "Amizade",
    principioB: "Sobrevivência",
  },
  "O Sucessor": {
    ptName: "O Sucessor",
    enName: "The Successor",
    principioA: "Tradição",
    principioB: "Progresso",
  },
  // Expansion (Wan Shi Tong's Adventure Guide) — PT→EN mapping needs review.
  "O Ancião": {
    ptName: "O Ancião",
    enName: "The Elder",
    principioA: "TODO",
    principioB: "TODO",
    unconfirmed: true,
  },
  "O Achado": {
    ptName: "O Achado",
    enName: "The Foundling",
    principioA: "TODO",
    principioB: "TODO",
    unconfirmed: true,
  },
  "A Lâmina": {
    ptName: "A Lâmina",
    enName: "The Razor",
    principioA: "TODO",
    principioB: "TODO",
    unconfirmed: true,
  },
};

export function getPlaybook(ptName: string): PlaybookMeta | undefined {
  return PLAYBOOKS[ptName];
}

export const PLAYBOOK_NAMES_PT = Object.keys(PLAYBOOKS);
