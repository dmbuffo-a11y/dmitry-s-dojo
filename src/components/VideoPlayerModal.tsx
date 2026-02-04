import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { normalizeUrl } from '@/lib/url';

interface VideoPlayerModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Simple modal that shows video info and a button to open on YouTube.
 * No iframe - just a clean external link.
 */
export function VideoPlayerModal({ url, title, isOpen, onClose }: VideoPlayerModalProps) {
  const normalizedUrl = normalizeUrl(url);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card border-0 shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-8">{title}</DialogTitle>
        </DialogHeader>

        <div className="py-6 text-center">
          <p className="text-muted-foreground mb-6">
            Нажми кнопку, чтобы открыть видео на YouTube
          </p>
          
          <Button asChild size="lg" className="gap-2">
            <a
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5" />
              Открыть на YouTube
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
