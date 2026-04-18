// components/ficha/CharacterImageUpload.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface CharacterImageUploadProps {
  onImageChange: (imageData: string | null) => void;
  currentImage?: string | null;
  className?: string;
  systemId?: string;
}

const CharacterImageUpload: React.FC<CharacterImageUploadProps> = ({
  onImageChange,
  currentImage,
  className = '',
  systemId = 'generic'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Por favor, selecione um arquivo de imagem (JPEG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter menos de 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        onImageChange(imageData);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError('Erro ao ler o arquivo');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Erro ao processar a imagem');
      setIsUploading(false);
    }
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine styling based on system
  const getSystemClasses = () => {
    switch (systemId.toLowerCase()) {
      case 'dnd':
        return 'border-amber-700 bg-gradient-to-br from-amber-900/20 to-transparent';
      case 'vampiro':
        return 'border-red-700 bg-gradient-to-br from-red-900/20 to-transparent';
      case 'daggerheart':
        return 'border-purple-700 bg-gradient-to-br from-purple-900/20 to-transparent';
      default:
        return 'border-gray-700 bg-gradient-to-br from-gray-800/20 to-transparent';
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-3 text-gray-300">Retrato do Personagem</h3>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : getSystemClasses()}
          ${previewUrl ? 'border-solid' : ''}
        `}
      >
        <input {...getInputProps()} ref={fileInputRef} />

        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Prévia do retrato do personagem"
              className="max-w-full max-h-64 mx-auto rounded object-contain"
            />
            <div className="mt-2 flex justify-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
              >
                Remover
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Trocar Imagem
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-1">
              {isDragActive ? 'Solte a imagem aqui' : 'Arraste e solte uma imagem aqui, ou clique para selecionar'}
            </p>
            <p className="text-gray-500 text-sm">JPG, PNG, GIF (max 5MB)</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default CharacterImageUpload;