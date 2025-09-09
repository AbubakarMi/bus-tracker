
'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapPlaceholder } from '@/components/map-placeholder';

// A custom map style that fits the theme.
// You can create your own at https://mapstyle.withgoogle.com/
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];


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
        <div className="mt-12 h-96 w-full overflow-hidden rounded-lg border shadow-lg md:h-[500px]">
          {apiKey ? (
            <APIProvider apiKey={apiKey}>
              <Map
                defaultCenter={{ lat: 11.8969, lng: 8.4334 }} // Centered on Wudil
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                styles={mapStyle}
                mapId="swiftroute_landing_map"
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
