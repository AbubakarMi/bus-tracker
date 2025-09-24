'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RealTimeTracker } from '@/components/tracking/real-time-tracker';
import { BusReviewModal } from '@/components/bus-review-modal';
import {
  Bus,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Navigation,
  Users,
  CheckCircle,
  Star,
  Activity,
  ArrowUpRight,
  Route,
  Timer,
  DollarSign,
  AlertCircle,
  Wifi,
  Battery,
  Zap,
  Ticket,
  CreditCard,
  Download,
  X,
  Plus,
  Search,
  Sparkles,
  Globe,
  Shield,
  Target,
  TrendingDown,
  Heart,
  Lightning,
  Award,
  BookOpen,
  Coffee,
  MessageSquare,
  ChevronRight,
  MoreHorizontal,
  Filter
} from 'lucide-react';

interface BusStatus {
  id: string;
  number: string;
  route: string;
  status: 'on-time' | 'delayed' | 'boarding';
  currentLocation: string;
  nextStop: string;
  eta: string;
  distanceLeft: string;
  occupancy: number;
  availableSeats: number;
  driver: string;
  amenities: string[];
  speed: number;
}

interface BookingData {
  id: string;
  busNumber: string;
  route: string;
  date: string;
  departureTime: string;
  boardingTime: string;
  seat: string;
  gate: string;
  status: 'confirmed' | 'boarding' | 'completed';
  price: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUserData({
            id: 'UG20/COMS/1284',
            role: 'student',
            name: 'John Doe',
            regNumber: 'UG20/COMS/1284',
            course: 'Computer Science'
          });
        }
      } else {
        setUserData({
          id: 'UG20/COMS/1284',
          role: 'student',
          name: 'John Doe',
          regNumber: 'UG20/COMS/1284',
          course: 'Computer Science'
        });
      }
    }
  }, []);

  const [availableBuses, setAvailableBuses] = useState<BusStatus[]>([]);
  const [myBookings, setMyBookings] = useState<BookingData[]>([]);
  const [stats, setStats] = useState({
    totalTrips: 0,
    pendingBookings: 0,
    onTimeRate: 0,
    totalSpent: 0
  });

  // Modal states
  const [showBookSeatModal, setShowBookSeatModal] = useState(false);
  const [showTrackBusModal, setShowTrackBusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'booking', message: 'Seat confirmed for Lagos Express', time: '2h ago', status: 'success', icon: CheckCircle },
    { id: 2, type: 'payment', message: 'Payment successful - ₦5,500', time: '2h ago', status: 'success', icon: DollarSign },
    { id: 3, type: 'tracking', message: 'Bus BUS-001 departed on time', time: '5h ago', status: 'info', icon: Bus },
    { id: 4, type: 'arrival', message: 'Trip completed: Campus Shuttle', time: '1d ago', status: 'success', icon: CheckCircle },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time bus updates
  useEffect(() => {
    const updateData = () => {
      const buses: BusStatus[] = [
        {
          id: 'BUS-001',
          number: 'ADUS-001',
          route: 'Lagos Express',
          status: 'on-time',
          currentLocation: 'Mile 2 Bridge',
          nextStop: 'CMS Terminal',
          eta: '8 mins',
          distanceLeft: '12.5 km',
          occupancy: 78,
          availableSeats: 10,
          driver: 'Emeka Johnson',
          amenities: ['wifi', 'ac', 'charging'],
          speed: 45
        },
        {
          id: 'BUS-003',
          number: 'ADUS-003',
          route: 'Campus Shuttle',
          status: 'boarding',
          currentLocation: 'Main Gate',
          nextStop: 'Library Complex',
          eta: '3 mins',
          distanceLeft: '2.1 km',
          occupancy: 45,
          availableSeats: 17,
          driver: 'Fatima Adebayo',
          amenities: ['ac'],
          speed: 25
        },
        {
          id: 'BUS-007',
          number: 'ADUS-007',
          route: 'Airport Link',
          status: 'delayed',
          currentLocation: 'Ikeja Along',
          nextStop: 'MM Airport T2',
          eta: '25 mins',
          distanceLeft: '18.7 km',
          occupancy: 92,
          availableSeats: 4,
          driver: 'Ibrahim Musa',
          amenities: ['wifi', 'ac', 'charging', 'luggage'],
          speed: 38
        }
      ];
      setAvailableBuses(buses);

      const bookings: BookingData[] = [
        {
          id: 'BK-001',
          busNumber: 'ADUS-001',
          route: 'Lagos Express',
          date: 'Today',
          departureTime: '8:30 AM',
          boardingTime: '8:15 AM',
          seat: 'A12',
          gate: 'Gate 3',
          status: 'confirmed',
          price: '₦5,500'
        },
        {
          id: 'BK-002',
          busNumber: 'ADUS-003',
          route: 'Campus Shuttle',
          date: 'Tomorrow',
          departureTime: '2:15 PM',
          boardingTime: '2:00 PM',
          seat: 'B8',
          gate: 'Gate 1',
          status: 'confirmed',
          price: '₦300'
        }
      ];
      setMyBookings(bookings);

      setStats({
        totalTrips: 24,
        pendingBookings: 2,
        onTimeRate: 94.2,
        totalSpent: 45600
      });
    };

    updateData();
    const interval = setInterval(updateData, 10000);
    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    {
      icon: Bus,
      value: stats.totalTrips.toString(),
      label: "Total Trips",
      change: "+3 this month",
      changeType: "positive" as const
    },
    {
      icon: Calendar,
      value: stats.pendingBookings.toString(),
      label: "Upcoming Trips",
      change: "2 confirmed",
      changeType: "neutral" as const
    },
    {
      icon: CheckCircle,
      value: `${stats.onTimeRate}%`,
      label: "On-Time Rate",
      change: "+2.1% this month",
      changeType: "positive" as const
    },
    {
      icon: DollarSign,
      value: `₦${(stats.totalSpent / 1000).toFixed(0)}k`,
      label: "Total Spent",
      change: "+₦5.8k this month",
      changeType: "neutral" as const
    }
  ];

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav user={userData} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={userData} title="Student Dashboard" />

      {/* World-Class Premium Dashboard */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        {/* Subtle Premium Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-indigo-50/30" />

        {/* Premium Floating Actions */}
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowReviewModal(true)}
            className="h-12 w-12 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center group backdrop-blur-sm"
            title="Rate Bus Service"
          >
            <MessageSquare className="h-5 w-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 w-12 rounded-xl bg-blue-600 border border-blue-600 shadow-sm hover:shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group"
          >
            <Plus className="h-5 w-5 text-white" />
          </motion.button>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Premium Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                  Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'}, {userData?.name?.split(' ')[0] || 'Student'}
                </h1>
                <p className="text-gray-600 text-base mb-4">
                  {currentTime.toLocaleDateString('en-NG', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>

              {/* Premium Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => router.push('/student/book')}
                  className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Seat
                </Button>
                <Button
                  onClick={() => router.push('/student/tracking')}
                  variant="outline"
                  className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Track
                </Button>
                <Button
                  onClick={() => router.push('/student/settings')}
                  variant="outline"
                  className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {quickStats.map((stat, index) => {
              const colors = [
                { icon: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                { icon: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
                { icon: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
                { icon: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' }
              ];
              const color = colors[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card className="bg-white border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl ${color.bg} ${color.border} border`}>
                          <stat.icon className={`h-5 w-5 ${color.icon}`} />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                          <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                          <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                            stat.changeType === 'positive'
                              ? 'text-green-700 bg-green-50 border border-green-100'
                              : 'text-gray-600 bg-gray-50 border border-gray-100'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Premium Main Content Grid - Adjusted Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Available Buses - Takes more space */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="border-b border-gray-50 pb-4">
                  <CardTitle className="flex items-center justify-between text-xl font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                        <Bus className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-900">Available Buses</span>
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-medium px-2.5 py-1 rounded-full border border-green-100">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        {availableBuses.length} Live
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-200 hover:border-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {availableBuses.map((bus) => (
                    <div key={bus.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            bus.status === 'on-time' ? 'bg-green-50 border-green-100' :
                            bus.status === 'delayed' ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'
                          } border`}>
                            <Bus className={`h-4 w-4 ${
                              bus.status === 'on-time' ? 'text-green-600' :
                              bus.status === 'delayed' ? 'text-red-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{bus.number}</h4>
                            <p className="text-sm text-gray-600">{bus.route}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'delayed' ? 'destructive' : 'secondary'} className="text-xs">
                            {bus.status === 'delayed' ? 'Delayed' : bus.status === 'boarding' ? 'Boarding' : 'On Time'}
                          </Badge>
                          <span className="text-xs text-gray-500">{bus.speed} km/h</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Current:</span>
                            <span className="font-medium text-gray-900">{bus.currentLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Next Stop:</span>
                            <span className="font-medium text-gray-900">{bus.nextStop}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">ETA:</span>
                            <span className="font-semibold text-blue-600">{bus.eta}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Distance:</span>
                            <span className="font-medium text-blue-600">{bus.distanceLeft}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Occupancy ({bus.occupancy}%)</span>
                          <span className={`font-medium ${
                            bus.availableSeats > 10 ? 'text-green-600' :
                            bus.availableSeats > 5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {bus.availableSeats} seats available
                          </span>
                        </div>
                        <Progress value={bus.occupancy} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm">
                          <span className="text-gray-500">Driver: </span>
                          <span className="font-medium text-gray-900">{bus.driver}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {bus.amenities.includes('wifi') && <Wifi className="h-4 w-4 text-blue-500" />}
                          {bus.amenities.includes('ac') && <Zap className="h-4 w-4 text-green-500" />}
                          {bus.amenities.includes('charging') && <Battery className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          onClick={() => router.push('/student/tracking')}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Live
                        </Button>
                        <Button
                          size="sm"
                          className={`flex-1 bg-blue-600 text-white hover:bg-blue-700 ${
                            bus.availableSeats === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={bus.availableSeats === 0}
                          onClick={() => bus.availableSeats > 0 && router.push('/student/book')}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {bus.availableSeats > 0 ? 'Book Seat' : 'Full'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar - Adjusted to 2 columns */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* My Bookings */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="border-b border-gray-50 pb-4">
                  <CardTitle className="flex items-center justify-between text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                        <Calendar className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-900">My Bookings</span>
                    </div>
                    <span className="bg-gray-50 text-gray-600 text-sm font-medium px-2 py-1 rounded-full border border-gray-100">
                      {myBookings.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {myBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-100 rounded-lg p-3 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{booking.route}</h4>
                          <p className="text-xs text-gray-600">{booking.busNumber} • {booking.date}</p>
                        </div>
                        <Badge variant="default" className="bg-green-50 text-green-700 border-green-100 text-xs">
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Departure:</span>
                          <span className="font-medium">{booking.departureTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Seat:</span>
                          <span className="font-medium">{booking.seat}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-green-600">{booking.price}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs border-gray-200 hover:border-green-300 hover:bg-green-50"
                            onClick={() => router.push('/student/tracking')}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                              const ticketData = {
                                booking: booking.id,
                                route: booking.route,
                                seat: booking.seat,
                                date: booking.date,
                                time: booking.departureTime
                              };
                              localStorage.setItem('downloadTicket', JSON.stringify(ticketData));
                              alert('Ticket downloaded successfully!');
                            }}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Ticket
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="border-b border-gray-50 pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                    <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                      <Activity className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-gray-900">Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-1.5 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-50 border-green-100' :
                        activity.status === 'info' ? 'bg-blue-50 border-blue-100' : 'bg-yellow-50 border-yellow-100'
                      } border`}>
                        <activity.icon className={`h-3 w-3 ${
                          activity.status === 'success' ? 'text-green-600' :
                          activity.status === 'info' ? 'text-blue-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <BusReviewModal
        isVisible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        userName={userData?.name || 'Student'}
        userType="student"
      />

      {/* Book Seat Modal */}
      <AnimatePresence>
        {showBookSeatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Book Your Seat</h3>
                    <p className="text-blue-100 text-sm">Choose your preferred bus and seat</p>
                  </div>
                  <button
                    onClick={() => setShowBookSeatModal(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <Label className="text-sm font-medium">Select Route</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a route" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBuses.map((bus) => (
                        <SelectItem key={bus.id} value={bus.id}>
                          {bus.route} - {bus.number} ({bus.availableSeats} seats)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Departure Date</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Time</Label>
                    <Input type="time" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Seat Preference</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Any available seat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="window">Window Seat</SelectItem>
                      <SelectItem value="aisle">Aisle Seat</SelectItem>
                      <SelectItem value="front">Front Section</SelectItem>
                      <SelectItem value="middle">Middle Section</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowBookSeatModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Book Seat - ₦2,500
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track Bus Modal */}
      <AnimatePresence>
        {showTrackBusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Live Bus Tracking</h3>
                    <p className="text-green-100 text-sm">Real-time location and status</p>
                  </div>
                  <button
                    onClick={() => setShowTrackBusModal(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {availableBuses.map((bus) => (
                  <div key={bus.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          bus.status === 'on-time' ? 'bg-green-50 border-green-200' :
                          bus.status === 'delayed' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                        } border`}>
                          <Bus className={`h-4 w-4 ${
                            bus.status === 'on-time' ? 'text-green-600' :
                            bus.status === 'delayed' ? 'text-red-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{bus.number}</h4>
                          <p className="text-sm text-gray-600">{bus.route}</p>
                        </div>
                      </div>
                      <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'delayed' ? 'destructive' : 'secondary'}>
                        {bus.status === 'delayed' ? 'Delayed' : bus.status === 'boarding' ? 'Boarding' : 'On Time'}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Current Location:</span>
                        <span className="font-medium">{bus.currentLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Next Stop:</span>
                        <span className="font-medium">{bus.nextStop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">ETA:</span>
                        <span className="font-semibold text-green-600">{bus.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Speed:</span>
                        <span className="font-medium">{bus.speed} km/h</span>
                      </div>
                    </div>
                  </div>
                ))}

                <Button onClick={() => setShowTrackBusModal(false)} className="w-full mt-4">
                  Close Tracking
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Payment Methods</h3>
                    <p className="text-purple-100 text-sm">Manage your payment options</p>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Saved Cards</h4>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/26</p>
                        </div>
                      </div>
                      <Badge variant="outline">Default</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Recent Transactions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lagos Express - Seat A12</span>
                      <span className="text-sm font-medium">₦5,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Campus Shuttle - Seat B8</span>
                      <span className="text-sm font-medium">₦300</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-medium">Total This Month</span>
                      <span className="font-semibold">₦5,800</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                    Close
                  </Button>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Add New Card
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}