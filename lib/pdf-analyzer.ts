// @ts-nocheck
// lib/pdf-analyzer.ts
// TODO(session-2): rewrite with pdf-lib for AcroForm field extraction. Currently unused.
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';
import { PDFStructure, SystemTemplateData } from '../types/pdf-analysis';

interface PDFContent {
  text: string;
  numpages: number;
  version: string;
}

export class PDFAnalyzer {
  private static readonly SUPPORTED_EXTENSIONS = ['.pdf'];

  /**
   * Scans the FichasdeRPG directory and analyzes all PDF files
   */
  public static async scanDirectory(directoryPath: string): Promise<SystemTemplateData[]> {
    const systemDirectories = await fs.readdir(directoryPath);
    const results: SystemTemplateData[] = [];

    for (const systemDir of systemDirectories) {
      const systemPath = path.join(directoryPath, systemDir);
      const stats = await fs.stat(systemPath);

      if (stats.isDirectory()) {
        const pdfFiles = await this.findPDFFiles(systemPath);

        for (const pdfFile of pdfFiles) {
          try {
            const structure = await this.analyzePDF(pdfFile);
            const systemId = path.basename(systemDir).toLowerCase();

            const templateData: SystemTemplateData = {
              systemId,
              structure,
              createdAt: new Date(),
              updatedAt: new Date()
            };

            results.push(templateData);
          } catch (error) {
            console.warn(`Failed to analyze PDF: ${pdfFile}`, error);
          }
        }
      }
    }

    return results;
  }

  /**
   * Finds all PDF files in a directory and subdirectories
   */
  private static async findPDFFiles(directoryPath: string): Promise<string[]> {
    const files = await fs.readdir(directoryPath);
    const pdfFiles: string[] = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        const subDirFiles = await this.findPDFFiles(filePath);
        pdfFiles.push(...subDirFiles);
      } else if (this.isPDFFile(file)) {
        pdfFiles.push(filePath);
      }
    }

    return pdfFiles;
  }

  /**
   * Checks if a file has a PDF extension
   */
  private static isPDFFile(fileName: string): boolean {
    const ext = path.extname(fileName).toLowerCase();
    return this.SUPPORTED_EXTENSIONS.includes(ext);
  }

  /**
   * Analyzes a single PDF file to extract structure and fields
   */
  private static async analyzePDF(pdfPath: string): Promise<PDFStructure> {
    const pdfBuffer = await fs.readFile(pdfPath);
    const pdfData: PDFContent = await pdfParse(pdfBuffer);

    // Extract basic metadata
    const metadata = {
      title: path.basename(pdfPath, '.pdf'),
      author: undefined,
      subject: undefined,
      keywords: []
    };

    // For now, return a basic structure since pdf-parse doesn't extract form fields
    // In a real implementation, we'd use a library like pdf-lib or similar that can extract form fields
    const structure: PDFStructure = {
      fields: [],
      sections: [],
      totalPages: pdfData.numpages || 1,
      metadata
    };

    // Basic text analysis to identify potential sections and fields
    const analyzedStructure = this.extractStructureFromText(pdfData.text, structure);

    return analyzedStructure;
  }

  /**
   * Extracts structure from PDF text content (basic implementation)
   */
  private static extractStructureFromText(text: string, baseStructure: PDFStructure): PDFStructure {
    // This is a simplified implementation - in reality, we'd need a more sophisticated
    // approach to identify form fields and sections from PDF content

    // Look for common RPG character sheet sections
    const sectionPatterns = [
      /identidade|identity|basic info/i,
      /atributos|attributes|stats/i,
      /perícias|pericias|skills|abilities/i,
      /combate|combat/i,
      /magia|magic|spells/i,
      /equipamento|equipment/i,
      /história|history|background/i
    ];

    const sections: typeof baseStructure.sections = [];

    for (const pattern of sectionPatterns) {
      if (text.match(pattern)) {
        sections.push({
          title: pattern.source.replace(/[\/gi]/g, ''),
          fields: [],
          position: { x: 0, y: 0 },
          size: { width: 0, height: 0 },
          page: 1
        });
      }
    }

    return {
      ...baseStructure,
      sections
    };
  }

  /**
   * Saves template data to a JSON file
   */
  public static async saveTemplateData(data: SystemTemplateData[], outputPath: string): Promise<void> {
    const jsonData = JSON.stringify(data, (key, value) =>
      key === 'createdAt' || key === 'updatedAt' ? value.toISOString() : value,
      2
    );

    await fs.writeFile(outputPath, jsonData, 'utf8');
  }
}