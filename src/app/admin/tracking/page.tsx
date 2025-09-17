'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  AlertTriangle,
  RefreshCw,
  Maximize,
  Settings,
  Route,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusLocation {
  id: string;
  busNumber: string;
  driver: string;
  route: string;
  position: { lat: number; lng: number };
  speed: number; // km/h
  direction: number; // degrees from north
  passengers: number;
  capacity: number;
  status: 'on-route' | 'at-stop' | 'delayed' | 'breakdown' | 'maintenance';
  nextStop: string;
  eta: string;
  lastUpdate: string;
  fuel: number; // percentage
  temperature: number; // celsius
}

interface RouteStop {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  estimated_time?: string;
  actual_time?: string;
  passengers_waiting?: number;
}

export default function LiveTracking() {
  const [buses, setBuses] = useState<BusLocation[]>([
    {
      id: '1',
      busNumber: 'ADUS-001',
      driver: 'Ahmed Musa',
      route: 'Campus to City Center',
      position: { lat: 11.0775, lng: 7.7142 },
      speed: 35,
      direction: 45,
      passengers: 28,
      capacity: 35,
      status: 'on-route',
      nextStop: 'Hotoro Junction',
      eta: '5 mins',
      lastUpdate: '2024-03-15 14:30:25',
      fuel: 78,
      temperature: 28
    },
    {
      id: '2',
      busNumber: 'ADUS-002',
      driver: 'Fatima Hassan',
      route: 'Campus to Hotoro',
      position: { lat: 11.0721, lng: 7.7245 },
      speed: 0,
      direction: 90,
      passengers: 22,
      capacity: 28,
      status: 'at-stop',
      nextStop: 'Hotoro Market',
      eta: '2 mins',
      lastUpdate: '2024-03-15 14:30:20',
      fuel: 65,
      temperature: 30
    },
    {
      id: '3',
      busNumber: 'ADUS-003',
      driver: 'Ibrahim Yusuf',
      route: 'Campus to Sabon Gari',
      position: { lat: 11.0648, lng: 7.7389 },
      speed: 0,
      direction: 0,
      passengers: 0,
      capacity: 42,
      status: 'breakdown',
      nextStop: 'N/A',
      eta: 'N/A',
      lastUpdate: '2024-03-15 14:20:00',
      fuel: 45,
      temperature: 35
    },
    {
      id: '4',
      busNumber: 'ADUS-004',
      driver: 'Aisha Abdullahi',
      route: 'Campus to Yan Awaki',
      position: { lat: 11.0892, lng: 7.7021 },
      speed: 42,
      direction: 180,
      passengers: 31,
      capacity: 35,
      status: 'delayed',
      nextStop: 'Yan Awaki Central',
      eta: '8 mins',
      lastUpdate: '2024-03-15 14:30:15',
      fuel: 82,
      temperature: 27
    }
  ]);

  const [selectedBus, setSelectedBus] = useState<string>('all');
  const [mapView, setMapView] = useState<'satellite' | 'roadmap' | 'hybrid'>('roadmap');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setBuses(prevBuses =>
        prevBuses.map(bus => ({
          ...bus,
          position: {
            lat: bus.position.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.position.lng + (Math.random() - 0.5) * 0.001
          },
          speed: Math.max(0, bus.speed + (Math.random() - 0.5) * 10),
          lastUpdate: new Date().toISOString().replace('T', ' ').substring(0, 19),
          fuel: Math.max(20, bus.fuel - Math.random() * 2),
          temperature: bus.temperature + (Math.random() - 0.5) * 2
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route':
        return 'bg-green-100 text-green-800';
      case 'at-stop':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800';
      case 'breakdown':
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-route':
        return <Navigation className="h-4 w-4 text-green-600" />;
      case 'at-stop':
        return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'delayed':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'breakdown':
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getFuelColor = (percentage: number) => {
    if (percentage <= 25) return 'text-red-600';
    if (percentage <= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredBuses = selectedBus === 'all' ? buses : buses.filter(bus => bus.id === selectedBus);

  const getTrackingStats = () => {
    const totalBuses = buses.length;
    const activeBuses = buses.filter(bus => bus.status === 'on-route' || bus.status === 'at-stop').length;
    const delayedBuses = buses.filter(bus => bus.status === 'delayed').length;
    const totalPassengers = buses.reduce((sum, bus) => sum + bus.passengers, 0);
    const averageOccupancy = Math.round((totalPassengers / buses.reduce((sum, bus) => sum + bus.capacity, 0)) * 100);

    return { totalBuses, activeBuses, delayedBuses, totalPassengers, averageOccupancy };
  };

  const stats = getTrackingStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Bus Tracking</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring of all buses in the fleet</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={autoRefresh ? 'default' : 'outline'}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={cn("h-4 w-4", autoRefresh && "animate-spin")} />
            <span>{autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}</span>
          </Button>
          <Button
            onClick={refreshData}
            disabled={isRefreshing}
            variant="outline"
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBuses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Navigation className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeBuses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.delayedBuses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPassengers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Occupancy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", getOccupancyColor(stats.averageOccupancy))}>
              {stats.averageOccupancy}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Live Map View</span>
                </CardTitle>
                <CardDescription>Real-time positions of all buses</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={selectedBus} onValueChange={setSelectedBus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Buses</SelectItem>
                    {buses.map(bus => (
                      <SelectItem key={bus.id} value={bus.id}>
                        {bus.busNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mock Map Display */}
            <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
                {/* Map Grid Lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="absolute bg-gray-300" style={{
                      left: `${i * 10}%`,
                      top: 0,
                      width: '1px',
                      height: '100%'
                    }} />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute bg-gray-300" style={{
                      top: `${i * 12.5}%`,
                      left: 0,
                      height: '1px',
                      width: '100%'
                    }} />
                  ))}
                </div>

                {/* Bus Markers */}
                {filteredBuses.map((bus, index) => (
                  <div
                    key={bus.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`
                    }}
                  >
                    <div className={cn(
                      "relative bg-white rounded-lg shadow-lg border-2 p-2 min-w-[120px]",
                      bus.status === 'on-route' ? 'border-green-500' :
                      bus.status === 'at-stop' ? 'border-blue-500' :
                      bus.status === 'delayed' ? 'border-yellow-500' : 'border-red-500'
                    )}>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(bus.status)}
                        <div>
                          <p className="font-semibold text-xs">{bus.busNumber}</p>
                          <p className="text-xs text-gray-600">{bus.passengers}/{bus.capacity}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45",
                        bus.status === 'on-route' ? 'bg-green-500' :
                        bus.status === 'at-stop' ? 'bg-blue-500' :
                        bus.status === 'delayed' ? 'bg-yellow-500' : 'bg-red-500'
                      )} />
                    </div>
                  </div>
                ))}

                {/* Route Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7"
                     refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                    </marker>
                  </defs>
                  <path
                    d="M 50 100 Q 200 50 350 150"
                    stroke="#666"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M 100 200 Q 250 150 400 250"
                    stroke="#666"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>

                {/* Campus Marker */}
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  🏫 ADUSTECH Campus
                </div>

                {/* City Center Marker */}
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  🏙️ City Center
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bus Status Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Route className="h-5 w-5" />
              <span>Bus Status</span>
            </CardTitle>
            <CardDescription>Live status of all buses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {buses.map((bus) => {
                const occupancyPercentage = Math.round((bus.passengers / bus.capacity) * 100);

                return (
                  <div key={bus.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(bus.status)}
                        <span className="font-semibold">{bus.busNumber}</span>
                      </div>
                      <Badge className={getStatusColor(bus.status)}>
                        {bus.status}
                      </Badge>
                    </div>

                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">{bus.route}</p>
                      <p><strong>Driver:</strong> {bus.driver}</p>
                      <p><strong>Next Stop:</strong> {bus.nextStop}</p>
                      <p><strong>ETA:</strong> {bus.eta}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Occupancy</p>
                        <p className={cn("font-semibold", getOccupancyColor(occupancyPercentage))}>
                          {bus.passengers}/{bus.capacity} ({occupancyPercentage}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Speed</p>
                        <p className="font-semibold">{bus.speed} km/h</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fuel</p>
                        <p className={cn("font-semibold", getFuelColor(bus.fuel))}>
                          {bus.fuel}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Temperature</p>
                        <p className="font-semibold">{bus.temperature}°C</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-gray-500">
                        Updated: {bus.lastUpdate.split(' ')[1]}
                      </span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Emergency Actions</span>
          </CardTitle>
          <CardDescription>Quick actions for emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="destructive">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Stop All Buses
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Contact All Drivers
            </Button>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Send Location to Emergency Services
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Broadcast Passenger Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}