// app/sistemas-de-rpg/[sistema]/personagens/[slug]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FichaTemplateRenderer from '../../../../../components/ficha/FichaTemplateRenderer';
import { CharacterData } from '../../../../../components/templates/types';

interface Character {
  id: string;
  slug: string;
  sistema: string;
  nome: string;
  dados: CharacterData;
  criadoEm: string;
  atualizadoEm: string;
}

const EditCharacterPage = () => {
  const params = useParams();
  const router = useRouter();
  const { sistema, slug } = params as { sistema: string; slug: string };

  const [character, setCharacter] = useState<Character | null>(null);
  const [characterData, setCharacterData] = useState<CharacterData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would fetch from an API
        // For now, we'll simulate with localStorage or a mock

        // Check if running in browser
        if (typeof window !== 'undefined') {
          const storedCharacters = localStorage.getItem(`characters_${sistema}`);
          if (storedCharacters) {
            const characters: Character[] = JSON.parse(storedCharacters);
            const foundCharacter = characters.find(c => c.slug === slug);

            if (foundCharacter) {
              setCharacter(foundCharacter);
              setCharacterData(foundCharacter.dados || {});
            } else {
              setError('Personagem não encontrado');
            }
          } else {
            setError('Nenhum personagem encontrado para este sistema');
          }
        }
      } catch (err) {
        console.error('Error fetching character:', err);
        setError('Erro ao carregar o personagem');
      } finally {
        setIsLoading(false);
      }
    };

    if (sistema && slug) {
      fetchCharacter();
    }
  }, [sistema, slug]);

  const handleDataChange = (newData: CharacterData) => {
    setCharacterData(newData);
  };

  const handleSave = async () => {
    if (!character) return;

    try {
      // Prepare updated character data
      const updatedCharacter: Character = {
        ...character,
        dados: characterData,
        atualizadoEm: new Date().toISOString()
      };

      // In a real implementation, this would be an API call
      // For now, we'll update localStorage
      if (typeof window !== 'undefined') {
        const storedCharacters = localStorage.getItem(`characters_${sistema}`);
        if (storedCharacters) {
          const characters: Character[] = JSON.parse(storedCharacters);
          const updatedCharacters = characters.map(c =>
            c.id === character.id ? updatedCharacter : c
          );
          localStorage.setItem(`characters_${sistema}`, JSON.stringify(updatedCharacters));
        }
      }

      // Navigate back to character view
      router.push(`/sistemas-de-rpg/${sistema}/personagens/${slug}`);
    } catch (err) {
      console.error('Error saving character:', err);
      setError('Erro ao salvar o personagem');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4">Carregando personagem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-6 bg-gray-800 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-4">Erro</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded text-white"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Personagem não encontrado</h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded text-white"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-amber-400 hover:text-amber-300 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
          </button>

          <h1 className="text-3xl font-bold text-amber-400 mb-2">
            Editar {character.nome}
          </h1>
          <p className="text-gray-400">
            Sistema: <span className="text-amber-400">{character.sistema}</span>
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <FichaTemplateRenderer
            systemId={sistema}
            characterData={characterData}
            onDataChange={handleDataChange}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg text-white font-medium transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCharacterPage;
