import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationCardProps {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export function NavigationCard({ to, title, description, icon: Icon, className, delay = 0 }: NavigationCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group card-universe p-6 md:p-8 flex flex-col gap-4 animate-fade-in-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-6 h-6 text-accent-foreground" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border/50">
        <span className="text-sm font-medium text-primary opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Explore →
        </span>
      </div>
    </Link>
  );
}
