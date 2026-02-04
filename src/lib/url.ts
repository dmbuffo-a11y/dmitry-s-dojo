/**
 * Normalize a URL by ensuring it has a proper protocol.
 * - Trims whitespace
 * - Adds https:// if missing for youtube.com, youtu.be, www.* domains
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  
  // Already has protocol
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Common patterns that need https://
  if (
    trimmed.startsWith('www.') ||
    trimmed.startsWith('youtube.com') ||
    trimmed.startsWith('youtu.be')
  ) {
    return `https://${trimmed}`;
  }
  
  // Default: add https://
  return `https://${trimmed}`;
}

/**
 * Check if a URL is an external link (not a relative path)
 */
export function isExternalUrl(url: string): boolean {
  const normalized = normalizeUrl(url);
  return normalized.startsWith('http://') || normalized.startsWith('https://');
}
