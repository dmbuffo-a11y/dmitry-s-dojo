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

export type YouTubeEmbedProvider = 'youtube' | 'youtube-nocookie' | 'piped' | 'invidious';

// Helper to extract YouTube video ID
export const extractYouTubeId = (url: string): string | null => {
  // Prefer URL parsing (handles youtu.be, shorts, extra params, etc.)
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id && id.length === 11 ? id : null;
    }

    if (host.endsWith("youtube.com")) {
      // youtube.com/watch?v=<id>
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        return id && id.length === 11 ? id : null;
      }

      // youtube.com/embed/<id>
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIndex = parts.indexOf("embed");
      if (embedIndex >= 0 && parts[embedIndex + 1]) {
        const id = parts[embedIndex + 1];
        return id.length === 11 ? id : null;
      }

      // youtube.com/shorts/<id>
      const shortsIndex = parts.indexOf("shorts");
      if (shortsIndex >= 0 && parts[shortsIndex + 1]) {
        const id = parts[shortsIndex + 1];
        return id.length === 11 ? id : null;
      }
    }
  } catch {
    // ignore parsing errors, fall back to regex
  }

  // Fallback regex
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match?.[1] ?? null;
};

// Helper to generate YouTube embed URL
export const getYouTubeEmbedUrl = (
  url: string,
  provider: YouTubeEmbedProvider = 'youtube-nocookie'
): string | null => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  // These params improve compatibility in embedded contexts.
  const origin =
    typeof window !== 'undefined' && window.location?.origin ? window.location.origin : undefined;
  const ytParams = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    // Some environments behave better with origin explicitly set.
    ...(origin ? { origin } : {}),
  });

  switch (provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}?${ytParams.toString()}`;
    case 'youtube-nocookie':
      return `https://www.youtube-nocookie.com/embed/${videoId}?${ytParams.toString()}`;
    case 'piped':
      return `https://piped.video/embed/${videoId}`;
    case 'invidious':
      return `https://yewtu.be/embed/${videoId}`;
    default:
      return `https://www.youtube-nocookie.com/embed/${videoId}?${ytParams.toString()}`;
  }
};

export const getYouTubeThumbnailUrl = (url: string, quality: 'mqdefault' | 'hqdefault' = 'mqdefault'): string | null => {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : null;
};
