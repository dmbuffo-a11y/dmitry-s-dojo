export interface JudoThrow {
  id: string;
  name: string;
  kanji?: string;
  videos: VideoItem[];
  isWip?: boolean;
  isTrending?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoItem {
  id: string;
  url: string;
  type: 'youtube' | 'uploaded';
  title?: string;
}

export interface Competition {
  id: string;
  name: string;
  date: string;
  location: string;
  externalUrl?: string;
  description?: string;
}

export interface FocusItem {
  id: string;
  type: 'throw' | 'warmup' | 'statement';
  content: string;
  throwId?: string;
  videoUrl?: string;
}

// Helper to extract YouTube video ID
export const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

// Helper to generate YouTube embed URL
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};
