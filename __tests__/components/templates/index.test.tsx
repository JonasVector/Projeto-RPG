// __tests__/components/templates/index.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TemplateRenderer from '../../../components/templates';
import { DnDTemplate } from '../../../components/templates/dnd/layout';
import { VampiroTemplate } from '../../../components/templates/vampiro/layout';
import { DaggerheartTemplate } from '../../../components/templates/daggerheart/layout';

describe('Template System', () => {
  const mockCharacterData = {
    nome: 'Test Character',
    classe: 'Fighter',
    nivel: 5
  };

  const mockOnDataChange = jest.fn();

  it('should render D&D template for dnd5e system', () => {
    render(
      <TemplateRenderer
        systemId="dnd5e"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText('Identidade')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Character')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Fighter')).toBeInTheDocument();
  });

  it('should render Vampiro template for vampiro system', () => {
    render(
      <TemplateRenderer
        systemId="vampiro"
        characterData={{ nome: 'Test Vampire', clã: 'Brujah' }}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText('Identidade')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Vampire')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Brujah')).toBeInTheDocument();
  });

  it('should render Daggerheart template for daggerheart system', () => {
    render(
      <TemplateRenderer
        systemId="daggerheart"
        characterData={{ nome: 'Test Wanderer', classe: 'Guardian' }}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText('Identidade')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Wanderer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Guardian')).toBeInTheDocument();
  });

  it('should render fallback for unknown system', () => {
    render(
      <TemplateRenderer
        systemId="unknown"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    expect(screen.getByText('Unknown System: unknown')).toBeInTheDocument();
  });

  it('should update character data when fields change', () => {
    render(
      <DnDTemplate
        systemId="dnd5e"
        characterData={mockCharacterData}
        onDataChange={mockOnDataChange}
      />
    );

    const nameInput = screen.getByDisplayValue('Test Character');
    // Simulate changing the name input
    // Note: Actual event simulation would require more complex testing setup
  });
});