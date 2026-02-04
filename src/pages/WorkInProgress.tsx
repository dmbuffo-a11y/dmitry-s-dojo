import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight, ArrowLeft } from 'lucide-react';
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
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent mb-4">
              <Wrench className="w-4 h-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">Experimental</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Work in Progress
            </h1>
            <p className="text-muted-foreground">
              Броски, которые ты изучаешь
            </p>
          </div>
          <AddThrowModal onAdd={addWipThrow} isWip />
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-lg bg-accent/30 mb-8 max-w-xl">
          <div className="flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-accent-foreground shrink-0" />
            <p className="text-sm text-foreground">
              Когда техника освоена, перемести её в <strong>My Throws</strong>
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
            {wipThrows.map((judoThrow) => (
              <ThrowCard
                key={judoThrow.id}
                judoThrow={judoThrow}
                onClick={() => setSelectedThrow(judoThrow)}
                isWip
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground mb-2">
              Пока ничего нет
            </p>
            <p className="text-muted-foreground mb-6">
              Добавь броски, с которыми экспериментируешь
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
