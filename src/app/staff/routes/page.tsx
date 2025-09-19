'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Route,
  Clock,
  MapPin,
  Bus,
  Search,
  Calendar,
  Users,
  DollarSign,
  Navigation,
  AlertCircle,
  CheckCircle,
  Info,
  Star
} from 'lucide-react';

interface RouteInfo {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  price: string;
  frequency: string;
  popularity: number;
  status: 'active' | 'maintenance' | 'suspended';
  schedules: Schedule[];
  stops: string[];
  amenities: string[];
}

interface Schedule {
  id: string;
  departure: string;
  arrival: string;
  busNumber: string;
  availableSeats: number;
  totalSeats: number;
  days: string[];
}

export default function StaffRoutesPage() {
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);

  useEffect(() => {
    // Simulate route data
    const routeData: RouteInfo[] = [
      {
        id: 'R-001',
        name: 'Lagos Express',
        origin: 'ADUSTECH Campus',
        destination: 'Lagos Island',
        distance: '85.2 km',
        duration: '2h 15min',
        price: '₦5,500 - ₦8,500',
        frequency: '6 times daily',
        popularity: 92,
        status: 'active',
        schedules: [
          { id: 'S-001', departure: '6:00 AM', arrival: '8:15 AM', busNumber: 'ADUS-001', availableSeats: 8, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
          { id: 'S-002', departure: '8:30 AM', arrival: '10:45 AM', busNumber: 'ADUS-002', availableSeats: 12, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
          { id: 'S-003', departure: '12:00 PM', arrival: '2:15 PM', busNumber: 'ADUS-003', availableSeats: 20, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
          { id: 'S-004', departure: '3:00 PM', arrival: '5:15 PM', busNumber: 'ADUS-004', availableSeats: 4, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
          { id: 'S-005', departure: '6:00 PM', arrival: '8:15 PM', busNumber: 'ADUS-005', availableSeats: 15, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
          { id: 'S-006', departure: '9:00 PM', arrival: '11:15 PM', busNumber: 'ADUS-006', availableSeats: 28, totalSeats: 36, days: ['Fri', 'Sat', 'Sun'] }
        ],
        stops: ['ADUSTECH Main Gate', 'Dutse Junction', 'Kubwa', 'Kuje', 'Gwagwalada', 'Lagos State Boundary', 'Berger', 'Lagos Island'],
        amenities: ['Wi-Fi', 'AC', 'Charging Port', 'Rest Stops']
      },
      {
        id: 'R-002',
        name: 'Airport Link',
        origin: 'ADUSTECH Campus',
        destination: 'Nnamdi Azikiwe International Airport',
        distance: '35.7 km',
        duration: '1h 10min',
        price: '₦8,000 - ₦12,000',
        frequency: '8 times daily',
        popularity: 88,
        status: 'active',
        schedules: [
          { id: 'S-007', departure: '5:30 AM', arrival: '6:40 AM', busNumber: 'ADUS-007', availableSeats: 2, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          { id: 'S-008', departure: '7:00 AM', arrival: '8:10 AM', busNumber: 'ADUS-008', availableSeats: 0, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          { id: 'S-009', departure: '10:30 AM', arrival: '11:40 AM', busNumber: 'ADUS-009', availableSeats: 18, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          { id: 'S-010', departure: '2:00 PM', arrival: '3:10 PM', busNumber: 'ADUS-010', availableSeats: 25, totalSeats: 36, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
        ],
        stops: ['ADUSTECH Main Gate', 'Airport Road', 'Airport Terminal 1', 'Airport Terminal 2'],
        amenities: ['Wi-Fi', 'AC', 'Charging Port', 'Luggage Space', 'Express Service']
      },
      {
        id: 'R-003',
        name: 'Campus Shuttle',
        origin: 'Student Hostels',
        destination: 'Academic Complex',
        distance: '3.2 km',
        duration: '15min',
        price: '₦200 - ₦300',
        frequency: '20 times daily',
        popularity: 95,
        status: 'active',
        schedules: [
          { id: 'S-011', departure: '6:30 AM', arrival: '6:45 AM', busNumber: 'ADUS-011', availableSeats: 14, totalSeats: 32, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
          { id: 'S-012', departure: '7:00 AM', arrival: '7:15 AM', busNumber: 'ADUS-012', availableSeats: 6, totalSeats: 32, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
          { id: 'S-013', departure: '8:00 AM', arrival: '8:15 AM', busNumber: 'ADUS-013', availableSeats: 2, totalSeats: 32, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }
        ],
        stops: ['Hostel Block A', 'Hostel Block B', 'Library', 'Lecture Theater Complex', 'Admin Block'],
        amenities: ['AC', 'Frequent Service']
      },
      {
        id: 'R-004',
        name: 'City Center',
        origin: 'ADUSTECH Campus',
        destination: 'Abuja City Center',
        distance: '25.8 km',
        duration: '45min',
        price: '₦2,500 - ₦4,500',
        frequency: '12 times daily',
        popularity: 78,
        status: 'maintenance',
        schedules: [],
        stops: ['ADUSTECH Main Gate', 'Dutse Market', 'Berger Bridge', 'Central Business District', 'Eagle Square'],
        amenities: ['Wi-Fi', 'AC', 'Charging Port']
      }
    ];

    setRoutes(routeData);
  }, []);

  const filteredRoutes = routes.filter(route => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || route.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'maintenance':
        return <AlertCircle className="h-4 w-4" />;
      case 'suspended':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeatStatusColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Route className="h-8 w-8 text-blue-600" />
          Routes & Schedules
        </h1>
        <p className="text-gray-600 mt-2">Browse available routes and plan your official travels</p>
      </div>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search Routes</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Route name, origin, destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:w-48">
              <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Route Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Routes</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredRoutes.map((route) => (
          <Card key={route.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Route className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{route.name}</CardTitle>
                    <p className="text-gray-600 text-sm">{route.origin} → {route.destination}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(route.status)} flex items-center gap-1`}>
                    {getStatusIcon(route.status)}
                    {route.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{route.popularity}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Route Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      Distance:
                    </span>
                    <span className="font-medium">{route.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Duration:
                    </span>
                    <span className="font-medium">{route.duration}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Price:
                    </span>
                    <span className="font-medium">{route.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Frequency:
                    </span>
                    <span className="font-medium">{route.frequency}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-2">
                  {route.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Today's Schedules */}
              {route.status === 'active' && route.schedules.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-900 mb-3">Today's Schedules</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {route.schedules.slice(0, 3).map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">{schedule.departure} → {schedule.arrival}</p>
                            <p className="text-xs text-gray-600">{schedule.busNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${getSeatStatusColor(schedule.availableSeats, schedule.totalSeats)}`}>
                            {schedule.availableSeats} seats
                          </p>
                          <p className="text-xs text-gray-500">
                            of {schedule.totalSeats}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                  onClick={() => setSelectedRoute(route)}
                >
                  View Details
                </Button>
                {route.status === 'active' && (
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
                    Request Travel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Route className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No routes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Route Details Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedRoute.name}</CardTitle>
                  <p className="text-blue-100 mt-1">{selectedRoute.origin} → {selectedRoute.destination}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRoute(null)}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Route Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Navigation className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedRoute.distance}</p>
                  <p className="text-sm text-gray-600">Distance</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedRoute.duration}</p>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedRoute.price}</p>
                  <p className="text-sm text-gray-600">Price Range</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedRoute.popularity}%</p>
                  <p className="text-sm text-gray-600">Popularity</p>
                </div>
              </div>

              {/* Bus Stops */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Bus Stops</h3>
                <div className="space-y-2">
                  {selectedRoute.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-900">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Schedule */}
              {selectedRoute.schedules.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Complete Schedule</h3>
                  <div className="space-y-3">
                    {selectedRoute.schedules.map((schedule) => (
                      <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Bus className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {schedule.departure} → {schedule.arrival}
                              </p>
                              <p className="text-sm text-gray-600">{schedule.busNumber}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${getSeatStatusColor(schedule.availableSeats, schedule.totalSeats)}`}>
                              {schedule.availableSeats} / {schedule.totalSeats}
                            </p>
                            <p className="text-sm text-gray-500">Available</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Operating days:</span>
                          {schedule.days.map((day, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}