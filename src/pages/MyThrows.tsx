import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ThrowCard } from '@/components/ThrowCard';
import { ThrowDetail } from '@/components/ThrowDetail';
import { AddThrowModal } from '@/components/AddThrowModal';
import { ThrowSearch } from '@/components/ThrowSearch';
import { useThrows } from '@/hooks/useThrows';
import { JudoThrow } from '@/types/judo';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MyThrows() {
  const { myThrows, addThrow, isLoading, refreshVideosFromDatabase } = useThrows();
  const [selectedThrow, setSelectedThrow] = useState<JudoThrow | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              My Throws
            </h1>
            <p className="text-lg text-muted-foreground">
              Your personal technique library
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                refreshVideosFromDatabase();
                toast.success('Видео обновлены из базы Kodokan');
              }}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Обновить видео
            </Button>
            <AddThrowModal onAdd={addThrow} />
          </div>
        </div>
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ThrowSearch existingThrows={myThrows} onAddThrow={addThrow} />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card-universe aspect-video animate-pulse bg-muted" />
            ))}
          </div>
        ) : myThrows.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myThrows.map((judoThrow, index) => (
              <div 
                key={judoThrow.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ThrowCard
                  judoThrow={judoThrow}
                  onClick={() => setSelectedThrow(judoThrow)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-6">
              No throws yet. Start building your library.
            </p>
            <AddThrowModal onAdd={addThrow} />
          </div>
        )}
      </div>

      <ThrowDetail
        judoThrow={selectedThrow}
        isOpen={!!selectedThrow}
        onClose={() => setSelectedThrow(null)}
      />
    </Layout>
  );
}
