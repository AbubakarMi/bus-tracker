import { dataService } from './data-service';

export interface SystemUpdate {
  type: 'bus_created' | 'bus_updated' | 'bus_deleted' | 'route_created' | 'route_updated' | 'booking_created' | 'booking_updated' | 'settings_updated' | 'user_created';
  data: any;
  timestamp: string;
  updatedBy: string;
}

class RealTimeSync {
  private static instance: RealTimeSync;
  private listeners: Map<string, Set<(update: SystemUpdate) => void>> = new Map();
  private isInitialized = false;

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

    this.isInitialized = true;
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
    const allTypes = ['bus_created', 'bus_updated', 'bus_deleted', 'route_created', 'route_updated', 'booking_created', 'booking_updated', 'settings_updated', 'user_created'];
    return this.subscribe(allTypes, callback);
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