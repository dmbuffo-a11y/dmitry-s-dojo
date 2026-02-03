import { useState, useEffect } from 'react';

export interface PersonalVideo {
  id: string;
  url: string;
  title: string;
  description?: string;
  isFavorite?: boolean;
  createdAt: string;
}

const VIDEOS_STORAGE_KEY = 'dmitry-judo-my-videos';

export function useMyVideos() {
  const [videos, setVideos] = useState<PersonalVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(VIDEOS_STORAGE_KEY);
    if (stored) {
      try {
        setVideos(JSON.parse(stored));
      } catch {
        setVideos([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videos));
    }
  }, [videos, isLoading]);

  const addVideo = (url: string, title: string, description?: string) => {
    const newVideo: PersonalVideo = {
      id: Date.now().toString(),
      url,
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    setVideos(prev => [newVideo, ...prev]);
    return newVideo;
  };

  const updateVideo = (id: string, updates: Partial<PersonalVideo>) => {
    setVideos(prev => 
      prev.map(v => v.id === id ? { ...v, ...updates } : v)
    );
  };

  const removeVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setVideos(prev => 
      prev.map(v => v.id === id ? { ...v, isFavorite: !v.isFavorite } : v)
    );
  };

  const favorites = videos.filter(v => v.isFavorite);

  return {
    videos,
    favorites,
    isLoading,
    addVideo,
    updateVideo,
    removeVideo,
    toggleFavorite,
  };
}
