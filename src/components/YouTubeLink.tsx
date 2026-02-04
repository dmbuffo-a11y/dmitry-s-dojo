import { ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YouTubeLinkProps {
  url: string;
  title?: string;
  variant?: 'button' | 'card' | 'inline';
  className?: string;
}

/**
 * Extracts video ID from various YouTube URL formats
 */
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Ensures URL has https:// prefix
 */
function ensureHttps(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed.replace(/^http:\/\//i, 'https://');
  }
  return `https://${trimmed}`;
}

/**
 * Component for YouTube links that ALWAYS open in a new tab.
 * Uses native anchor behavior - no JavaScript event handlers.
 */
export function YouTubeLink({ url, title, variant = 'button', className = '' }: YouTubeLinkProps) {
  const safeUrl = ensureHttps(url);
  const videoId = extractVideoId(safeUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;

  if (variant === 'card') {
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block group ${className}`}
      >
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title || 'YouTube video'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <Play className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
        {title && (
          <p className="mt-2 font-medium text-foreground group-hover:text-primary transition-colors">
            {title}
          </p>
        )}
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors ${className}`}
      >
        <ExternalLink className="w-4 h-4" />
        {title || 'Открыть на YouTube'}
      </a>
    );
  }

  // Default: button variant
  return (
    <Button asChild className={className}>
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        {title || 'Открыть на YouTube'}
      </a>
    </Button>
  );
}

/**
 * Get YouTube thumbnail URL from video URL
 */
export function getYouTubeThumbnail(url: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'maxresdefault' = 'mqdefault'): string | null {
  const videoId = extractVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
