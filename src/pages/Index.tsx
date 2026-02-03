import { Swords, Target, Wrench, MapPin, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { NavigationCard } from '@/components/NavigationCard';

const sections = [
  {
    to: '/my-throws',
    title: 'My Throws',
    description: 'Your personal library of throws. Videos, techniques, and the moves that define your game.',
    icon: Swords,
  },
  {
    to: '/before-competition',
    title: 'Before Competition',
    description: 'Mental focus and key techniques. Review what matters before stepping on the mat.',
    icon: Target,
  },
  {
    to: '/work-in-progress',
    title: 'Work in Progress',
    description: 'Experimental throws and ideas. The techniques you\'re developing and exploring.',
    icon: Wrench,
  },
  {
    to: '/london-judo',
    title: 'London Judo',
    description: 'Upcoming competitions and events in London and the UK. Stay connected to the local scene.',
    icon: MapPin,
  },
  {
    to: '/trending',
    title: 'Trending Now',
    description: 'Popular throws this month. What the judo world is watching and practicing.',
    icon: TrendingUp,
  },
];

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <NavigationCard
              key={section.to}
              {...section}
              delay={index * 100}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
