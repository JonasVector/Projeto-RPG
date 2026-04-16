// components/ficha/FichaTemplateRenderer.tsx
import React, { useState, useEffect } from 'react';
import { TemplateRenderer } from '../templates';
import CharacterImageUpload from './CharacterImageUpload';
import { CharacterData } from '../templates/types';

interface FichaTemplateRendererProps {
  systemId: string;
  characterData: CharacterData;
  onDataChange: (data: CharacterData) => void;
  className?: string;
}

const FichaTemplateRenderer: React.FC<FichaTemplateRendererProps> = ({
  systemId,
  characterData,
  onDataChange,
  className = ''
}) => {
  const [localCharacterData, setLocalCharacterData] = useState<CharacterData>(characterData);

  // Sync with parent data changes
  useEffect(() => {
    setLocalCharacterData(characterData);
  }, [characterData]);

  const handleDataChange = (newData: CharacterData) => {
    setLocalCharacterData(newData);
    onDataChange(newData);
  };

  const handleImageChange = (imageData: string | null) => {
    const updatedData = {
      ...localCharacterData,
      imagem: imageData
    };
    handleDataChange(updatedData);
  };

  // Extract current image from character data
  const currentImage = localCharacterData.imagem || null;

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <CharacterImageUpload
        currentImage={currentImage}
        onImageChange={handleImageChange}
        systemId={systemId}
      />

      <TemplateRenderer
        systemId={systemId}
        characterData={localCharacterData}
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default FichaTemplateRenderer;