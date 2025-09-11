'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Bus, 
  Calendar, 
  Navigation, 
  Users, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StudentPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingTrips = [
    {
      id: 1,
      route: "Route 42 - Campus to Downtown",
      time: "8:30 AM",
      status: "on-time",
      seat: "A12",
      driver: "John Smith",
      estimatedArrival: "25 mins"
    },
    {
      id: 2,
      route: "Route 15 - Library to Dorms",
      time: "2:15 PM",
      status: "delayed",
      seat: "B8",
      driver: "Sarah Johnson",
      estimatedArrival: "3 hrs 45 mins"
    }
  ];

  const stats = {
    totalTrips: 47,
    completedTrips: 42,
    upcomingTrips: 2,
    favoriteRoute: "Route 42"
  };

  const completionRate = (stats.completedTrips / stats.totalTrips) * 100;

  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-headline">Welcome back! 👋</h1>
          <p className="text-muted-foreground text-sm">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })} • {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild size="sm" className="gap-2">
            <Link href="/dashboard/student/track">
              <Navigation className="h-4 w-4" />
              Track Bus
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/dashboard/student/book">
              <Calendar className="h-4 w-4" />
              Book Trip
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-medium">Total Trips</p>
                <p className="text-xl font-bold">{stats.totalTrips}</p>
              </div>
              <Bus className="h-6 w-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs font-medium">Completed</p>
                <p className="text-xl font-bold">{stats.completedTrips}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs font-medium">Upcoming</p>
                <p className="text-xl font-bold">{stats.upcomingTrips}</p>
              </div>
              <Clock className="h-6 w-6 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs font-medium">Success Rate</p>
                <p className="text-xl font-bold">{completionRate.toFixed(0)}%</p>
              </div>
              <Star className="h-6 w-6 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Upcoming Trips */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-4 w-4" />
                  Upcoming Trips
                </CardTitle>
                <CardDescription className="text-sm">Your next scheduled bus rides</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/student/book" className="gap-1 text-xs">
                  Book New <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingTrips.length > 0 ? (
              <div className="space-y-3">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{trip.route}</h4>
                          <Badge 
                            variant={trip.status === 'on-time' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {trip.status === 'on-time' ? 'On Time' : 'Delayed'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {trip.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Seat {trip.seat}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            ETA: {trip.estimatedArrival}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/student/track" className="gap-1">
                          <Navigation className="h-3 w-3" />
                          Track
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-semibold mb-2 text-sm">No upcoming trips</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Book your first trip to get started
                </p>
                <Button asChild size="sm">
                  <Link href="/dashboard/student/book">Book a Trip</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions & Trip Progress */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-sm">Common tasks made easy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full justify-start gap-2 h-12" variant="ghost">
                <Link href="/dashboard/student/track">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Navigation className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Track Live Bus</div>
                    <div className="text-xs text-muted-foreground">Real-time location</div>
                  </div>
                </Link>
              </Button>
              
              <Button asChild className="w-full justify-start gap-2 h-12" variant="ghost">
                <Link href="/dashboard/student/book">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Calendar className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Book New Trip</div>
                    <div className="text-xs text-muted-foreground">Reserve your seat</div>
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Trip Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Trip Progress</CardTitle>
              <CardDescription className="text-sm">Your journey statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Trips Completed</span>
                  <span className="font-medium">{stats.completedTrips}/{stats.totalTrips}</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
              
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Favorite Route</span>
                  <span className="font-medium">{stats.favoriteRoute}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium text-green-600">{completionRate.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
