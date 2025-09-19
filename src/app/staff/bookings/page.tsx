'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bus,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Download,
  Eye,
  Navigation,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText
} from 'lucide-react';

interface Booking {
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

export default function StaffBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    // Simulate booking data
    const bookingData: Booking[] = [
      {
        id: 'TRV-001',
        busNumber: 'ADUS-001',
        route: 'Lagos Conference Center',
        purpose: 'Official Conference',
        date: '2024-01-20',
        departureTime: '9:00 AM',
        boardingTime: '8:45 AM',
        seat: 'C15',
        gate: 'Gate 2',
        status: 'confirmed',
        price: '₦8,500',
        bookedDate: '2024-01-15',
        approvedBy: 'Dr. Adebayo Samuel'
      },
      {
        id: 'TRV-002',
        busNumber: 'ADUS-007',
        route: 'Airport Link',
        purpose: 'Business Trip',
        date: '2024-01-25',
        departureTime: '6:30 AM',
        boardingTime: '6:15 AM',
        seat: 'A5',
        gate: 'Gate 4',
        status: 'confirmed',
        price: '₦12,000',
        bookedDate: '2024-01-18',
        approvedBy: 'Prof. Fatima Yusuf'
      },
      {
        id: 'TRV-003',
        busNumber: 'ADUS-003',
        route: 'Campus Shuttle',
        purpose: 'Department Meeting',
        date: '2024-01-18',
        departureTime: '2:15 PM',
        boardingTime: '2:00 PM',
        seat: 'B12',
        gate: 'Gate 1',
        status: 'completed',
        price: '₦300',
        bookedDate: '2024-01-16',
        approvedBy: 'Dr. Ahmed Bello'
      },
      {
        id: 'TRV-004',
        busNumber: 'ADUS-012',
        route: 'City Center',
        purpose: 'Training Workshop',
        date: '2024-01-30',
        departureTime: '10:00 AM',
        boardingTime: '9:45 AM',
        seat: 'D8',
        gate: 'Gate 3',
        status: 'pending',
        price: '₦4,500',
        bookedDate: '2024-01-19'
      },
      {
        id: 'TRV-005',
        busNumber: 'ADUS-001',
        route: 'Lagos Express',
        purpose: 'Administrative Task',
        date: '2024-01-10',
        departureTime: '8:30 AM',
        boardingTime: '8:15 AM',
        seat: 'A20',
        gate: 'Gate 2',
        status: 'cancelled',
        price: '₦6,800',
        bookedDate: '2024-01-08'
      }
    ];

    setBookings(bookingData);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    const matchesDate = () => {
      if (dateFilter === 'all') return true;
      const bookingDate = new Date(booking.date);
      const today = new Date();

      switch (dateFilter) {
        case 'upcoming':
          return bookingDate >= today;
        case 'past':
          return bookingDate < today;
        case 'this-month':
          return bookingDate.getMonth() === today.getMonth() &&
                 bookingDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    };

    return matchesSearch && matchesStatus && matchesDate();
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const downloadBookingReceipt = (booking: Booking) => {
    const receiptData = `
      ADUSTECH STAFF TRAVEL RECEIPT
      =============================

      Booking ID: ${booking.id}
      Travel Purpose: ${booking.purpose}
      Route: ${booking.route}
      Bus: ${booking.busNumber}

      Travel Details:
      Date: ${booking.date}
      Departure: ${booking.departureTime}
      Boarding Time: ${booking.boardingTime}
      Seat: ${booking.seat}
      Gate: ${booking.gate}

      Amount: ${booking.price}
      Status: ${booking.status}
      Booked Date: ${booking.bookedDate}
      ${booking.approvedBy ? `Approved By: ${booking.approvedBy}` : ''}

      This is an official travel receipt for reimbursement purposes.

      Contact: transport@adustech.edu.ng
      Phone: +234-800-ADUSTECH
    `;

    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `receipt-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Bus className="h-8 w-8 text-blue-600" />
          My Travel Bookings
        </h1>
        <p className="text-gray-600 mt-2">Manage your official travel reservations and history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search Bookings</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Booking ID, route, purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:w-40">
              <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="md:w-40">
              <Label htmlFor="date-filter" className="text-sm font-medium text-gray-700">Date</Label>
              <select
                id="date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="this-month">This Month</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Bus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{booking.route}</h3>
                    <p className="text-sm text-gray-600">{booking.busNumber} • {booking.purpose}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </Badge>
                  <span className="text-lg font-bold text-blue-600">{booking.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Travel Date:</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Departure:</span>
                    <span className="font-medium">{booking.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Boarding:</span>
                    <span className="font-medium">{booking.boardingTime}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seat:</span>
                    <span className="font-medium">{booking.seat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gate:</span>
                    <span className="font-medium">{booking.gate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Booked:</span>
                    <span className="font-medium">{booking.bookedDate}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Booking ID:</span>
                    <span className="font-medium">{booking.id}</span>
                  </div>
                  {booking.approvedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Approved By:</span>
                      <span className="font-medium text-right text-xs">{booking.approvedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                {booking.status === 'confirmed' && (
                  <Button size="sm" variant="outline" className="border-green-200 hover:border-green-500 hover:bg-green-50">
                    <Navigation className="h-4 w-4 mr-1" />
                    Track Bus
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadBookingReceipt(booking)}
                  className="border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Receipt
                </Button>
                <Button size="sm" variant="outline" className="border-gray-200 hover:border-gray-500 hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}