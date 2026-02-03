import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VideoItem } from '@/types/judo';

interface AddThrowModalProps {
  onAdd: (name: string, kanji?: string, video?: VideoItem) => void;
  isWip?: boolean;
  trigger?: React.ReactNode;
}

export function AddThrowModal({ onAdd, isWip, trigger }: AddThrowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [kanji, setKanji] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const video: VideoItem | undefined = videoUrl.trim() 
      ? {
          id: Date.now().toString(),
          url: videoUrl.trim(),
          type: 'youtube',
          title: videoTitle.trim() || undefined,
        }
      : undefined;

    onAdd(name.trim(), kanji.trim() || undefined, video);
    
    // Reset form
    setName('');
    setKanji('');
    setVideoUrl('');
    setVideoTitle('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add {isWip ? 'WIP' : 'Throw'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card border-0 shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add {isWip ? 'Work in Progress' : 'New Throw'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Throw Name (Romaji)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Seoi Nage"
              className="bg-secondary border-0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kanji">Kanji (Optional)</Label>
            <Input
              id="kanji"
              value={kanji}
              onChange={(e) => setKanji(e.target.value)}
              placeholder="e.g., 背負投"
              className="bg-secondary border-0"
            />
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-secondary/50">
            <h4 className="text-sm font-medium text-foreground">Add Video (Optional)</h4>
            
            <div className="space-y-2">
              <Label htmlFor="videoUrl">YouTube URL</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-card border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoTitle">Video Title</Label>
              <Input
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g., Competition Highlight"
                className="bg-card border-0"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!name.trim()}
            >
              Add Throw
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
