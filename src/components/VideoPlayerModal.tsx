import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getYouTubeEmbedUrl } from '@/types/judo';

interface VideoPlayerModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ url, title, isOpen, onClose }: VideoPlayerModalProps) {
  const embedUrl = getYouTubeEmbedUrl(url);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] bg-card border-0 shadow-modal p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-bold pr-8">{title}</DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2 space-y-3">
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
                  <a href={url} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Открыть ссылку
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button asChild variant="link" className="h-auto p-0 gap-2">
              <a href={url} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4" />
                Открыть в YouTube
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
