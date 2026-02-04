import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, ExternalLink, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useThrows } from '@/hooks/useThrows';
import { normalizeUrl } from '@/lib/url';

export default function TechniqueAnalysis() {
  const { myThrows, isLoading } = useThrows();

  const throwsWithVideos = myThrows.filter(t => t.videos.length > 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent mb-4">
            <Microscope className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Frame-by-Frame</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Разбор техники
          </h1>
          <p className="text-muted-foreground">
            Открой видео на YouTube для детального просмотра
          </p>
        </div>

        {/* Video list */}
        {isLoading ? (
          <div className="space-y-3 max-w-2xl">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-lg animate-pulse bg-muted" />
            ))}
          </div>
        ) : throwsWithVideos.length > 0 ? (
          <div className="space-y-3 max-w-2xl">
            {throwsWithVideos.map((judoThrow) => (
              <a
                key={judoThrow.id}
                href={normalizeUrl(judoThrow.videos[0].url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-muted transition-colors group"
              >
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {judoThrow.name}
                  </h3>
                  {judoThrow.kanji && (
                    <p className="text-sm text-muted-foreground">{judoThrow.kanji}</p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground mb-2">
              Нет бросков с видео
            </p>
            <p className="text-muted-foreground">
              Добавь броски с YouTube в My Throws
            </p>
          </div>
        )}

        {/* Tip */}
        <div className="mt-8 p-4 rounded-lg bg-accent/30 max-w-xl">
          <p className="text-sm text-foreground">
            💡 На YouTube можно использовать клавиши <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">,</kbd> и <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">.</kbd> для покадрового просмотра
          </p>
        </div>
      </div>
    </Layout>
  );
}
