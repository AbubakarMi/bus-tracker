
import { Bus } from 'lucide-react';

export function RoadAnimation() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      {/* Road surface */}
      <div className="absolute bottom-0 h-2/3 w-full bg-muted/40 perspective-1000">
        {/* Road markings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-primary/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="road-line-animation absolute top-1/2 left-1/2 w-24 h-1.5 bg-card" />
          <div className="road-line-animation animation-delay-2s absolute top-1/2 left-1/2 w-24 h-1.5 bg-card" />
          <div className="road-line-animation animation-delay-4s absolute top-1/2 left-1/2 w-24 h-1.5 bg-card" />
        </div>
      </div>

      {/* Buses */}
      <div className="bus-container animate-drive-right-far">
        <Bus className="h-16 w-16 text-primary/60" />
      </div>
      <div className="bus-container animate-drive-left-near animation-delay-3s">
        <Bus className="h-28 w-28 text-primary" />
      </div>
       <div className="bus-container animate-drive-right-mid animation-delay-7s">
        <Bus className="h-20 w-20 text-primary/80" />
      </div>
        <div className="bus-container animate-drive-left-far animation-delay-10s">
        <Bus className="h-14 w-14 text-primary/50" />
      </div>
    </div>
  );
}
