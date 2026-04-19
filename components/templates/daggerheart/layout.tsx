// components/templates/daggerheart/layout.tsx
// v2 (session 4): alinhado ao vault daggerheart-base.md
// Estresse substitui PV, Defesa substitui CA, 6 atributos estilo D&D,
// dominios substituem pericias, Esperanca/Medo sao pools de grupo.
import React from 'react';
import { TemplateProps } from '../types';

const DOMINIOS = [
  'Acrobacia', 'Atletismo', 'Furtividade', 'Intuição',
  'Atuação', 'Enganação', 'Intimidação', 'Persuasão',
  'Arcanismo', 'História', 'Investigação', 'Natureza',
  'Percepção', 'Sobrevivência', 'Medicina', 'Religião',
] as const;

const modAtributo = (v: number): number => Math.floor(((v ?? 10) - 10) / 2);
const fmtMod = (n: number): string => (n >= 0 ? `+${n}` : `${n}`);

const Section: React.FC<{ title: string; children: React.ReactNode; cols?: 1 | 2 | 3 }> = ({
  title, children, cols = 2,
}) => {
  const gridClass = cols === 1 ? 'grid-cols-1' : cols === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';
  return (
    <section className="bg-gray-800 border-t-2 border-purple-600 rounded p-4 mb-4">
      <h3 className="text-lg font-semibold text-purple-400 mb-3">{title}</h3>
      <div className={`grid ${gridClass} gap-3`}>{children}</div>
    </section>
  );
};

const Field: React.FC<{
  label: string; value: string | number; onChange: (v: string | number) => void;
  type?: 'text' | 'number'; min?: number; max?: number;
}> = ({ label, value, onChange, type = 'text', min, max }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

const TextArea: React.FC<{
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}> = ({ label, value, onChange, rows = 3 }) => (
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
    />
  </div>
);

const AttrCell: React.FC<{
  label: string; value: number; onChange: (v: number) => void;
}> = ({ label, value, onChange }) => (
  <div className="bg-gray-900/50 border border-purple-900 rounded p-3 text-center">
    <div className="text-xs uppercase tracking-wider text-purple-300 mb-1">{label}</div>
    <input
      type="number"
      min={1}
      max={20}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-transparent text-center text-2xl font-bold text-white focus:outline-none"
    />
    <div className="text-sm text-amber-400 mt-1">{fmtMod(modAtributo(value))}</div>
  </div>
);

const EstresseBar: React.FC<{
  atual: number; maximo: number; onAtual: (v: number) => void; onMax: (v: number) => void;
}> = ({ atual, maximo, onAtual, onMax }) => {
  const safeMax = Math.max(1, maximo);
  const pct = Math.min(100, Math.max(0, (atual / safeMax) * 100));
  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-gray-300">Estresse</label>
        <span className="text-sm text-white">{atual} / {maximo}</span>
      </div>
      <div className="w-full h-4 bg-gray-700 rounded overflow-hidden border border-gray-600">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <input
          type="number" min={0} max={maximo} value={atual}
          onChange={(e) => onAtual(Number(e.target.value))}
          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
          placeholder="Atual"
        />
        <input
          type="number" min={1} value={maximo}
          onChange={(e) => onMax(Number(e.target.value))}
          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
          placeholder="Máximo"
        />
      </div>
    </div>
  );
};

const Counter: React.FC<{
  label: string; value: number; onChange: (v: number) => void; color: 'amber' | 'slate';
}> = ({ label, value, onChange, color }) => {
  const border = color === 'amber' ? 'border-amber-600' : 'border-slate-500';
  const text = color === 'amber' ? 'text-amber-300' : 'text-slate-300';
  return (
    <div className={`bg-gray-900/50 border ${border} rounded p-3`}>
      <div className={`text-xs uppercase tracking-wider ${text} mb-2`}>{label}</div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded text-white font-bold"
        >−</button>
        <span className="text-2xl font-bold text-white">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded text-white font-bold"
        >+</button>
      </div>
    </div>
  );
};

const DominiosList: React.FC<{
  selected: string[]; onChange: (list: string[]) => void;
}> = ({ selected, onChange }) => {
  const toggle = (d: string) => {
    onChange(selected.includes(d) ? selected.filter((x) => x !== d) : [...selected, d]);
  };
  return (
    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2">
      {DOMINIOS.map((d) => {
        const on = selected.includes(d);
        return (
          <button
            key={d}
            type="button"
            onClick={() => toggle(d)}
            className={`px-2 py-1.5 rounded text-sm border transition-colors ${
              on
                ? 'bg-purple-700 border-purple-500 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {on ? '✓ ' : ''}{d}
          </button>
        );
      })}
    </div>
  );
};

export const DaggerheartTemplate: React.FC<TemplateProps> = ({
  characterData,
  onDataChange,
  className = '',
}) => {
  const updateField = (field: string, value: unknown) => {
    onDataChange({ ...characterData, [field]: value });
  };

  const get = <T,>(key: string, fallback: T): T =>
    (characterData?.[key] as T) ?? fallback;

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-purple-800 ${className}`}>
      <Section title="Identidade" cols={2}>
        <Field label="Nome" value={get('nome', '')} onChange={(v) => updateField('nome', v)} />
        <Field label="Jogador" value={get('jogador', '')} onChange={(v) => updateField('jogador', v)} />
        <Field label="Ancestralidade" value={get('ancestralidade', '')} onChange={(v) => updateField('ancestralidade', v)} />
        <Field label="Classe" value={get('classe', '')} onChange={(v) => updateField('classe', v)} />
        <Field label="Caminho (Subclasse)" value={get('caminho', '')} onChange={(v) => updateField('caminho', v)} />
        <Field label="Nível" value={get('nivel', 1)} onChange={(v) => updateField('nivel', v)} type="number" min={1} max={20} />
      </Section>

      <Section title="Atributos" cols={3}>
        <AttrCell label="Força" value={get('forca', 10)} onChange={(v) => updateField('forca', v)} />
        <AttrCell label="Destreza" value={get('destreza', 10)} onChange={(v) => updateField('destreza', v)} />
        <AttrCell label="Constituição" value={get('constituicao', 10)} onChange={(v) => updateField('constituicao', v)} />
        <AttrCell label="Inteligência" value={get('inteligencia', 10)} onChange={(v) => updateField('inteligencia', v)} />
        <AttrCell label="Sabedoria" value={get('sabedoria', 10)} onChange={(v) => updateField('sabedoria', v)} />
        <AttrCell label="Carisma" value={get('carisma', 10)} onChange={(v) => updateField('carisma', v)} />
      </Section>

      <Section title="Estresse" cols={2}>
        <EstresseBar
          atual={get('estresse_atual', 0)}
          maximo={get('estresse_maximo', 10)}
          onAtual={(v) => updateField('estresse_atual', v)}
          onMax={(v) => updateField('estresse_maximo', v)}
        />
      </Section>

      <Section title="Combate" cols={2}>
        <Field label="Defesa" value={get('defesa', 10)} onChange={(v) => updateField('defesa', v)} type="number" />
        <Field label="Iniciativa" value={get('iniciativa', 0)} onChange={(v) => updateField('iniciativa', v)} type="number" />
        <Field label="Bônus de Proficiência" value={get('bonus_proficiencia', 2)} onChange={(v) => updateField('bonus_proficiencia', v)} type="number" min={2} max={6} />
        <Field label="Deslocamento" value={get('deslocamento', '9m')} onChange={(v) => updateField('deslocamento', v)} />
      </Section>

      <Section title="Recursos de Grupo" cols={2}>
        <Counter label="Esperança (grupo)" value={get('esperanca_grupo', 0)} onChange={(v) => updateField('esperanca_grupo', v)} color="amber" />
        <Counter label="Desespero (mestre)" value={get('desespero_mestre', 0)} onChange={(v) => updateField('desespero_mestre', v)} color="slate" />
      </Section>

      <Section title="Domínios de Proficiência" cols={1}>
        <DominiosList
          selected={get<string[]>('proficiencias', [])}
          onChange={(list) => updateField('proficiencias', list)}
        />
      </Section>

      <Section title="Magia" cols={2}>
        <Field label="Atributo de Conjuração" value={get('atributo_conj', '')} onChange={(v) => updateField('atributo_conj', v)} />
        <Field label="CD de Magia" value={get('cd_magia', 8)} onChange={(v) => updateField('cd_magia', v)} type="number" />
        <Field label="Bônus de Ataque Mágico" value={get('bonus_ataque_magico', 0)} onChange={(v) => updateField('bonus_ataque_magico', v)} type="number" />
        <TextArea label="Magias Conhecidas (uma por linha)" value={get('magias_conhecidas', '')} onChange={(v) => updateField('magias_conhecidas', v)} />
      </Section>

      <Section title="Equipamento" cols={2}>
        <Field label="Armadura" value={get('armadura', '')} onChange={(v) => updateField('armadura', v)} />
        <Field label="Bônus de Defesa da Armadura" value={get('bonus_defesa_armadura', 0)} onChange={(v) => updateField('bonus_defesa_armadura', v)} type="number" />
        <Field label="Escudo" value={get('escudo', '')} onChange={(v) => updateField('escudo', v)} />
        <TextArea label="Armas (uma por linha)" value={get('armas', '')} onChange={(v) => updateField('armas', v)} />
        <TextArea label="Equipamentos (um por linha)" value={get('equipamentos', '')} onChange={(v) => updateField('equipamentos', v)} />
      </Section>

      <Section title="Traumas" cols={1}>
        <TextArea
          label="Traumas (um por linha — tipo, descrição, efeito)"
          value={get('traumas_notas', '')}
          onChange={(v) => updateField('traumas_notas', v)}
          rows={4}
        />
      </Section>

      <Section title="Personalidade" cols={2}>
        <TextArea label="Aparência" value={get('aparencia', '')} onChange={(v) => updateField('aparencia', v)} />
        <TextArea label="Personalidade" value={get('personalidade', '')} onChange={(v) => updateField('personalidade', v)} />
        <TextArea label="Ideais" value={get('ideais', '')} onChange={(v) => updateField('ideais', v)} />
        <TextArea label="Ligações" value={get('ligacoes', '')} onChange={(v) => updateField('ligacoes', v)} />
      </Section>

      <Section title="Histórico" cols={2}>
        <TextArea label="História" value={get('historia', '')} onChange={(v) => updateField('historia', v)} rows={5} />
        <TextArea label="Motivações" value={get('motivacoes', '')} onChange={(v) => updateField('motivacoes', v)} />
      </Section>
    </div>
  );
};
