import { useState, useEffect } from 'react';
import { dataService } from '@/lib/data-service';
import { realTimeSync, type SystemUpdate } from '@/lib/real-time-sync';

export interface RealTimeSystemData {
  buses: any[];
  routes: any[];
  users: any[];
  bookings: any[];
  activities: any[];
  settings: any;
  lastUpdate: string;
}

export function useRealTimeSystemData() {
  const [data, setData] = useState<RealTimeSystemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const systemData = await dataService.loadAllData();
        setData({
          buses: systemData.buses,
          routes: systemData.routes,
          users: systemData.users,
          bookings: systemData.bookings,
          activities: systemData.activities,
          settings: systemData.settings,
          lastUpdate: new Date().toISOString()
        });
        setError(null);
      } catch (err) {
        console.error('Error loading system data:', err);
        setError('Failed to load system data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Real-time updates
  useEffect(() => {
    const handleUpdate = (update: SystemUpdate) => {
      setData(prevData => {
        if (!prevData) return prevData;

        const newData = { ...prevData, lastUpdate: update.timestamp };

        switch (update.type) {
          case 'bus_created':
            newData.buses = [...prevData.buses, update.data];
            break;
          case 'bus_updated':
            newData.buses = prevData.buses.map(bus =>
              bus.id === update.data.id ? update.data : bus
            );
            break;
          case 'bus_deleted':
            newData.buses = prevData.buses.filter(bus => bus.id !== update.data.busId);
            break;
          case 'route_created':
            newData.routes = [...prevData.routes, update.data];
            break;
          case 'route_updated':
            newData.routes = prevData.routes.map(route =>
              route.id === update.data.id ? update.data : route
            );
            break;
          case 'booking_created':
            newData.bookings = [...prevData.bookings, update.data];
            break;
          case 'booking_updated':
            newData.bookings = prevData.bookings.map(booking =>
              booking.id === update.data.id ? update.data : booking
            );
            break;
          case 'user_created':
            newData.users = [...prevData.users, update.data];
            break;
          case 'settings_updated':
            newData.settings = update.data;
            break;
          default:
            break;
        }

        return newData;
      });
    };

    const unsubscribe = realTimeSync.subscribeToAll(handleUpdate);
    return unsubscribe;
  }, []);

  // Activity updates
  useEffect(() => {
    const unsubscribe = dataService.subscribeToActivities((activities) => {
      setData(prevData => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          activities,
          lastUpdate: new Date().toISOString()
        };
      });
    });

    return unsubscribe;
  }, []);

  return { data, loading, error, refresh: () => window.location.reload() };
}

// Hook for specific data types
export function useRealTimeBuses() {
  const { data, loading, error } = useRealTimeSystemData();
  return {
    buses: data?.buses || [],
    loading,
    error,
    lastUpdate: data?.lastUpdate
  };
}

export function useRealTimeRoutes() {
  const { data, loading, error } = useRealTimeSystemData();
  return {
    routes: data?.routes || [],
    loading,
    error,
    lastUpdate: data?.lastUpdate
  };
}

export function useRealTimeBookings() {
  const { data, loading, error } = useRealTimeSystemData();
  return {
    bookings: data?.bookings || [],
    loading,
    error,
    lastUpdate: data?.lastUpdate
  };
}

export function useRealTimeActivities() {
  const { data, loading, error } = useRealTimeSystemData();
  return {
    activities: data?.activities || [],
    loading,
    error,
    lastUpdate: data?.lastUpdate
  };
}

export function useRealTimeSettings() {
  const { data, loading, error } = useRealTimeSystemData();
  return {
    settings: data?.settings,
    loading,
    error,
    lastUpdate: data?.lastUpdate
  };
}