'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  TrendingUp
} from 'lucide-react';

export default function StudentDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Bus, value: "47", label: "Total Trips", color: "bg-blue-500", textColor: "text-blue-500" },
    { icon: CheckCircle, value: "42", label: "Completed", color: "bg-green-500", textColor: "text-green-500" },
    { icon: Clock, value: "2", label: "Upcoming", color: "bg-orange-500", textColor: "text-orange-500" },
    { icon: Star, value: "₦18K", label: "Total Spent", color: "bg-purple-500", textColor: "text-purple-500" }
  ];

  const upcomingTrips = [
    {
      id: 1,
      route: "Lagos Express",
      time: "8:30 AM",
      date: "Today",
      status: "on-time",
      seat: "A12",
      price: "₦5,500",
      gate: "Gate 3"
    },
    {
      id: 2,
      route: "Campus Shuttle", 
      time: "2:15 PM",
      date: "Tomorrow",
      status: "confirmed",
      seat: "B8",
      price: "₦300",
      gate: "Gate 1"
    }
  ];

  const recentActivity = [
    { message: 'Trip completed: Lagos Express', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { message: 'New booking confirmed for tomorrow', time: '5 hours ago', icon: Calendar, color: 'text-blue-600' },
    { message: 'Earned 50 eco-points', time: '1 day ago', icon: Star, color: 'text-yellow-600' },
    { message: 'Route update: Campus Loop', time: '2 days ago', icon: Bus, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Student! 👋
              </h1>
              <p className="text-lg text-gray-600 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
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
            
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all">
                <Navigation className="h-4 w-4 mr-2" />
                Track Live Bus
              </Button>
              <Button asChild variant="outline" className="border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all">
                <Link href="/student/book">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          
          {/* Upcoming Trips */}
          <Card className="xl:col-span-2 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bus className="h-6 w-6" />
                Your Next Trips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{trip.route}</h4>
                        <Badge variant={trip.status === 'on-time' ? 'default' : 'secondary'} className="text-xs">
                          {trip.status === 'on-time' ? 'On Time' : 'Confirmed'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {trip.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Seat {trip.seat}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trip.gate}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 mb-2">{trip.price}</div>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button asChild className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg">
                <Link href="/student/book">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book New Trip
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <Bell className="h-4 w-4 mr-2" />
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">Ready for Your Next Adventure?</h3>
                <p className="text-indigo-100 text-lg">Book now and enjoy seamless travel with real-time tracking</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg">
                  <Link href="/student/book">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Trip Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Bus Map
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg">
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}