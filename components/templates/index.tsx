// components/templates/index.tsx
import React from 'react';
import { TemplateProps, SystemTemplate } from './types';
import { DnDTemplate } from './dnd/layout';
import { VampiroTemplate } from './vampiro/layout';
import { DaggerheartTemplate } from './daggerheart/layout';

// Registry of available system templates
const SYSTEM_TEMPLATES: Record<string, SystemTemplate> = {
  dnd5e: {
    id: 'dnd5e',
    displayName: 'D&D 5e',
    component: DnDTemplate,
    sections: [] // Will be populated by the component
  },
  vampiro: {
    id: 'vampiro',
    displayName: 'Vampiro: A Máscara',
    component: VampiroTemplate,
    sections: [] // Will be populated by the component
  },
  daggerheart: {
    id: 'daggerheart',
    displayName: 'Daggerheart',
    component: DaggerheartTemplate,
    sections: [] // Will be populated by the component
  }
};

export const getSystemTemplate = (systemId: string): SystemTemplate | undefined => {
  return SYSTEM_TEMPLATES[systemId.toLowerCase()];
};

export const getAllSystemTemplates = (): SystemTemplate[] => {
  return Object.values(SYSTEM_TEMPLATES);
};

export const TemplateRenderer: React.FC<TemplateProps> = ({
  systemId,
  characterData,
  onDataChange,
  className = ''
}) => {
  const template = getSystemTemplate(systemId);

  if (!template) {
    // Fallback to a generic template if system not found
    return (
      <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg ${className}`}>
        <h2 className="text-xl font-bold mb-4">Unknown System: {systemId}</h2>
        <p>Using generic template...</p>
      </div>
    );
  }

  const TemplateComponent = template.component;
  return (
    <TemplateComponent
      systemId={systemId}
      characterData={characterData}
      onDataChange={onDataChange}
      className={className}
    />
  );
};

export default TemplateRenderer;