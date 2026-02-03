import { useState, useMemo } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchKodokanThrows } from '@/data/kodokanThrows';
import { JudoThrow, VideoItem } from '@/types/judo';
import { getYouTubeThumbnailUrl } from '@/types/judo';

interface ThrowSearchProps {
  existingThrows: JudoThrow[];
  onAddThrow: (name: string, kanji?: string, video?: VideoItem) => void;
}

export function ThrowSearch({ existingThrows, onAddThrow }: ThrowSearchProps) {
  const [query, setQuery] = useState('');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const searchResults = useMemo(() => {
    return searchKodokanThrows(query);
  }, [query]);

  // Check if a throw already exists in user's library
  const isThrowInLibrary = (name: string) => {
    return existingThrows.some(t => 
      t.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleAdd = (throwData: typeof searchResults[0]) => {
    const video = throwData.videos[0];
    onAddThrow(throwData.name, throwData.kanji, video);
    setAddedIds(prev => new Set([...prev, throwData.name]));
  };

  const wasJustAdded = (name: string) => addedIds.has(name);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти бросок... (например: uchi mata, seoi nage)"
          className="pl-10 bg-secondary border-0 h-12 text-base"
        />
      </div>

      {query.trim() && searchResults.length > 0 && (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {searchResults.map((throwData) => {
            const inLibrary = isThrowInLibrary(throwData.name);
            const justAdded = wasJustAdded(throwData.name);
            const thumbnailUrl = throwData.videos[0]?.url 
              ? getYouTubeThumbnailUrl(throwData.videos[0].url)
              : null;

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
                  {throwData.kanji && (
                    <p className="text-sm text-muted-foreground">{throwData.kanji}</p>
                  )}
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
                      {inLibrary ? 'В библиотеке' : 'Добавлено'}
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Добавить
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {query.trim() && searchResults.length === 0 && (
        <p className="text-center text-muted-foreground py-6">
          Бросок не найден. Попробуйте другое название.
        </p>
      )}
    </div>
  );
}
