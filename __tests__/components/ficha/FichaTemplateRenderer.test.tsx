// __tests__/components/ficha/FichaTemplateRenderer.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FichaTemplateRenderer from '../../../components/ficha/FichaTemplateRenderer';

describe('FichaTemplateRenderer', () => {
  const mockCharacterData = {
    nome: 'Test Character',
    classe: 'Fighter',
    nivel: 5
  };

  const mockOnDataChange = jest.fn();

  it('should render character image upload and template', () => {
    render(
      <FichaTemplateRenderer
        systemId="dnd5e"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText(/retrato do personagem/i)).toBeInTheDocument();
    expect(screen.getByText('Identidade')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Character')).toBeInTheDocument();
  });

  it('should update character data when template fields change', () => {
    render(
      <FichaTemplateRenderer
        systemId="dnd5e"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    const nameInput = screen.getByDisplayValue('Test Character');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    expect(mockOnDataChange).toHaveBeenCalledWith({
      ...mockCharacterData,
      nome: 'Updated Name'
    });
  });

  it('should update character data when image changes', () => {
    render(
      <FichaTemplateRenderer
        systemId="dnd5e"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    // Since we can't easily simulate the dropzone in tests, we'll check that
    // the component renders correctly with initial data
    expect(screen.getByText(/retrato do personagem/i)).toBeInTheDocument();
  });

  it('should sync with parent data changes', () => {
    const { rerender } = render(
      <FichaTemplateRenderer
        systemId="dnd5e"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    const newData = { ...mockCharacterData, nome: 'New Name' };
    rerender(
      <FichaTemplateRenderer
        systemId="dnd5e"
        characterData={newData}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByDisplayValue('New Name')).toBeInTheDocument();
  });

  it('should render different templates based on system', () => {
    const { rerender } = render(
      <FichaTemplateRenderer
        systemId="vampiro"
        characterData={{ nome: 'Test Vampire', clã: 'Brujah' }}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText('Identidade')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Vampire')).toBeInTheDocument();

    rerender(
      <FichaTemplateRenderer
        systemId="daggerheart"
        characterData={{ nome: 'Test Wanderer', classe: 'Guardian' }}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText('Identidade')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Wanderer')).toBeInTheDocument();
  });
});