import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalVideo } from '@/hooks/useMyVideos';
import { getYouTubeThumbnailUrl } from '@/types/judo';
import { normalizeUrl } from '@/lib/url';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: PersonalVideo;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export function VideoCard({ video, onToggleFavorite, onDelete }: VideoCardProps) {
  const thumbnailUrl = getYouTubeThumbnailUrl(video.url, 'hqdefault');
  const normalizedUrl = normalizeUrl(video.url);

  return (
    <div className="group card-universe overflow-hidden">
      {/* Thumbnail - links to YouTube */}
      <a
        href={normalizedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-video bg-muted overflow-hidden block"
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <ExternalLink className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
            <ExternalLink className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>

        {/* Favorite badge */}
        {video.isFavorite && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive flex items-center justify-center">
            <Heart className="w-4 h-4 text-destructive-foreground" fill="currentColor" />
          </div>
        )}
      </a>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {video.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFavorite}
            className={cn(
              "gap-1",
              video.isFavorite && "text-destructive hover:text-destructive/80"
            )}
          >
            <Heart className="w-4 h-4" fill={video.isFavorite ? "currentColor" : "none"} />
            <span className="sr-only sm:not-sr-only">
              {video.isFavorite ? 'Убрать' : 'Избранное'}
            </span>
          </Button>
          
          <a
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto"
          >
            <Button variant="ghost" size="sm" className="gap-1">
              <ExternalLink className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">YouTube</span>
            </Button>
          </a>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
