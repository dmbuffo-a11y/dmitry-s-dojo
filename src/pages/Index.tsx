import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { NavigationCard } from '@/components/NavigationCard';

// Import illustrated icons
import myThrowsIcon from '@/assets/icons/my-throws-icon.png';
import beforeCompetitionIcon from '@/assets/icons/before-competition-icon.png';
import workInProgressIcon from '@/assets/icons/work-in-progress-icon.png';
import londonJudoIcon from '@/assets/icons/london-judo-icon.png';
import trendingIcon from '@/assets/icons/trending-icon.png';
import analysisIcon from '@/assets/icons/analysis-icon.png';

const sections = [
  {
    to: '/my-throws',
    title: 'My Throws',
    description: 'Your personal library of throws. Videos, techniques, and the moves that define your game.',
    image: myThrowsIcon,
  },
  {
    to: '/analysis',
    title: 'Разбор техники',
    description: 'Замедляй, останавливай, изучай каждое движение покадрово.',
    image: analysisIcon,
  },
  {
    to: '/before-competition',
    title: 'Before Competition',
    description: 'Mental focus and key techniques. Review what matters before stepping on the mat.',
    image: beforeCompetitionIcon,
  },
  {
    to: '/work-in-progress',
    title: 'Work in Progress',
    description: 'Experimental throws and ideas. The techniques you\'re developing and exploring.',
    image: workInProgressIcon,
  },
  {
    to: '/london-judo',
    title: 'London Judo',
    description: 'Upcoming competitions and events in London and the UK. Stay connected to the local scene.',
    image: londonJudoIcon,
  },
  {
    to: '/trending',
    title: 'Trending Now',
    description: 'Popular throws this month. What the judo world is watching and practicing.',
    image: trendingIcon,
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
