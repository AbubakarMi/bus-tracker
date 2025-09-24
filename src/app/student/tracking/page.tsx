'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RealTimeTracker } from '@/components/tracking/real-time-tracker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MapPin,
  Clock,
  Route as RouteIcon,
  Users,
  AlertCircle,
  Navigation,
  Bus,
  CheckCircle,
  Timer,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface BookedBus {
  id: string;
  bookingId: string;
  busNumber: string;
  route: string;
  departureTime: string;
  boardingTime: string;
  date: string;
  seat: string;
  gate: string;
  status: 'upcoming' | 'boarding' | 'on-route' | 'completed' | 'cancelled';
  currentLocation?: string;
  nextStop?: string;
  eta?: string;
  progress?: number;
  driverName?: string;
  driverPhone?: string;
  isTrackable: boolean;
  trackingReason?: string;
}

export default function StudentTrackingPage() {
  const [bookedBuses, setBookedBuses] = useState<BookedBus[]>([]);
  const [selectedBus, setSelectedBus] = useState<BookedBus | null>(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    // Simulate booked buses with smart tracking logic
    const generateBookedBuses = (): BookedBus[] => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];

      return [
        {
          id: 'BK-001',
          bookingId: 'BK-001',
          busNumber: 'ADUS-001',
          route: 'Lagos Express',
          departureTime: '8:30 AM',
          boardingTime: '8:15 AM',
          date: today,
          seat: 'A12',
          gate: 'Gate 3',
          status: 'on-route',
          currentLocation: 'Mile 2 Bridge',
          nextStop: 'CMS Terminal',
          eta: '8 mins',
          progress: 65,
          driverName: 'Emeka Johnson',
          driverPhone: '+234-801-234-5678',
          isTrackable: true
        },
        {
          id: 'BK-002',
          bookingId: 'BK-002',
          busNumber: 'ADUS-003',
          route: 'Campus Shuttle',
          departureTime: '2:15 PM',
          boardingTime: '2:00 PM',
          date: today,
          seat: 'B8',
          gate: 'Gate 1',
          status: 'boarding',
          currentLocation: 'Main Gate',
          nextStop: 'Library Complex',
          eta: '3 mins',
          progress: 15,
          driverName: 'Fatima Adebayo',
          driverPhone: '+234-802-345-6789',
          isTrackable: true
        },
        {
          id: 'BK-003',
          bookingId: 'BK-003',
          busNumber: 'ADUS-007',
          route: 'Airport Link',
          departureTime: '6:30 AM',
          boardingTime: '6:15 AM',
          date: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          seat: 'C5',
          gate: 'Gate 4',
          status: 'upcoming',
          isTrackable: false,
          trackingReason: 'Bus tracking will be available 30 minutes before departure'
        },
        {
          id: 'BK-004',
          bookingId: 'BK-004',
          busNumber: 'ADUS-002',
          route: 'City Center Express',
          departureTime: '5:45 PM',
          boardingTime: '5:30 PM',
          date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
          seat: 'D10',
          gate: 'Gate 2',
          status: 'completed',
          isTrackable: false,
          trackingReason: 'Trip completed - no longer trackable'
        },
        {
          id: 'BK-005',
          bookingId: 'BK-005',
          busNumber: 'ADUS-005',
          route: 'Abuja Express',
          departureTime: '9:00 AM',
          boardingTime: '8:45 AM',
          date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
          seat: 'A3',
          gate: 'Gate 5',
          status: 'upcoming',
          isTrackable: false,
          trackingReason: 'Tracking available from 2 hours before departure'
        }
      ];
    };

    setBookedBuses(generateBookedBuses());
  }, []);

  const trackableBuses = bookedBuses.filter(bus => bus.isTrackable);
  const upcomingBuses = bookedBuses.filter(bus => !bus.isTrackable && bus.status === 'upcoming');
  const completedBuses = bookedBuses.filter(bus => bus.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'boarding':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    if (date.toDateString() === today) return 'Today';
    if (date.toDateString() === tomorrow) return 'Tomorrow';
    if (date.toDateString() === yesterday) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (selectedBus && selectedBus.isTrackable) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-headline">Live Bus Tracking</h1>
            <p className="text-muted-foreground">Tracking {selectedBus.busNumber} - {selectedBus.route}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedBus(null)}>
            Back to My Buses
          </Button>
        </div>

        <RealTimeTracker
          userInfo={{
            userId: userData?.id || 'UG20/COMS/1284',
            routeId: 'route-1',
            routeName: selectedBus.route,
            busId: selectedBus.id,
            busPlateNumber: selectedBus.busNumber,
            driverName: selectedBus.driverName || 'Driver',
            pickupPoint: selectedBus.gate,
            dropoffPoint: selectedBus.route.split(' ')[0] + ' Terminal',
            status: selectedBus.status === 'on-route' ? 'on_route' : 'boarding'
          }}
          allowedRoutes={['route-1']}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline mb-2">Track Your Buses</h1>
        <p className="text-muted-foreground">
          Monitor your booked buses in real-time. Only buses currently on route can be tracked.
        </p>
      </div>

      {/* Trackable Buses */}
      {trackableBuses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-green-600" />
                Live Tracking Available ({trackableBuses.length})
              </CardTitle>
              <CardDescription>
                Your buses that are currently trackable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trackableBuses.map((bus) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-green-200 rounded-xl p-4 bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedBus(bus)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center">
                        <Bus className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bus.busNumber}</h3>
                        <p className="text-sm text-gray-600">{bus.route}</p>
                        <p className="text-xs text-gray-500">{formatDate(bus.date)} • Seat {bus.seat}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(bus.status)}>
                      {bus.status === 'on-route' ? 'On Route' : 'Boarding'}
                    </Badge>
                  </div>

                  {bus.status === 'on-route' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Current:</span>
                          <span className="font-medium">{bus.currentLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">ETA:</span>
                          <span className="font-medium text-green-600">{bus.eta}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Route Progress</span>
                          <span className="text-sm font-medium">{bus.progress}%</span>
                        </div>
                        <Progress value={bus.progress} className="h-2" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {bus.driverName}
                      </span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      Track Live
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Upcoming Buses */}
      {upcomingBuses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Upcoming Buses ({upcomingBuses.length})
              </CardTitle>
              <CardDescription>
                Tracking will be available closer to departure time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="border border-blue-200 rounded-xl p-4 bg-blue-50/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bus.busNumber}</h3>
                        <p className="text-sm text-gray-600">{bus.route}</p>
                        <p className="text-xs text-gray-500">{formatDate(bus.date)} • {bus.departureTime} • Seat {bus.seat}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(bus.status)}>
                      Upcoming
                    </Badge>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {bus.trackingReason}
                    </AlertDescription>
                  </Alert>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* No Trackable Buses Message */}
      {trackableBuses.length === 0 && upcomingBuses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="text-center py-12">
              <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Buses to Track</h3>
              <p className="text-gray-500 mb-6">
                You don't have any buses currently available for tracking. Book a trip to start tracking your bus!
              </p>
              <Button onClick={() => window.location.href = '/student/book'}>
                <Calendar className="h-4 w-4 mr-2" />
                Book a Trip
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>How Bus Tracking Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">When Can You Track?</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 30 minutes before departure</li>
                  <li>• During boarding process</li>
                  <li>• While bus is on route</li>
                  <li>• Up to destination arrival</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tracking Features:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Real-time bus location</li>
                  <li>• Estimated arrival times</li>
                  <li>• Route progress updates</li>
                  <li>• Driver contact information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}