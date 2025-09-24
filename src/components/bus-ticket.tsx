'use client';

import React from 'react';
import { QrCode, MapPin, Clock, Calendar, User, Ticket } from 'lucide-react';

interface Booking {
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

interface BusTicketProps {
  booking: Booking;
  passengerName?: string;
}

export const BusTicket: React.FC<BusTicketProps> = ({
  booking,
  passengerName = "Student User"
}) => {
  return (
    <div className="bg-white w-[400px] h-[250px] relative overflow-hidden shadow-2xl border border-gray-200 rounded-xl">
      {/* Header Background */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90"></div>

      {/* Header Content */}
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-white font-bold text-lg">ADUSTECH</h1>
            <p className="text-blue-100 text-xs">Bus Transport Ticket</p>
          </div>
          <div className="text-right">
            <p className="text-white text-xs">Booking ID</p>
            <p className="text-white font-bold text-sm">{booking.id}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-2 space-y-3">
        {/* Passenger Info */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">{passengerName}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Seat</p>
            <p className="text-sm font-bold text-gray-900">{booking.seat}</p>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900">{booking.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Departure</p>
                <p className="text-sm font-medium text-gray-900">{booking.departureTime}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Bus</p>
              <p className="text-sm font-bold text-gray-900">{booking.busNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Fare</p>
              <p className="text-sm font-bold text-green-600">{booking.price}</p>
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
          <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 truncate">{booking.pickupPoint}</p>
            <div className="flex items-center space-x-1">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-xs text-gray-400">to</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            <p className="text-xs text-gray-500 truncate">{booking.dropoffPoint}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Ticket className="h-3 w-3 text-blue-500" />
            <span className="text-xs text-gray-600">Valid Ticket</span>
          </div>
          <div className="flex items-center space-x-2">
            <QrCode className="h-6 w-6 text-gray-400" />
            <div className="text-right">
              <p className="text-xs text-gray-400">Scan to verify</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {booking.status.toUpperCase()}
        </span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-100 to-transparent rounded-tl-full opacity-50"></div>
      <div className="absolute top-1/2 left-0 w-3 h-3 bg-white rounded-full transform -translate-x-1/2"></div>
      <div className="absolute top-1/2 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1/2"></div>
    </div>
  );
};