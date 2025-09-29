import { db } from './firebase';
import { doc, setDoc, getDoc, collection, query, getDocs, updateDoc, deleteDoc, addDoc, onSnapshot, orderBy, limit, where } from 'firebase/firestore';

// Real-time data management service
export class DataService {
  private static instance: DataService;
  private listeners: Map<string, () => void> = new Map();
  private activityLogListeners: Set<(activities: ActivityLog[]) => void> = new Set();
  private dataChangeListeners: Set<(data: any) => void> = new Set();

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Activity logging
  async logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
    const activityWithTimestamp: ActivityLog = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    try {
      // Save to Firebase if available
      if (db) {
        await addDoc(collection(db, 'activities'), activityWithTimestamp);
      }

      // Always save to localStorage as backup
      const activities = this.getActivitiesFromStorage();
      activities.unshift(activityWithTimestamp);

      // Keep only last 1000 activities
      if (activities.length > 1000) {
        activities.splice(1000);
      }

      localStorage.setItem('system_activities', JSON.stringify(activities));

      // Notify listeners
      this.notifyActivityListeners();
      this.notifyDataChangeListeners({ type: 'activity', data: activityWithTimestamp });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  // Get activities from storage
  private getActivitiesFromStorage(): ActivityLog[] {
    try {
      return JSON.parse(localStorage.getItem('system_activities') || '[]');
    } catch {
      return [];
    }
  }

  // Real-time activity subscription
  subscribeToActivities(callback: (activities: ActivityLog[]) => void): () => void {
    this.activityLogListeners.add(callback);

    // Initial load
    this.loadActivities().then(callback);

    // Return unsubscribe function
    return () => {
      this.activityLogListeners.delete(callback);
    };
  }

  // Load activities
  async loadActivities(): Promise<ActivityLog[]> {
    try {
      let activities: ActivityLog[] = [];

      if (db) {
        const activitiesRef = collection(db, 'activities');
        const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(100));
        const snapshot = await getDocs(q);

        activities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as ActivityLog));

        // Sync with localStorage
        localStorage.setItem('system_activities', JSON.stringify(activities));
      } else {
        // Fallback to localStorage
        activities = this.getActivitiesFromStorage();
      }

      return activities;
    } catch (error) {
      console.error('Error loading activities:', error);
      return this.getActivitiesFromStorage();
    }
  }

  // Notify activity listeners
  private notifyActivityListeners(): void {
    this.loadActivities().then(activities => {
      this.activityLogListeners.forEach(callback => callback(activities));
    });
  }

  // Data change notifications
  subscribeToDataChanges(callback: (data: any) => void): () => void {
    this.dataChangeListeners.add(callback);
    return () => {
      this.dataChangeListeners.delete(callback);
    };
  }

  private notifyDataChangeListeners(data: any): void {
    this.dataChangeListeners.forEach(callback => callback(data));
  }

  // Enhanced data change notification with more details
  private notifyEnhancedDataChange(type: string, data: any, updatedBy: string): void {
    const enhancedData = {
      type,
      data,
      updatedBy,
      timestamp: new Date().toISOString()
    };
    this.notifyDataChangeListeners(enhancedData);
  }

  // User management with activity logging
  async createUser(userData: any, createdBy: string): Promise<any> {
    try {
      const userId = userData.email || userData.id;
      const timestamp = new Date().toISOString();

      const userWithMetadata = {
        ...userData,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy
      };

      // Save to appropriate storage
      const storageKey = this.getStorageKeyForUserType(userData.role);
      const existingUsers = JSON.parse(localStorage.getItem(storageKey) || '{}');
      existingUsers[userId] = userWithMetadata;
      localStorage.setItem(storageKey, JSON.stringify(existingUsers));

      // Save to Firebase if available
      if (db) {
        await setDoc(doc(db, 'users', userId), userWithMetadata);
      }

      // Log activity
      await this.logActivity({
        type: 'user_created',
        description: `${userData.role} account created: ${userData.name}`,
        userId: createdBy,
        metadata: {
          targetUserId: userId,
          userType: userData.role,
          userName: userData.name
        }
      });

      this.notifyEnhancedDataChange('user_created', userWithMetadata, createdBy);
      return userWithMetadata;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Bus management with activity logging
  async createBus(busData: any, createdBy: string): Promise<any> {
    try {
      const timestamp = new Date().toISOString();
      const busWithMetadata = {
        ...busData,
        id: `bus_${Date.now()}`,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy
      };

      // Save to localStorage
      const buses = JSON.parse(localStorage.getItem('buses') || '[]');
      buses.push(busWithMetadata);
      localStorage.setItem('buses', JSON.stringify(buses));

      // Save to Firebase if available
      if (db) {
        await setDoc(doc(db, 'buses', busWithMetadata.id), busWithMetadata);
      }

      // Log activity
      await this.logActivity({
        type: 'bus_created',
        description: `New bus added: ${busData.plateNumber}`,
        userId: createdBy,
        metadata: {
          busId: busWithMetadata.id,
          plateNumber: busData.plateNumber,
          capacity: busData.capacity
        }
      });

      this.notifyEnhancedDataChange('bus_created', busWithMetadata, createdBy);
      return busWithMetadata;
    } catch (error) {
      console.error('Error creating bus:', error);
      throw error;
    }
  }

  // Route management with activity logging
  async createRoute(routeData: any, createdBy: string): Promise<any> {
    try {
      const timestamp = new Date().toISOString();
      const routeWithMetadata = {
        ...routeData,
        id: `route_${Date.now()}`,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy
      };

      // Save to localStorage
      const routes = JSON.parse(localStorage.getItem('routes') || '[]');
      routes.push(routeWithMetadata);
      localStorage.setItem('routes', JSON.stringify(routes));

      // Save to Firebase if available
      if (db) {
        await setDoc(doc(db, 'routes', routeWithMetadata.id), routeWithMetadata);
      }

      // Log activity
      await this.logActivity({
        type: 'route_created',
        description: `New route created: ${routeData.name}`,
        userId: createdBy,
        metadata: {
          routeId: routeWithMetadata.id,
          routeName: routeData.name,
          startPoint: routeData.startPoint,
          endPoint: routeData.endPoint
        }
      });

      this.notifyEnhancedDataChange('route_created', routeWithMetadata, createdBy);
      return routeWithMetadata;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  }

  // Booking management with activity logging
  async createBooking(bookingData: any, createdBy: string): Promise<any> {
    try {
      const timestamp = new Date().toISOString();
      const bookingWithMetadata = {
        ...bookingData,
        id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: timestamp,
        updatedAt: timestamp,
        bookedBy: createdBy
      };

      // Save to localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(bookingWithMetadata);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Save to Firebase if available
      if (db) {
        await setDoc(doc(db, 'bookings', bookingWithMetadata.id), bookingWithMetadata);
      }

      // Log activity
      await this.logActivity({
        type: 'booking_created',
        description: `Seat ${bookingData.seatNumber} booked on bus ${bookingData.busPlateNumber}`,
        userId: createdBy,
        metadata: {
          bookingId: bookingWithMetadata.id,
          busPlateNumber: bookingData.busPlateNumber,
          seatNumber: bookingData.seatNumber,
          routeName: bookingData.routeName,
          amount: bookingData.amount
        }
      });

      this.notifyEnhancedDataChange('booking_created', bookingWithMetadata, createdBy);
      return bookingWithMetadata;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  // Settings management
  async updateSettings(settings: SystemSettings, updatedBy: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const settingsWithMetadata = {
        ...settings,
        updatedAt: timestamp,
        updatedBy
      };

      // Save to localStorage
      localStorage.setItem('system_settings', JSON.stringify(settingsWithMetadata));

      // Save to Firebase if available
      if (db) {
        await setDoc(doc(db, 'settings', 'system'), settingsWithMetadata);
      }

      // Log activity
      await this.logActivity({
        type: 'settings_updated',
        description: 'System settings updated',
        userId: updatedBy,
        metadata: {
          updatedFields: Object.keys(settings)
        }
      });

      this.notifyEnhancedDataChange('settings_updated', settingsWithMetadata, updatedBy);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  // Get settings
  async getSettings(): Promise<SystemSettings> {
    try {
      if (db) {
        const settingsDoc = await getDoc(doc(db, 'settings', 'system'));
        if (settingsDoc.exists()) {
          const settings = settingsDoc.data() as SystemSettings;
          localStorage.setItem('system_settings', JSON.stringify(settings));
          return settings;
        }
      }

      // Fallback to localStorage
      const savedSettings = localStorage.getItem('system_settings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }

      // Default settings
      const defaultSettings: SystemSettings = {
        bookingPrice: 2500,
        maxAdvanceBookingDays: 7,
        cancellationWindowHours: 24,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        maintenanceMode: false,
        autoApproveBookings: true,
        systemName: 'ADUSTECH Bus Tracker',
        supportEmail: 'support@adustech.edu.ng',
        updatedAt: new Date().toISOString(),
        updatedBy: 'system'
      };

      await this.updateSettings(defaultSettings, 'system');
      return defaultSettings;
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        bookingPrice: 2500,
        maxAdvanceBookingDays: 7,
        cancellationWindowHours: 24,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        maintenanceMode: false,
        autoApproveBookings: true,
        systemName: 'ADUSTECH Bus Tracker',
        supportEmail: 'support@adustech.edu.ng',
        updatedAt: new Date().toISOString(),
        updatedBy: 'system'
      };
    }
  }

  // Get storage key for user type
  private getStorageKeyForUserType(role: string): string {
    switch (role) {
      case 'driver':
        return 'registeredDrivers';
      case 'staff':
        return 'registeredStaff';
      default:
        return 'registeredUsers';
    }
  }

  // Real-time data loading
  async loadAllData(): Promise<{
    users: any[];
    buses: any[];
    routes: any[];
    bookings: any[];
    activities: ActivityLog[];
    settings: SystemSettings;
  }> {
    try {
      const [activities, settings] = await Promise.all([
        this.loadActivities(),
        this.getSettings()
      ]);

      // Load users from all storage locations
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      const registeredDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');
      const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');

      const users = [
        ...Object.values(registeredUsers),
        ...Object.values(registeredDrivers),
        ...Object.values(registeredStaff)
      ];

      const buses = JSON.parse(localStorage.getItem('buses') || '[]');
      const routes = JSON.parse(localStorage.getItem('routes') || '[]');
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

      return {
        users,
        buses,
        routes,
        bookings,
        activities,
        settings
      };
    } catch (error) {
      console.error('Error loading all data:', error);
      throw error;
    }
  }

  // Delete operations with logging
  async deleteBus(busId: string, deletedBy: string): Promise<void> {
    try {
      // Get bus data before deletion
      const buses = JSON.parse(localStorage.getItem('buses') || '[]');
      const busToDelete = buses.find((bus: any) => bus.id === busId);

      if (!busToDelete) {
        throw new Error('Bus not found');
      }

      // Remove from localStorage
      const updatedBuses = buses.filter((bus: any) => bus.id !== busId);
      localStorage.setItem('buses', JSON.stringify(updatedBuses));

      // Remove from Firebase if available
      if (db) {
        await deleteDoc(doc(db, 'buses', busId));
      }

      // Log activity
      await this.logActivity({
        type: 'bus_deleted',
        description: `Bus deleted: ${busToDelete.plateNumber}`,
        userId: deletedBy,
        metadata: {
          busId,
          plateNumber: busToDelete.plateNumber
        }
      });

      this.notifyEnhancedDataChange('bus_deleted', { busId, busDetails: busToDelete }, deletedBy);
    } catch (error) {
      console.error('Error deleting bus:', error);
      throw error;
    }
  }

  // Update operations with logging
  async updateBus(busId: string, updates: any, updatedBy: string): Promise<void> {
    try {
      const buses = JSON.parse(localStorage.getItem('buses') || '[]');
      const busIndex = buses.findIndex((bus: any) => bus.id === busId);

      if (busIndex === -1) {
        throw new Error('Bus not found');
      }

      const originalBus = buses[busIndex];
      buses[busIndex] = {
        ...originalBus,
        ...updates,
        updatedAt: new Date().toISOString(),
        updatedBy
      };

      localStorage.setItem('buses', JSON.stringify(buses));

      // Update in Firebase if available
      if (db) {
        await updateDoc(doc(db, 'buses', busId), {
          ...updates,
          updatedAt: new Date().toISOString(),
          updatedBy
        });
      }

      // Log activity
      await this.logActivity({
        type: 'bus_updated',
        description: `Bus updated: ${originalBus.plateNumber}`,
        userId: updatedBy,
        metadata: {
          busId,
          plateNumber: originalBus.plateNumber,
          changes: updates
        }
      });

      this.notifyEnhancedDataChange('bus_updated', buses[busIndex], updatedBy);
    } catch (error) {
      console.error('Error updating bus:', error);
      throw error;
    }
  }
}

// Activity Log Interface
export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  userId: string;
  timestamp: string;
  metadata?: any;
}

// System Settings Interface
export interface SystemSettings {
  bookingPrice: number;
  maxAdvanceBookingDays: number;
  cancellationWindowHours: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  maintenanceMode: boolean;
  autoApproveBookings: boolean;
  systemName: string;
  supportEmail: string;
  updatedAt: string;
  updatedBy: string;
}

// Export singleton instance
export const dataService = DataService.getInstance();