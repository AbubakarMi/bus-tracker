'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Navigation,
  Bus,
  Clock,
  Route,
  Users,
  RefreshCw,
  Maximize,
  Minimize,
  Target,
  Zap,
  Timer,
  Activity
} from 'lucide-react';

interface BusLocation {
  id: string;
  route: string;
  lat: number;
  lng: number;
  currentLocation: string;
  nextStop: string;
  eta: string;
  distanceLeft: string;
  speed: number;
  occupancy: number;
  status: 'on-time' | 'delayed' | 'arriving';
  delay: number;
}

export function BusMap() {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [liveLocation, setLiveLocation] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos coordinates

  // Simulate real-time bus locations
  const [busLocations, setBusLocations] = useState<BusLocation[]>([
    {
      id: 'BUS-001',
      route: 'Lagos Express',
      lat: 6.5244,
      lng: 3.3792,
      currentLocation: 'Mile 2 Bridge',
      nextStop: 'CMS Terminal',
      eta: '8 mins',
      distanceLeft: '12.5 km',
      speed: 45,
      occupancy: 78,
      status: 'on-time',
      delay: 0
    },
    {
      id: 'BUS-003',
      route: 'Campus Shuttle',
      lat: 6.5180,
      lng: 3.3889,
      currentLocation: 'Main Gate',
      nextStop: 'Library Complex',
      eta: '3 mins',
      distanceLeft: '2.1 km',
      speed: 25,
      occupancy: 45,
      status: 'on-time',
      delay: 0
    },
    {
      id: 'BUS-007',
      route: 'Airport Link',
      lat: 6.5833,
      lng: 3.3211,
      currentLocation: 'Ikeja Along',
      nextStop: 'MM Airport T2',
      eta: '25 mins',
      distanceLeft: '18.7 km',
      speed: 38,
      occupancy: 92,
      status: 'delayed',
      delay: 5
    }
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocations(prev =>
        prev.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.01,
          lng: bus.lng + (Math.random() - 0.5) * 0.01,
          speed: Math.max(20, bus.speed + (Math.random() - 0.5) * 10),
          occupancy: Math.max(0, Math.min(100, bus.occupancy + (Math.random() - 0.5) * 5))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const selectedBusData = busLocations.find(bus => bus.id === selectedBus);

  return (
    <Card className={`modern-card animate-slide-in-up border-0 shadow-xl ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader className="gradient-bg-primary text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 animate-float" />
            Live Bus Map
            <Badge className="bg-white/20 text-white ml-2">
              {busLocations.length} Buses
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsTracking(!isTracking)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {isTracking ? (
                <>
                  <Target className="h-4 w-4 mr-1" />
                  Tracking
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Track Me
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-96">

          {/* Map Area */}
          <div className="lg:col-span-2 relative bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">

            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-200 via-green-200 to-blue-300"></div>

              {/* Grid lines to simulate map */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full h-px bg-gray-400"
                    style={{ top: `${i * 10}%` }}
                  />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-gray-400"
                    style={{ left: `${i * 10}%` }}
                  />
                ))}
              </div>
            </div>

            {/* User Location (if tracking) */}
            {isTracking && (
              <div
                className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse z-10"
                style={{
                  left: '45%',
                  top: '60%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-600/20 rounded-full animate-ping"></div>
              </div>
            )}

            {/* Bus Locations */}
            {busLocations.map((bus, index) => (
              <div
                key={bus.id}
                className={`absolute transition-all duration-1000 cursor-pointer z-20 ${
                  selectedBus === bus.id ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{
                  left: `${30 + (index * 25)}%`,
                  top: `${25 + (index * 20)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedBus(selectedBus === bus.id ? null : bus.id)}
              >
                {/* Bus Icon */}
                <div className={`relative p-2 rounded-full shadow-lg ${
                  bus.status === 'on-time' ? 'bg-green-500' :
                  bus.status === 'delayed' ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  <Bus className="h-4 w-4 text-white" />

                  {/* Status Indicator */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                    bus.status === 'on-time' ? 'bg-green-300' :
                    bus.status === 'delayed' ? 'bg-red-300' : 'bg-yellow-300'
                  }`}></div>

                  {/* Route Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                      {bus.id}
                    </div>
                  </div>
                </div>

                {/* Movement Animation */}
                <div className={`absolute inset-0 rounded-full animate-ping ${
                  bus.status === 'on-time' ? 'bg-green-400/40' :
                  bus.status === 'delayed' ? 'bg-red-400/40' : 'bg-yellow-400/40'
                }`}></div>
              </div>
            ))}

            {/* Route Lines (simplified) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <pattern id="route-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                  <path d="M0,5 L10,5" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3"/>
                </pattern>
              </defs>

              {/* Example route lines */}
              <path
                d="M 30% 25% Q 50% 15% 80% 45%"
                fill="none"
                stroke="url(#route-pattern)"
                strokeWidth="3"
                opacity="0.6"
              />
              <path
                d="M 55% 45% Q 70% 60% 45% 85%"
                fill="none"
                stroke="url(#route-pattern)"
                strokeWidth="3"
                opacity="0.6"
              />
            </svg>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-700 shadow-lg"
              >
                +
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-700 shadow-lg"
              >
                −
              </Button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h6 className="text-xs font-semibold text-gray-700 mb-2">Bus Status</h6>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Delayed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Arriving</span>
                </div>
                {isTracking && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">Your Location</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bus Details Panel */}
          <div className="border-l bg-muted/30 p-4 overflow-y-auto">
            {selectedBusData ? (
              <div className="space-y-4 animate-slide-in-right">
                {/* Selected Bus Info */}
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">{selectedBusData.id}</h4>
                  <p className="text-sm text-muted-foreground">{selectedBusData.route}</p>
                  <Badge
                    variant={selectedBusData.status === 'on-time' ? 'default' : 'destructive'}
                    className="text-xs mt-2"
                  >
                    {selectedBusData.status === 'delayed' ? `+${selectedBusData.delay}m` : selectedBusData.status}
                  </Badge>
                </div>

                {/* Live Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Current:
                    </span>
                    <span className="font-medium text-foreground">{selectedBusData.currentLocation}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      Next Stop:
                    </span>
                    <span className="font-medium text-foreground">{selectedBusData.nextStop}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ETA:
                    </span>
                    <span className="font-bold text-accent">{selectedBusData.eta}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Route className="h-3 w-3" />
                      Distance Left:
                    </span>
                    <span className="font-medium text-primary">{selectedBusData.distanceLeft}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Speed:
                    </span>
                    <span className="font-medium text-foreground">{Math.round(selectedBusData.speed)} km/h</span>
                  </div>
                </div>

                {/* Occupancy */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Occupancy:
                    </span>
                    <span className="font-medium">{Math.round(selectedBusData.occupancy)}%</span>
                  </div>
                  <Progress value={selectedBusData.occupancy} className="h-2" />
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4">
                  <Button size="sm" className="w-full gradient-bg-primary btn-interactive hover-lift">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline" className="w-full btn-interactive hover-lift">
                    <Timer className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                </div>

                {/* Live Updates */}
                <div className="text-xs text-muted-foreground flex items-center gap-1 pt-2">
                  <Activity className="h-3 w-3 animate-pulse text-green-500" />
                  Live updates every 5 seconds
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Select a bus on the map</p>
                <p className="text-xs text-muted-foreground">Click on any bus icon to see live details</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="border-t bg-muted/50 p-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">{busLocations.length}</div>
              <div className="text-xs text-muted-foreground">Active Buses</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                {busLocations.filter(b => b.status === 'on-time').length}
              </div>
              <div className="text-xs text-muted-foreground">On Time</div>
            </div>
            <div>
              <div className="text-lg font-bold text-chart-1">
                {busLocations.filter(b => b.status === 'delayed').length}
              </div>
              <div className="text-xs text-muted-foreground">Delayed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">
                {Math.round(busLocations.reduce((acc, bus) => acc + bus.occupancy, 0) / busLocations.length)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Occupancy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}