import { db } from './firebase';
import { doc, setDoc, getDoc, collection, query, getDocs, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

export interface Bus {
  id: string;
  plateNumber: string;
  capacity: number;
  driverId?: string;
  driverName?: string;
  routeId?: string;
  routeName?: string;
  status: 'available' | 'in-service' | 'maintenance';
  model?: string;
  year?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  estimatedTime: string;
  distance: string;
  status: 'active' | 'inactive';
  description?: string;
  stops?: string[];
  createdAt: string;
  updatedAt: string;
}

// Bus Management Functions
export async function createBus(busData: Omit<Bus, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bus> {
  const timestamp = new Date().toISOString();
  const newBus: Bus = {
    ...busData,
    id: `bus_${Date.now()}`,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  try {
    if (db) {
      // Save to Firestore
      await setDoc(doc(db, 'buses', newBus.id), newBus);
      console.log('Bus saved to Firestore:', newBus.id);
    }

    // Also save to localStorage as backup
    const existingBuses = JSON.parse(localStorage.getItem('buses') || '[]');
    existingBuses.push(newBus);
    localStorage.setItem('buses', JSON.stringify(existingBuses));

    return newBus;
  } catch (error) {
    console.error('Error creating bus:', error);
    throw error;
  }
}

export async function getAllBuses(): Promise<Bus[]> {
  try {
    if (db) {
      // Try to get from Firestore first
      const busesCollection = collection(db, 'buses');
      const busesSnapshot = await getDocs(busesCollection);
      const buses = busesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Bus));

      if (buses.length > 0) {
        // Sync with localStorage
        localStorage.setItem('buses', JSON.stringify(buses));
        return buses;
      }
    }

    // Fallback to localStorage
    const localBuses = JSON.parse(localStorage.getItem('buses') || '[]');
    return localBuses;
  } catch (error) {
    console.error('Error getting buses:', error);
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('buses') || '[]');
  }
}

export async function updateBus(busId: string, updates: Partial<Bus>): Promise<void> {
  const timestamp = new Date().toISOString();
  const updateData = { ...updates, updatedAt: timestamp };

  try {
    if (db) {
      // Update in Firestore
      await updateDoc(doc(db, 'buses', busId), updateData);
    }

    // Update in localStorage
    const buses = JSON.parse(localStorage.getItem('buses') || '[]');
    const busIndex = buses.findIndex((bus: Bus) => bus.id === busId);
    if (busIndex !== -1) {
      buses[busIndex] = { ...buses[busIndex], ...updateData };
      localStorage.setItem('buses', JSON.stringify(buses));
    }
  } catch (error) {
    console.error('Error updating bus:', error);
    throw error;
  }
}

export async function deleteBus(busId: string): Promise<void> {
  try {
    if (db) {
      // Delete from Firestore
      await deleteDoc(doc(db, 'buses', busId));
    }

    // Delete from localStorage
    const buses = JSON.parse(localStorage.getItem('buses') || '[]');
    const filteredBuses = buses.filter((bus: Bus) => bus.id !== busId);
    localStorage.setItem('buses', JSON.stringify(filteredBuses));
  } catch (error) {
    console.error('Error deleting bus:', error);
    throw error;
  }
}

// Route Management Functions
export async function createRoute(routeData: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>): Promise<Route> {
  const timestamp = new Date().toISOString();
  const newRoute: Route = {
    ...routeData,
    id: `route_${Date.now()}`,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  try {
    if (db) {
      // Save to Firestore
      await setDoc(doc(db, 'routes', newRoute.id), newRoute);
    }

    // Also save to localStorage as backup
    const existingRoutes = JSON.parse(localStorage.getItem('routes') || '[]');
    existingRoutes.push(newRoute);
    localStorage.setItem('routes', JSON.stringify(existingRoutes));

    return newRoute;
  } catch (error) {
    console.error('Error creating route:', error);
    throw error;
  }
}

export async function getAllRoutes(): Promise<Route[]> {
  try {
    if (db) {
      // Try to get from Firestore first
      const routesCollection = collection(db, 'routes');
      const routesSnapshot = await getDocs(routesCollection);
      const routes = routesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Route));

      if (routes.length > 0) {
        // Sync with localStorage
        localStorage.setItem('routes', JSON.stringify(routes));
        return routes;
      }
    }

    // Fallback to localStorage
    const localRoutes = JSON.parse(localStorage.getItem('routes') || '[]');
    return localRoutes;
  } catch (error) {
    console.error('Error getting routes:', error);
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('routes') || '[]');
  }
}

export async function updateRoute(routeId: string, updates: Partial<Route>): Promise<void> {
  const timestamp = new Date().toISOString();
  const updateData = { ...updates, updatedAt: timestamp };

  try {
    if (db) {
      // Update in Firestore
      await updateDoc(doc(db, 'routes', routeId), updateData);
    }

    // Update in localStorage
    const routes = JSON.parse(localStorage.getItem('routes') || '[]');
    const routeIndex = routes.findIndex((route: Route) => route.id === routeId);
    if (routeIndex !== -1) {
      routes[routeIndex] = { ...routes[routeIndex], ...updateData };
      localStorage.setItem('routes', JSON.stringify(routes));
    }
  } catch (error) {
    console.error('Error updating route:', error);
    throw error;
  }
}

// Initialize default data if none exists
export async function initializeDefaultData(): Promise<void> {
  try {
    const existingBuses = await getAllBuses();
    const existingRoutes = await getAllRoutes();

    // Create default buses if none exist
    if (existingBuses.length === 0) {
      const defaultBuses = [
        {
          plateNumber: 'ADU-001',
          capacity: 45,
          status: 'available' as const,
          model: 'Toyota Coaster',
          year: '2022'
        },
        {
          plateNumber: 'ADU-002',
          capacity: 35,
          status: 'in-service' as const,
          model: 'Nissan Civilian',
          year: '2021'
        }
      ];

      for (const bus of defaultBuses) {
        await createBus(bus);
      }
    }

    // Create default routes if none exist
    if (existingRoutes.length === 0) {
      const defaultRoutes = [
        {
          name: 'Campus to City Center',
          startPoint: 'ADUSTECH Main Gate',
          endPoint: 'Kano City Center',
          estimatedTime: '45 minutes',
          distance: '25 km',
          status: 'active' as const,
          description: 'Main route connecting campus to city center',
          stops: ['ADUSTECH Gate', 'Kano Road Junction', 'City Mall', 'City Center']
        },
        {
          name: 'Campus to Airport',
          startPoint: 'ADUSTECH Main Gate',
          endPoint: 'Malam Aminu Kano Airport',
          estimatedTime: '30 minutes',
          distance: '18 km',
          status: 'active' as const,
          description: 'Express route to airport',
          stops: ['ADUSTECH Gate', 'Airport Road', 'Airport Terminal']
        }
      ];

      for (const route of defaultRoutes) {
        await createRoute(route);
      }
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
}