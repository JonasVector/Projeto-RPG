// __tests__/lib/pdf-analyzer.test.ts
import { PDFAnalyzer } from '../../lib/pdf-analyzer';
import fs from 'fs/promises';
import path from 'path';

// Mock pdf-parse since we can't easily test with real PDFs in a test environment
jest.mock('pdf-parse', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    text: 'Nome: ___________________\nClasse: ___________________\nNível: _______',
    numpages: 1,
    version: '1.0'
  })
}));

describe('PDFAnalyzer', () => {
  const mockDirectory = 'test/fixtures/fichasderpg';

  beforeEach(() => {
    // Create mock directory structure for testing
    jest.spyOn(fs, 'readdir').mockResolvedValue(['dnd', 'vampiro']);
    jest.spyOn(fs, 'stat').mockImplementation((filePath: string) => {
      if (typeof filePath === 'string') {
        if (filePath.includes('dnd') || filePath.includes('vampiro')) {
          return Promise.resolve({ isDirectory: () => true, isFile: () => false } as any);
        }
        if (filePath.endsWith('.pdf')) {
          return Promise.resolve({ isDirectory: () => false, isFile: () => true } as any);
        }
      }
      return Promise.resolve({ isDirectory: () => false, isFile: () => true } as any);
    });
    jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from('mock pdf content'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should scan directory and return system template data', async () => {
    const results = await PDFAnalyzer.scanDirectory(mockDirectory);

    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should save template data to JSON file', async () => {
    const mockData = [{
      systemId: 'dnd',
      structure: {
        fields: [],
        sections: [],
        totalPages: 1,
        metadata: { title: 'dnd' }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    const writeFileSpy = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    await PDFAnalyzer.saveTemplateData(mockData, 'test-output.json');

    expect(writeFileSpy).toHaveBeenCalledWith(
      'test-output.json',
      expect.any(String),
      'utf8'
    );
  });
});