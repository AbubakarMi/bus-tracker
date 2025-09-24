'use client';

import { useState } from 'react';
import { TicketModal } from '@/components/ticket-modal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  MapPin,
  Clock,
  Download,
  Eye,
  CreditCard,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

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

export default function StudentBookingsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [bookings] = useState<Booking[]>([
    {
      id: 'BK-001',
      busNumber: 'ADUS-001',
      route: 'Campus to City Center',
      date: '2024-01-20',
      departureTime: '08:30',
      seat: 'A12',
      status: 'confirmed',
      price: '₦5,500',
      pickupPoint: 'ADU Campus Gate',
      dropoffPoint: 'Kano City Center',
      paymentStatus: 'paid'
    },
    {
      id: 'BK-002',
      busNumber: 'ADUS-003',
      route: 'Campus Shuttle',
      date: '2024-01-21',
      departureTime: '14:15',
      seat: 'B8',
      status: 'confirmed',
      price: '₦300',
      pickupPoint: 'ADU Campus Gate',
      dropoffPoint: 'Student Hostel',
      paymentStatus: 'paid'
    },
    {
      id: 'BK-003',
      busNumber: 'ADUS-007',
      route: 'Airport Express',
      date: '2024-01-18',
      departureTime: '06:00',
      seat: 'C15',
      status: 'completed',
      price: '₦8,000',
      pickupPoint: 'ADU Campus Gate',
      dropoffPoint: 'Kano Airport',
      paymentStatus: 'paid'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleViewTicket = (booking: Booking) => {
    setSelectedTicket(booking);
    setIsTicketModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
    setSelectedTicket(null);
  };

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Bookings</h1>
          <p className="text-muted-foreground">Manage your bus reservations and download tickets</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">₦13.8k</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="past">Travel History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>
                Your confirmed and pending bus reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking Details</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.busNumber} • Seat {booking.seat}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.route}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.pickupPoint} → {booking.dropoffPoint}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.date}</div>
                          <div className="text-sm text-muted-foreground">{booking.departureTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.price}</div>
                          <Badge variant={getPaymentStatusColor(booking.paymentStatus)} className="text-xs">
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTicket(booking)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleViewTicket(booking)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Travel History</CardTitle>
              <CardDescription>
                Your completed and cancelled bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking Details</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.busNumber} • Seat {booking.seat}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.route}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.pickupPoint} → {booking.dropoffPoint}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.date}</div>
                          <div className="text-sm text-muted-foreground">{booking.departureTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.price}</div>
                          <Badge variant={getPaymentStatusColor(booking.paymentStatus)} className="text-xs">
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTicket(booking)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.status === 'completed' && (
                            <Button variant="outline" size="sm" onClick={() => handleViewTicket(booking)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ticket Modal */}
      <TicketModal
        booking={selectedTicket}
        isOpen={isTicketModalOpen}
        onClose={handleCloseTicketModal}
        passengerName="Student User"
      />
    </div>
  );
}