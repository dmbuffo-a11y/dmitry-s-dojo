import { X, ExternalLink } from 'lucide-react';
import { JudoThrow } from '@/types/judo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { normalizeUrl } from '@/lib/url';

interface ThrowDetailProps {
  judoThrow: JudoThrow | null;
  isOpen: boolean;
  onClose: () => void;
  onMoveToMyThrows?: () => void;
}

export function ThrowDetail({ judoThrow, isOpen, onClose, onMoveToMyThrows }: ThrowDetailProps) {
  if (!judoThrow) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-0 shadow-modal">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {judoThrow.name}
            </DialogTitle>
            {judoThrow.kanji && (
              <p className="text-lg text-muted-foreground mt-1">{judoThrow.kanji}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {judoThrow.videos.length > 0 ? (
            judoThrow.videos.map((video, index) => (
              <a
                key={video.id}
                href={normalizeUrl(video.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
              >
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {video.title || `Видео ${index + 1}`}
                </span>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Видео пока нет.</p>
            </div>
          )}
        </div>

        {judoThrow.isWip && onMoveToMyThrows && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button 
              onClick={onMoveToMyThrows}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Перенести в My Throws
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
