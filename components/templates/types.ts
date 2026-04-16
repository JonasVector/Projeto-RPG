// components/templates/types.ts
import { ReactNode } from 'react';

export interface CharacterData {
  [key: string]: any;
}

export interface TemplateSection {
  id: string;
  title: string;
  fields: TemplateField[];
  className?: string;
}

export interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox';
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  className?: string;
}

export interface TemplateProps {
  systemId: string;
  characterData: CharacterData;
  onDataChange: (data: CharacterData) => void;
  className?: string;
}

export interface SystemTemplate {
  id: string;
  displayName: string;
  component: React.ComponentType<TemplateProps>;
  sections: TemplateSection[];
}