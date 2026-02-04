import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, Calendar, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Competition } from '@/types/judo';

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
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent mb-4">
            <MapPin className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">UK & London</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            London Judo
          </h1>
          <p className="text-muted-foreground">
            Upcoming competitions and events
          </p>
        </div>

        {/* Competitions List */}
        <div className="max-w-2xl space-y-3">
          {upcomingCompetitions.map((competition) => {
            const daysUntil = getDaysUntil(competition.date);
            const isPast = daysUntil < 0;

            return (
              <div 
                key={competition.id}
                className="p-4 rounded-lg bg-card"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {competition.name}
                      </h3>
                      {!isPast && daysUntil <= 30 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                          {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
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
                      <p className="text-sm text-muted-foreground">
                        {competition.description}
                      </p>
                    )}
                  </div>

                  {competition.externalUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 shrink-0"
                      asChild
                    >
                      <a 
                        href={competition.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-sm text-muted-foreground">
          Event data from{' '}
          <a 
            href="https://www.britishjudo.org.uk/events/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            British Judo
          </a>
        </div>
      </div>
    </Layout>
  );
}
