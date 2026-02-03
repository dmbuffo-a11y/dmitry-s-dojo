import { useState, useEffect, useCallback } from 'react';
import { JudoThrow, VideoItem } from '@/types/judo';
import { kodokanThrowsDatabase } from '@/data/kodokanThrows';

const THROWS_STORAGE_KEY = 'dmitry-judo-throws';
const THROWS_VERSION_KEY = 'dmitry-judo-throws-version';
const CURRENT_VERSION = 2; // Increment when defaultThrows change

// Build default throws from the Kodokan database (verified embed-friendly links)
const buildDefaultThrows = (): JudoThrow[] => {
  const selectedTechniques = [
    'Seoi Nage',
    'Ippon Seoi Nage',
    'Tai Otoshi',
    'Kata Guruma',
    'Uchi Mata',
    'Harai Goshi',
    'O Goshi',
    'Koshi Guruma',
    'Sode Tsurikomi Goshi',
    'Osoto Gari',
    'Ouchi Gari',
    'Kouchi Gari',
    'De Ashi Harai',
    'Tomoe Nage',
    'Sumi Gaeshi',
  ];

  return selectedTechniques
    .map((name, index) => {
      const kodokan = kodokanThrowsDatabase.find(
        (t) => t.name.toLowerCase() === name.toLowerCase()
      );
      if (!kodokan) return null;
      return {
        id: (index + 1).toString(),
        name: kodokan.name,
        kanji: kodokan.kanji,
        videos: kodokan.videos,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as JudoThrow;
    })
    .filter((t): t is JudoThrow => t !== null);
};

const defaultThrows = buildDefaultThrows();

export function useThrows() {
  const [throws, setThrows] = useState<JudoThrow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load throws from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(THROWS_STORAGE_KEY);
    const storedVersion = parseInt(localStorage.getItem(THROWS_VERSION_KEY) || '0', 10);

    const persistDefaults = () => {
      setThrows(defaultThrows);
      localStorage.setItem(THROWS_STORAGE_KEY, JSON.stringify(defaultThrows));
      localStorage.setItem(THROWS_VERSION_KEY, String(CURRENT_VERSION));
    };

    // If no stored data or version mismatch, use fresh defaults
    if (!stored || storedVersion < CURRENT_VERSION) {
      persistDefaults();
      setIsLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
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
    setThrows((prev) => [...prev, newThrow]);
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
    setThrows((prev) => [...prev, newThrow]);
    return newThrow;
  };

  const updateThrow = (id: string, updates: Partial<JudoThrow>) => {
    setThrows((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const addVideoToThrow = (throwId: string, video: VideoItem) => {
    setThrows((prev) =>
      prev.map((t) =>
        t.id === throwId
          ? { ...t, videos: [...t.videos, video], updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const removeThrow = (id: string) => {
    setThrows((prev) => prev.filter((t) => t.id !== id));
  };

  const moveToMyThrows = (id: string) => {
    setThrows((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isWip: false, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const resetToDefaults = () => {
    const fresh = buildDefaultThrows();
    setThrows(fresh);
    localStorage.setItem(THROWS_STORAGE_KEY, JSON.stringify(fresh));
    localStorage.setItem(THROWS_VERSION_KEY, String(CURRENT_VERSION));
  };

  /**
   * Refresh video links for all throws using the Kodokan database.
   * Preserves user-added throws and uploaded videos.
   */
  const refreshVideosFromDatabase = useCallback(() => {
    setThrows((prev) =>
      prev.map((t) => {
        const kodokan = kodokanThrowsDatabase.find(
          (k) => k.name.toLowerCase() === t.name.toLowerCase()
        );
        if (!kodokan) return t; // Keep user-added throws unchanged

        // Preserve any user-uploaded videos, replace youtube links from database
        const userUploads = t.videos.filter((v) => v.type === 'uploaded');
        const newYoutubeVideos = kodokan.videos;

        return {
          ...t,
          videos: [...newYoutubeVideos, ...userUploads],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const getThrow = (id: string) => throws.find((t) => t.id === id);

  const myThrows = throws.filter((t) => !t.isWip);
  const wipThrows = throws.filter((t) => t.isWip);

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
    refreshVideosFromDatabase,
    getThrow,
  };
}
