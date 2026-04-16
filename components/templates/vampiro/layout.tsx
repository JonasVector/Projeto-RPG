// components/templates/vampiro/layout.tsx
import React from 'react';
import { TemplateProps } from '../types';

interface VampiroSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const VampiroSection: React.FC<VampiroSectionProps> = ({ title, children, className = '' }) => (
  <section className={`bg-gray-800 border-l-4 border-red-700 rounded p-4 mb-4 ${className}`}>
    <h3 className="text-lg font-semibold text-red-400 mb-3">
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </section>
);

interface VampiroFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number';
  className?: string;
  min?: number;
  max?: number;
}

const VampiroField: React.FC<VampiroFieldProps> = ({
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
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

interface VampiroAttributeFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const VampiroAttributeField: React.FC<VampiroAttributeFieldProps> = ({
  label,
  value,
  onChange
}) => (
  <div className="flex items-center space-x-2 mb-2">
    <span className="text-sm font-medium text-gray-300 w-32">{label}</span>
    <div className="flex space-x-1">
      {[...Array(10)].map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`w-6 h-6 rounded-full border ${
            i < value
              ? 'bg-red-600 border-red-600'
              : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
          }`}
        >
          {i + 1 <= value && (
            <span className="text-xs font-bold">●</span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export const VampiroTemplate: React.FC<TemplateProps> = ({
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
    <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-red-800 ${className}`}>
      <VampiroSection title="Identidade">
        <VampiroField
          label="Nome"
          value={characterData.nome || ''}
          onChange={(value) => updateField('nome', value)}
        />
        <VampiroField
          label="Aparente Idade"
          value={characterData.aparente_idade || 25}
          onChange={(value) => updateField('aparente_idade', value)}
          type="number"
          min={0}
          max={150}
        />
        <VampiroField
          label="Real Idade"
          value={characterData.real_idade || 50}
          onChange={(value) => updateField('real_idade', value)}
          type="number"
          min={0}
          max={1000}
        />
        <VampiroField
          label="Geração"
          value={characterData.geracao || 10}
          onChange={(value) => updateField('geracao', value)}
          type="number"
          min={1}
          max={15}
        />
        <VampiroField
          label="Classe"
          value={characterData.classe || ''}
          onChange={(value) => updateField('classe', value)}
        />
        <VampiroField
          label="Seita"
          value={characterData.seita || ''}
          onChange={(value) => updateField('seita', value)}
        />
        <VampiroField
          label="Clã"
          value={characterData.clã || ''}
          onChange={(value) => updateField('clã', value)}
        />
      </VampiroSection>

      <VampiroSection title="Atributos">
        <VampiroAttributeField
          label="Força"
          value={characterData.forca || 1}
          onChange={(value) => updateField('forca', value)}
        />
        <VampiroAttributeField
          label="Destreza"
          value={characterData.destreza || 1}
          onChange={(value) => updateField('destreza', value)}
        />
        <VampiroAttributeField
          label="Constituição"
          value={characterData.constitucao || 1}
          onChange={(value) => updateField('constitucao', value)}
        />
        <VampiroAttributeField
          label="Carisma"
          value={characterData.carisma || 1}
          onChange={(value) => updateField('carisma', value)}
        />
        <VampiroAttributeField
          label="Manipulação"
          value={characterData.manipulacao || 1}
          onChange={(value) => updateField('manipulacao', value)}
        />
        <VampiroAttributeField
          label="Apresentação"
          value={characterData.apresentacao || 1}
          onChange={(value) => updateField('apresentacao', value)}
        />
        <VampiroAttributeField
          label="Percepção"
          value={characterData.percepcao || 1}
          onChange={(value) => updateField('percepcao', value)}
        />
        <VampiroAttributeField
          label="Inteligência"
          value={characterData.inteligencia || 1}
          onChange={(value) => updateField('inteligencia', value)}
        />
        <VampiroAttributeField
          label="Astúcia"
          value={characterData.astucia || 1}
          onChange={(value) => updateField('astucia', value)}
        />
      </VampiroSection>

      <VampiroSection title="Vitais">
        <div className="flex space-x-4">
          <VampiroField
            label="Sangue Atual"
            value={characterData.sangue_atual || 10}
            onChange={(value) => updateField('sangue_atual', value)}
            type="number"
            min={0}
            max={20}
          />
          <VampiroField
            label="Sangue Máximo"
            value={characterData.sangue_maximo || 10}
            onChange={(value) => updateField('sangue_maximo', value)}
            type="number"
            min={1}
            max={20}
          />
        </div>
        <div className="flex space-x-4">
          <VampiroField
            label="Humanidade"
            value={characterData.humanidade || 7}
            onChange={(value) => updateField('humanidade', value)}
            type="number"
            min={0}
            max={10}
          />
          <VampiroField
            label="Vontade"
            value={characterData.vontade || 5}
            onChange={(value) => updateField('vontade', value)}
            type="number"
            min={0}
            max={10}
          />
        </div>
      </VampiroSection>
    </div>
  );
};