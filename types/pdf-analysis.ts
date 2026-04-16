// types/pdf-analysis.ts
export interface PDFField {
  name: string;
  type: 'text' | 'checkbox' | 'radio' | 'select';
  position: { x: number; y: number };
  size: { width: number; height: number };
  page: number;
}

export interface PDFSection {
  title: string;
  fields: PDFField[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  page: number;
}

export interface PDFStructure {
  fields: PDFField[];
  sections: PDFSection[];
  totalPages: number;
  metadata: {
    title: string;
    author?: string;
    subject?: string;
    keywords?: string[];
  };
}

export interface SystemTemplateData {
  systemId: string;
  structure: PDFStructure;
  createdAt: Date;
  updatedAt: Date;
}