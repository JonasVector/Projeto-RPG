// components/templates/dnd/layout.tsx
import React from 'react';
import { TemplateProps } from '../types';

interface DnDSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DnDSection: React.FC<DnDSectionProps> = ({ title, children, className = '' }) => (
  <section className={`bg-gray-800 border border-amber-700 rounded p-4 mb-4 ${className}`}>
    <h3 className="text-lg font-semibold text-amber-400 mb-3 border-b border-amber-700 pb-1">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {children}
    </div>
  </section>
);

interface DnDFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number';
  className?: string;
  min?: number;
  max?: number;
}

const DnDField: React.FC<DnDFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  className = '',
  min,
  max
}) => (
  <div className={`mb-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      min={min}
      max={max}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </div>
);

export const DnDTemplate: React.FC<TemplateProps> = ({
  characterData,
  onDataChange,
  className = ''
}) => {
  const updateField = (fieldPath: string, value: any) => {
    const newData = { ...characterData };
    // Simple field path for now (e.g., "nome", "nivel")
    (newData as any)[fieldPath] = value;
    onDataChange(newData);
  };

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-amber-800 ${className}`}>
      <DnDSection title="Identidade">
        <DnDField
          label="Nome"
          value={characterData.nome || ''}
          onChange={(value) => updateField('nome', value)}
        />
        <DnDField
          label="Raça"
          value={characterData.raca || ''}
          onChange={(value) => updateField('raca', value)}
        />
        <DnDField
          label="Classe"
          value={characterData.classe || ''}
          onChange={(value) => updateField('classe', value)}
        />
        <DnDField
          label="Nível"
          value={characterData.nivel || 1}
          onChange={(value) => updateField('nivel', value)}
          type="number"
          min={1}
          max={20}
        />
      </DnDSection>

      <DnDSection title="Atributos">
        <DnDField
          label="Força"
          value={characterData.strength || 10}
          onChange={(value) => updateField('strength', value)}
          type="number"
          min={1}
          max={30}
        />
        <DnDField
          label="Destreza"
          value={characterData.dexterity || 10}
          onChange={(value) => updateField('dexterity', value)}
          type="number"
          min={1}
          max={30}
        />
        <DnDField
          label="Constituição"
          value={characterData.constitution || 10}
          onChange={(value) => updateField('constitution', value)}
          type="number"
          min={1}
          max={30}
        />
        <DnDField
          label="Inteligência"
          value={characterData.intelligence || 10}
          onChange={(value) => updateField('intelligence', value)}
          type="number"
          min={1}
          max={30}
        />
        <DnDField
          label="Sabedoria"
          value={characterData.wisdom || 10}
          onChange={(value) => updateField('wisdom', value)}
          type="number"
          min={1}
          max={30}
        />
        <DnDField
          label="Carisma"
          value={characterData.charisma || 10}
          onChange={(value) => updateField('charisma', value)}
          type="number"
          min={1}
          max={30}
        />
      </DnDSection>

      <DnDSection title="Combate">
        <DnDField
          label="Classe de Armadura"
          value={characterData.classe_armadura || 10}
          onChange={(value) => updateField('classe_armadura', value)}
          type="number"
        />
        <DnDField
          label="Pontos de Vida Totais"
          value={characterData.pv_totais || 10}
          onChange={(value) => updateField('pv_totais', value)}
          type="number"
        />
        <DnDField
          label="Bônus de Iniciativa"
          value={characterData.iniciativa || 0}
          onChange={(value) => updateField('iniciativa', value)}
          type="number"
        />
        <DnDField
          label="Deslocamento"
          value={characterData.deslocamento || '30 ft'}
          onChange={(value) => updateField('deslocamento', value)}
        />
      </DnDSection>
    </div>
  );
};