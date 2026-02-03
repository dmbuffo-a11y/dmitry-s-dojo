import { useState } from 'react';
import { Microscope, Play } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useThrows } from '@/hooks/useThrows';
import { VideoAnalyzer } from '@/components/VideoAnalyzer';
import { getYouTubeThumbnailUrl } from '@/types/judo';
import { cn } from '@/lib/utils';

export default function TechniqueAnalysis() {
  const { myThrows, isLoading } = useThrows();
  const [selectedThrowId, setSelectedThrowId] = useState<string | null>(null);

  const throwsWithVideos = myThrows.filter(t => t.videos.length > 0);
  const selectedThrow = throwsWithVideos.find(t => t.id === selectedThrowId);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <Microscope className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Детальный анализ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Разбор техники
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Замедляй, останавливай, изучай каждое движение покадрово
          </p>
        </div>

        {/* Throws Grid */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-video rounded-xl animate-pulse bg-muted" />
            ))}
          </div>
        ) : throwsWithVideos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {throwsWithVideos.map((judoThrow, index) => {
              const thumbnailUrl = getYouTubeThumbnailUrl(judoThrow.videos[0].url);
              
              return (
                <button
                  key={judoThrow.id}
                  onClick={() => setSelectedThrowId(judoThrow.id)}
                  className={cn(
                    'group relative overflow-hidden rounded-xl bg-muted transition-all duration-300',
                    'hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    'animate-fade-in-up'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={judoThrow.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-secondary">
                        <span className="text-4xl font-bold text-accent-foreground/20">
                          {judoThrow.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {judoThrow.name}
                      </h3>
                      {judoThrow.kanji && (
                        <p className="text-sm text-white/70">{judoThrow.kanji}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-2">
              Нет бросков с видео
            </p>
            <p className="text-muted-foreground">
              Добавьте броски с YouTube-видео в разделе My Throws
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-muted">0.25x — супер замедление</span>
            <span className="px-3 py-1 rounded-full bg-muted">Покадровая прокрутка</span>
            <span className="px-3 py-1 rounded-full bg-muted">Удобные горячие клавиши</span>
          </div>
        </div>
      </div>

      {/* Video Analyzer Modal */}
      {selectedThrow && (
        <VideoAnalyzer
          videoUrl={selectedThrow.videos[0].url}
          title={selectedThrow.name}
          isOpen={!!selectedThrowId}
          onClose={() => setSelectedThrowId(null)}
        />
      )}
    </Layout>
  );
}
