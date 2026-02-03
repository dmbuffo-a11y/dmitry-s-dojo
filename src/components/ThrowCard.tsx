import { useState } from 'react';
import { Play } from 'lucide-react';
import { JudoThrow, getYouTubeEmbedUrl } from '@/types/judo';
import { cn } from '@/lib/utils';

interface ThrowCardProps {
  judoThrow: JudoThrow;
  onClick: () => void;
  isWip?: boolean;
}

export function ThrowCard({ judoThrow, onClick, isWip }: ThrowCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasVideos = judoThrow.videos.length > 0;
  const thumbnailUrl = hasVideos && judoThrow.videos[0].type === 'youtube'
    ? `https://img.youtube.com/vi/${getYouTubeEmbedUrl(judoThrow.videos[0].url)?.split('/').pop()}/mqdefault.jpg`
    : null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'card-universe overflow-hidden text-left w-full transition-all duration-300',
        isWip && 'opacity-80'
      )}
    >
      {/* Thumbnail or placeholder */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={judoThrow.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-secondary">
            <span className="text-4xl font-bold text-accent-foreground/20">
              {judoThrow.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Play overlay */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-foreground/10 transition-opacity duration-200',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          {hasVideos && (
            <div className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-foreground ml-1" />
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {judoThrow.isTrending && (
            <span className="badge-trending">Trending</span>
          )}
          {isWip && (
            <span className="badge-wip">WIP</span>
          )}
        </div>
      </div>
      
      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {judoThrow.name}
        </h3>
        {judoThrow.kanji && (
          <p className="text-sm text-muted-foreground">{judoThrow.kanji}</p>
        )}
        {hasVideos && (
          <p className="text-xs text-muted-foreground mt-2">
            {judoThrow.videos.length} video{judoThrow.videos.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </button>
  );
}
