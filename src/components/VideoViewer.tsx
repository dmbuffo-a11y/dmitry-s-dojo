import { useState, useEffect, useRef, useCallback } from "react";
import { ExternalLink, Loader2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  extractYouTubeId,
  type YouTubeEmbedProvider,
  VideoItem,
  getYouTubeEmbedUrl,
} from "@/types/judo";
import { useVideoEmbedProvider } from "@/hooks/useVideoEmbedProvider";

interface VideoViewerProps {
  video: VideoItem;
  /** Title used for iframe/video accessibility */
  title: string;
}

/**
 * Order of embed sources we try before giving up.
 * We prefer YouTube-nocookie, then Piped, then Invidious.
 */
const FALLBACK_ORDER: YouTubeEmbedProvider[] = [
  "youtube-nocookie",
  "piped",
  "invidious",
];

/** Time (ms) to wait for an embed to report success before trying the next. */
const EMBED_TIMEOUT_MS = 6000;

export function VideoViewer({ video, title }: VideoViewerProps) {
  if (video.type === "uploaded") {
    return (
      <div className="space-y-3">
        <video
          className="w-full h-full"
          controls
          playsInline
          preload="metadata"
          src={video.url}
        />
      </div>
    );
  }

  return <YouTubeViewer video={video} title={title} />;
}

/**
 * Separate component to keep hooks in one place (uploaded videos exit early).
 */
function YouTubeViewer({ video, title }: { video: VideoItem; title: string }) {
  const { provider, setProvider } = useVideoEmbedProvider();
  const videoId = extractYouTubeId(video.url);

  // ---- Auto-fallback state ----
  const [currentProvider, setCurrentProvider] =
    useState<YouTubeEmbedProvider>(provider);
  const [isLoading, setIsLoading] = useState(true);
  const [triedProviders, setTriedProviders] = useState<Set<YouTubeEmbedProvider>>(
    () => new Set()
  );
  const [allFailed, setAllFailed] = useState(false);

  // Reset state when video changes or user manually picks provider
  useEffect(() => {
    setCurrentProvider(provider);
    setIsLoading(true);
    setTriedProviders(new Set());
    setAllFailed(false);
  }, [video.url, provider]);

  // Timer ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tryNextProvider = useCallback(() => {
    const next = FALLBACK_ORDER.find(
      (p) => !triedProviders.has(p) && p !== currentProvider
    );
    if (next) {
      setTriedProviders((prev) => new Set(prev).add(currentProvider));
      setCurrentProvider(next);
      setIsLoading(true);
    } else {
      setAllFailed(true);
      setIsLoading(false);
    }
  }, [currentProvider, triedProviders]);

  // Start a timeout when provider changes
  useEffect(() => {
    if (allFailed) return;
    timeoutRef.current = setTimeout(() => {
      // If still loading after EMBED_TIMEOUT_MS, try next provider
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
  }, [currentProvider, allFailed, tryNextProvider]);

  const handleIframeLoad = () => {
    // Loaded doesn't guarantee "Video unavailable" is not shown (cross-origin),
    // but at least we know something loaded. Clear timer.
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoading(false);
  };

  const embedUrl = getYouTubeEmbedUrl(video.url, currentProvider);
  const openUrl = video.url;
  const pipedUrl = videoId
    ? `https://piped.video/watch?v=${videoId}`
    : openUrl;
  const invidiousUrl = videoId
    ? `https://yewtu.be/watch?v=${videoId}`
    : openUrl;

  const providerOptions: Array<{ key: YouTubeEmbedProvider; label: string }> = [
    { key: "youtube-nocookie", label: "YouTube" },
    { key: "piped", label: "Piped" },
    { key: "invidious", label: "Invidious" },
  ];

  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-muted/80 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Загрузка ({providerOptions.find((p) => p.key === currentProvider)?.label})…
            </span>
          </div>
        )}

        {allFailed ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground px-6 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <p>Не удалось встроить видео ни через один источник.</p>
            <Button asChild variant="secondary" className="gap-2">
              <a href={openUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4" />
                Открыть ссылку
              </a>
            </Button>
          </div>
        ) : embedUrl ? (
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
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground px-6 text-center">
            <p>Не удалось встроить видео.</p>
            <Button asChild variant="secondary" className="gap-2">
              <a href={openUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4" />
                Открыть ссылку
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Provider switch (persists in localStorage). Helps when videos are playable on YouTube, but blocked in embeds. */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">
          Переключи источник, если видео не загружается (запомнится для всех видео).
        </p>
        <div className="flex flex-wrap gap-2">
          {providerOptions.map((opt) => (
            <Button
              key={opt.key}
              type="button"
              size="sm"
              variant={currentProvider === opt.key ? "default" : "outline"}
              onClick={() => setProvider(opt.key)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Always provide a reliable way to open the original link */}
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <Button asChild variant="link" className="h-auto p-0 gap-2">
            <a href={openUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Открыть в YouTube
            </a>
          </Button>
          <Button asChild variant="link" className="h-auto p-0 gap-2">
            <a href={pipedUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Piped
            </a>
          </Button>
          <Button asChild variant="link" className="h-auto p-0 gap-2">
            <a href={invidiousUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Invidious
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
