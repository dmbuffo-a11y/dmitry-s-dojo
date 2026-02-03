import { useState } from 'react';
import { Heart, Film } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { VideoCard } from '@/components/VideoCard';
import { AddVideoModal } from '@/components/AddVideoModal';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';
import { useMyVideos, PersonalVideo } from '@/hooks/useMyVideos';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'favorites';

export default function MyVideos() {
  const { videos, favorites, isLoading, addVideo, removeVideo, toggleFavorite } = useMyVideos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedVideo, setSelectedVideo] = useState<PersonalVideo | null>(null);

  const displayedVideos = filter === 'favorites' ? favorites : videos;

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              My Videos
            </h1>
            <p className="text-lg text-muted-foreground">
              Твои лучшие моменты и любимые видео
            </p>
          </div>
          <AddVideoModal onAdd={addVideo} />
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="gap-2"
          >
            <Film className="w-4 h-4" />
            Все ({videos.length})
          </Button>
          <Button
            variant={filter === 'favorites' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('favorites')}
            className={cn("gap-2", filter === 'favorites' && "bg-destructive hover:bg-destructive/90")}
          >
            <Heart className="w-4 h-4" fill={filter === 'favorites' ? 'currentColor' : 'none'} />
            Избранное ({favorites.length})
          </Button>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card-universe aspect-video animate-pulse bg-muted" />
            ))}
          </div>
        ) : displayedVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedVideos.map((video, index) => (
              <div 
                key={video.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <VideoCard
                  video={video}
                  onPlay={() => setSelectedVideo(video)}
                  onToggleFavorite={() => toggleFavorite(video.id)}
                  onDelete={() => removeVideo(video.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <Film className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-xl text-muted-foreground mb-6">
              {filter === 'favorites' 
                ? 'Нет избранных видео' 
                : 'Добавь своё первое видео'}
            </p>
            {filter === 'all' && <AddVideoModal onAdd={addVideo} />}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          url={selectedVideo.url}
          title={selectedVideo.title}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </Layout>
  );
}
