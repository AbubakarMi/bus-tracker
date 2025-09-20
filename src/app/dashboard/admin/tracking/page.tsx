'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin,
  Navigation,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MessageSquare,
  Route,
  Fuel,
  Battery,
  Wifi
} from 'lucide-react';

interface BusStatus {
  id: string;
  plateNumber: string;
  driverName: string;
  route: string;
  passengers: number;
  capacity: number;
  location: string;
  status: 'on-route' | 'at-stop' | 'delayed' | 'offline';
  lastUpdate: string;
  speed: number;
  fuel: number;
  battery: number;
  signal: number;
}

export default function AdminTrackingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [busStatuses, setBusStatuses] = useState<BusStatus[]>([
    {
      id: 'BUS-001',
      plateNumber: 'KN-123-ABC',
      driverName: 'Mohammed Ali',
      route: 'Campus ↔ City Center',
      passengers: 28,
      capacity: 45,
      location: 'Near Main Gate',
      status: 'on-route',
      lastUpdate: '2 mins ago',
      speed: 35,
      fuel: 75,
      battery: 90,
      signal: 85
    },
    {
      id: 'BUS-002',
      plateNumber: 'KN-456-DEF',
      driverName: 'Fatima Abdullahi',
      route: 'Campus ↔ Hotoro',
      passengers: 12,
      capacity: 35,
      location: 'Hotoro Junction',
      status: 'at-stop',
      lastUpdate: '1 min ago',
      speed: 0,
      fuel: 60,
      battery: 95,
      signal: 92
    },
    {
      id: 'BUS-003',
      plateNumber: 'KN-789-GHI',
      driverName: 'Ibrahim Sani',
      route: 'Campus ↔ Sabon Gari',
      passengers: 15,
      capacity: 40,
      location: 'Traffic at Sabon Gari',
      status: 'delayed',
      lastUpdate: '3 mins ago',
      speed: 5,
      fuel: 40,
      battery: 80,
      signal: 70
    },
    {
      id: 'BUS-004',
      plateNumber: 'KN-321-JKL',
      driverName: 'Aisha Muhammad',
      route: 'Campus ↔ Kano City',
      passengers: 0,
      capacity: 50,
      location: 'Unknown',
      status: 'offline',
      lastUpdate: '15 mins ago',
      speed: 0,
      fuel: 85,
      battery: 30,
      signal: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route': return 'bg-green-100 text-green-800 border-green-200';
      case 'at-stop': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delayed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-route': return <Navigation className="h-3 w-3" />;
      case 'at-stop': return <MapPin className="h-3 w-3" />;
      case 'delayed': return <Clock className="h-3 w-3" />;
      case 'offline': return <AlertTriangle className="h-3 w-3" />;
      default: return <CheckCircle className="h-3 w-3" />;
    }
  };

  const getSignalBars = (signal: number) => {
    const bars = Math.ceil(signal / 25);
    return (
      <div className="flex items-end gap-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1 bg-current transition-all ${
              bar <= bars ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ height: `${bar * 3 + 2}px` }}
          />
        ))}
      </div>
    );
  };

  const filteredBuses = busStatuses.filter(bus => {
    const matchesSearch = bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = busStatuses.filter(bus => bus.status !== 'offline').length;
  const onRouteCount = busStatuses.filter(bus => bus.status === 'on-route').length;
  const totalPassengers = busStatuses.reduce((sum, bus) => sum + bus.passengers, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Live Fleet Tracking
        </h1>
        <p className="text-muted-foreground">Monitor your entire bus fleet in real-time</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Buses</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}/{busStatuses.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Route</p>
                <p className="text-2xl font-bold text-blue-600">{onRouteCount}</p>
              </div>
              <Navigation className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Passengers</p>
                <p className="text-2xl font-bold text-purple-600">{totalPassengers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Occupancy</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round((totalPassengers / busStatuses.reduce((sum, bus) => sum + bus.capacity, 0)) * 100)}%
                </p>
              </div>
              <Route className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search buses, drivers, or routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="on-route">On Route</SelectItem>
              <SelectItem value="at-stop">At Stop</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Bus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBuses.map((bus) => (
          <Card key={bus.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{bus.plateNumber}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    {bus.driverName}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(bus.status)} flex items-center gap-1`}>
                  {getStatusIcon(bus.status)}
                  {bus.status.charAt(0).toUpperCase() + bus.status.slice(1).replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Route & Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Route className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{bus.route}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{bus.location}</span>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {bus.passengers}/{bus.capacity} passengers
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((bus.passengers / bus.capacity) * 100)}% full
                </div>
              </div>

              {/* Vehicle Stats */}
              <div className="grid grid-cols-3 gap-4 py-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <Fuel className="h-3 w-3" />
                    <span className="text-xs font-medium">{bus.fuel}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Fuel</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <Battery className="h-3 w-3" />
                    <span className="text-xs font-medium">{bus.battery}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Battery</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600">
                    <Wifi className="h-3 w-3" />
                    {getSignalBars(bus.signal)}
                  </div>
                  <p className="text-xs text-muted-foreground">Signal</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  Track
                </Button>
              </div>

              {/* Last Update */}
              <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                Last updated: {bus.lastUpdate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">No buses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check if all buses are offline.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}