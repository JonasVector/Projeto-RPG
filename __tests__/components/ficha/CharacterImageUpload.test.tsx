// __tests__/components/ficha/CharacterImageUpload.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterImageUpload from '../../../components/ficha/CharacterImageUpload';

describe('CharacterImageUpload', () => {
  const mockOnImageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the upload area', () => {
    render(<CharacterImageUpload onImageChange={mockOnImageChange} />);

    expect(screen.getByText(/arraste e solte uma imagem aqui/i)).toBeInTheDocument();
    expect(screen.getByText('JPG, PNG, GIF (max 5MB)')).toBeInTheDocument();
  });

  it('should show error for invalid file type', async () => {
    render(<CharacterImageUpload onImageChange={mockOnImageChange} />);

    // Create a mock file with invalid type
    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });

    const dropzone = screen.getByText(/arraste e solte uma imagem aqui/i).closest('div');
    Object.defineProperty(dropzone, 'files', {
      value: [invalidFile]
    });

    fireEvent.drop(dropzone);

    await waitFor(() => {
      expect(screen.getByText(/por favor, selecione um arquivo de imagem/i)).toBeInTheDocument();
    });
  });

  it('should handle image preview and change callback', async () => {
    render(<CharacterImageUpload onImageChange={mockOnImageChange} />);

    // Create a mock image file
    const mockImageFile = new File(['dummy image content'], 'test.jpg', { type: 'image/jpeg' });

    const dropzone = screen.getByText(/arraste e solte uma imagem aqui/i).closest('div');

    // Mock URL.createObjectURL
    const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue('mock-preview-url');

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [mockImageFile]
      }
    });

    await waitFor(() => {
      expect(createObjectURLSpy).toHaveBeenCalled();
      expect(mockOnImageChange).toHaveBeenCalledWith(expect.any(String)); // base64 string
    });

    createObjectURLSpy.mockRestore();
  });

  it('should remove image when remove button is clicked', async () => {
    render(<CharacterImageUpload
      onImageChange={mockOnImageChange}
      currentImage="data:image/jpeg;base64,test"
    />);

    const removeButton = screen.getByText('Remover');
    fireEvent.click(removeButton);

    expect(mockOnImageChange).toHaveBeenCalledWith(null);
  });

  it('should apply system-specific styling', () => {
    const { rerender } = render(
      <CharacterImageUpload
        onImageChange={mockOnImageChange}
        systemId="dnd"
      />
    );

    const dropzone = screen.getByText(/arraste e solte uma imagem aqui/i).closest('div');
    expect(dropzone).toHaveClass('border-amber-700');

    rerender(
      <CharacterImageUpload
        onImageChange={mockOnImageChange}
        systemId="vampiro"
      />
    );

    expect(dropzone).toHaveClass('border-red-700');

    rerender(
      <CharacterImageUpload
        onImageChange={mockOnImageChange}
        systemId="daggerheart"
      />
    );

    expect(dropzone).toHaveClass('border-purple-700');
  });
});