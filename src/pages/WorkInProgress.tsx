import { useState } from 'react';
import { Wrench, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ThrowCard } from '@/components/ThrowCard';
import { ThrowDetail } from '@/components/ThrowDetail';
import { AddThrowModal } from '@/components/AddThrowModal';
import { useThrows } from '@/hooks/useThrows';
import { JudoThrow } from '@/types/judo';

export default function WorkInProgress() {
  const { wipThrows, addWipThrow, moveToMyThrows, isLoading } = useThrows();
  const [selectedThrow, setSelectedThrow] = useState<JudoThrow | null>(null);

  const handleMoveToMyThrows = () => {
    if (selectedThrow) {
      moveToMyThrows(selectedThrow.id);
      setSelectedThrow(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent mb-4">
              <Wrench className="w-4 h-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">Experimental</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Work in Progress
            </h1>
            <p className="text-lg text-muted-foreground">
              Throws you're developing. Ideas not yet mastered.
            </p>
          </div>
          <AddThrowModal onAdd={addWipThrow} isWip />
        </div>

        {/* Info Card */}
        <div className="card-universe p-6 mb-12 bg-accent/30 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-accent-foreground" />
            <p className="text-sm text-foreground">
              When a technique is ready, you can move it to <strong>My Throws</strong> from the detail view.
            </p>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card-universe aspect-video animate-pulse bg-muted" />
            ))}
          </div>
        ) : wipThrows.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wipThrows.map((judoThrow, index) => (
              <div 
                key={judoThrow.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ThrowCard
                  judoThrow={judoThrow}
                  onClick={() => setSelectedThrow(judoThrow)}
                  isWip
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-2">
              No works in progress yet.
            </p>
            <p className="text-muted-foreground mb-6">
              Add throws you're experimenting with.
            </p>
            <AddThrowModal onAdd={addWipThrow} isWip />
          </div>
        )}
      </div>

      <ThrowDetail
        judoThrow={selectedThrow}
        isOpen={!!selectedThrow}
        onClose={() => setSelectedThrow(null)}
        onMoveToMyThrows={handleMoveToMyThrows}
      />
    </Layout>
  );
}
