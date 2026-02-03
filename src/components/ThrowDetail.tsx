import { X } from 'lucide-react';
import { JudoThrow } from '@/types/judo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VideoViewer } from '@/components/VideoViewer';

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-0 shadow-modal">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-3xl font-bold text-foreground">
              {judoThrow.name}
            </DialogTitle>
            {judoThrow.kanji && (
              <p className="text-xl text-muted-foreground mt-1">{judoThrow.kanji}</p>
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

        <div className="space-y-6 mt-6">
          {judoThrow.videos.length > 0 ? (
            judoThrow.videos.map((video, index) => {
              return (
                <div key={video.id} className="space-y-2">
                  {video.title && (
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {video.title}
                    </h4>
                  )}
                  <VideoViewer video={video} title={video.title || `Video ${index + 1}`} />
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No videos added yet.</p>
            </div>
          )}
        </div>

        {judoThrow.isWip && onMoveToMyThrows && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button 
              onClick={onMoveToMyThrows}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Move to My Throws
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
