import { dataService } from './data-service';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

export interface SystemUpdate {
  type: 'bus_created' | 'bus_updated' | 'bus_deleted' | 'route_created' | 'route_updated' | 'booking_created' | 'booking_updated' | 'settings_updated' | 'user_created' | 'activity_updated';
  data: any;
  timestamp: string;
  updatedBy: string;
}

class RealTimeSync {
  private static instance: RealTimeSync;
  private listeners: Map<string, Set<(update: SystemUpdate) => void>> = new Map();
  private isInitialized = false;
  private unsubscribeFunctions: Map<string, () => void> = new Map();

  static getInstance(): RealTimeSync {
    if (!RealTimeSync.instance) {
      RealTimeSync.instance = new RealTimeSync();
    }
    return RealTimeSync.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    // Subscribe to DataService changes
    dataService.subscribeToDataChanges((data) => {
      const update: SystemUpdate = {
        type: data.type,
        data: data.data,
        timestamp: new Date().toISOString(),
        updatedBy: data.updatedBy || 'system'
      };

      this.broadcastUpdate(update);
    });

    // Initialize Firebase real-time listeners if available
    if (db) {
      this.setupFirebaseListeners();
    }

    this.isInitialized = true;
  }

  private setupFirebaseListeners() {
    // Listen to bookings collection in real-time
    const bookingsQuery = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const booking = { id: change.doc.id, ...change.doc.data() };
        let updateType: SystemUpdate['type'];

        if (change.type === 'added') {
          updateType = 'booking_created';
        } else if (change.type === 'modified') {
          updateType = 'booking_updated';
        } else {
          return; // Skip removed for now
        }

        this.triggerUpdate(updateType, booking, 'firebase');
      });
    });
    this.unsubscribeFunctions.set('bookings', unsubscribeBookings);

    // Listen to buses collection
    const busesQuery = query(collection(db, 'buses'));
    const unsubscribeBuses = onSnapshot(busesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const bus = { id: change.doc.id, ...change.doc.data() };
        let updateType: SystemUpdate['type'];

        if (change.type === 'added') {
          updateType = 'bus_created';
        } else if (change.type === 'modified') {
          updateType = 'bus_updated';
        } else if (change.type === 'removed') {
          updateType = 'bus_deleted';
        } else {
          return;
        }

        this.triggerUpdate(updateType, bus, 'firebase');
      });
    });
    this.unsubscribeFunctions.set('buses', unsubscribeBuses);

    // Listen to routes collection
    const routesQuery = query(collection(db, 'routes'));
    const unsubscribeRoutes = onSnapshot(routesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const route = { id: change.doc.id, ...change.doc.data() };
        let updateType: SystemUpdate['type'];

        if (change.type === 'added') {
          updateType = 'route_created';
        } else if (change.type === 'modified') {
          updateType = 'route_updated';
        } else {
          return; // Skip removed for now
        }

        this.triggerUpdate(updateType, route, 'firebase');
      });
    });
    this.unsubscribeFunctions.set('routes', unsubscribeRoutes);

    // Listen to activities for real-time notifications
    const activitiesQuery = query(
      collection(db, 'activities'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );
    const unsubscribeActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.doc.data() }));
      this.triggerUpdate('activity_updated' as any, activities, 'firebase');
    });
    this.unsubscribeFunctions.set('activities', unsubscribeActivities);
  }

  // Subscribe to specific update types
  subscribe(types: string[], callback: (update: SystemUpdate) => void): () => void {
    const callbackSet = new Set([callback]);

    types.forEach(type => {
      if (!this.listeners.has(type)) {
        this.listeners.set(type, new Set());
      }
      this.listeners.get(type)!.add(callback);
    });

    // Return unsubscribe function
    return () => {
      types.forEach(type => {
        const typeListeners = this.listeners.get(type);
        if (typeListeners) {
          typeListeners.delete(callback);
          if (typeListeners.size === 0) {
            this.listeners.delete(type);
          }
        }
      });
    };
  }

  // Subscribe to all updates
  subscribeToAll(callback: (update: SystemUpdate) => void): () => void {
    const allTypes = ['bus_created', 'bus_updated', 'bus_deleted', 'route_created', 'route_updated', 'booking_created', 'booking_updated', 'settings_updated', 'user_created', 'activity_updated'];
    return this.subscribe(allTypes, callback);
  }

  // Cleanup method
  cleanup() {
    this.unsubscribeFunctions.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.unsubscribeFunctions.clear();
    this.listeners.clear();
    this.isInitialized = false;
  }

  private broadcastUpdate(update: SystemUpdate) {
    const typeListeners = this.listeners.get(update.type);
    if (typeListeners) {
      typeListeners.forEach(callback => {
        try {
          callback(update);
        } catch (error) {
          console.error('Error in real-time update callback:', error);
        }
      });
    }

    // Also broadcast to 'all' listeners
    const allListeners = this.listeners.get('all');
    if (allListeners) {
      allListeners.forEach(callback => {
        try {
          callback(update);
        } catch (error) {
          console.error('Error in real-time update callback:', error);
        }
      });
    }
  }

  // Manual trigger for updates (useful for admin actions)
  triggerUpdate(type: SystemUpdate['type'], data: any, updatedBy: string = 'system') {
    const update: SystemUpdate = {
      type,
      data,
      timestamp: new Date().toISOString(),
      updatedBy
    };
    this.broadcastUpdate(update);
  }

  // Get current system status
  async getSystemStatus() {
    try {
      const allData = await dataService.loadAllData();
      return {
        buses: allData.buses,
        routes: allData.routes,
        users: allData.users,
        bookings: allData.bookings,
        activities: allData.activities.slice(0, 10), // Recent 10 activities
        settings: allData.settings,
        lastUpdate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting system status:', error);
      return null;
    }
  }

  // Health check for real-time system
  isHealthy(): boolean {
    return this.isInitialized && typeof window !== 'undefined';
  }
}

// Export singleton instance
export const realTimeSync = RealTimeSync.getInstance();

// Auto-initialize on client side
if (typeof window !== 'undefined') {
  realTimeSync.initialize();
}

// Hook for React components
export function useRealTimeUpdates(types: string[], callback: (update: SystemUpdate) => void) {
  if (typeof window === 'undefined') return () => {};

  const unsubscribe = realTimeSync.subscribe(types, callback);

  // Auto-cleanup on unmount
  return unsubscribe;
}

// Hook for all updates
export function useAllRealTimeUpdates(callback: (update: SystemUpdate) => void) {
  if (typeof window === 'undefined') return () => {};

  const unsubscribe = realTimeSync.subscribeToAll(callback);

  return unsubscribe;
}