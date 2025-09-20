'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Navigation,
  Clock,
  Bus,
  AlertCircle,
  CheckCircle,
  Timer,
  Users,
  Route,
  RefreshCw,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusLocation {
  lat: number;
  lng: number;
  speed: string;
  heading: number;
  lastUpdated: string;
}

interface RouteProgress {
  currentStop: string;
  nextStop: string;
  progress: number;
  estimatedArrival: string;
  distanceToUser: string;
  timeToUser: string;
}

interface UserRouteInfo {
  userId: string;
  routeId: string;
  routeName: string;
  busId: string;
  busPlateNumber: string;
  driverName: string;
  pickupPoint: string;
  dropoffPoint: string;
  status: 'waiting' | 'picked-up' | 'en-route' | 'arrived';
}

interface RealTimeTrackerProps {
  userInfo: UserRouteInfo;
  allowedRoutes?: string[];
}

export function RealTimeTracker({ userInfo, allowedRoutes = [] }: RealTimeTrackerProps) {
  const { toast } = useToast();
  const [busLocation, setBusLocation] = useState<BusLocation>({
    lat: 12.0022,
    lng: 8.5920,
    speed: '35 km/h',
    heading: 45,
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [routeProgress, setRouteProgress] = useState<RouteProgress>({
    currentStop: 'ADU Campus Gate',
    nextStop: 'Fagge Junction',
    progress: 25,
    estimatedArrival: '08:15 AM',
    distanceToUser: '2.3 km',
    timeToUser: '8 mins'
  });

  const [tripStatus, setTripStatus] = useState<'not-started' | 'in-progress' | 'completed'>('in-progress');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());

  // Check if user is allowed to track this route
  const canTrackRoute = allowedRoutes.length === 0 || allowedRoutes.includes(userInfo.routeId);

  useEffect(() => {
    if (!canTrackRoute) return;

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      if (tripStatus === 'in-progress') {
        setBusLocation(prev => ({
          ...prev,
          lastUpdated: new Date().toLocaleTimeString()
        }));

        setRouteProgress(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 5, 95)
        }));

        setLastUpdate(new Date().toLocaleTimeString());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [tripStatus, canTrackRoute]);

  const handleRefresh = async () => {
    if (!canTrackRoute) return;

    setIsRefreshing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setBusLocation(prev => ({
      ...prev,
      lastUpdated: new Date().toLocaleTimeString()
    }));

    setLastUpdate(new Date().toLocaleTimeString());
    setIsRefreshing(false);

    toast({
      title: "Location Updated",
      description: "Bus location refreshed successfully.",
    });
  };

  if (!canTrackRoute) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You can only track buses on routes you are registered for. Please contact the transport office if you believe this is an error.
        </AlertDescription>
      </Alert>
    );
  }

  const getStatusColor = () => {
    switch (userInfo.status) {
      case 'waiting': return 'secondary';
      case 'picked-up': return 'default';
      case 'en-route': return 'default';
      case 'arrived': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusIcon = () => {
    switch (userInfo.status) {
      case 'waiting': return <Clock className="h-4 w-4" />;
      case 'picked-up': return <CheckCircle className="h-4 w-4" />;
      case 'en-route': return <Navigation className="h-4 w-4" />;
      case 'arrived': return <MapPin className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bus className="h-5 w-5" />
                {userInfo.routeName}
              </CardTitle>
              <CardDescription>
                Bus {userInfo.busPlateNumber} • Driver: {userInfo.driverName}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusColor()} className="flex items-center gap-1">
                {getStatusIcon()}
                {userInfo.status.replace('-', ' ').toUpperCase()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Trip Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Timer className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">ETA to You</p>
                <p className="text-2xl font-bold">{routeProgress.timeToUser}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Distance</p>
                <p className="text-2xl font-bold">{routeProgress.distanceToUser}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Navigation className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Bus Speed</p>
                <p className="text-2xl font-bold">{busLocation.speed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Route className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">{routeProgress.progress.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Route Progress
          </CardTitle>
          <CardDescription>
            Real-time tracking of bus location and route progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Your Journey */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Your Journey</span>
                <span className="text-sm text-muted-foreground">
                  {userInfo.pickupPoint} → {userInfo.dropoffPoint}
                </span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                {getStatusIcon()}
                <span className="text-sm">
                  {userInfo.status === 'waiting' && `Waiting at ${userInfo.pickupPoint}`}
                  {userInfo.status === 'picked-up' && `On board - heading to ${userInfo.dropoffPoint}`}
                  {userInfo.status === 'en-route' && `En route to ${userInfo.dropoffPoint}`}
                  {userInfo.status === 'arrived' && `Arrived at ${userInfo.dropoffPoint}`}
                </span>
              </div>
            </div>

            <Separator />

            {/* Overall Route Progress */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Current: {routeProgress.currentStop}</span>
                <span className="text-sm font-medium">Next: {routeProgress.nextStop}</span>
              </div>

              <Progress value={routeProgress.progress} className="w-full mb-3" />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>ADU Campus Gate</span>
                <span>Kano City Center</span>
              </div>
            </div>

            <Separator />

            {/* Live Map Placeholder */}
            <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Live Bus Tracking</p>
                  <p className="text-xs text-muted-foreground">Real-time location updates</p>
                </div>
              </div>

              {/* Simulated bus location */}
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                  <Bus className="h-3 w-3" />
                  Bus Location
                </div>
              </div>

              {/* Your pickup point */}
              <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                📍 {userInfo.pickupPoint}
              </div>

              {/* Your destination */}
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                🎯 {userInfo.dropoffPoint}
              </div>
            </div>

            {/* Status Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Arrival:</span>
                  <span className="font-medium">{routeProgress.estimatedArrival}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bus Location:</span>
                  <span className="font-medium">{routeProgress.currentStop}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">{lastUpdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trip Status:</span>
                  <span className="font-medium capitalize">{tripStatus.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Driver
            </Button>
            <Button variant="outline" className="flex-1">
              <AlertCircle className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Share Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}