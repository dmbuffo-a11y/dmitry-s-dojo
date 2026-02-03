import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { extractYouTubeId, type YouTubeEmbedProvider, VideoItem, getYouTubeEmbedUrl } from "@/types/judo";
import { useVideoEmbedProvider } from "@/hooks/useVideoEmbedProvider";

interface VideoViewerProps {
  video: VideoItem;
  /** Title used for iframe/video accessibility */
  title: string;
}

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

  const { provider, setProvider } = useVideoEmbedProvider();
  const videoId = extractYouTubeId(video.url);

  const embedUrl = getYouTubeEmbedUrl(video.url, provider);
  const openUrl = video.url;
  const pipedUrl = videoId ? `https://piped.video/watch?v=${videoId}` : openUrl;
  const invidiousUrl = videoId ? `https://yewtu.be/watch?v=${videoId}` : openUrl;

  const providerOptions: Array<{ key: YouTubeEmbedProvider; label: string }> = [
    { key: "youtube-nocookie", label: "YouTube" },
    { key: "piped", label: "Piped" },
    { key: "invidious", label: "Invidious" },
  ];

  return (
    <div className="space-y-3">
      <div className="aspect-video rounded-xl overflow-hidden bg-muted">
        {embedUrl ? (
          <iframe
            key={provider}
            src={embedUrl}
            title={title}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
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
          Если видишь “Video unavailable” — переключи источник (запомнится для всех видео).
        </p>
        <div className="flex flex-wrap gap-2">
          {providerOptions.map((opt) => (
            <Button
              key={opt.key}
              type="button"
              size="sm"
              variant={provider === opt.key ? "default" : "outline"}
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
