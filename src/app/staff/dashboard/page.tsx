'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  ClipboardList,
  FileText,
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
  Briefcase,
  UserCheck,
  Plane
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

interface TravelData {
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
  purpose: string;
}

export default function StaffDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [availableBuses, setAvailableBuses] = useState<BusStatus[]>([]);
  const [myTravels, setMyTravels] = useState<TravelData[]>([]);
  const [stats, setStats] = useState({
    totalTravels: 0,
    pendingTravels: 0,
    onTimeRate: 0,
    travelBudget: 0
  });

  // Quick Access Modal States
  const [showTravelRequestModal, setShowTravelRequestModal] = useState(false);
  const [showTrackBusModal, setShowTrackBusModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'travel', message: 'Official travel approved: Lagos Conference', time: '1 hour ago', status: 'success', icon: CheckCircle },
    { id: 2, type: 'booking', message: 'Transport booked for Airport Link', time: '3 hours ago', status: 'success', icon: Bus },
    { id: 3, type: 'report', message: 'Travel report submitted successfully', time: '6 hours ago', status: 'info', icon: FileText },
    { id: 4, type: 'completion', message: 'Trip completed: Campus to City Center', time: '1 day ago', status: 'success', icon: CheckCircle },
    { id: 5, type: 'approval', message: 'Travel request approved by supervisor', time: '2 days ago', status: 'info', icon: ClipboardList }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time bus updates
  useEffect(() => {
    const updateAvailableBuses = () => {
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
    };

    const updateMyTravels = () => {
      const travels: TravelData[] = [
        {
          id: 'TRV-001',
          busNumber: 'ADUS-001',
          route: 'Lagos Conference Center',
          date: 'Today',
          departureTime: '9:00 AM',
          boardingTime: '8:45 AM',
          seat: 'C15',
          gate: 'Gate 2',
          status: 'confirmed',
          price: '₦8,500',
          purpose: 'Official Conference'
        },
        {
          id: 'TRV-002',
          busNumber: 'ADUS-007',
          route: 'Airport Link',
          date: 'Tomorrow',
          departureTime: '6:30 AM',
          boardingTime: '6:15 AM',
          seat: 'A5',
          gate: 'Gate 4',
          status: 'confirmed',
          price: '₦12,000',
          purpose: 'Business Trip'
        }
      ];
      setMyTravels(travels);
    };

    const updateStats = () => {
      setStats({
        totalTravels: 18,
        pendingTravels: 2,
        onTimeRate: 96.8,
        travelBudget: 125000
      });
    };

    updateAvailableBuses();
    updateMyTravels();
    updateStats();

    const interval = setInterval(() => {
      updateAvailableBuses();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    {
      icon: Bus,
      value: stats.totalTravels.toString(),
      label: "Official Travels",
      change: "+2 this month",
      changeType: "positive" as const
    },
    {
      icon: Calendar,
      value: stats.pendingTravels.toString(),
      label: "Pending Travels",
      change: "2 approved",
      changeType: "neutral" as const
    },
    {
      icon: CheckCircle,
      value: `${stats.onTimeRate}%`,
      label: "On-Time Rate",
      change: "+3.2% this month",
      changeType: "positive" as const
    },
    {
      icon: DollarSign,
      value: `₦${(stats.travelBudget / 1000).toFixed(0)}k`,
      label: "Travel Budget",
      change: "₦25k remaining",
      changeType: "neutral" as const
    }
  ];

  // PDF Download Function
  const downloadTravelTicket = (travel: TravelData) => {
    const ticketData = `
      ADUSTECH STAFF TRAVEL TICKET
      ============================

      Travel ID: ${travel.id}
      Purpose: ${travel.purpose}
      Route: ${travel.route}
      Bus: ${travel.busNumber}

      Travel Details:
      Date: ${travel.date}
      Departure: ${travel.departureTime}
      Boarding Time: ${travel.boardingTime}
      Seat: ${travel.seat}
      Gate: ${travel.gate}

      Amount: ${travel.price}
      Status: ${travel.status}

      This is an official travel authorization.
      Please arrive at the boarding gate 15 minutes before departure time.

      Contact: transport@adustech.edu.ng
      Phone: +234-800-ADUSTECH
    `;

    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `travel-ticket-${travel.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <>
    {/* Animated Background Elements */}
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -left-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-blue-500/10 rounded-full"
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/8 via-pink-500/4 to-indigo-500/8 rounded-full"
        animate={{
          rotate: 180,
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 relative z-10">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center gap-3"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                👨‍💼
              </motion.span>
              Welcome back, Staff Member!
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </motion.div>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-700 flex items-center gap-3 font-medium"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="h-5 w-5 text-emerald-600" />
              </motion.div>
              {currentTime.toLocaleDateString('en-NG', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })} • {currentTime.toLocaleTimeString('en-NG', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500" />
              </motion.div>
            </motion.p>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowTravelRequestModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Request Travel
            </Button>
            <Button
              onClick={() => setShowTrackBusModal(true)}
              variant="outline"
              className="border-green-200 hover:border-green-500 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Track Bus
            </Button>
            <Button
              onClick={() => setShowReportsModal(true)}
              variant="outline"
              className="border-purple-200 hover:border-purple-500 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button
              onClick={() => setShowExpenseModal(true)}
              variant="outline"
              className="border-orange-200 hover:border-orange-500 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Expenses
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.changeType === 'positive'
                      ? 'text-green-700 bg-green-100 border border-green-200'
                      : 'text-blue-700 bg-blue-100 border border-blue-200'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Available Transport */}
        <Card className="xl:col-span-2 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white">
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center gap-2">
                <Bus className="h-6 w-6" />
                Available Transport
                <Badge className="bg-white/20 text-white border border-white/30">
                  {availableBuses.length} Live
                </Badge>
              </div>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                Request Travel
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {availableBuses.map((bus, index) => (
              <div key={bus.id} className="p-4 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border-l-4 border-blue-500 relative overflow-hidden">

                {/* Bus Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      bus.status === 'on-time' ? 'bg-green-100' :
                      bus.status === 'delayed' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      <Bus className={`h-5 w-5 ${
                        bus.status === 'on-time' ? 'text-green-600' :
                        bus.status === 'delayed' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{bus.number}</h4>
                      <p className="text-sm text-gray-600">{bus.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'delayed' ? 'destructive' : 'secondary'}>
                      {bus.status === 'delayed' ? 'Delayed' : bus.status === 'boarding' ? 'Boarding' : 'On Time'}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-1">{bus.speed} km/h</div>
                  </div>
                </div>

                {/* Location & ETA */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Current:
                      </span>
                      <span className="font-medium text-gray-900">{bus.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Navigation className="h-4 w-4" />
                        Next Stop:
                      </span>
                      <span className="font-medium text-gray-900">{bus.nextStop}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        ETA:
                      </span>
                      <span className="font-bold text-blue-600">{bus.eta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Route className="h-4 w-4" />
                        Distance:
                      </span>
                      <span className="font-medium text-blue-600">{bus.distanceLeft}</span>
                    </div>
                  </div>
                </div>

                {/* Occupancy */}
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
                  <Progress
                    value={bus.occupancy}
                    className="h-2"
                  />
                </div>

                {/* Driver & Amenities */}
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Track Live
                  </Button>
                  <Button
                    className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 ${
                      bus.availableSeats === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={bus.availableSeats === 0}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {bus.availableSeats > 0 ? 'Request Travel' : 'Full'}
                  </Button>
                </div>

                {/* Live indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">LIVE</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Travels & Activity */}
        <div className="space-y-6">

          {/* My Official Travels */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <ClipboardList className="h-6 w-6" />
                Official Travels
                <Badge className="bg-white/20 text-white border border-white/30 ml-auto">
                  {myTravels.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {myTravels.map((travel, index) => (
                <div key={travel.id} className="p-4 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border-l-4 border-purple-500 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{travel.route}</h4>
                      <p className="text-sm text-gray-600">{travel.busNumber} • {travel.date}</p>
                      <p className="text-xs text-purple-600 font-medium mt-1">{travel.purpose}</p>
                    </div>
                    <Badge variant="default" className="bg-purple-100 text-purple-700">
                      {travel.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Departure:</span>
                      <span className="font-medium">{travel.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Seat:</span>
                      <span className="font-medium">{travel.seat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Boarding:</span>
                      <span className="font-medium">{travel.boardingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gate:</span>
                      <span className="font-medium">{travel.gate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">{travel.price}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-200 hover:border-purple-500 hover:bg-purple-50"
                        onClick={() => setShowTrackBusModal(true)}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => downloadTravelTicket(travel)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6" />
                Travel Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'info' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    <activity.icon className={`h-4 w-4 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'info' ? 'text-blue-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    {/* Travel Request Modal */}
    {showTravelRequestModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Official Travel Request
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTravelRequestModal(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="purpose" className="text-sm font-medium text-gray-700">Travel Purpose</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select travel purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Official Conference</SelectItem>
                    <SelectItem value="meeting">Business Meeting</SelectItem>
                    <SelectItem value="training">Training Program</SelectItem>
                    <SelectItem value="inspection">Site Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="route" className="text-sm font-medium text-gray-700">Destination</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos Express</SelectItem>
                    <SelectItem value="airport">Airport Link</SelectItem>
                    <SelectItem value="city">City Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">Travel Date</Label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700">Departure Time</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6:00">6:00 AM</SelectItem>
                      <SelectItem value="9:00">9:00 AM</SelectItem>
                      <SelectItem value="2:00">2:00 PM</SelectItem>
                      <SelectItem value="5:00">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="justification" className="text-sm font-medium text-gray-700">Justification</Label>
                <Textarea
                  placeholder="Brief explanation of travel necessity..."
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowTravelRequestModal(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
                <FileText className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Track Bus Modal */}
    {showTrackBusModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Track Official Travel
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTrackBusModal(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label htmlFor="travel-id" className="text-sm font-medium text-gray-700">Travel ID or Bus Number</Label>
              <Input placeholder="Enter TRV-001 or ADUS-001" className="mt-1" />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Current Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Bus:</span>
                  <span className="font-medium">ADUS-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <Badge variant="default" className="bg-green-100 text-green-700">On Time</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Location:</span>
                  <span className="font-medium">Mile 2 Bridge</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ETA:</span>
                  <span className="font-bold text-green-600">8 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Travel Purpose:</span>
                  <span className="font-medium text-blue-600">Official Conference</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700">
              <Navigation className="h-4 w-4 mr-2" />
              View Live Map
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* Reports Modal */}
    {showReportsModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-violet-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ClipboardList className="h-6 w-6" />
                Travel Reports
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReportsModal(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Report Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Travels:</span>
                  <span className="font-bold text-purple-600">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pending Reports:</span>
                  <span className="font-medium text-orange-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Completed Reports:</span>
                  <span className="font-medium text-green-600">15</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700">
                <FileText className="h-4 w-4 mr-2" />
                Submit New Report
              </Button>
              <Button variant="outline" className="w-full border-purple-200 hover:border-purple-500 hover:bg-purple-50">
                <ClipboardList className="h-4 w-4 mr-2" />
                View Report History
              </Button>
              <Button variant="outline" className="w-full border-blue-200 hover:border-blue-500 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                Download Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Expense Modal */}
    {showExpenseModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Travel Expenses
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExpenseModal(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Expense Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Travel Budget:</span>
                  <span className="font-bold text-green-600">₦125,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Used This Month:</span>
                  <span className="font-medium text-orange-600">₦45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Remaining:</span>
                  <span className="font-medium text-blue-600">₦80,000</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
              <Button variant="outline" className="w-full border-orange-200 hover:border-orange-500 hover:bg-orange-50">
                <FileText className="h-4 w-4 mr-2" />
                Expense History
              </Button>
              <Button variant="outline" className="w-full border-green-200 hover:border-green-500 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Export Expenses
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}