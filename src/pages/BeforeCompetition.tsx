import { Link } from 'react-router-dom';
import { Target, ArrowLeft, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useThrows } from '@/hooks/useThrows';

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

  // Select key throws (first 3 with videos)
  const keyThrows = myThrows
    .filter(t => t.videos.length > 0)
    .slice(0, 3);

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
            <Target className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Competition Mode</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Before Competition
          </h1>
          <p className="text-muted-foreground">
            Focus. Review. Prepare.
          </p>
        </div>

        <div className="space-y-12 max-w-2xl">
          {/* Focus Statements */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Competition Focus
            </h2>
            <div className="space-y-3">
              {focusStatements.map((statement, index) => (
                <div key={index} className="p-4 rounded-lg bg-card">
                  <p className="text-foreground">"{statement}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Throws */}
          {keyThrows.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Key Throws to Review
              </h2>
              <div className="space-y-3">
                {keyThrows.map((judoThrow) => (
                  <a
                    key={judoThrow.id}
                    href={judoThrow.videos[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-muted transition-colors group"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {judoThrow.name}
                      </h3>
                      {judoThrow.kanji && (
                        <p className="text-sm text-muted-foreground">{judoThrow.kanji}</p>
                      )}
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Quick Warm-up */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Quick Warm-up Videos
            </h2>
            <div className="space-y-3">
              {warmupVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-muted transition-colors group"
                >
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </span>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
