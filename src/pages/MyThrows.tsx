import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ThrowCard } from '@/components/ThrowCard';
import { ThrowDetail } from '@/components/ThrowDetail';
import { AddThrowModal } from '@/components/AddThrowModal';
import { useThrows } from '@/hooks/useThrows';
import { JudoThrow } from '@/types/judo';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MyThrows() {
  const { myThrows, addThrow, resetToDefaults, isLoading } = useThrows();
  const [selectedThrow, setSelectedThrow] = useState<JudoThrow | null>(null);

  const handleReset = () => {
    resetToDefaults();
    toast.success('Библиотека сброшена к стандартным броскам');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              My Throws
            </h1>
            <p className="text-lg text-muted-foreground">
              Your personal technique library
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Сбросить
            </Button>
            <AddThrowModal onAdd={addThrow} />
          </div>
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
