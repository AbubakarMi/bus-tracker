'use client';

import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BusTicket } from '@/components/bus-ticket';
import { Download, Printer, X } from 'lucide-react';

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

interface TicketModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  passengerName?: string;
  userType?: string;
  gate?: string;
  boardingTime?: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  booking,
  isOpen,
  onClose,
  passengerName = "Student User",
  userType = "Student",
  gate = "Gate 1",
  boardingTime = "15 mins before"
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!booking || !ticketRef.current) return;

    try {
      // Import html2canvas dynamically to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `ticket-${booking.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating ticket:', error);
      // Fallback to text download
      downloadTextTicket(booking);
    }
  };

  const downloadTextTicket = (booking: Booking) => {
    const ticketData = `
ADUSTECH BUS TICKET
===================

Booking ID: ${booking.id}
Passenger: ${passengerName}
Bus: ${booking.busNumber}
Route: ${booking.route}

Travel Details:
Date: ${booking.date}
Departure: ${booking.departureTime}
Seat: ${booking.seat}
Pickup: ${booking.pickupPoint}
Dropoff: ${booking.dropoffPoint}

Amount: ${booking.price}
Status: ${booking.status}

Please arrive at the boarding gate 15 minutes before departure time.
Keep this ticket for verification during boarding.

Contact: transport@adustech.edu.ng
Phone: +234-800-ADUSTECH
    `;

    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `ticket-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const printTicket = () => {
    if (!ticketRef.current) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Bus Ticket - ${booking?.id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: Arial, sans-serif;
              padding: 10mm;
              background: white;
            }
            .ticket-container {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
            }
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              .ticket-container {
                padding: 5mm;
              }
              @page {
                size: 320px 200px;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            ${ticketRef.current.outerHTML}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bus Ticket</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Your bus ticket for {booking.route} on {booking.date}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Ticket Preview */}
          <div className="flex justify-center">
            <div ref={ticketRef}>
              <BusTicket
                booking={booking}
                passengerName={passengerName}
                userType={userType}
                gate={gate}
                boardingTime={boardingTime}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={downloadTicket} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={printTicket} className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Please arrive 15 minutes before departure time
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};