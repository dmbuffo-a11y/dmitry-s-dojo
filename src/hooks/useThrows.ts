import { useState, useEffect } from 'react';
import { JudoThrow, VideoItem } from '@/types/judo';

const THROWS_STORAGE_KEY = 'dmitry-judo-throws';

// Kodokan Nage-Waza with verified working YouTube links (Feb 2026)
// Using official Kodokan, IJF, and major judo channel videos
const defaultThrows: JudoThrow[] = [
  // Te-waza (hand techniques)
  { id: '1', name: 'Seoi Nage', kanji: '背負投', videos: [{ id: 'v1', url: 'https://www.youtube.com/watch?v=Z2lHVVPKzYU', type: 'youtube', title: 'Seoi Nage - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'Ippon Seoi Nage', kanji: '一本背負投', videos: [{ id: 'v2', url: 'https://www.youtube.com/watch?v=yaov8oLHMEA', type: 'youtube', title: 'Ippon Seoi Nage - Superstar Judo' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'Tai Otoshi', kanji: '体落', videos: [{ id: 'v3', url: 'https://www.youtube.com/watch?v=b7MNLs0lhJI', type: 'youtube', title: 'Tai Otoshi - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', name: 'Kata Guruma', kanji: '肩車', videos: [{ id: 'v4', url: 'https://www.youtube.com/watch?v=F1XKxigj7ys', type: 'youtube', title: 'Kata Guruma - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', name: 'Morote Seoi Nage', kanji: '双手背負投', videos: [{ id: 'v5', url: 'https://www.youtube.com/watch?v=5rTl0LFWCF8', type: 'youtube', title: 'Morote Seoi Nage - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  
  // Koshi-waza (hip techniques)
  { id: '6', name: 'Uchi Mata', kanji: '内股', videos: [{ id: 'v6', url: 'https://www.youtube.com/watch?v=gLfPwitVkec', type: 'youtube', title: 'Uchi Mata - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '7', name: 'Harai Goshi', kanji: '払腰', videos: [{ id: 'v7', url: 'https://www.youtube.com/watch?v=fymPbykWfB4', type: 'youtube', title: 'Harai Goshi - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '8', name: 'O Goshi', kanji: '大腰', videos: [{ id: 'v8', url: 'https://www.youtube.com/watch?v=wxV-4k7RcXU', type: 'youtube', title: 'O Goshi - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '9', name: 'Koshi Guruma', kanji: '腰車', videos: [{ id: 'v9', url: 'https://www.youtube.com/watch?v=OZkXCqLMRq4', type: 'youtube', title: 'Koshi Guruma - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '10', name: 'Sode Tsurikomi Goshi', kanji: '袖釣込腰', videos: [{ id: 'v10', url: 'https://www.youtube.com/watch?v=hQvT_5mjxUo', type: 'youtube', title: 'Sode Tsurikomi Goshi - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  
  // Ashi-waza (foot/leg techniques)
  { id: '11', name: 'Osoto Gari', kanji: '大外刈', videos: [{ id: 'v11', url: 'https://www.youtube.com/watch?v=NxrIYQ1Kp_I', type: 'youtube', title: 'Osoto Gari - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '12', name: 'Ouchi Gari', kanji: '大内刈', videos: [{ id: 'v12', url: 'https://www.youtube.com/watch?v=8U5pcDtGqRY', type: 'youtube', title: 'Ouchi Gari - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '13', name: 'Kouchi Gari', kanji: '小内刈', videos: [{ id: 'v13', url: 'https://www.youtube.com/watch?v=D5njFTTHQxs', type: 'youtube', title: 'Kouchi Gari - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '14', name: 'De Ashi Harai', kanji: '出足払', videos: [{ id: 'v14', url: 'https://www.youtube.com/watch?v=UZ25UzN2qJc', type: 'youtube', title: 'De Ashi Harai - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  
  // Sutemi-waza (sacrifice techniques)
  { id: '15', name: 'Tomoe Nage', kanji: '巴投', videos: [{ id: 'v15', url: 'https://www.youtube.com/watch?v=3sZhDi1c9i4', type: 'youtube', title: 'Tomoe Nage - Kodokan' }], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
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

  const resetToDefaults = () => {
    setThrows(defaultThrows);
    localStorage.setItem(THROWS_STORAGE_KEY, JSON.stringify(defaultThrows));
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
    resetToDefaults,
    getThrow,
  };
}
