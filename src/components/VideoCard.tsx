import { Play, Heart, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalVideo } from '@/hooks/useMyVideos';
import { getYouTubeThumbnailUrl } from '@/types/judo';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: PersonalVideo;
  onPlay: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export function VideoCard({ video, onPlay, onToggleFavorite, onDelete }: VideoCardProps) {
  const thumbnailUrl = getYouTubeThumbnailUrl(video.url, 'hqdefault');

  return (
    <div className="group card-universe overflow-hidden">
      {/* Thumbnail */}
      <button
        onClick={onPlay}
        className="relative w-full aspect-video bg-muted overflow-hidden"
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Play className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Favorite badge */}
        {video.isFavorite && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive flex items-center justify-center">
            <Heart className="w-4 h-4 text-destructive-foreground" fill="currentColor" />
          </div>
        )}
      </button>

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
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto"
          >
            <Button variant="ghost" size="sm" className="gap-1">
              <ExternalLink className="w-4 h-4" />
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
