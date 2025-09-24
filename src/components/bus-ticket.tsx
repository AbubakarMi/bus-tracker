'use client';

import React from 'react';
import { QrCode } from 'lucide-react';

interface Booking {
  id: string;
  busNumber: string;
  route: string;
  date: string;
  departureTime: string;
  seat: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: string;
  pickupPoint?: string;
  dropoffPoint?: string;
  paymentStatus?: 'paid' | 'pending' | 'failed';
  // Staff booking additional fields
  purpose?: string;
  boardingTime?: string;
  gate?: string;
  bookedDate?: string;
  approvedBy?: string;
}

interface BusTicketProps {
  booking: Booking;
  passengerName?: string;
  userType?: string;
  gate?: string;
  boardingTime?: string;
}

export const BusTicket: React.FC<BusTicketProps> = ({
  booking,
  passengerName = "Student User",
  userType = "Student",
  gate,
  boardingTime
}) => {
  const displayGate = gate || booking.gate || "Gate 1";
  const displayBoardingTime = boardingTime || booking.boardingTime || "15 mins before";
  return (
    <div
      className="bg-white relative border-2 border-gray-300 print:border-gray-400"
      style={{
        width: '320px',
        height: '200px',
        fontSize: '11px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Header */}
      <div
        className="text-white text-center py-2"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          height: '40px'
        }}
      >
        <div className="font-bold text-sm">DIGITAL BUS TICKET</div>
        <div className="text-xs">
          {booking.status === 'confirmed' ? 'CONFIRMED' : booking.status.toUpperCase()}
        </div>
      </div>

      <div className="p-3 space-y-2">
        {/* User Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-600">User Type:</div>
            <div className="font-semibold">{userType}</div>
          </div>
          <div>
            <div className="text-gray-600">Route:</div>
            <div className="font-semibold text-xs">{booking.route}</div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-gray-600">Bus ID:</div>
            <div className="font-semibold">{booking.busNumber}</div>
          </div>
          <div>
            <div className="text-gray-600">Date:</div>
            <div className="font-semibold">{booking.date}</div>
          </div>
          <div>
            <div className="text-gray-600">Departure:</div>
            <div className="font-semibold">{booking.departureTime}</div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-4 gap-2">
          <div>
            <div className="text-gray-600">Seat:</div>
            <div className="font-semibold">{booking.seat}</div>
          </div>
          <div>
            <div className="text-gray-600">Gate:</div>
            <div className="font-semibold">{displayGate}</div>
          </div>
          <div>
            <div className="text-gray-600">Boarding:</div>
            <div className="font-semibold text-xs">{displayBoardingTime}</div>
          </div>
          <div>
            <div className="text-gray-600">Price:</div>
            <div className="font-semibold text-blue-600">{booking.price}</div>
          </div>
        </div>

        {/* QR Code */}
        <div className="absolute bottom-2 right-3">
          <QrCode className="h-12 w-12 text-gray-800" />
        </div>
      </div>
    </div>
  );
};