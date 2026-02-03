import { useState, useEffect, useRef, useCallback } from "react";
import { ExternalLink, Loader2, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  extractYouTubeId,
  type YouTubeEmbedProvider,
  VideoItem,
  getYouTubeEmbedUrl,
} from "@/types/judo";

interface VideoViewerProps {
  video: VideoItem;
  /** Title used for iframe/video accessibility */
  title: string;
}

/**
 * Order of embed sources we try before giving up.
 * Piped first (most reliable for embeds), then YouTube-nocookie, then Invidious.
 */
const FALLBACK_ORDER: YouTubeEmbedProvider[] = [
  "piped",
  "youtube-nocookie",
  "invidious",
];

/** Time (ms) to wait for an embed to report success before trying the next. */
const EMBED_TIMEOUT_MS = 5000;

export function VideoViewer({ video, title }: VideoViewerProps) {
  if (video.type === "uploaded") {
    return (
      <video
        className="w-full h-full rounded-xl"
        controls
        playsInline
        preload="metadata"
        src={video.url}
      />
    );
  }

  return <YouTubeViewer video={video} title={title} />;
}

/**
 * Clean YouTube viewer with auto-fallback. No manual provider switching.
 */
function YouTubeViewer({ video, title }: { video: VideoItem; title: string }) {
  const videoId = extractYouTubeId(video.url);

  // ---- Auto-fallback state ----
  const [providerIndex, setProviderIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [allFailed, setAllFailed] = useState(false);

  const currentProvider = FALLBACK_ORDER[providerIndex];

  // Reset state when video changes
  useEffect(() => {
    setProviderIndex(0);
    setIsLoading(true);
    setAllFailed(false);
  }, [video.url]);

  // Timer ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tryNextProvider = useCallback(() => {
    const nextIndex = providerIndex + 1;
    if (nextIndex < FALLBACK_ORDER.length) {
      setProviderIndex(nextIndex);
      setIsLoading(true);
    } else {
      setAllFailed(true);
      setIsLoading(false);
    }
  }, [providerIndex]);

  // Start a timeout when provider changes
  useEffect(() => {
    if (allFailed) return;
    timeoutRef.current = setTimeout(() => {
      // If still loading after timeout, try next provider
      setIsLoading((loading) => {
        if (loading) {
          tryNextProvider();
        }
        return loading;
      });
    }, EMBED_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [providerIndex, allFailed, tryNextProvider]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoading(false);
  };

  const embedUrl = getYouTubeEmbedUrl(video.url, currentProvider);
  const youtubeUrl = video.url;

  // If all embeds failed, show a clean fallback with one button
  if (allFailed) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground px-6 text-center">
          <Play className="h-12 w-12 text-primary" />
          <p className="text-sm">Видео не встраивается</p>
          <Button asChild size="lg" className="gap-2">
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Смотреть видео
            </a>
          </Button>
        </div>
      </div>
    );
  }

  // No valid embed URL
  if (!embedUrl) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground px-6 text-center">
          <Play className="h-12 w-12 text-primary" />
          <Button asChild size="lg" className="gap-2">
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Смотреть видео
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/80">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      <iframe
        key={currentProvider}
        src={embedUrl}
        title={title}
        className="w-full h-full"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleIframeLoad}
      />
    </div>
  );
}
