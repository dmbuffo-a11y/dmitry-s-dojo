import { useState, useMemo } from 'react';
import { Search, Plus, Check, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchKodokanThrows, throwCategories, ThrowCategory, KodokanThrow } from '@/data/kodokanThrows';
import { JudoThrow, VideoItem } from '@/types/judo';
import { getYouTubeThumbnailUrl } from '@/types/judo';
import { cn } from '@/lib/utils';

interface ThrowSearchProps {
  existingThrows: JudoThrow[];
  onAddThrow: (name: string, kanji?: string, video?: VideoItem) => void;
}

export function ThrowSearch({ existingThrows, onAddThrow }: ThrowSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ThrowCategory | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const searchResults = useMemo(() => {
    // Only show results if there's a query OR a category filter
    if (!query.trim() && !selectedCategory) return [];
    return searchKodokanThrows(query, selectedCategory || undefined);
  }, [query, selectedCategory]);

  const isThrowInLibrary = (name: string) => {
    return existingThrows.some(t => t.name.toLowerCase() === name.toLowerCase());
  };

  const handleAdd = (throwData: KodokanThrow) => {
    const video = throwData.videos[0];
    onAddThrow(throwData.name, throwData.kanji, video);
    setAddedIds(prev => new Set([...prev, throwData.name]));
  };

  const wasJustAdded = (name: string) => addedIds.has(name);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти бросок... (например: uchi mata, seoi nage)"
          className="pl-10 bg-secondary border-0 h-12 text-base"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="gap-1"
        >
          <Filter className="w-3 h-3" />
          Все
        </Button>
        {throwCategories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
            <span className="ml-1 text-xs opacity-70">{cat.nameJa}</span>
          </Button>
        ))}
      </div>

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {searchResults.map((throwData) => {
            const inLibrary = isThrowInLibrary(throwData.name);
            const justAdded = wasJustAdded(throwData.name);
            const thumbnailUrl = throwData.videos[0]?.url 
              ? getYouTubeThumbnailUrl(throwData.videos[0].url)
              : null;
            const categoryInfo = throwCategories.find(c => c.id === throwData.category);

            return (
              <div
                key={throwData.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {/* Thumbnail */}
                {thumbnailUrl && (
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img 
                      src={thumbnailUrl} 
                      alt={throwData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {throwData.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {throwData.kanji && <span>{throwData.kanji}</span>}
                    {categoryInfo && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted">
                        {categoryInfo.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add button */}
                <Button
                  size="sm"
                  variant={inLibrary || justAdded ? "secondary" : "default"}
                  disabled={inLibrary || justAdded}
                  onClick={() => handleAdd(throwData)}
                  className="flex-shrink-0 gap-1"
                >
                  {inLibrary || justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {inLibrary ? 'В библиотеке' : 'Добавлено'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Добавить</span>
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {(query.trim() || selectedCategory) && searchResults.length === 0 && (
        <p className="text-center text-muted-foreground py-6">
          Бросок не найден. Попробуйте другое название или категорию.
        </p>
      )}
    </div>
  );
}
