export interface Booking {
  id: string;
  busNumber: string;
  route: string;
  date: string;
  departureTime: string;
  seat: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: string;
  pickupPoint: string;
  dropoffPoint: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface StaffBooking {
  id: string;
  busNumber: string;
  route: string;
  purpose: string;
  date: string;
  departureTime: string;
  boardingTime: string;
  seat: string;
  gate: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: string;
  bookedDate: string;
  approvedBy?: string;
}