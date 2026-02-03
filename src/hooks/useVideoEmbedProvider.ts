import { useEffect, useState } from 'react';
import type { YouTubeEmbedProvider } from '@/types/judo';

const STORAGE_KEY = 'dmitry-video-embed-provider';
// Default to Piped since YouTube embeds are often blocked
const DEFAULT_PROVIDER: YouTubeEmbedProvider = 'piped';

const isProvider = (value: string | null): value is YouTubeEmbedProvider => {
  return value === 'youtube' || value === 'youtube-nocookie' || value === 'piped' || value === 'invidious';
};

export function useVideoEmbedProvider() {
  const [provider, setProviderState] = useState<YouTubeEmbedProvider>(DEFAULT_PROVIDER);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isProvider(stored)) setProviderState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setProvider = (next: YouTubeEmbedProvider) => {
    setProviderState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return { provider, setProvider };
}
