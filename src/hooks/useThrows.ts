import { useState, useEffect } from 'react';
import { JudoThrow, VideoItem } from '@/types/judo';

const THROWS_STORAGE_KEY = 'dmitry-judo-throws';

// Sample throws to start with
const defaultThrows: JudoThrow[] = [
  {
    id: '1',
    name: 'Seoi Nage',
    kanji: '背負投',
    videos: [
      { id: 'v1', url: 'https://www.youtube.com/watch?v=yaov_VhGlN8', type: 'youtube', title: 'Seoi Nage Tutorial' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Uchi Mata',
    kanji: '内股',
    videos: [
      { id: 'v2', url: 'https://www.youtube.com/watch?v=3Jj4bGdF-Zg', type: 'youtube', title: 'Uchi Mata Breakdown' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Osoto Gari',
    kanji: '大外刈',
    videos: [
      { id: 'v3', url: 'https://www.youtube.com/watch?v=8AXYqY7JfOc', type: 'youtube', title: 'Osoto Gari Technique' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Tai Otoshi',
    kanji: '体落',
    videos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useThrows() {
  const [throws, setThrows] = useState<JudoThrow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load throws from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(THROWS_STORAGE_KEY);
    const persistDefaults = () => {
      setThrows(defaultThrows);
      localStorage.setItem(THROWS_STORAGE_KEY, JSON.stringify(defaultThrows));
    };

    if (!stored) {
      persistDefaults();
      setIsLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      // If storage is corrupted or empty ("[]"), fall back to defaults.
      if (!Array.isArray(parsed) || parsed.length === 0) {
        persistDefaults();
      } else {
        setThrows(parsed);
      }
    } catch {
      persistDefaults();
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever throws change
  useEffect(() => {
    if (!isLoading && throws.length > 0) {
      localStorage.setItem(THROWS_STORAGE_KEY, JSON.stringify(throws));
    }
  }, [throws, isLoading]);

  const addThrow = (name: string, kanji?: string, video?: VideoItem) => {
    const newThrow: JudoThrow = {
      id: Date.now().toString(),
      name,
      kanji,
      videos: video ? [video] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setThrows(prev => [...prev, newThrow]);
    return newThrow;
  };

  const addWipThrow = (name: string, kanji?: string, video?: VideoItem) => {
    const newThrow: JudoThrow = {
      id: Date.now().toString(),
      name,
      kanji,
      videos: video ? [video] : [],
      isWip: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setThrows(prev => [...prev, newThrow]);
    return newThrow;
  };

  const updateThrow = (id: string, updates: Partial<JudoThrow>) => {
    setThrows(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, ...updates, updatedAt: new Date().toISOString() } 
          : t
      )
    );
  };

  const addVideoToThrow = (throwId: string, video: VideoItem) => {
    setThrows(prev => 
      prev.map(t => 
        t.id === throwId 
          ? { ...t, videos: [...t.videos, video], updatedAt: new Date().toISOString() } 
          : t
      )
    );
  };

  const removeThrow = (id: string) => {
    setThrows(prev => prev.filter(t => t.id !== id));
  };

  const moveToMyThrows = (id: string) => {
    setThrows(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, isWip: false, updatedAt: new Date().toISOString() } 
          : t
      )
    );
  };

  const getThrow = (id: string) => throws.find(t => t.id === id);

  const myThrows = throws.filter(t => !t.isWip);
  const wipThrows = throws.filter(t => t.isWip);

  return {
    throws,
    myThrows,
    wipThrows,
    isLoading,
    addThrow,
    addWipThrow,
    updateThrow,
    addVideoToThrow,
    removeThrow,
    moveToMyThrows,
    getThrow,
  };
}
