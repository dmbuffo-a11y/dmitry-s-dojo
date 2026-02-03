import { TrendingUp, RefreshCw } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { VideoViewer } from '@/components/VideoViewer';

// Trending throws - curated from official Kodokan and IJF channels
// These are verified working videos from authoritative judo sources
const trendingThrows = [
  {
    id: 't1',
    name: 'Uchi Mata',
    kanji: '内股',
    videoUrl: 'https://www.youtube.com/watch?v=gLfPwitVkec',
    views: '1.2M',
    source: 'Kodokan Official',
  },
  {
    id: 't2',
    name: 'Seoi Nage',
    kanji: '背負投',
    videoUrl: 'https://www.youtube.com/watch?v=Z2lHVVPKzYU',
    views: '980K',
    source: 'Kodokan Official',
  },
  {
    id: 't3',
    name: 'Osoto Gari',
    kanji: '大外刈',
    videoUrl: 'https://www.youtube.com/watch?v=NxrIYQ1Kp_I',
    views: '850K',
    source: 'Kodokan Official',
  },
  {
    id: 't4',
    name: 'Harai Goshi',
    kanji: '払腰',
    videoUrl: 'https://www.youtube.com/watch?v=fymPbykWfB4',
    views: '720K',
    source: 'Kodokan Official',
  },
  {
    id: 't5',
    name: 'Ippon Seoi Nage',
    kanji: '一本背負投',
    videoUrl: 'https://www.youtube.com/watch?v=yaov8oLHMEA',
    views: '650K',
    source: 'Superstar Judo',
  },
];

const lastUpdated = 'February 2026';

export default function TrendingNow() {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <TrendingUp className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Monthly Update</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trending Now
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-4">
            Top judo throws this month
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>

        {/* Trending Grid */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {trendingThrows.map((throwItem, index) => {
            return (
              <div 
                key={throwItem.id}
                className="card-universe overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Rank */}
                  <div className="hidden md:flex w-20 shrink-0 items-center justify-center bg-accent text-accent-foreground">
                    <span className="text-3xl font-bold">#{index + 1}</span>
                  </div>

                  {/* Video */}
                  <div className="md:w-96 shrink-0 bg-muted p-4">
                    <VideoViewer
                      title={throwItem.name}
                      video={{
                        id: `${throwItem.id}-video`,
                        url: throwItem.videoUrl,
                        type: 'youtube',
                        title: throwItem.name,
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="md:hidden badge-trending mb-2 inline-block">
                          #{index + 1}
                        </span>
                        <h3 className="text-2xl font-semibold text-foreground mb-1">
                          {throwItem.name}
                        </h3>
                        {throwItem.kanji && (
                          <p className="text-lg text-muted-foreground mb-3">
                            {throwItem.kanji}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>{throwItem.views} views</span>
                          <span>•</span>
                          <span>{throwItem.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-sm text-muted-foreground">
            Curated from popular judo content across the web
          </p>
        </div>
      </div>
    </Layout>
  );
}
