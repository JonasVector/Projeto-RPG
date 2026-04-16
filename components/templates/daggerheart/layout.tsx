// components/templates/daggerheart/layout.tsx
import React from 'react';
import { TemplateProps } from '../types';

interface DaggerheartSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DaggerheartSection: React.FC<DaggerheartSectionProps> = ({ title, children, className = '' }) => (
  <section className={`bg-gray-800 border-t-2 border-purple-600 rounded p-4 mb-4 ${className}`}>
    <h3 className="text-lg font-semibold text-purple-400 mb-3">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {children}
    </div>
  </section>
);

interface DaggerheartStatFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
}

const DaggerheartStatField: React.FC<DaggerheartStatFieldProps> = ({
  label,
  value,
  onChange,
  max
}) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-purple-500"
      />
      <span className="text-white w-10 text-center">{value}/{max}</span>
    </div>
  </div>
);

interface DaggerheartFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number';
  className?: string;
}

const DaggerheartField: React.FC<DaggerheartFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  className = ''
}) => (
  <div className={`mb-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

export const DaggerheartTemplate: React.FC<TemplateProps> = ({
  characterData,
  onDataChange,
  className = ''
}) => {
  const updateField = (fieldPath: string, value: any) => {
    const newData = { ...characterData };
    (newData as any)[fieldPath] = value;
    onDataChange(newData);
  };

  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-purple-800 ${className}`}>
      <DaggerheartSection title="Identidade">
        <DaggerheartField
          label="Nome"
          value={characterData.nome || ''}
          onChange={(value) => updateField('nome', value)}
        />
        <DaggerheartField
          label="Título"
          value={characterData.titulo || ''}
          onChange={(value) => updateField('titulo', value)}
        />
        <DaggerheartField
          label="Classe"
          value={characterData.classe || ''}
          onChange={(value) => updateField('classe', value)}
        />
        <DaggerheartField
          label="Origem"
          value={characterData.origem || ''}
          onChange={(value) => updateField('origem', value)}
        />
        <DaggerheartField
          label="Nível"
          value={characterData.nivel || 1}
          onChange={(value) => updateField('nivel', value)}
          type="number"
        />
        <DaggerheartField
          label="Aspecto"
          value={characterData.aspecto || ''}
          onChange={(value) => updateField('aspecto', value)}
        />
      </DaggerheartSection>

      <DaggerheartSection title="Estatísticas">
        <DaggerheartStatField
          label="Aspiração"
          value={characterData.aspiracao || 10}
          onChange={(value) => updateField('aspiracao', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Desespero"
          value={characterData.desespero || 10}
          onChange={(value) => updateField('desespero', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Graça"
          value={characterData.graca || 10}
          onChange={(value) => updateField('graca', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Sangue"
          value={characterData.sangue || 10}
          onChange={(value) => updateField('sangue', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Espírito"
          value={characterData.espirito || 10}
          onChange={(value) => updateField('espirito', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Sabedoria"
          value={characterData.sabedoria || 10}
          onChange={(value) => updateField('sabedoria', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Meia-Noite"
          value={characterData.meia_noite || 10}
          onChange={(value) => updateField('meia_noite', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Valentia"
          value={characterData.valentia || 10}
          onChange={(value) => updateField('valentia', value)}
          max={20}
        />
        <DaggerheartStatField
          label="Esplendor"
          value={characterData.esplendor || 10}
          onChange={(value) => updateField('esplendor', value)}
          max={20}
        />
      </DaggerheartSection>

      <DaggerheartSection title="Combate">
        <DaggerheartField
          label="Classe de Armadura"
          value={characterData.classe_armadura || 10}
          onChange={(value) => updateField('classe_armadura', value)}
          type="number"
        />
        <DaggerheartField
          label="Pontos de Vida Máximos"
          value={characterData.pv_maximos || 10}
          onChange={(value) => updateField('pv_maximos', value)}
          type="number"
        />
        <DaggerheartField
          label="Pontos de Vida Atuais"
          value={characterData.pv_atual || 10}
          onChange={(value) => updateField('pv_atual', value)}
          type="number"
        />
        <DaggerheartField
          label="Iniciativa"
          value={characterData.iniciativa || 0}
          onChange={(value) => updateField('iniciativa', value)}
          type="number"
        />
        <DaggerheartField
          label="Deslocamento"
          value={characterData.deslocamento || '30 ft'}
          onChange={(value) => updateField('deslocamento', value)}
        />
        <DaggerheartField
          label="Proficiência"
          value={characterData.proficiencia || 2}
          onChange={(value) => updateField('proficiencia', value)}
          type="number"
        />
      </DaggerheartSection>
    </div>
  );
};