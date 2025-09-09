'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapPlaceholder } from '@/components/map-placeholder';

export function MapSection() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <section id="map" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Explore Our Routes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            View our network of routes connecting key locations across the campus and city.
          </p>
        </div>
        <div className="mt-12 h-96 w-full overflow-hidden rounded-lg border shadow-md">
          {apiKey ? (
            <APIProvider apiKey={apiKey}>
              <Map
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId="swiftroute_map"
              />
            </APIProvider>
          ) : (
            <MapPlaceholder />
          )}
        </div>
      </div>
    </section>
  );
}
