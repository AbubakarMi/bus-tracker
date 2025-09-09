import { BusTracker } from '@/components/student/bus-tracker';
import { APIProvider } from '@vis.gl/react-google-maps';

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
        <BusTracker /> // Component will render its own placeholder
      )}
    </div>
  );
}
