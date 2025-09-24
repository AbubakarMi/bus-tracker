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
  ArrowRight,
  Briefcase,
  FileText
} from 'lucide-react';

interface BookedTravel {
  id: string;
  travelId: string;
  busNumber: string;
  route: string;
  departureTime: string;
  boardingTime: string;
  date: string;
  seat: string;
  gate: string;
  purpose: string;
  status: 'upcoming' | 'boarding' | 'on-route' | 'completed' | 'cancelled';
  currentLocation?: string;
  nextStop?: string;
  eta?: string;
  progress?: number;
  driverName?: string;
  driverPhone?: string;
  isTrackable: boolean;
  trackingReason?: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
}

export default function StaffTrackingPage() {
  const [bookedTravels, setBookedTravels] = useState<BookedTravel[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<BookedTravel | null>(null);
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

    // Simulate booked travels with smart tracking logic
    const generateBookedTravels = (): BookedTravel[] => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];

      return [
        {
          id: 'TRV-001',
          travelId: 'TRV-001',
          busNumber: 'ADUS-001',
          route: 'Lagos Conference Center',
          departureTime: '9:00 AM',
          boardingTime: '8:45 AM',
          date: today,
          seat: 'C15',
          gate: 'Gate 2',
          purpose: 'Official Conference',
          status: 'on-route',
          currentLocation: 'Mile 2 Bridge',
          nextStop: 'Conference Center',
          eta: '15 mins',
          progress: 75,
          driverName: 'Emeka Johnson',
          driverPhone: '+234-801-234-5678',
          isTrackable: true,
          approvalStatus: 'approved'
        },
        {
          id: 'TRV-002',
          travelId: 'TRV-002',
          busNumber: 'ADUS-007',
          route: 'Airport Link',
          departureTime: '6:30 AM',
          boardingTime: '6:15 AM',
          date: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          seat: 'A5',
          gate: 'Gate 4',
          purpose: 'Business Trip',
          status: 'upcoming',
          isTrackable: false,
          trackingReason: 'Travel tracking will be available 1 hour before departure',
          approvalStatus: 'approved'
        },
        {
          id: 'TRV-003',
          travelId: 'TRV-003',
          busNumber: 'ADUS-003',
          route: 'University Seminar',
          departureTime: '2:15 PM',
          boardingTime: '2:00 PM',
          date: today,
          seat: 'B8',
          gate: 'Gate 1',
          purpose: 'Academic Meeting',
          status: 'boarding',
          currentLocation: 'Main Gate',
          nextStop: 'University of Lagos',
          eta: '5 mins',
          progress: 25,
          driverName: 'Fatima Adebayo',
          driverPhone: '+234-802-345-6789',
          isTrackable: true,
          approvalStatus: 'approved'
        },
        {
          id: 'TRV-004',
          travelId: 'TRV-004',
          busNumber: 'ADUS-012',
          route: 'Training Workshop',
          departureTime: '8:00 AM',
          boardingTime: '7:45 AM',
          date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
          seat: 'D12',
          gate: 'Gate 3',
          purpose: 'Professional Development',
          status: 'completed',
          isTrackable: false,
          trackingReason: 'Travel completed - no longer trackable',
          approvalStatus: 'approved'
        },
        {
          id: 'TRV-005',
          travelId: 'TRV-005',
          busNumber: 'ADUS-005',
          route: 'Abuja Research Center',
          departureTime: '7:00 AM',
          boardingTime: '6:45 AM',
          date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
          seat: 'A1',
          gate: 'Gate 5',
          purpose: 'Research Collaboration',
          status: 'upcoming',
          isTrackable: false,
          trackingReason: 'Tracking available from 3 hours before departure',
          approvalStatus: 'pending'
        }
      ];
    };

    setBookedTravels(generateBookedTravels());
  }, []);

  const trackableTravels = bookedTravels.filter(travel => travel.isTrackable && travel.approvalStatus === 'approved');
  const upcomingTravels = bookedTravels.filter(travel => !travel.isTrackable && travel.status === 'upcoming' && travel.approvalStatus === 'approved');
  const pendingTravels = bookedTravels.filter(travel => travel.approvalStatus === 'pending');

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

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
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

  if (selectedTravel && selectedTravel.isTrackable) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-headline">Live Travel Tracking</h1>
            <p className="text-muted-foreground">
              Tracking {selectedTravel.busNumber} - {selectedTravel.route} | {selectedTravel.purpose}
            </p>
          </div>
          <Button variant="outline" onClick={() => setSelectedTravel(null)}>
            Back to My Travels
          </Button>
        </div>

        <RealTimeTracker
          userInfo={{
            userId: userData?.id || 'Staff/Adustech/1001',
            routeId: 'route-1',
            routeName: selectedTravel.route,
            busId: selectedTravel.id,
            busPlateNumber: selectedTravel.busNumber,
            driverName: selectedTravel.driverName || 'Driver',
            pickupPoint: selectedTravel.gate,
            dropoffPoint: selectedTravel.route.split(' ')[0] + ' Terminal',
            status: selectedTravel.status === 'on-route' ? 'on_route' : 'boarding'
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
        <h1 className="text-3xl font-bold font-headline mb-2">Track Official Travels</h1>
        <p className="text-muted-foreground">
          Monitor your approved travel requests in real-time. Only travels currently on route can be tracked.
        </p>
      </div>

      {/* Trackable Travels */}
      {trackableTravels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-green-600" />
                Live Tracking Available ({trackableTravels.length})
              </CardTitle>
              <CardDescription>
                Your approved travels that are currently trackable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trackableTravels.map((travel) => (
                <motion.div
                  key={travel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-green-200 rounded-xl p-4 bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTravel(travel)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{travel.busNumber}</h3>
                        <p className="text-sm text-gray-600">{travel.route}</p>
                        <p className="text-xs text-gray-500">{formatDate(travel.date)} • Seat {travel.seat}</p>
                        <p className="text-xs text-indigo-600 font-medium">{travel.purpose}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusColor(travel.status)}>
                        {travel.status === 'on-route' ? 'On Route' : 'Boarding'}
                      </Badge>
                      <Badge variant="outline" className={getApprovalColor(travel.approvalStatus)}>
                        {travel.approvalStatus}
                      </Badge>
                    </div>
                  </div>

                  {travel.status === 'on-route' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Current:</span>
                          <span className="font-medium">{travel.currentLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">ETA:</span>
                          <span className="font-medium text-green-600">{travel.eta}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Journey Progress</span>
                          <span className="text-sm font-medium">{travel.progress}%</span>
                        </div>
                        <Progress value={travel.progress} className="h-2" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {travel.driverName}
                      </span>
                    </div>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
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

      {/* Pending Approvals */}
      {pendingTravels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Pending Approvals ({pendingTravels.length})
              </CardTitle>
              <CardDescription>
                Travel requests awaiting management approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTravels.map((travel) => (
                <div
                  key={travel.id}
                  className="border border-orange-200 rounded-xl p-4 bg-orange-50/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{travel.busNumber}</h3>
                        <p className="text-sm text-gray-600">{travel.route}</p>
                        <p className="text-xs text-gray-500">{formatDate(travel.date)} • {travel.departureTime} • Seat {travel.seat}</p>
                        <p className="text-xs text-orange-600 font-medium">{travel.purpose}</p>
                      </div>
                    </div>
                    <Badge className={getApprovalColor(travel.approvalStatus)}>
                      Pending Approval
                    </Badge>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Your travel request is pending management approval. Tracking will be available once approved.
                    </AlertDescription>
                  </Alert>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Upcoming Travels */}
      {upcomingTravels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Upcoming Travels ({upcomingTravels.length})
              </CardTitle>
              <CardDescription>
                Tracking will be available closer to departure time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTravels.map((travel) => (
                <div
                  key={travel.id}
                  className="border border-blue-200 rounded-xl p-4 bg-blue-50/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{travel.busNumber}</h3>
                        <p className="text-sm text-gray-600">{travel.route}</p>
                        <p className="text-xs text-gray-500">{formatDate(travel.date)} • {travel.departureTime} • Seat {travel.seat}</p>
                        <p className="text-xs text-blue-600 font-medium">{travel.purpose}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(travel.status)}>
                      Upcoming
                    </Badge>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {travel.trackingReason}
                    </AlertDescription>
                  </Alert>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* No Trackable Travels Message */}
      {trackableTravels.length === 0 && upcomingTravels.length === 0 && pendingTravels.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Travel Requests</h3>
              <p className="text-gray-500 mb-6">
                You don't have any travel requests currently available for tracking. Submit a travel request to start tracking!
              </p>
              <Button onClick={() => window.location.href = '/staff/book'}>
                <Calendar className="h-4 w-4 mr-2" />
                Request Travel
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
            <CardTitle>How Staff Travel Tracking Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">Travel Request Process:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Submit travel request with purpose</li>
                  <li>• Wait for management approval</li>
                  <li>• Tracking available after approval</li>
                  <li>• Real-time monitoring during travel</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tracking Features:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Live bus location updates</li>
                  <li>• Arrival time estimates</li>
                  <li>• Journey progress tracking</li>
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