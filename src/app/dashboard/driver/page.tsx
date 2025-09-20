'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Navigation,
  Users,
  Clock,
  Bus,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  AlertTriangle,
  Phone,
  Route,
  Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Passenger {
  id: string;
  name: string;
  regNumber: string;
  pickupPoint: string;
  dropoffPoint: string;
  phone: string;
  status: 'waiting' | 'picked-up' | 'dropped-off';
  boardingTime?: string;
}

interface RouteInfo {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  totalDistance: string;
  estimatedTime: string;
  waypoints: Array<{
    name: string;
    coordinates: { lat: number; lng: number };
    estimatedArrival: string;
  }>;
}

interface TripStatus {
  status: 'not-started' | 'in-progress' | 'completed';
  currentLocation: { lat: number; lng: number };
  distanceRemaining: string;
  timeRemaining: string;
  nextStop: string;
  currentSpeed: string;
  startTime?: string;
  lastUpdated: string;
}

export default function DriverPage() {
  const { toast } = useToast();
  const [tripStatus, setTripStatus] = useState<TripStatus>({
    status: 'not-started',
    currentLocation: { lat: 12.0022, lng: 8.5920 }, // Kano coordinates
    distanceRemaining: '25.4 km',
    timeRemaining: '42 mins',
    nextStop: 'ADU Campus Gate',
    currentSpeed: '0 km/h',
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [assignedBus] = useState({
    plateNumber: 'BUS-001',
    capacity: 45,
    fuelLevel: 75,
    lastMaintenance: '2024-01-10'
  });

  const [routeInfo] = useState<RouteInfo>({
    id: '1',
    name: 'Campus to City Center',
    startPoint: 'ADU Campus Gate',
    endPoint: 'Kano City Center',
    totalDistance: '25.4 km',
    estimatedTime: '45 mins',
    waypoints: [
      { name: 'ADU Campus Gate', coordinates: { lat: 12.0022, lng: 8.5920 }, estimatedArrival: '08:00' },
      { name: 'Fagge Junction', coordinates: { lat: 12.0100, lng: 8.5150 }, estimatedArrival: '08:15' },
      { name: 'Sabon Gari Market', coordinates: { lat: 12.0200, lng: 8.5200 }, estimatedArrival: '08:30' },
      { name: 'Kano City Center', coordinates: { lat: 12.0300, lng: 8.5100 }, estimatedArrival: '08:45' }
    ]
  });

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      regNumber: 'UG20/COMS/1284',
      pickupPoint: 'ADU Campus Gate',
      dropoffPoint: 'Fagge Junction',
      phone: '+2348123456789',
      status: 'waiting'
    },
    {
      id: '2',
      name: 'Fatima Aliyu',
      regNumber: 'UG25/BCHM/1003',
      pickupPoint: 'ADU Campus Gate',
      dropoffPoint: 'Sabon Gari Market',
      phone: '+2348987654321',
      status: 'waiting'
    },
    {
      id: '3',
      name: 'Musa Ibrahim',
      regNumber: 'Staff/Adustech/1022',
      pickupPoint: 'ADU Campus Gate',
      dropoffPoint: 'Kano City Center',
      phone: '+2348555666777',
      status: 'waiting'
    }
  ]);

  const [departureTime] = useState('08:00 AM');

  const handleStartTrip = () => {
    setTripStatus(prev => ({
      ...prev,
      status: 'in-progress',
      startTime: new Date().toLocaleTimeString(),
      currentSpeed: '35 km/h',
      lastUpdated: new Date().toLocaleTimeString()
    }));

    toast({
      title: "Trip Started",
      description: "Route tracking is now active. Passengers will receive real-time updates.",
    });
  };

  const handlePauseTrip = () => {
    setTripStatus(prev => ({
      ...prev,
      currentSpeed: '0 km/h',
      lastUpdated: new Date().toLocaleTimeString()
    }));

    toast({
      title: "Trip Paused",
      description: "Route status updated. Passengers will be notified.",
    });
  };

  const handleCompleteTrip = () => {
    setTripStatus(prev => ({
      ...prev,
      status: 'completed',
      currentSpeed: '0 km/h',
      distanceRemaining: '0 km',
      timeRemaining: '0 mins',
      lastUpdated: new Date().toLocaleTimeString()
    }));

    toast({
      title: "Trip Completed",
      description: "All passengers have been notified of trip completion.",
    });
  };

  const handlePassengerPickup = (passengerId: string) => {
    setPassengers(prev => prev.map(p =>
      p.id === passengerId
        ? { ...p, status: 'picked-up', boardingTime: new Date().toLocaleTimeString() }
        : p
    ));

    toast({
      title: "Passenger Picked Up",
      description: "Passenger status updated successfully.",
    });
  };

  const handlePassengerDropoff = (passengerId: string) => {
    setPassengers(prev => prev.map(p =>
      p.id === passengerId
        ? { ...p, status: 'dropped-off' }
        : p
    ));

    toast({
      title: "Passenger Dropped Off",
      description: "Passenger has been safely dropped off.",
    });
  };

  // Simulate real-time updates
  useEffect(() => {
    if (tripStatus.status === 'in-progress') {
      const interval = setInterval(() => {
        setTripStatus(prev => ({
          ...prev,
          lastUpdated: new Date().toLocaleTimeString()
        }));
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [tripStatus.status]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'secondary';
      case 'in-progress': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const getPassengerStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'secondary';
      case 'picked-up': return 'default';
      case 'dropped-off': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Driver Dashboard</h1>
        <Badge variant={getStatusColor(tripStatus.status)} className="text-sm">
          {tripStatus.status.replace('-', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Distance Remaining</p>
                <p className="text-2xl font-bold">{tripStatus.distanceRemaining}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Timer className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Time Remaining</p>
                <p className="text-2xl font-bold">{tripStatus.timeRemaining}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Passengers</p>
                <p className="text-2xl font-bold">{passengers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Navigation className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Current Speed</p>
                <p className="text-2xl font-bold">{tripStatus.currentSpeed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="passengers">Passengers</TabsTrigger>
          <TabsTrigger value="route">Route Details</TabsTrigger>
          <TabsTrigger value="bus">Bus Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Route Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Route Progress
                </CardTitle>
                <CardDescription>
                  Real-time tracking of your current route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Stop</span>
                    <span className="font-medium">{tripStatus.nextStop}</span>
                  </div>

                  <Progress value={tripStatus.status === 'not-started' ? 0 : tripStatus.status === 'completed' ? 100 : 35} className="w-full" />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{routeInfo.startPoint}</span>
                    <span>{routeInfo.endPoint}</span>
                  </div>

                  <div className="space-y-2">
                    {routeInfo.waypoints.map((waypoint, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            index === 0 ? 'bg-green-500' :
                            index === 1 && tripStatus.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`} />
                          <span className="text-sm">{waypoint.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{waypoint.estimatedArrival}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    {tripStatus.status === 'not-started' && (
                      <Button onClick={handleStartTrip} className="flex-1">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Trip
                      </Button>
                    )}

                    {tripStatus.status === 'in-progress' && (
                      <>
                        <Button onClick={handlePauseTrip} variant="outline" className="flex-1">
                          <PauseCircle className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                        <Button onClick={handleCompleteTrip} className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Trip
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Route Map
                </CardTitle>
                <CardDescription>
                  Google Maps integration with turn-by-turn navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-80 bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Google Maps will display here</p>
                      <p className="text-xs text-muted-foreground">Turn-by-turn navigation with real-time traffic</p>
                    </div>
                  </div>

                  {/* Simulated map pins */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Start: {routeInfo.startPoint}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    End: {routeInfo.endPoint}
                  </div>

                  {tripStatus.status === 'in-progress' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        Current Location
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  Last updated: {tripStatus.lastUpdated}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="passengers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Passenger List</CardTitle>
              <CardDescription>
                Manage passenger pickup and drop-off status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Passenger</TableHead>
                    <TableHead>ID/Reg No.</TableHead>
                    <TableHead>Pickup Point</TableHead>
                    <TableHead>Drop-off Point</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passengers.map((passenger) => (
                    <TableRow key={passenger.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {passenger.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{passenger.name}</div>
                          {passenger.boardingTime && (
                            <div className="text-xs text-muted-foreground">
                              Boarded: {passenger.boardingTime}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{passenger.regNumber}</TableCell>
                      <TableCell>{passenger.pickupPoint}</TableCell>
                      <TableCell>{passenger.dropoffPoint}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPassengerStatusColor(passenger.status)}>
                          {passenger.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {passenger.status === 'waiting' && (
                            <Button
                              size="sm"
                              onClick={() => handlePassengerPickup(passenger.id)}
                            >
                              Pick Up
                            </Button>
                          )}
                          {passenger.status === 'picked-up' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePassengerDropoff(passenger.id)}
                            >
                              Drop Off
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="route" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Details</CardTitle>
              <CardDescription>
                Complete information about your assigned route
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Route Name</Label>
                    <p className="text-lg">{routeInfo.name}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Total Distance</Label>
                    <p className="text-lg">{routeInfo.totalDistance}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Estimated Time</Label>
                    <p className="text-lg">{routeInfo.estimatedTime}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Departure Time</Label>
                    <p className="text-lg">{departureTime}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Waypoints</Label>
                    <div className="mt-2 space-y-2">
                      {routeInfo.waypoints.map((waypoint, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <span>{waypoint.name}</span>
                          <span className="text-sm text-muted-foreground">{waypoint.estimatedArrival}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Bus Information</CardTitle>
              <CardDescription>
                Details about your assigned vehicle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Bus className="h-12 w-12 text-blue-600" />
                    <div>
                      <p className="text-xl font-bold">{assignedBus.plateNumber}</p>
                      <p className="text-sm text-muted-foreground">Capacity: {assignedBus.capacity} passengers</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fuel Level</span>
                      <span className="text-sm">{assignedBus.fuelLevel}%</span>
                    </div>
                    <Progress value={assignedBus.fuelLevel} className="w-full" />

                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Last Maintenance</span>
                      <span className="text-sm">{assignedBus.lastMaintenance}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Current Passengers</span>
                      <span className="text-sm">{passengers.filter(p => p.status === 'picked-up').length}/{assignedBus.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Emergency Contacts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Dispatch:</span>
                        <span className="font-mono">+234-800-DISPATCH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span className="font-mono">+234-800-MAINTAIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency:</span>
                        <span className="font-mono">+234-911</span>
                      </div>
                    </div>
                  </div>

                  {assignedBus.fuelLevel < 25 && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">Low fuel level - please refuel soon</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
