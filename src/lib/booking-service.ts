import { db } from './firebase';
import { doc, setDoc, getDoc, collection, query, getDocs, updateDoc, deleteDoc, addDoc, where, increment } from 'firebase/firestore';
import { getAllBuses, updateBus, type Bus } from './bus-service';
import { dataService } from './data-service';
import { realTimeSync } from './real-time-sync';

export interface Booking {
  id: string;
  busId: string;
  busPlateNumber: string;
  routeId?: string;
  routeName?: string;
  passengerId: string;
  passengerName: string;
  passengerEmail: string;
  passengerType: 'student' | 'staff';
  passengerRegNumber?: string;
  passengerStaffId?: string;
  seatNumber: string;
  bookingDate: string;
  tripDate: string;
  tripTime: string;
  departurePoint: string;
  arrivalPoint: string;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
  bookingTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeatAvailability {
  busId: string;
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
  bookedSeatNumbers: string[];
  lastUpdated: string;
}

export interface BusBookingSummary {
  busId: string;
  busPlateNumber: string;
  totalBookings: number;
  confirmedBookings: number;
  revenue: number;
  bookings: Booking[];
}

// Booking Management Functions
export async function createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>, createdBy?: string): Promise<Booking> {
  const timestamp = new Date().toISOString();
  const newBooking: Booking = {
    ...bookingData,
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  try {
    // Check seat availability first
    const isAvailable = await checkSeatAvailability(bookingData.busId, bookingData.seatNumber);
    if (!isAvailable) {
      throw new Error('Seat is already booked');
    }

    if (db) {
      // Save to Firestore
      await setDoc(doc(db, 'bookings', newBooking.id), newBooking);
      console.log('✅ Booking saved to Firestore:', newBooking.id);

      // Trigger real-time update
      realTimeSync.triggerUpdate('booking_created', newBooking, createdBy || bookingData.passengerId);
    }

    // Also save to localStorage as backup
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    // Log booking activity using DataService
    try {
      await dataService.createBooking({
        busPlateNumber: bookingData.busPlateNumber,
        seatNumber: bookingData.seatNumber,
        routeName: bookingData.routeName || '',
        amount: bookingData.amount,
        passengerName: bookingData.passengerName,
        passengerRegNumber: bookingData.passengerRegNumber || bookingData.passengerStaffId || '',
        passengerType: bookingData.passengerType,
        tripDate: bookingData.tripDate,
        tripTime: bookingData.tripTime
      }, createdBy || bookingData.passengerId);
    } catch (activityError) {
      console.error('Error logging booking activity:', activityError);
      // Don't fail the booking if activity logging fails
    }

    // Update seat availability
    await updateSeatAvailability(bookingData.busId);

    return newBooking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    if (db) {
      // Try to get from Firestore first
      const bookingsCollection = collection(db, 'bookings');
      const bookingsSnapshot = await getDocs(bookingsCollection);
      const bookings = bookingsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Booking));

      if (bookings.length > 0) {
        // Sync with localStorage
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return bookings;
      }
    }

    // Fallback to localStorage
    const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return localBookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }
}

export async function getBookingsByBus(busId: string): Promise<Booking[]> {
  try {
    const allBookings = await getAllBookings();
    return allBookings.filter(booking => booking.busId === busId && booking.status !== 'cancelled');
  } catch (error) {
    console.error('Error getting bookings by bus:', error);
    return [];
  }
}

export async function getBookingsByPassenger(passengerId: string): Promise<Booking[]> {
  try {
    const allBookings = await getAllBookings();
    return allBookings.filter(booking => booking.passengerId === passengerId);
  } catch (error) {
    console.error('Error getting bookings by passenger:', error);
    return [];
  }
}

export async function updateBooking(bookingId: string, updates: Partial<Booking>): Promise<void> {
  const timestamp = new Date().toISOString();
  const updateData = { ...updates, updatedAt: timestamp };

  try {
    if (db) {
      // Update in Firestore
      await updateDoc(doc(db, 'bookings', bookingId), updateData);

      // Get the updated booking for real-time update
      const updatedBookingDoc = await getDoc(doc(db, 'bookings', bookingId));
      if (updatedBookingDoc.exists()) {
        const updatedBooking = { id: updatedBookingDoc.id, ...updatedBookingDoc.data() };
        realTimeSync.triggerUpdate('booking_updated', updatedBooking, 'system');
      }
    }

    // Update in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingIndex = bookings.findIndex((booking: Booking) => booking.id === bookingId);
    if (bookingIndex !== -1) {
      bookings[bookingIndex] = { ...bookings[bookingIndex], ...updateData };
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // If status changed to cancelled, update seat availability
      if (updates.status === 'cancelled') {
        await updateSeatAvailability(bookings[bookingIndex].busId);
      }
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
}

export async function cancelBooking(bookingId: string): Promise<void> {
  await updateBooking(bookingId, {
    status: 'cancelled',
    paymentStatus: 'refunded'
  });
}

// Seat Availability Functions
export async function checkSeatAvailability(busId: string, seatNumber: string): Promise<boolean> {
  try {
    const busBookings = await getBookingsByBus(busId);
    const bookedSeats = busBookings
      .filter(booking => booking.status === 'confirmed')
      .map(booking => booking.seatNumber);

    return !bookedSeats.includes(seatNumber);
  } catch (error) {
    console.error('Error checking seat availability:', error);
    return false;
  }
}

export async function getSeatAvailability(busId: string): Promise<SeatAvailability> {
  try {
    const buses = await getAllBuses();
    const bus = buses.find(b => b.id === busId);
    if (!bus) {
      throw new Error('Bus not found');
    }

    const busBookings = await getBookingsByBus(busId);
    const confirmedBookings = busBookings.filter(booking => booking.status === 'confirmed');
    const bookedSeatNumbers = confirmedBookings.map(booking => booking.seatNumber);

    return {
      busId,
      totalSeats: bus.capacity,
      bookedSeats: confirmedBookings.length,
      availableSeats: bus.capacity - confirmedBookings.length,
      bookedSeatNumbers,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting seat availability:', error);
    throw error;
  }
}

export async function updateSeatAvailability(busId: string): Promise<void> {
  try {
    const availability = await getSeatAvailability(busId);

    // Store availability data for quick access
    if (db) {
      await setDoc(doc(db, 'seat_availability', busId), availability);
    }

    // Also store in localStorage
    const allAvailability = JSON.parse(localStorage.getItem('seat_availability') || '{}');
    allAvailability[busId] = availability;
    localStorage.setItem('seat_availability', JSON.stringify(allAvailability));
  } catch (error) {
    console.error('Error updating seat availability:', error);
  }
}

// Admin Analytics Functions
export async function getBusBookingSummary(busId: string): Promise<BusBookingSummary> {
  try {
    const buses = await getAllBuses();
    const bus = buses.find(b => b.id === busId);
    if (!bus) {
      throw new Error('Bus not found');
    }

    const bookings = await getBookingsByBus(busId);
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
    const revenue = confirmedBookings.reduce((total, booking) => total + booking.amount, 0);

    return {
      busId,
      busPlateNumber: bus.plateNumber,
      totalBookings: bookings.length,
      confirmedBookings: confirmedBookings.length,
      revenue,
      bookings: bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    };
  } catch (error) {
    console.error('Error getting bus booking summary:', error);
    throw error;
  }
}

export async function getAllBusBookingSummaries(): Promise<BusBookingSummary[]> {
  try {
    const buses = await getAllBuses();
    const summaries = await Promise.all(
      buses.map(bus => getBusBookingSummary(bus.id))
    );
    return summaries;
  } catch (error) {
    console.error('Error getting all bus booking summaries:', error);
    return [];
  }
}

// Utility Functions
export function generateSeatNumber(seatIndex: number): string {
  const rowNumber = Math.ceil(seatIndex / 4);
  const seatLetter = ['A', 'B', 'C', 'D'][seatIndex % 4];
  return `${rowNumber}${seatLetter}`;
}

export function generateAvailableSeats(capacity: number, bookedSeats: string[] = []): string[] {
  const allSeats = Array.from({ length: capacity }, (_, i) => generateSeatNumber(i + 1));
  return allSeats.filter(seat => !bookedSeats.includes(seat));
}

export async function getAvailableBusesWithSeats(): Promise<Array<Bus & { availableSeats: number; bookedSeats: number }>> {
  try {
    const buses = await getAllBuses();
    const busesWithAvailability = await Promise.all(
      buses.map(async (bus) => {
        const availability = await getSeatAvailability(bus.id);
        return {
          ...bus,
          availableSeats: availability.availableSeats,
          bookedSeats: availability.bookedSeats
        };
      })
    );

    return busesWithAvailability.filter(bus => bus.availableSeats > 0);
  } catch (error) {
    console.error('Error getting available buses with seats:', error);
    return [];
  }
}