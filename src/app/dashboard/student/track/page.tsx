
'use client';

import { BusTracker } from '@/components/student/bus-tracker';
import { APIProvider } from '@vis.gl/react-google-maps';
import { MapPlaceholder } from '@/components/map-placeholder';

export default function TrackBusPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold font-headline">Real-Time Bus Tracking</h1>
      <p className="text-muted-foreground">
        Select a route to see the live location of your bus and its estimated time of arrival.
      </p>
      {apiKey ? (
        <APIProvider apiKey={apiKey}>
          <BusTracker />
        </APIProvider>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-[500px] w-full overflow-hidden rounded-md border">
              <MapPlaceholder />
            </div>
          </div>
          <div className="lg:col-span-1">
             {/* You might want a placeholder for the ETA card as well */}
          </div>
        </div>
      )}
    </div>
  );
}
