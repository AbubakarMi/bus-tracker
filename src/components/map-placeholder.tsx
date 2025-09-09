import { MapIcon } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-muted">
      <div className="text-center">
        <MapIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">Map Unavailable</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please provide a Google Maps API key in your environment variables.
        </p>
        <code className="mt-4 inline-block rounded bg-background px-2 py-1 text-sm font-mono">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
        </code>
      </div>
    </div>
  );
}
