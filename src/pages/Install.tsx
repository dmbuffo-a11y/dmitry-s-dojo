import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Check, Share, PlusSquare, MoreVertical, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>

        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            {isInstalled ? (
              <Check className="w-8 h-8 text-primary" />
            ) : (
              <Download className="w-8 h-8 text-primary" />
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">
            {isInstalled ? 'Установлено!' : 'Установить приложение'}
          </h1>

          {isInstalled ? (
            <p className="text-muted-foreground">
              Приложение на вашем домашнем экране.
            </p>
          ) : isIOS ? (
            <div>
              <p className="text-muted-foreground mb-6">
                На iPhone/iPad:
              </p>
              <ol className="text-left space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-medium shrink-0">1</span>
                  <span>Нажмите <Share className="inline w-4 h-4 mx-1" /> «Поделиться»</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-medium shrink-0">2</span>
                  <span>Выберите <PlusSquare className="inline w-4 h-4 mx-1" /> «На экран Домой»</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-medium shrink-0">3</span>
                  <span>Нажмите «Добавить»</span>
                </li>
              </ol>
            </div>
          ) : deferredPrompt ? (
            <>
              <p className="text-muted-foreground mb-6">
                Добавьте на домашний экран для быстрого доступа.
              </p>
              <Button size="lg" onClick={handleInstall} className="gap-2">
                <Download className="w-5 h-5" />
                Установить
              </Button>
            </>
          ) : (
            <div>
              <p className="text-muted-foreground mb-6">
                На Android:
              </p>
              <ol className="text-left space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-medium shrink-0">1</span>
                  <span>Нажмите <MoreVertical className="inline w-4 h-4 mx-1" /> в браузере</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-medium shrink-0">2</span>
                  <span>«Добавить на главный экран»</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
