'use client';
import { useState, useEffect } from 'react';

type LatLng = { lat: number; lng: number };

export function useMockBusLocation(initialPosition: LatLng, speed = 0.0001) {
  const [position, setPosition] = useState<LatLng>(initialPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Simple movement logic: move northeast
        return {
          lat: prevPosition.lat + speed / 2,
          lng: prevPosition.lng + speed,
        };
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [speed]);

  return position;
}
