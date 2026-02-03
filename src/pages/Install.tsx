import { useState, useEffect } from 'react';
import { Download, Check, Share, PlusSquare, MoreVertical } from 'lucide-react';
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
    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Detect if already installed
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
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 animate-fade-in">
          {isInstalled ? (
            <Check className="w-10 h-10 text-primary" />
          ) : (
            <Download className="w-10 h-10 text-primary" />
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 animate-fade-in">
          {isInstalled ? 'Приложение установлено!' : 'Установить приложение'}
        </h1>

        {isInstalled ? (
          <p className="text-lg text-muted-foreground max-w-md mb-8 animate-fade-in-up">
            Dmitry Judo Universe теперь на вашем домашнем экране. Откройте его как обычное приложение.
          </p>
        ) : isIOS ? (
          <div className="max-w-md animate-fade-in-up">
            <p className="text-lg text-muted-foreground mb-6">
              Чтобы установить на iPhone/iPad:
            </p>
            <ol className="text-left space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium">1</span>
                <span>Нажмите кнопку <Share className="inline w-4 h-4 mx-1 -mt-1" /> «Поделиться» внизу экрана</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium">2</span>
                <span>Прокрутите вниз и нажмите <PlusSquare className="inline w-4 h-4 mx-1 -mt-1" /> «На экран Домой»</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium">3</span>
                <span>Нажмите «Добавить»</span>
              </li>
            </ol>
          </div>
        ) : deferredPrompt ? (
          <>
            <p className="text-lg text-muted-foreground max-w-md mb-8 animate-fade-in-up">
              Добавьте Dmitry Judo Universe на домашний экран для быстрого доступа и работы офлайн.
            </p>
            <Button size="lg" onClick={handleInstall} className="gap-2 animate-fade-in-up">
              <Download className="w-5 h-5" />
              Установить приложение
            </Button>
          </>
        ) : (
          <div className="max-w-md animate-fade-in-up">
            <p className="text-lg text-muted-foreground mb-6">
              Чтобы установить на Android:
            </p>
            <ol className="text-left space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium">1</span>
                <span>Нажмите кнопку <MoreVertical className="inline w-4 h-4 mx-1 -mt-1" /> в правом верхнем углу браузера</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium">2</span>
                <span>Выберите «Добавить на главный экран» или «Установить приложение»</span>
              </li>
            </ol>
          </div>
        )}
      </div>
    </Layout>
  );
}
