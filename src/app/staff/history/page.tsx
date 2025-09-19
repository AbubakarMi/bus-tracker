'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  History,
  Calendar,
  Clock,
  MapPin,
  Bus,
  Search,
  Filter,
  Download,
  Eye,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Route,
  DollarSign
} from 'lucide-react';

interface TripHistory {
  id: string;
  busNumber: string;
  route: string;
  purpose: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  actualArrivalTime?: string;
  seat: string;
  status: 'completed' | 'cancelled' | 'no-show';
  price: string;
  rating?: number;
  feedback?: string;
  distance: string;
  duration: string;
}

export default function StaffHistoryPage() {
  const [tripHistory, setTripHistory] = useState<TripHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [selectedTrip, setSelectedTrip] = useState<TripHistory | null>(null);

  useEffect(() => {
    // Simulate trip history data
    const historyData: TripHistory[] = [
      {
        id: 'TRV-101',
        busNumber: 'ADUS-001',
        route: 'Lagos Express',
        purpose: 'Official Conference',
        date: '2024-01-15',
        departureTime: '8:30 AM',
        arrivalTime: '10:45 AM',
        actualArrivalTime: '10:50 AM',
        seat: 'A12',
        status: 'completed',
        price: '₦8,500',
        rating: 5,
        feedback: 'Excellent service, very comfortable trip',
        distance: '85.2 km',
        duration: '2h 20min'
      },
      {
        id: 'TRV-102',
        busNumber: 'ADUS-007',
        route: 'Airport Link',
        purpose: 'Business Trip',
        date: '2024-01-10',
        departureTime: '6:30 AM',
        arrivalTime: '7:40 AM',
        actualArrivalTime: '7:35 AM',
        seat: 'B8',
        status: 'completed',
        price: '₦12,000',
        rating: 4,
        feedback: 'Good service, arrived on time',
        distance: '35.7 km',
        duration: '1h 5min'
      },
      {
        id: 'TRV-103',
        busNumber: 'ADUS-003',
        route: 'Campus Shuttle',
        purpose: 'Department Meeting',
        date: '2024-01-08',
        departureTime: '2:15 PM',
        arrivalTime: '2:30 PM',
        actualArrivalTime: '2:28 PM',
        seat: 'C5',
        status: 'completed',
        price: '₦300',
        rating: 5,
        distance: '3.2 km',
        duration: '13min'
      },
      {
        id: 'TRV-104',
        busNumber: 'ADUS-012',
        route: 'City Center',
        purpose: 'Training Workshop',
        date: '2024-01-05',
        departureTime: '10:00 AM',
        arrivalTime: '10:45 AM',
        seat: 'D12',
        status: 'cancelled',
        price: '₦4,500',
        distance: '25.8 km',
        duration: '45min'
      },
      {
        id: 'TRV-105',
        busNumber: 'ADUS-002',
        route: 'Lagos Express',
        purpose: 'Administrative Task',
        date: '2023-12-28',
        departureTime: '3:00 PM',
        arrivalTime: '5:15 PM',
        actualArrivalTime: '5:45 PM',
        seat: 'A20',
        status: 'completed',
        price: '₦8,500',
        rating: 3,
        feedback: 'Delayed arrival due to traffic',
        distance: '85.2 km',
        duration: '2h 45min'
      },
      {
        id: 'TRV-106',
        busNumber: 'ADUS-008',
        route: 'Airport Link',
        purpose: 'Official Travel',
        date: '2023-12-20',
        departureTime: '7:00 AM',
        arrivalTime: '8:10 AM',
        seat: 'B15',
        status: 'no-show',
        price: '₦12,000',
        distance: '35.7 km',
        duration: '1h 10min'
      }
    ];

    setTripHistory(historyData);
  }, []);

  const filteredHistory = tripHistory.filter(trip => {
    const matchesSearch =
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;

    const matchesMonth = () => {
      if (monthFilter === 'all') return true;
      const tripDate = new Date(trip.date);
      const currentDate = new Date();

      switch (monthFilter) {
        case 'this-month':
          return tripDate.getMonth() === currentDate.getMonth() &&
                 tripDate.getFullYear() === currentDate.getFullYear();
        case 'last-month':
          const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
          return tripDate.getMonth() === lastMonth.getMonth() &&
                 tripDate.getFullYear() === lastMonth.getFullYear();
        case 'this-year':
          return tripDate.getFullYear() === new Date().getFullYear();
        default:
          return true;
      }
    };

    return matchesSearch && matchesStatus && matchesMonth();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'no-show':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'no-show':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  const downloadTripReport = (trip: TripHistory) => {
    const reportData = `
      ADUSTECH STAFF TRIP REPORT
      ==========================

      Trip ID: ${trip.id}
      Purpose: ${trip.purpose}
      Route: ${trip.route}
      Bus: ${trip.busNumber}

      Trip Details:
      Date: ${trip.date}
      Scheduled Departure: ${trip.departureTime}
      Scheduled Arrival: ${trip.arrivalTime}
      ${trip.actualArrivalTime ? `Actual Arrival: ${trip.actualArrivalTime}` : ''}
      Seat: ${trip.seat}
      Distance: ${trip.distance}
      Duration: ${trip.duration}

      Financial:
      Amount: ${trip.price}
      Status: ${trip.status}

      ${trip.rating ? `Rating: ${trip.rating}/5 stars` : ''}
      ${trip.feedback ? `Feedback: ${trip.feedback}` : ''}

      Generated on: ${new Date().toLocaleDateString()}

      Contact: transport@adustech.edu.ng
      Phone: +234-800-ADUSTECH
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `trip-report-${trip.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const stats = {
    total: tripHistory.length,
    completed: tripHistory.filter(t => t.status === 'completed').length,
    cancelled: tripHistory.filter(t => t.status === 'cancelled').length,
    totalSpent: tripHistory
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + parseFloat(t.price.replace('₦', '').replace(',', '')), 0),
    avgRating: tripHistory
      .filter(t => t.rating)
      .reduce((sum, t) => sum + (t.rating || 0), 0) / tripHistory.filter(t => t.rating).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <History className="h-8 w-8 text-blue-600" />
          Travel History
        </h1>
        <p className="text-gray-600 mt-2">Review your past official travels and trip reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Trips</p>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">₦{stats.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.avgRating?.toFixed(1) || 'N/A'}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search History</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Trip ID, route, purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:w-36">
              <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            <div className="md:w-36">
              <Label htmlFor="month-filter" className="text-sm font-medium text-gray-700">Period</Label>
              <select
                id="month-filter"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="border-blue-200 hover:border-blue-500 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((trip) => (
          <Card key={trip.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Bus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{trip.route}</h3>
                    <p className="text-sm text-gray-600">{trip.busNumber} • {trip.purpose}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(trip.status)} flex items-center gap-1`}>
                    {getStatusIcon(trip.status)}
                    {trip.status.replace('-', ' ')}
                  </Badge>
                  <span className="text-lg font-bold text-blue-600">{trip.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date:
                    </span>
                    <span className="font-medium">{trip.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Departure:
                    </span>
                    <span className="font-medium">{trip.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seat:</span>
                    <span className="font-medium">{trip.seat}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled Arrival:</span>
                    <span className="font-medium">{trip.arrivalTime}</span>
                  </div>
                  {trip.actualArrivalTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Actual Arrival:</span>
                      <span className={`font-medium ${
                        trip.actualArrivalTime > trip.arrivalTime ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {trip.actualArrivalTime}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Route className="h-4 w-4" />
                      Distance:
                    </span>
                    <span className="font-medium">{trip.distance}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{trip.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trip ID:</span>
                    <span className="font-medium">{trip.id}</span>
                  </div>
                  {trip.rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex gap-1">
                        {renderStars(trip.rating)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {trip.feedback && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{trip.feedback}"</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedTrip(trip)}
                  className="border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadTripReport(trip)}
                  className="border-green-200 hover:border-green-500 hover:bg-green-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No travel history found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Trip Details Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedTrip.route}</CardTitle>
                  <p className="text-blue-100 mt-1">{selectedTrip.busNumber} • {selectedTrip.purpose}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTrip(null)}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Status Banner */}
              <div className="text-center">
                <Badge className={`${getStatusColor(selectedTrip.status)} text-lg py-2 px-4`}>
                  {getStatusIcon(selectedTrip.status)}
                  <span className="ml-2">{selectedTrip.status.replace('-', ' ')}</span>
                </Badge>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Travel Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">{selectedTrip.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Departure:</span>
                      <span className="font-medium">{selectedTrip.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Scheduled Arrival:</span>
                      <span className="font-medium">{selectedTrip.arrivalTime}</span>
                    </div>
                    {selectedTrip.actualArrivalTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Actual Arrival:</span>
                        <span className={`font-medium ${
                          selectedTrip.actualArrivalTime > selectedTrip.arrivalTime ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {selectedTrip.actualArrivalTime}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Seat:</span>
                      <span className="font-medium">{selectedTrip.seat}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Trip Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Distance:</span>
                      <span className="font-medium">{selectedTrip.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{selectedTrip.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cost:</span>
                      <span className="font-medium text-lg text-blue-600">{selectedTrip.price}</span>
                    </div>
                    {selectedTrip.rating && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex gap-1">
                          {renderStars(selectedTrip.rating)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {selectedTrip.feedback && (
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Travel Feedback</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic">"{selectedTrip.feedback}"</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => downloadTripReport(selectedTrip)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}