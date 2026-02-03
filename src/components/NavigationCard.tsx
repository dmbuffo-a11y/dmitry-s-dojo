import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationCardProps {
  to: string;
  title: string;
  description: string;
  image: string;
  className?: string;
  delay?: number;
}

export function NavigationCard({ to, title, description, image, className, delay = 0 }: NavigationCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group card-universe overflow-hidden flex flex-col animate-fade-in-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Illustration */}
      <div className="h-40 bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-28 h-28 object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <span className="text-sm font-medium text-primary opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
