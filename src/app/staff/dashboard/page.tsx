'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Bus,
  Calendar,
  Navigation,
  Users,
  CheckCircle,
  Star,
  Activity,
  ArrowRight,
  Bell,
  Settings,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Shield,
  Heart,
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Route,
  Timer,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function StaffDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookedBuses, setBookedBuses] = useState([]);
  const [availableBuses, setAvailableBuses] = useState([]);
  const [todayStats, setTodayStats] = useState({
    bookedTrips: 0,
    completedTrips: 0,
    activeBookings: 0,
    nextDeparture: null
  });
  const [userName] = useState('Sarah Mitchell');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate booked and available buses data for staff
  useEffect(() => {
    const updateBusData = () => {
      const bookedBusesData = [
        {
          id: 'BUS-002',
          route: 'Staff Shuttle A',
          bookingId: 'SF001',
          currentLocation: 'Admin Block',
          nextStop: 'Main Office',
          eta: '8 mins',
          departureTime: '9:00 AM',
          seat: 'S15',
          status: 'on-time',
          driver: 'David Wilson',
          amenities: ['wifi', 'ac', 'charging'],
          progress: 45,
          boarding: 'Staff Gate A'
        },
        {
          id: 'BUS-004',
          route: 'Executive Transport',
          bookingId: 'SF002',
          currentLocation: 'Conference Center',
          nextStop: 'Business District',
          eta: '15 mins',
          departureTime: '3:30 PM',
          seat: 'E5',
          status: 'approaching',
          driver: 'Jennifer Adams',
          amenities: ['wifi', 'ac', 'charging', 'premium'],
          progress: 75,
          boarding: 'Executive Lounge'
        }
      ];

      const availableBusesData = [
        {
          id: 'BUS-006',
          route: 'Staff Express',
          nextDeparture: '11:15 AM',
          availableSeats: 12,
          price: '₦1,200',
          duration: '30 mins',
          amenities: ['wifi', 'ac', 'charging']
        },
        {
          id: 'BUS-008',
          route: 'Meeting Shuttle',
          nextDeparture: '12:45 PM',
          availableSeats: 18,
          price: '₦800',
          duration: '20 mins',
          amenities: ['ac', 'premium']
        },
        {
          id: 'BUS-010',
          route: 'Airport Staff',
          nextDeparture: '2:00 PM',
          availableSeats: 6,
          price: '₦3,000',
          duration: '50 mins',
          amenities: ['wifi', 'ac', 'charging', 'luggage']
        }
      ];

      setBookedBuses(bookedBusesData);
      setAvailableBuses(availableBusesData);

      // Update stats
      setTodayStats({
        bookedTrips: bookedBusesData.length,
        completedTrips: 2,
        activeBookings: bookedBusesData.filter(bus => bus.status === 'on-time' || bus.status === 'approaching').length,
        nextDeparture: '9:00 AM'
      });
    };

    updateBusData();
    const interval = setInterval(updateBusData, 15000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Bus,
      value: todayStats.bookedTrips.toString(),
      label: "Active Bookings",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      realTime: true
    },
    {
      icon: CheckCircle,
      value: todayStats.completedTrips.toString(),
      label: "Completed Today",
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      realTime: false
    },
    {
      icon: Clock,
      value: todayStats.nextDeparture || '--',
      label: "Next Departure",
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      realTime: true
    },
    {
      icon: Navigation,
      value: bookedBuses.filter(bus => bus.status === 'approaching').length.toString(),
      label: "Buses En Route",
      color: "bg-gradient-to-r from-violet-500 to-violet-600",
      textColor: "text-violet-600",
      realTime: true
    }
  ];

const recentActivity = [
    {
      message: 'Executive transport arriving in 5 mins',
      time: '1 min ago',
      icon: Navigation,
      color: 'text-indigo-600',
      type: 'live'
    },
    {
      message: 'Meeting shuttle completed successfully',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-600',
      type: 'completed'
    },
    {
      message: 'New booking for Airport Staff route',
      time: '3 hours ago',
      icon: Calendar,
      color: 'text-amber-600',
      type: 'booking'
    },
    {
      message: 'Staff express payment processed - ₦1,200',
      time: '4 hours ago',
      icon: DollarSign,
      color: 'text-emerald-600',
      type: 'payment'
    },
    {
      message: 'Staff shuttle departed on schedule',
      time: '5 hours ago',
      icon: Timer,
      color: 'text-indigo-600',
      type: 'departure'
    }
  ];

const quickStats = [
    { label: 'Status', value: 'Active', icon: Activity },
    { label: 'Network', value: 'Connected', icon: Signal },
    { label: 'Tracking', value: `${bookedBuses.length} buses`, icon: Navigation }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Modern Header Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-indigo-100 shadow-lg">
                  <AvatarImage src="/api/placeholder/100/100" alt="Staff" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Welcome back, {userName.split(' ')[0]}! 👨‍💼
                </h1>
                <p className="text-slate-600 flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })} • {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <div className="flex items-center gap-6">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <stat.icon className="h-4 w-4 text-indigo-500" />
                      <span className="font-medium">{stat.label}:</span>
                      <span className="text-slate-900 font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <Navigation className="h-4 w-4 mr-2" />
                Track My Buses
              </Button>
              <Button asChild variant="outline" className="border-2 border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 px-6 py-2.5 rounded-xl transition-all duration-300">
                <Link href="/staff/book">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-xl ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                  <stat.icon className="h-6 w-6 text-white" />
                  {stat.realTime && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border-2 border-white"></div>
                  )}
                </div>
                {stat.realTime && (
                  <span className="text-xs font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    Live
                  </span>
                )}
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Your Booked Buses - Live Tracking */}
        {bookedBuses.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                  <Navigation className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Your Booked Buses</h2>
                  <p className="text-slate-600">Live tracking for your confirmed trips</p>
                </div>
                <Badge className="bg-indigo-100 text-indigo-700 px-3 py-1">
                  {bookedBuses.length} Active
                </Badge>
              </div>
              <Button variant="outline" className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50">
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookedBuses.map((bus, index) => (
                <div key={bus.id} className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-6 border border-indigo-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">LIVE</span>
                  </div>

                  {/* Bus Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${
                      bus.status === 'on-time' ? 'bg-emerald-100' :
                      bus.status === 'approaching' ? 'bg-amber-100' : 'bg-red-100'
                    }`}>
                      <Bus className={`h-6 w-6 ${
                        bus.status === 'on-time' ? 'text-emerald-600' :
                        bus.status === 'approaching' ? 'text-amber-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-slate-900">{bus.route}</h3>
                        <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'approaching' ? 'secondary' : 'destructive'} className="text-xs">
                          {bus.status === 'approaching' ? 'Approaching' : bus.status === 'on-time' ? 'On Time' : 'Delayed'}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm">Booking ID: {bus.bookingId} • Seat: {bus.seat}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Trip Progress</span>
                      <span className="font-medium text-slate-900">{bus.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${bus.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Trip Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Current Location</p>
                        <p className="font-medium text-slate-900 text-sm">{bus.currentLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">ETA</p>
                        <p className="font-bold text-indigo-600 text-sm">{bus.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Navigation className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Next Stop</p>
                        <p className="font-medium text-slate-900 text-sm">{bus.nextStop}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Driver</p>
                        <p className="font-medium text-slate-900 text-sm">{bus.driver}</p>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs text-slate-500">Amenities:</span>
                    <div className="flex gap-2">
                      {bus.amenities.includes('wifi') && (
                        <div className="p-1 bg-indigo-100 rounded text-indigo-600">
                          <Wifi className="h-3 w-3" />
                        </div>
                      )}
                      {bus.amenities.includes('ac') && (
                        <div className="p-1 bg-emerald-100 rounded text-emerald-600">
                          <Zap className="h-3 w-3" />
                        </div>
                      )}
                      {bus.amenities.includes('charging') && (
                        <div className="p-1 bg-amber-100 rounded text-amber-600">
                          <Battery className="h-3 w-3" />
                        </div>
                      )}
                      {bus.amenities.includes('premium') && (
                        <div className="p-1 bg-violet-100 rounded text-violet-600">
                          <Star className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200">
                      <Navigation className="h-4 w-4 mr-2" />
                      Live Track
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50">
                      <Settings className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Buses & Recent Activity Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Available Buses */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Available Buses</h2>
                  <p className="text-slate-600">Book your next trip with real-time availability</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">
                {availableBuses.length} Available
              </Badge>
            </div>

            <div className="space-y-4">
              {availableBuses.map((bus, index) => (
                <div key={bus.id} className="bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl p-4 border border-emerald-100 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Bus className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{bus.route}</h3>
                          <p className="text-sm text-slate-600">Bus ID: {bus.id}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <div>
                            <p className="text-slate-500 text-xs">Departure</p>
                            <p className="font-medium text-slate-900">{bus.nextDeparture}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-slate-500" />
                          <div>
                            <p className="text-slate-500 text-xs">Duration</p>
                            <p className="font-medium text-slate-900">{bus.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-500" />
                          <div>
                            <p className="text-slate-500 text-xs">Available</p>
                            <p className={`font-medium ${
                              bus.availableSeats > 10 ? 'text-emerald-600' :
                              bus.availableSeats > 5 ? 'text-amber-600' : 'text-red-600'
                            }`}>{bus.availableSeats} seats</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-slate-500" />
                          <div>
                            <p className="text-slate-500 text-xs">Price</p>
                            <p className="font-bold text-indigo-600">{bus.price}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-slate-500">Amenities:</span>
                        <div className="flex gap-1">
                          {bus.amenities.includes('wifi') && (
                            <div className="p-1 bg-indigo-100 rounded text-indigo-600">
                              <Wifi className="h-3 w-3" />
                            </div>
                          )}
                          {bus.amenities.includes('ac') && (
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600">
                              <Zap className="h-3 w-3" />
                            </div>
                          )}
                          {bus.amenities.includes('charging') && (
                            <div className="p-1 bg-amber-100 rounded text-amber-600">
                              <Battery className="h-3 w-3" />
                            </div>
                          )}
                          {bus.amenities.includes('premium') && (
                            <div className="p-1 bg-violet-100 rounded text-violet-600">
                              <Shield className="h-3 w-3" />
                            </div>
                          )}
                          {bus.amenities.includes('luggage') && (
                            <div className="p-1 bg-purple-100 rounded text-purple-600">
                              <Shield className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={bus.availableSeats === 0}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {bus.availableSeats > 0 ? 'Book Now' : 'Fully Booked'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="w-full mt-6 h-14 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/staff/book">
                <Calendar className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-lg">Explore All Routes</div>
                  <div className="text-sm opacity-90">Find the perfect trip for you</div>
                </div>
              </Link>
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <p className="text-slate-600 text-sm">Your latest updates</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-300 group">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'live' ? 'bg-indigo-100' :
                    activity.type === 'completed' ? 'bg-emerald-100' :
                    activity.type === 'booking' ? 'bg-amber-100' :
                    activity.type === 'payment' ? 'bg-emerald-100' : 'bg-indigo-100'
                  }`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{activity.message}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-xl py-2.5">
              <Bell className="h-4 w-4 mr-2" />
              View All Activity
            </Button>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1.5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-3">Ready for Your Next Journey?</h3>
                <p className="text-indigo-100 text-lg mb-4">Experience premium staff transportation with real-time tracking and instant bookings</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">{bookedBuses.length} active bookings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">{availableBuses.reduce((sum, bus) => sum + bus.availableSeats, 0)} seats available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live GPS tracking</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  <Link href="/staff/book">
                    <Calendar className="h-5 w-5 mr-3" />
                    Book New Trip
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl backdrop-blur-sm">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Map
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl backdrop-blur-sm">
                  <Activity className="h-5 w-5 mr-2" />
                  History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}