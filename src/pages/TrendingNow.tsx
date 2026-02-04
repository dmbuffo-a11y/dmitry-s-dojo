import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/Layout';

const trendingThrows = [
  {
    id: 't1',
    name: 'Uchi Mata',
    kanji: '内股',
    videoUrl: 'https://www.youtube.com/watch?v=N9lpgFLKqvE',
    views: '1.2M',
    source: 'Efficient Judo',
  },
  {
    id: 't2',
    name: 'Seoi Nage',
    kanji: '背負投',
    videoUrl: 'https://www.youtube.com/watch?v=6zzC3hAgc70',
    views: '980K',
    source: 'Shintaro Higashi',
  },
  {
    id: 't3',
    name: 'Osoto Gari',
    kanji: '大外刈',
    videoUrl: 'https://www.youtube.com/watch?v=TLp0EuEf2I0',
    views: '850K',
    source: 'Shintaro Higashi',
  },
  {
    id: 't4',
    name: 'Harai Goshi',
    kanji: '払腰',
    videoUrl: 'https://www.youtube.com/watch?v=sR4ZVGPd_D4',
    views: '720K',
    source: 'Efficient Judo',
  },
  {
    id: 't5',
    name: 'Ippon Seoi Nage',
    kanji: '一本背負投',
    videoUrl: 'https://www.youtube.com/watch?v=R8xMazPVBHg',
    views: '650K',
    source: 'Judo Tutorial',
  },
];

export default function TrendingNow() {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent mb-4">
            <TrendingUp className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Топ месяца</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Trending Now
          </h1>
        </div>

        {/* Video list - simple native anchor tags */}
        <div className="space-y-3 max-w-2xl">
          {trendingThrows.map((item, index) => (
            <a
              key={item.id}
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-muted-foreground w-8">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.kanji} • {item.source}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
