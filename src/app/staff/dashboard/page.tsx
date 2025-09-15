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
  const [liveBuses, setLiveBuses] = useState([]);
  const [todayStats, setTodayStats] = useState({
    totalTrips: 0,
    activeRoutes: 0,
    onTimePerformance: 0,
    availableSeats: 0
  });
  const [weather, setWeather] = useState({ temp: 28, condition: 'Sunny', humidity: 65 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time bus updates
  useEffect(() => {
    const updateLiveBuses = () => {
      const buses = [
        {
          id: 'BUS-001',
          route: 'Lagos Express',
          currentLocation: 'Mile 2 Bridge',
          nextStop: 'CMS Terminal',
          eta: '8 mins',
          distanceLeft: '12.5 km',
          occupancy: 78,
          maxCapacity: 45,
          availableSeats: 10,
          status: 'on-time',
          delay: 0,
          speed: 45,
          driver: 'Emeka Johnson',
          amenities: ['wifi', 'ac', 'charging']
        },
        {
          id: 'BUS-003',
          route: 'Campus Shuttle',
          currentLocation: 'Main Gate',
          nextStop: 'Library Complex',
          eta: '3 mins',
          distanceLeft: '2.1 km',
          occupancy: 45,
          maxCapacity: 30,
          availableSeats: 17,
          status: 'on-time',
          delay: 0,
          speed: 25,
          driver: 'Fatima Adebayo',
          amenities: ['ac']
        },
        {
          id: 'BUS-007',
          route: 'Airport Link',
          currentLocation: 'Ikeja Along',
          nextStop: 'MM Airport T2',
          eta: '25 mins',
          distanceLeft: '18.7 km',
          occupancy: 92,
          maxCapacity: 50,
          availableSeats: 4,
          status: 'delayed',
          delay: 5,
          speed: 38,
          driver: 'Ibrahim Musa',
          amenities: ['wifi', 'ac', 'charging', 'luggage']
        }
      ];
      setLiveBuses(buses);

      // Update today's stats
      setTodayStats({
        totalTrips: 156,
        activeRoutes: 12,
        onTimePerformance: 94.2,
        availableSeats: buses.reduce((total, bus) => total + bus.availableSeats, 0)
      });
    };

    updateLiveBuses();
    const interval = setInterval(updateLiveBuses, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Bus,
      value: todayStats.totalTrips.toString(),
      label: "Today's Trips",
      color: "bg-primary",
      textColor: "text-primary",
      growth: "+12%",
      realTime: true
    },
    {
      icon: Route,
      value: todayStats.activeRoutes.toString(),
      label: "Active Routes",
      color: "bg-accent",
      textColor: "text-accent",
      growth: "+3",
      realTime: true
    },
    {
      icon: CheckCircle,
      value: `${todayStats.onTimePerformance}%`,
      label: "On-Time Rate",
      color: "bg-chart-2",
      textColor: "text-chart-2",
      growth: "+2.1%",
      realTime: true
    },
    {
      icon: Users,
      value: todayStats.availableSeats.toString(),
      label: "Available Seats",
      color: "bg-chart-4",
      textColor: "text-chart-4",
      growth: "Live",
      realTime: true
    }
  ];

  const upcomingTrips = [
    {
      id: 1,
      route: "Lagos Express",
      departureTime: "8:30 AM",
      date: "Today",
      status: "confirmed",
      seat: "A12",
      price: "₦5,500",
      gate: "Gate 3",
      boarding: "8:15 AM",
      availableSeats: 12,
      busId: "BUS-001"
    },
    {
      id: 2,
      route: "Campus Shuttle",
      departureTime: "2:15 PM",
      date: "Today",
      status: "confirmed",
      seat: "B8",
      price: "₦300",
      gate: "Gate 1",
      boarding: "2:00 PM",
      availableSeats: 25,
      busId: "BUS-003"
    }
  ];

  const recentActivity = [
    { message: 'Trip completed: Lagos Express', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { message: 'Seat confirmed for Campus Shuttle', time: '5 hours ago', icon: Calendar, color: 'text-blue-600' },
    { message: 'Payment successful - ₦5,500', time: '6 hours ago', icon: DollarSign, color: 'text-green-600' },
    { message: 'Earned 50 eco-points', time: '1 day ago', icon: Star, color: 'text-yellow-600' },
    { message: 'Bus BUS-007 arrived 3 mins early', time: '2 days ago', icon: Timer, color: 'text-blue-600' }
  ];

  const quickStats = [
    { label: 'Weather', value: `${weather.temp}°C ${weather.condition}`, icon: Globe },
    { label: 'Network', value: 'Strong', icon: Signal },
    { label: 'Live Buses', value: liveBuses.length.toString(), icon: Activity }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-3 py-2 space-y-3">

        {/* Enhanced Header Section */}
        <div className="mb-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-primary/20">
                <AvatarImage src="/api/placeholder/100/100" alt="Staff" />
                <AvatarFallback className="text-xl font-bold bg-primary text-white">SF</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1 animate-gradient-text">
                  Welcome back, Staff Member! 👨‍💼
                </h1>
                <p className="text-base text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  {currentTime.toLocaleDateString('en-NG', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })} • {currentTime.toLocaleTimeString('en-NG', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  {quickStats.map((stat, index) => (
                    <span key={index} className="text-sm flex items-center gap-1 text-muted-foreground">
                      <stat.icon className="h-3 w-3" />
                      <span className="font-medium">{stat.label}:</span>
                      {stat.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="gradient-bg-primary btn-interactive glow-primary hover-lift">
                <Navigation className="h-4 w-4 mr-2" />
                Track Live Bus
              </Button>
              <Button asChild variant="outline" className="border-2 border-border hover:border-primary/50 feature-card">
                <Link href="/staff/book">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book with Live Seats
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Live Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {stats.map((stat, index) => (
            <Card key={index} className="modern-card feature-card group animate-scale-in relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${stat.color} group-hover:animate-pulse relative`}>
                    <stat.icon className="h-6 w-6 text-white" />
                    {stat.realTime && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full animate-breathe ${
                        stat.growth === 'Live' ? 'text-green-600 bg-green-100' : 'text-accent bg-accent/10'
                      }`}>
                        {stat.growth}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    {stat.realTime && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                        Live Data
                      </span>
                    )}
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color} group-hover:h-2 transition-all duration-300`} />
                {stat.realTime && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full"></div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Live Bus Tracking */}
        <Card className="mb-3 modern-card animate-slide-in-up border-0 shadow-xl">
          <CardHeader className="gradient-bg-primary text-white">
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center gap-2">
                <Navigation className="h-6 w-6 animate-float" />
                Live Bus Tracking
                <Badge className="bg-white/20 text-white ml-2">
                  {liveBuses.length} Active
                </Badge>
              </div>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                View Map
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {liveBuses.map((bus, index) => (
                <div key={bus.id} className="p-4 modern-card hover-lift group border-l-4 border-primary animate-slide-in-up relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>

                  {/* Bus Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${
                        bus.status === 'on-time' ? 'bg-green-100' :
                        bus.status === 'delayed' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <Bus className={`h-4 w-4 ${
                          bus.status === 'on-time' ? 'text-green-600' :
                          bus.status === 'delayed' ? 'text-red-600' : 'text-yellow-600'
                        } group-hover:animate-bounce`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{bus.id}</h4>
                        <p className="text-xs text-muted-foreground">{bus.route}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={bus.status === 'on-time' ? 'default' : 'destructive'} className="text-xs mb-1">
                        {bus.status === 'delayed' ? `+${bus.delay}m` : 'On Time'}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{bus.speed} km/h</div>
                    </div>
                  </div>

                  {/* Location & ETA */}
                  <div className="space-y-2 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Current:
                      </span>
                      <span className="font-medium text-foreground">{bus.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        Next Stop:
                      </span>
                      <span className="font-medium text-foreground">{bus.nextStop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ETA:
                      </span>
                      <span className="font-bold text-accent">{bus.eta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Route className="h-3 w-3" />
                        Distance:
                      </span>
                      <span className="font-medium text-primary">{bus.distanceLeft}</span>
                    </div>
                  </div>

                  {/* Occupancy */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Occupancy ({bus.occupancy}%)</span>
                      <span className={`font-medium ${
                        bus.availableSeats > 10 ? 'text-green-600' :
                        bus.availableSeats > 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {bus.availableSeats} seats left
                      </span>
                    </div>
                    <Progress
                      value={bus.occupancy}
                      className={`h-2 ${
                        bus.occupancy > 80 ? 'bg-red-100' :
                        bus.occupancy > 60 ? 'bg-yellow-100' : 'bg-green-100'
                      }`}
                    />
                  </div>

                  {/* Driver & Amenities */}
                  <div className="space-y-2 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Driver:</span>
                      <span className="font-medium text-foreground">{bus.driver}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Features:</span>
                      <div className="flex gap-1 ml-auto">
                        {bus.amenities.includes('wifi') && <Wifi className="h-3 w-3 text-blue-500" />}
                        {bus.amenities.includes('ac') && <Zap className="h-3 w-3 text-green-500" />}
                        {bus.amenities.includes('charging') && <Battery className="h-3 w-3 text-yellow-500" />}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 btn-interactive hover-lift text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                    <Button
                      size="sm"
                      variant={bus.availableSeats > 0 ? "default" : "secondary"}
                      disabled={bus.availableSeats === 0}
                      className="flex-1 btn-interactive hover-lift text-xs"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      {bus.availableSeats > 0 ? 'Book' : 'Full'}
                    </Button>
                  </div>

                  {/* Live indicator */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">LIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-3">

          {/* Enhanced Upcoming Trips */}
          <Card className="xl:col-span-2 modern-card animate-slide-in-left border-0 shadow-xl">
            <CardHeader className="gradient-bg-primary text-white">
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center gap-2">
                  <Bus className="h-6 w-6 animate-float" />
                  Your Next Trips
                </div>
                <Badge className="bg-white/20 text-white">
                  {upcomingTrips.length} Confirmed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {upcomingTrips.map((trip, index) => (
                <div key={trip.id} className="p-4 modern-card hover-lift group animate-slide-in-up border-l-4 border-primary relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{trip.route}</h4>
                        <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                          {trip.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {trip.availableSeats} seats left
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Departs: {trip.departureTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Seat: {trip.seat}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trip.gate}
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">Boarding: </span>
                        <span className="font-medium text-foreground">{trip.boarding}</span>
                        <span className="text-muted-foreground ml-4">Bus ID: </span>
                        <span className="font-medium text-primary">{trip.busId}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent mb-2">{trip.price}</div>
                      <div className="flex flex-col gap-1">
                        <Button variant="outline" size="sm" className="btn-interactive hover-lift">
                          <Navigation className="h-4 w-4 mr-2" />
                          Track Live
                        </Button>
                        <Button variant="outline" size="sm" className="btn-interactive hover-lift">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Trip progress indicator */}
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Trip Progress</span>
                      <span className="font-medium">Ready to Board</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              ))}

              <Button asChild className="w-full h-14 gradient-bg-primary btn-interactive glow-primary text-white">
                <Link href="/staff/book">
                  <Calendar className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="font-bold text-lg">Book New Trip</div>
                    <div className="text-sm opacity-90">Live seats • Real-time tracking</div>
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Activity Feed */}
          <Card className="modern-card animate-slide-in-right border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-1 text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6 animate-float-delay-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all hover-lift group animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="p-2 bg-muted rounded-full group-hover:bg-primary/20 transition-colors">
                    <activity.icon className={`h-4 w-4 ${activity.color} group-hover:animate-pulse`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 btn-interactive hover-lift">
                <Bell className="h-4 w-4 mr-2" />
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions Bar */}
        <Card className="modern-card gradient-bg-secondary text-white animate-glow-pulse overflow-hidden border-0 shadow-2xl">
          <CardContent className="p-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 animate-morphing"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="text-center lg:text-left animate-slide-in-left">
                  <h3 className="text-2xl font-bold mb-2 animate-gradient-text">Ready for Your Next Journey?</h3>
                  <p className="text-primary-foreground/90 text-lg">Book now with real-time seat availability and live GPS tracking</p>
                  <div className="flex items-center gap-6 mt-3">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      {todayStats.totalTrips} trips running today
                    </span>
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      {todayStats.availableSeats} seats available now
                    </span>
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      {liveBuses.length} buses live tracked
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 animate-slide-in-right">
                  <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-muted btn-interactive feature-card">
                    <Link href="/staff/book">
                      <Calendar className="h-6 w-6 mr-3" />
                      <div className="text-left">
                        <div className="font-bold">Book Live Seats</div>
                        <div className="text-xs opacity-75">Real-time availability</div>
                      </div>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/20 btn-interactive">
                    <MapPin className="h-5 w-5 mr-2" />
                    Live Bus Map
                  </Button>
                  <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/20 btn-interactive">
                    <Activity className="h-5 w-5 mr-2" />
                    Trip History
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}