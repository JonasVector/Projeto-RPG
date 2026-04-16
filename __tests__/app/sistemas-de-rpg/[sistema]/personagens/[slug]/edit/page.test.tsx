// __tests__/app/sistemas-de-rpg/[sistema]/personagens/[slug]/edit/page.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import EditCharacterPage from '../../../../../../../app/sistemas-de-rpg/[sistema]/personagens/[slug]/edit/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ sistema: 'dnd5e', slug: 'test-character' }),
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock character data in localStorage
const mockCharacterData = [
  {
    id: '1',
    slug: 'test-character',
    sistema: 'dnd5e',
    nome: 'Test Character',
    dados: {
      nome: 'Test Character',
      classe: 'Fighter',
      nivel: 5
    },
    criadoEm: '2023-01-01T00:00:00Z',
    atualizadoEm: '2023-01-01T00:00:00Z'
  }
];

beforeEach(() => {
  localStorage.setItem('characters_dnd5e', JSON.stringify(mockCharacterData));
  jest.clearAllMocks();
});

afterEach(() => {
  localStorage.clear();
});

describe('EditCharacterPage', () => {
  it('should render the edit page with character data', async () => {
    render(<EditCharacterPage />);

    await waitFor(() => {
      expect(screen.getByText('Editar Test Character')).toBeInTheDocument();
      expect(screen.getByText('Sistema: dnd5e')).toBeInTheDocument();
      expect(screen.getByText('Identidade')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Character')).toBeInTheDocument();
    });
  });

  it('should show loading state initially', () => {
    render(<EditCharacterPage />);

    expect(screen.getByText('Carregando personagem...')).toBeInTheDocument();
  });

  it('should show error if character not found', async () => {
    // Clear localStorage to simulate character not found
    localStorage.clear();

    render(<EditCharacterPage />);

    await waitFor(() => {
      expect(screen.getByText('Personagem não encontrado')).toBeInTheDocument();
    });
  });

  it('should render different system templates based on sistema param', async () => {
    // This would require mocking different character data for different systems
    render(<EditCharacterPage />);

    await waitFor(() => {
      // For dnd5e system, should show D&D specific sections
      expect(screen.getByText('Identidade')).toBeInTheDocument();
      expect(screen.getByText('Atributos')).toBeInTheDocument();
    });
  });
});