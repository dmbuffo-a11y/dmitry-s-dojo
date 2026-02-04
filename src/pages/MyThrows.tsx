import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ArrowLeft } from 'lucide-react';
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
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Throws
            </h1>
            <p className="text-muted-foreground">
              Твоя библиотека техник
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                refreshVideosFromDatabase();
                toast.success('Видео обновлены');
              }}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Обновить
            </Button>
            <AddThrowModal onAdd={addThrow} />
          </div>
        </div>

        <div className="mb-8">
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
            {myThrows.map((judoThrow) => (
              <ThrowCard
                key={judoThrow.id}
                judoThrow={judoThrow}
                onClick={() => setSelectedThrow(judoThrow)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground mb-6">
              Нет бросков. Начни собирать библиотеку.
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
