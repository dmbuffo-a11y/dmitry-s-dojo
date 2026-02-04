import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { normalizeUrl } from '@/lib/url';

interface VideoLinkProps {
  url: string;
  title?: string;
  variant?: 'button' | 'text';
  className?: string;
}

/**
 * Simple component that opens a video URL on YouTube in a new tab.
 * No iframe, no embed - just a clean external link.
 */
export function VideoLink({ url, title, variant = 'button', className }: VideoLinkProps) {
  const normalizedUrl = normalizeUrl(url);
  
  if (variant === 'text') {
    return (
      <a
        href={normalizedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors ${className || ''}`}
      >
        <ExternalLink className="w-4 h-4" />
        {title || 'Открыть на YouTube'}
      </a>
    );
  }
  
  return (
    <Button asChild variant="default" className={className}>
      <a
        href={normalizedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        {title || 'Открыть на YouTube'}
      </a>
    </Button>
  );
}
