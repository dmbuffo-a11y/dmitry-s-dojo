import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VideoItem, getYouTubeEmbedUrl } from "@/types/judo";

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

  const embedUrl = getYouTubeEmbedUrl(video.url);
  const openUrl = video.url;

  return (
    <div className="space-y-3">
      <div className="aspect-video rounded-xl overflow-hidden bg-muted">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
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

      {/* Always provide a reliable way to open the original link */}
      <div className="flex justify-end">
        <Button asChild variant="link" className="h-auto p-0 gap-2">
          <a href={openUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4" />
            Открыть в YouTube
          </a>
        </Button>
      </div>
    </div>
  );
}
