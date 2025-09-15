'use client';

import { BusMap } from '@/components/bus-map';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2 animate-gradient-text">
            Live Bus Tracking 🗺️
          </h1>
          <p className="text-muted-foreground">
            Real-time GPS tracking • Distance monitoring • Live ETAs
          </p>
        </div>

        <BusMap />
      </div>
    </div>
  );
}