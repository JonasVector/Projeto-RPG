export type SystemId = "dnd" | "vampiro" | "daggerheart";

// --- D&D 5e Character Types ---

export interface DnDAttribute {
  valor: number;
  mod: number;
}

export interface DnDSalvaguarda {
  valor: number;
  proficiente: boolean;
}

export interface DnDPericia {
  valor: number;
  atributo: string;
  proficiente: boolean;
}

export interface DnDAtaque {
  nome: string;
  bonus: number;
  dano: string;
  alcance: string;
  notas: string;
}

export interface DnDHabilidade {
  nome: string;
  descricao: string;
}

export interface DnDHabilidadeClasse {
  nome: string;
  fonte: string;
  descricao: string;
}

export interface DnDInfusao {
  nome: string;
  status: string;
  descricao: string;
}

export interface DnDInfusoesAtivas {
  total_conhecidas: number;
  total_ativas: number;
  infusoes: DnDInfusao[];
  infusoes_nao_ativas?: string[];
}

export interface DnDTruque {
  nome: string;
  tags: string[];
  descricao: string;
  mecanica: string;
}

export interface DnDCombate {
  classe_armadura: number;
  pv_totais: number;
  iniciativa: number;
  deslocamento: string;
  bonus_proficiencia: number;
  cd_magia: number;
  cd_magia_oficina?: number;
  ataque_magico: number;
  ataque_magico_oficina?: number;
  dados_vida: string;
  modelos_infiltrador?: string;
}

export interface DnDEquipamento {
  armas: string[];
  armadura: string[];
  infusoes_itens: string[];
  ferramentas: string[];
}

export interface DnDPersonalidade {
  tracos: string;
  ideal_vinculo: string;
  defeito: string;
}

export interface DnDFicha {
  personagem: {
    nome: string;
    titulo?: string;
    raca: string;
    classe: string;
    nivel: number;
    subclasse: string;
    modelo_armadura?: string;
    antecedente?: string;
    tendencia?: string;
  };
  atributos: Record<string, DnDAttribute>;
  combate: DnDCombate;
  salvaguardas: Record<string, DnDSalvaguarda>;
  pericias: Record<string, DnDPericia>;
  passiva?: { sabedoria_passiva: number };
  ataques: DnDAtaque[];
  habilidades_raciais: DnDHabilidade[];
  habilidades_classe: DnDHabilidadeClasse[];
  infusoes_ativas?: DnDInfusoesAtivas;
  magias?: {
    atributo_conjurador: string;
    cd_magia: string;
    ataque_magico: string;
    espacos_magia?: string;
    truques: DnDTruque[];
    circulo_1?: DnDTruque[];
    circulo_2?: DnDTruque[];
  };
  equipamento?: DnDEquipamento;
  personalidade?: DnDPersonalidade;
  historia?: string;
}

export interface DnDCharacter {
  ficha: DnDFicha;
}

// --- Character Metadata (lightweight, for listing) ---

export interface CharacterMetadata {
  id: string;
  system: SystemId;
  name: string;
  race: string;
  class: string;
  level: number;
}

// Unified character type for future multi-system support
export type CharacterSheet = {
  system: SystemId;
  data: DnDCharacter | Record<string, unknown>;
};
