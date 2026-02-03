import { useState } from 'react';
import { Target, Play, Maximize2, X } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useThrows } from '@/hooks/useThrows';
import { getYouTubeEmbedUrl } from '@/types/judo';
import { cn } from '@/lib/utils';

const focusStatements = [
  "Stay calm. Stay centered.",
  "Trust your training.",
  "Control the grip, control the match.",
  "One technique at a time.",
];

const warmupVideos = [
  { id: 'w1', title: 'Dynamic Warm-up', url: 'https://www.youtube.com/watch?v=HDfvXbhZxpM' },
  { id: 'w2', title: 'Judo Mobility', url: 'https://www.youtube.com/watch?v=N0lxfilGfak' },
];

export default function BeforeCompetition() {
  const { myThrows } = useThrows();
  const [focusMode, setFocusMode] = useState(false);
  const [focusVideoUrl, setFocusVideoUrl] = useState<string | null>(null);

  // Select key throws (first 3 with videos)
  const keyThrows = myThrows
    .filter(t => t.videos.length > 0)
    .slice(0, 3);

  const enterFocusMode = (videoUrl: string) => {
    setFocusVideoUrl(videoUrl);
    setFocusMode(true);
  };

  const exitFocusMode = () => {
    setFocusMode(false);
    setFocusVideoUrl(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <Target className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Competition Mode</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Before Competition
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Focus. Review. Prepare.
          </p>
        </div>

        <div className="grid gap-12 lg:gap-16">
          {/* Focus Statements */}
          <section className="animate-fade-in-up">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Competition Focus
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {focusStatements.map((statement, index) => (
                <div 
                  key={index}
                  className="card-universe p-6 text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-lg font-medium text-foreground">
                    "{statement}"
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Throws */}
          {keyThrows.length > 0 && (
            <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Key Throws to Review
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {keyThrows.map((judoThrow) => {
                  const embedUrl = getYouTubeEmbedUrl(judoThrow.videos[0].url);
                  return (
                    <div key={judoThrow.id} className="card-universe overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        {embedUrl && (
                          <iframe
                            src={embedUrl}
                            title={judoThrow.name}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100"
                          onClick={() => embedUrl && enterFocusMode(embedUrl)}
                        >
                          <Maximize2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground">{judoThrow.name}</h3>
                        {judoThrow.kanji && (
                          <p className="text-sm text-muted-foreground">{judoThrow.kanji}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Quick Warm-up */}
          <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Quick Warm-up Videos
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {warmupVideos.map((video) => {
                const embedUrl = getYouTubeEmbedUrl(video.url);
                return (
                  <div key={video.id} className="card-universe overflow-hidden">
                    <div className="aspect-video bg-muted">
                      {embedUrl && (
                        <iframe
                          src={embedUrl}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{video.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Focus Mode Overlay */}
      {focusMode && focusVideoUrl && (
        <div className="focus-mode" onClick={exitFocusMode}>
          <div 
            className="relative w-full max-w-5xl mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="secondary"
              className="absolute -top-12 right-0 rounded-full"
              onClick={exitFocusMode}
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-modal">
              <iframe
                src={focusVideoUrl}
                title="Focus Mode Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
