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
  Plane,
  MessageSquare,
  ChevronRight,
  MoreHorizontal,
  Filter,
  Building,
  PieChart,
  BarChart3,
  Calendar1,
  Folder
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
            id: 'Staff/Adustech/1001',
            role: 'staff',
            name: 'Dr. Sarah Johnson',
            staffId: 'Staff/Adustech/1001',
            department: 'Computer Science'
          });
        }
      } else {
        setUserData({
          id: 'Staff/Adustech/1001',
          role: 'staff',
          name: 'Dr. Sarah Johnson',
          staffId: 'Staff/Adustech/1001',
          department: 'Computer Science'
        });
      }
    }
  }, []);

  const [availableBuses, setAvailableBuses] = useState<BusStatus[]>([]);
  const [myTravels, setMyTravels] = useState<TravelData[]>([]);
  const [stats, setStats] = useState({
    totalTravels: 0,
    pendingTravels: 0,
    onTimeRate: 0,
    travelBudget: 0
  });

  // Modal states
  const [showTravelRequestModal, setShowTravelRequestModal] = useState(false);
  const [showTrackBusModal, setShowTrackBusModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'travel', message: 'Official travel approved: Lagos Conference', time: '1h ago', status: 'success', icon: CheckCircle },
    { id: 2, type: 'booking', message: 'Transport booked for Airport Link', time: '3h ago', status: 'success', icon: Bus },
    { id: 3, type: 'report', message: 'Travel report submitted successfully', time: '6h ago', status: 'info', icon: FileText },
    { id: 4, type: 'completion', message: 'Trip completed: Campus to City Center', time: '1d ago', status: 'success', icon: CheckCircle },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
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

      setStats({
        totalTravels: 18,
        pendingTravels: 2,
        onTimeRate: 96.8,
        travelBudget: 125000
      });
    };

    updateData();
    const interval = setInterval(updateData, 10000);
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

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav user={userData} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={userData} title="Staff Dashboard" />

      {/* World-Class Premium Staff Dashboard */}
      <div className="flex-1 overflow-y-auto bg-slate-50/30">
        {/* Subtle Enterprise Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-purple-50/20" />

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
            className="h-12 w-12 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center group backdrop-blur-sm"
            title="Rate Bus Service"
          >
            <MessageSquare className="h-5 w-5 text-slate-600 group-hover:text-orange-500 transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 w-12 rounded-xl bg-indigo-600 border border-indigo-600 shadow-sm hover:shadow-md hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center group"
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
                    Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'}, {userData?.name?.split(' ')[0] || 'Staff'}
                  </h1>
                </div>
                <p className="text-slate-600 text-base mb-4 ml-12">
                  {userData?.department && `${userData.department} Department • `}
                  {currentTime.toLocaleDateString('en-NG', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 ml-12">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Enterprise systems online</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full mx-2"></div>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Secure connection
                  </span>
                </div>
              </div>

              {/* Premium Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => router.push('/staff/book')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Travel
                </Button>
                <Button
                  onClick={() => router.push('/staff/tracking')}
                  variant="outline"
                  className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Track Bus
                </Button>
                <Button
                  onClick={() => router.push('/staff/reports')}
                  variant="outline"
                  className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </Button>
                <Button
                  onClick={() => router.push('/staff/settings')}
                  variant="outline"
                  className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Expenses
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
                { icon: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
                { icon: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                { icon: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                { icon: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' }
              ];
              const color = colors[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card className="bg-white border-slate-100 hover:border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl ${color.bg} ${color.border} border`}>
                          <stat.icon className={`h-5 w-5 ${color.icon}`} />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-slate-900 mb-1">{stat.value}</p>
                          <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                          <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                            stat.changeType === 'positive'
                              ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                              : 'text-slate-600 bg-slate-50 border border-slate-100'
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
            {/* Available Transport - Takes more space */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white border-slate-100 shadow-sm">
                <CardHeader className="border-b border-slate-50 pb-4">
                  <CardTitle className="flex items-center justify-between text-xl font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                        <Bus className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-slate-900">Available Transport</span>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium px-2.5 py-1 rounded-full border border-emerald-100">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        {availableBuses.length} Live
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="border-slate-200 hover:border-slate-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {availableBuses.map((bus) => (
                    <div key={bus.id} className="border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            bus.status === 'on-time' ? 'bg-emerald-50 border-emerald-100' :
                            bus.status === 'delayed' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
                          } border`}>
                            <Bus className={`h-4 w-4 ${
                              bus.status === 'on-time' ? 'text-emerald-600' :
                              bus.status === 'delayed' ? 'text-red-600' : 'text-amber-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{bus.number}</h4>
                            <p className="text-sm text-slate-600">{bus.route}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'delayed' ? 'destructive' : 'secondary'} className="text-xs">
                            {bus.status === 'delayed' ? 'Delayed' : bus.status === 'boarding' ? 'Boarding' : 'On Time'}
                          </Badge>
                          <span className="text-xs text-slate-500">{bus.speed} km/h</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Current:</span>
                            <span className="font-medium text-slate-900">{bus.currentLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Next Stop:</span>
                            <span className="font-medium text-slate-900">{bus.nextStop}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-500">ETA:</span>
                            <span className="font-semibold text-indigo-600">{bus.eta}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Distance:</span>
                            <span className="font-medium text-indigo-600">{bus.distanceLeft}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-500">Occupancy ({bus.occupancy}%)</span>
                          <span className={`font-medium ${
                            bus.availableSeats > 10 ? 'text-emerald-600' :
                            bus.availableSeats > 5 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {bus.availableSeats} seats available
                          </span>
                        </div>
                        <Progress value={bus.occupancy} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm">
                          <span className="text-slate-500">Driver: </span>
                          <span className="font-medium text-slate-900">{bus.driver}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {bus.amenities.includes('wifi') && <Wifi className="h-4 w-4 text-indigo-500" />}
                          {bus.amenities.includes('ac') && <Zap className="h-4 w-4 text-emerald-500" />}
                          {bus.amenities.includes('charging') && <Battery className="h-4 w-4 text-amber-500" />}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                          onClick={() => router.push('/staff/tracking')}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Live
                        </Button>
                        <Button
                          size="sm"
                          className={`flex-1 bg-indigo-600 text-white hover:bg-indigo-700 ${
                            bus.availableSeats === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={bus.availableSeats === 0}
                          onClick={() => bus.availableSeats > 0 && router.push('/staff/book')}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {bus.availableSeats > 0 ? 'Request Travel' : 'Full'}
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
              {/* Official Travels */}
              <Card className="bg-white border-slate-100 shadow-sm">
                <CardHeader className="border-b border-slate-50 pb-4">
                  <CardTitle className="flex items-center justify-between text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-violet-50 border border-violet-100">
                        <ClipboardList className="h-4 w-4 text-violet-600" />
                      </div>
                      <span className="text-slate-900">Official Travels</span>
                    </div>
                    <span className="bg-slate-50 text-slate-600 text-sm font-medium px-2 py-1 rounded-full border border-slate-100">
                      {myTravels.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {myTravels.map((travel) => (
                    <div key={travel.id} className="border border-slate-100 rounded-lg p-3 hover:border-slate-200 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{travel.route}</h4>
                          <p className="text-xs text-slate-600">{travel.busNumber} • {travel.date}</p>
                          <p className="text-xs text-violet-600 font-medium mt-1">{travel.purpose}</p>
                        </div>
                        <Badge variant="default" className="bg-violet-50 text-violet-700 border-violet-100 text-xs">
                          {travel.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Departure:</span>
                          <span className="font-medium">{travel.departureTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Seat:</span>
                          <span className="font-medium">{travel.seat}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-violet-600">{travel.price}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                            onClick={() => router.push('/staff/tracking')}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 px-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => {
                              const ticketData = {
                                travel: travel.id,
                                route: travel.route,
                                seat: travel.seat,
                                date: travel.date,
                                time: travel.departureTime,
                                purpose: travel.purpose
                              };
                              localStorage.setItem('downloadTravelTicket', JSON.stringify(ticketData));
                              alert('Travel ticket downloaded successfully!');
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

              {/* Travel Activity */}
              <Card className="bg-white border-slate-100 shadow-sm">
                <CardHeader className="border-b border-slate-50 pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <Activity className="h-4 w-4 text-slate-600" />
                    </div>
                    <span className="text-slate-900">Travel Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className={`p-1.5 rounded-lg ${
                        activity.status === 'success' ? 'bg-emerald-50 border-emerald-100' :
                        activity.status === 'info' ? 'bg-indigo-50 border-indigo-100' : 'bg-amber-50 border-amber-100'
                      } border`}>
                        <activity.icon className={`h-3 w-3 ${
                          activity.status === 'success' ? 'text-emerald-600' :
                          activity.status === 'info' ? 'text-indigo-600' : 'text-amber-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
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
        userName={userData?.name || 'Staff Member'}
        userType="staff"
      />

      {/* Travel Request Modal */}
      <AnimatePresence>
        {showTravelRequestModal && (
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
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Request Official Travel</h3>
                    <p className="text-indigo-100 text-sm">Submit travel request for approval</p>
                  </div>
                  <button
                    onClick={() => setShowTravelRequestModal(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Departure Date</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Return Date</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Destination</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBuses.map((bus) => (
                        <SelectItem key={bus.id} value={bus.route}>
                          {bus.route} - {bus.number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Travel Purpose</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="meeting">Official Meeting</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Provide details about your travel request..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Estimated Budget</Label>
                  <Input type="number" className="mt-2" placeholder="₦ 0.00" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowTravelRequestModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                    Submit Request
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
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Live Transport Tracking</h3>
                    <p className="text-emerald-100 text-sm">Real-time location and status</p>
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
                  <div key={bus.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          bus.status === 'on-time' ? 'bg-emerald-50 border-emerald-200' :
                          bus.status === 'delayed' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                        } border`}>
                          <Bus className={`h-4 w-4 ${
                            bus.status === 'on-time' ? 'text-emerald-600' :
                            bus.status === 'delayed' ? 'text-red-600' : 'text-amber-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{bus.number}</h4>
                          <p className="text-sm text-slate-600">{bus.route}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'delayed' ? 'destructive' : 'secondary'}>
                          {bus.status === 'delayed' ? 'Delayed' : bus.status === 'boarding' ? 'Boarding' : 'On Time'}
                        </Badge>
                        <span className="text-xs text-slate-500">{bus.speed} km/h</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current Location:</span>
                        <span className="font-medium text-slate-900">{bus.currentLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Next Stop:</span>
                        <span className="font-medium text-slate-900">{bus.nextStop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ETA:</span>
                        <span className="font-semibold text-emerald-600">{bus.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Available Seats:</span>
                        <span className={`font-medium ${
                          bus.availableSeats > 10 ? 'text-emerald-600' :
                          bus.availableSeats > 5 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {bus.availableSeats} seats
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <Button onClick={() => setShowTrackBusModal(false)} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Close Tracking
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports Modal */}
      <AnimatePresence>
        {showReportsModal && (
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
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Travel Reports</h3>
                    <p className="text-violet-100 text-sm">Generate and download reports</p>
                  </div>
                  <button
                    onClick={() => setShowReportsModal(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Available Reports</h4>
                  <div className="space-y-2">
                    <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-violet-600" />
                          <div>
                            <p className="font-medium text-sm">Monthly Travel Summary</p>
                            <p className="text-xs text-slate-500">October 2024 report</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-violet-600" />
                          <div>
                            <p className="font-medium text-sm">Expense Report</p>
                            <p className="text-xs text-slate-500">Travel expenses breakdown</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-violet-600" />
                          <div>
                            <p className="font-medium text-sm">Usage Analytics</p>
                            <p className="text-xs text-slate-500">Travel patterns and statistics</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Custom Report</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">From Date</Label>
                      <Input type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">To Date</Label>
                      <Input type="date" className="mt-2" />
                    </div>
                  </div>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700">
                    Generate Custom Report
                  </Button>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowReportsModal(false)} className="flex-1">
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expenses Modal */}
      <AnimatePresence>
        {showExpenseModal && (
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
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Travel Expenses</h3>
                    <p className="text-orange-100 text-sm">Manage your travel budget</p>
                  </div>
                  <button
                    onClick={() => setShowExpenseModal(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Budget Overview</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Monthly Budget</span>
                      <span className="font-semibold">₦150,000</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Used</span>
                      <span className="font-semibold text-red-600">₦125,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Remaining</span>
                      <span className="font-semibold text-green-600">₦25,000</span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Recent Expenses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Lagos Conference Travel</p>
                        <p className="text-xs text-slate-500">Oct 15, 2024</p>
                      </div>
                      <span className="text-sm font-semibold">₦8,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Airport Transfer</p>
                        <p className="text-xs text-slate-500">Oct 20, 2024</p>
                      </div>
                      <span className="text-sm font-semibold">₦12,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Training Workshop</p>
                        <p className="text-xs text-slate-500">Oct 25, 2024</p>
                      </div>
                      <span className="text-sm font-semibold">₦6,200</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowExpenseModal(false)} className="flex-1">
                    Close
                  </Button>
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Add Expense
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