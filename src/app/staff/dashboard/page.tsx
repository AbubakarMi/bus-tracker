'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  FileText
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Staff Member! 👨‍💼
            </h1>
            <p className="text-lg text-gray-600 flex items-center gap-3">
              <Activity className="h-5 w-5 text-blue-600" />
              {currentTime.toLocaleDateString('en-NG', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })} • {currentTime.toLocaleTimeString('en-NG', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
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
                    <Button size="sm" variant="outline" className="border-purple-200 hover:border-purple-500 hover:bg-purple-50">
                      <Navigation className="h-4 w-4 mr-1" />
                      Track
                    </Button>
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
  );
}