'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Navigation,
  Clock,
  Route,
  Bus,
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  Wifi,
  Battery,
  Zap
} from 'lucide-react';

interface LiveBus {
  id: string;
  number: string;
  route: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'departed';
  currentLocation: string;
  nextStop: string;
  eta: string;
  speed: number;
  passengers: number;
  capacity: number;
  driver: string;
  amenities: string[];
}

export default function StaffTrackingPage() {
  const [liveBuses, setLiveBuses] = useState<LiveBus[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('all');

  useEffect(() => {
    // Simulate live bus data updates
    const updateBuses = () => {
      const buses: LiveBus[] = [
        {
          id: 'BUS-001',
          number: 'ADUS-001',
          route: 'Lagos Express',
          status: 'on-time',
          currentLocation: 'Mile 2 Bridge',
          nextStop: 'CMS Terminal',
          eta: '8 mins',
          speed: 45,
          passengers: 28,
          capacity: 36,
          driver: 'Emeka Johnson',
          amenities: ['wifi', 'ac', 'charging']
        },
        {
          id: 'BUS-003',
          number: 'ADUS-003',
          route: 'Campus Shuttle',
          status: 'boarding',
          currentLocation: 'Main Gate',
          nextStop: 'Library Complex',
          eta: '3 mins',
          speed: 0,
          passengers: 15,
          capacity: 32,
          driver: 'Fatima Adebayo',
          amenities: ['ac']
        },
        {
          id: 'BUS-007',
          number: 'ADUS-007',
          route: 'Airport Link',
          status: 'delayed',
          currentLocation: 'Ikeja Along',
          nextStop: 'MM Airport T2',
          eta: '25 mins',
          speed: 38,
          passengers: 33,
          capacity: 36,
          driver: 'Ibrahim Musa',
          amenities: ['wifi', 'ac', 'charging', 'luggage']
        },
        {
          id: 'BUS-012',
          number: 'ADUS-012',
          route: 'City Center',
          status: 'departed',
          currentLocation: 'Victoria Island',
          nextStop: 'Ikoyi Link Bridge',
          eta: '12 mins',
          speed: 52,
          passengers: 22,
          capacity: 36,
          driver: 'Adunni Olatunji',
          amenities: ['wifi', 'ac', 'charging']
        }
      ];
      setLiveBuses(buses);
    };

    updateBuses();
    const interval = setInterval(updateBuses, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredBuses = liveBuses.filter(bus => {
    const matchesSearch = bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoute = selectedRoute === 'all' || bus.route.toLowerCase().includes(selectedRoute.toLowerCase());
    return matchesSearch && matchesRoute;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-100 text-green-700 border-green-200';
      case 'delayed': return 'bg-red-100 text-red-700 border-red-200';
      case 'boarding': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'departed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertCircle className="h-4 w-4" />;
      case 'boarding': return <Clock className="h-4 w-4" />;
      case 'departed': return <Navigation className="h-4 w-4" />;
      default: return <Bus className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            Live Bus Tracking
          </h1>
          <p className="text-gray-600 mt-2">Monitor all buses in real-time for official travel planning</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">Live Updates</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search Buses</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Bus number, route, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Label htmlFor="route-filter" className="text-sm font-medium text-gray-700">Filter by Route</Label>
              <select
                id="route-filter"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Routes</option>
                <option value="lagos">Lagos Express</option>
                <option value="campus">Campus Shuttle</option>
                <option value="airport">Airport Link</option>
                <option value="city">City Center</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Bus Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredBuses.map((bus) => (
          <Card key={bus.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    bus.status === 'on-time' ? 'bg-green-100' :
                    bus.status === 'delayed' ? 'bg-red-100' :
                    bus.status === 'boarding' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Bus className={`h-5 w-5 ${
                      bus.status === 'on-time' ? 'text-green-600' :
                      bus.status === 'delayed' ? 'text-red-600' :
                      bus.status === 'boarding' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{bus.number}</CardTitle>
                    <p className="text-gray-600 text-sm">{bus.route}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(bus.status)} flex items-center gap-1`}>
                    {getStatusIcon(bus.status)}
                    {bus.status.replace('-', ' ')}
                  </Badge>
                  <span className="text-sm text-gray-500">{bus.speed} km/h</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Location Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Current:
                    </span>
                    <span className="font-medium text-right">{bus.currentLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      Next Stop:
                    </span>
                    <span className="font-medium text-right">{bus.nextStop}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ETA:
                    </span>
                    <span className={`font-bold ${
                      bus.status === 'delayed' ? 'text-red-600' : 'text-blue-600'
                    }`}>{bus.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Driver:</span>
                    <span className="font-medium text-right">{bus.driver}</span>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacity ({Math.round((bus.passengers / bus.capacity) * 100)}%)</span>
                  <span className={`font-medium ${
                    (bus.capacity - bus.passengers) > 10 ? 'text-green-600' :
                    (bus.capacity - bus.passengers) > 5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {bus.capacity - bus.passengers} seats available
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      (bus.passengers / bus.capacity) > 0.8 ? 'bg-red-500' :
                      (bus.passengers / bus.capacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {bus.amenities.includes('wifi') && <Wifi className="h-4 w-4 text-blue-500" />}
                  {bus.amenities.includes('ac') && <Zap className="h-4 w-4 text-green-500" />}
                  {bus.amenities.includes('charging') && <Battery className="h-4 w-4 text-yellow-500" />}
                  {bus.amenities.length === 0 && <span className="text-xs text-gray-500">No amenities</span>}
                </div>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>

              {/* Live indicator */}
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}