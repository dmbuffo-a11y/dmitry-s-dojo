import heroImage from '@/assets/hero-judo-illustration.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background illustration */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient-hero mb-6">
          Dmitry Judo Universe
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
          A living space for judo. Training. Focus. Progress.
        </p>
        
        {/* Updated indicator */}
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Updated this month</span>
        </div>
      </div>
    </section>
  );
}
