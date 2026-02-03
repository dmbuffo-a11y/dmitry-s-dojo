import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { extractYouTubeId } from '@/types/judo';
import { cn } from '@/lib/utils';

interface VideoAnalyzerProps {
  videoUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const SPEEDS = [0.25, 0.5, 0.75, 1];

export function VideoAnalyzer({ videoUrl, title, isOpen, onClose }: VideoAnalyzerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const videoId = extractYouTubeId(videoUrl);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!isOpen || !videoId) return;

    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initPlayer;
    };

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player('yt-analyzer-player', {
        videoId: videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
            setIsReady(true);
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
    };
  }, [isOpen, videoId]);

  // Update current time
  useEffect(() => {
    if (!isReady || !isOpen) return;

    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isReady, isOpen]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  const setSpeed = useCallback((speed: number) => {
    if (!playerRef.current) return;
    playerRef.current.setPlaybackRate(speed);
    setCurrentSpeed(speed);
  }, []);

  const seek = useCallback((time: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(time, true);
    setCurrentTime(time);
  }, []);

  const stepForward = useCallback(() => {
    seek(Math.min(currentTime + 0.1, duration));
  }, [currentTime, duration, seek]);

  const stepBackward = useCallback(() => {
    seek(Math.max(currentTime - 0.1, 0));
  }, [currentTime, seek]);

  const skipForward = useCallback(() => {
    seek(Math.min(currentTime + 5, duration));
  }, [currentTime, duration, seek]);

  const skipBackward = useCallback(() => {
    seek(Math.max(currentTime - 5, 0));
  }, [currentTime, seek]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          e.shiftKey ? stepBackward() : skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          e.shiftKey ? stepForward() : skipForward();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlay, stepBackward, stepForward, skipBackward, skipForward, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">Technique Analysis</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Video */}
      <div className="flex-1 flex items-center justify-center p-4" ref={containerRef}>
        <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          <div id="yt-analyzer-player" className="w-full h-full" />
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 md:p-6 bg-card border-t border-border space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={([value]) => seek(value)}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-sm text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {/* Step back */}
          <Button
            variant="outline"
            size="icon"
            onClick={stepBackward}
            title="Back one frame (Shift + ←)"
            className="h-12 w-12"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          {/* Skip back 5s */}
          <Button
            variant="outline"
            size="icon"
            onClick={skipBackward}
            title="Back 5 sec (←)"
            className="h-12 w-12"
          >
            <Rewind className="w-5 h-5" />
          </Button>

          {/* Play/Pause */}
          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            title="Play/Pause (Space)"
            className="h-16 w-16 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>

          {/* Skip forward 5s */}
          <Button
            variant="outline"
            size="icon"
            onClick={skipForward}
            title="Forward 5 sec (→)"
            className="h-12 w-12"
          >
            <FastForward className="w-5 h-5" />
          </Button>

          {/* Step forward */}
          <Button
            variant="outline"
            size="icon"
            onClick={stepForward}
            title="Forward one frame (Shift + →)"
            className="h-12 w-12"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Speed controls */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Speed:</span>
          {SPEEDS.map((speed) => (
            <Button
              key={speed}
              variant={currentSpeed === speed ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSpeed(speed)}
              className={cn(
                'min-w-[60px] font-mono',
                currentSpeed === speed && 'ring-2 ring-primary ring-offset-2'
              )}
            >
              {speed}x
            </Button>
          ))}
        </div>

        {/* Keyboard hints */}
        <div className="text-center text-xs text-muted-foreground">
          <span className="hidden md:inline">
            Space — play/pause • ← → — 5 sec • Shift + ← → — frame by frame • Esc — close
          </span>
        </div>
      </div>
    </div>
  );
}
