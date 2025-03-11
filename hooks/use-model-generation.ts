import { useState } from 'react';
import type { MeshyResponse } from '@/lib/types/meshy';

interface ModelGenerationState {
  isLoading: boolean;
  error: string | null;
  result: MeshyResponse | null;
}

export function useModelGeneration() {
  const [state, setState] = useState<ModelGenerationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const generateFromText = async (prompt: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const response = await fetch('/api/meshy/text-to-3d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      setState({ isLoading: false, error: null, result: data });
      return data;
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate model',
        result: null,
      });
      throw error;
    }
  };

  const generateFromImage = async (imageUrl: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const response = await fetch('/api/meshy/image-to-3d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      setState({ isLoading: false, error: null, result: data });
      return data;
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate model',
        result: null,
      });
      throw error;
    }
  };

  const reset = () => {
    setState({ isLoading: false, error: null, result: null });
  };

  return {
    ...state,
    generateFromText,
    generateFromImage,
    reset,
  };
} 