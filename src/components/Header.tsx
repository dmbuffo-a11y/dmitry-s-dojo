import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Universe' },
  { path: '/my-throws', label: 'My Throws' },
  { path: '/before-competition', label: 'Before Competition' },
  { path: '/work-in-progress', label: 'WIP' },
  { path: '/london-judo', label: 'London Judo' },
  { path: '/trending', label: 'Trending' },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          <span className="hidden sm:inline">Dmitry Judo Universe</span>
          <span className="sm:hidden">DJU</span>
        </Link>
        
        <nav className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200',
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">
                {item.label === 'Universe' ? '🏠' : 
                 item.label === 'My Throws' ? '🥋' :
                 item.label === 'Before Competition' ? '🎯' :
                 item.label === 'WIP' ? '🔧' :
                 item.label === 'London Judo' ? '🇬🇧' : '📈'}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
