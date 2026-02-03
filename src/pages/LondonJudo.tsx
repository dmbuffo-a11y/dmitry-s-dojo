import { MapPin, ExternalLink, Calendar } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Competition } from '@/types/judo';

// Sample competitions - structured for future API integration
const upcomingCompetitions: Competition[] = [
  {
    id: '1',
    name: 'British Judo National Championships',
    date: '2026-03-15',
    location: 'Sheffield, UK',
    externalUrl: 'https://www.britishjudo.org.uk/events/',
    description: 'The premier national judo event in Great Britain.',
  },
  {
    id: '2',
    name: 'London Open Judo Championships',
    date: '2026-04-22',
    location: 'Crystal Palace, London',
    externalUrl: 'https://www.britishjudo.org.uk/events/',
    description: 'Open tournament for all grades.',
  },
  {
    id: '3',
    name: 'South East Area Championships',
    date: '2026-05-10',
    location: 'SportsDock, London',
    externalUrl: 'https://www.britishjudo.org.uk/events/',
    description: 'Regional championship for South East England.',
  },
  {
    id: '4',
    name: 'BJA Dan Grade Competition',
    date: '2026-06-08',
    location: 'Wolverhampton, UK',
    externalUrl: 'https://www.britishjudo.org.uk/events/',
    description: 'Competition for Dan grade judoka.',
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getDaysUntil(dateString: string) {
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function LondonJudo() {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <MapPin className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">UK & London</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            London Judo
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Upcoming competitions and events in the UK
          </p>
        </div>

        {/* Competitions List */}
        <div className="max-w-3xl mx-auto space-y-6">
          {upcomingCompetitions.map((competition, index) => {
            const daysUntil = getDaysUntil(competition.date);
            const isPast = daysUntil < 0;

            return (
              <div 
                key={competition.id}
                className="card-universe p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {competition.name}
                      </h3>
                      {!isPast && daysUntil <= 30 && (
                        <span className="badge-trending">
                          {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(competition.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {competition.location}
                      </span>
                    </div>

                    {competition.description && (
                      <p className="text-muted-foreground">
                        {competition.description}
                      </p>
                    )}
                  </div>

                  {competition.externalUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 shrink-0"
                      asChild
                    >
                      <a 
                        href={competition.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Details
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-sm text-muted-foreground">
            Event data curated from{' '}
            <a 
              href="https://www.britishjudo.org.uk/events/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              British Judo
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
