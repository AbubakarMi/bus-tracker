'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Route,
  MapPin,
  Clock,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Navigation,
  Bus,
  Timer,
  Activity,
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllRoutes, createRoute, updateRoute, getAllBuses, type Route as RouteType, type Bus } from '@/lib/bus-service';
import { getAllBookings, type Booking } from '@/lib/booking-service';

interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  driverId?: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  passengers: number;
  frequency: 'daily' | 'weekly' | 'monthly';
}

export default function AdminRoutesPage() {
  const { toast } = useToast();
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [isCreateRouteOpen, setIsCreateRouteOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    name: '',
    startPoint: '',
    endPoint: '',
    estimatedTime: '',
    distance: '',
    description: '',
    stops: '',
    status: 'active' as const
  });

  const [newSchedule, setNewSchedule] = useState({
    routeId: '',
    busId: '',
    departureTime: '',
    arrivalTime: '',
    date: '',
    frequency: 'daily' as const
  });

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [routesData, busesData, bookingsData] = await Promise.all([
          getAllRoutes(),
          getAllBuses(),
          getAllBookings()
        ]);

        setRoutes(routesData);
        setBuses(busesData);
        setBookings(bookingsData);

        // Create sample schedules
        const sampleSchedules: Schedule[] = [
          {
            id: '1',
            routeId: routesData[0]?.id || '1',
            busId: busesData[0]?.id || '1',
            departureTime: '08:00',
            arrivalTime: '08:45',
            date: new Date().toISOString().split('T')[0],
            status: 'scheduled',
            passengers: 0,
            frequency: 'daily'
          },
          {
            id: '2',
            routeId: routesData[0]?.id || '1',
            busId: busesData[1]?.id || '2',
            departureTime: '10:00',
            arrivalTime: '10:45',
            date: new Date().toISOString().split('T')[0],
            status: 'in-progress',
            passengers: 15,
            frequency: 'daily'
          }
        ];

        setSchedules(sampleSchedules);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.endPoint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || route.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleCreateRoute = async () => {
    if (!newRoute.name || !newRoute.startPoint || !newRoute.endPoint) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const routeData = {
        name: newRoute.name,
        startPoint: newRoute.startPoint,
        endPoint: newRoute.endPoint,
        estimatedTime: newRoute.estimatedTime,
        distance: newRoute.distance,
        status: newRoute.status,
        description: newRoute.description,
        stops: newRoute.stops ? newRoute.stops.split(',').map(s => s.trim()) : []
      };

      const createdRoute = await createRoute(routeData);
      setRoutes([...routes, createdRoute]);

      setNewRoute({
        name: '',
        startPoint: '',
        endPoint: '',
        estimatedTime: '',
        distance: '',
        description: '',
        stops: '',
        status: 'active'
      });
      setIsCreateRouteOpen(false);

      toast({
        title: "Route Created Successfully",
        description: `Route "${newRoute.name}" has been added`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create route. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCreateSchedule = () => {
    if (!newSchedule.routeId || !newSchedule.busId || !newSchedule.departureTime || !newSchedule.date) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const schedule: Schedule = {
      id: Date.now().toString(),
      routeId: newSchedule.routeId,
      busId: newSchedule.busId,
      departureTime: newSchedule.departureTime,
      arrivalTime: newSchedule.arrivalTime,
      date: newSchedule.date,
      status: 'scheduled',
      passengers: 0,
      frequency: newSchedule.frequency
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      routeId: '',
      busId: '',
      departureTime: '',
      arrivalTime: '',
      date: '',
      frequency: 'daily'
    });
    setIsScheduleDialogOpen(false);

    toast({
      title: "Schedule Created Successfully",
      description: "New schedule has been added",
    });
  };

  const handleStatusChange = async (routeId: string, newStatus: 'active' | 'inactive') => {
    try {
      await updateRoute(routeId, { status: newStatus });
      setRoutes(prev => prev.map(route =>
        route.id === routeId ? { ...route, status: newStatus } : route
      ));

      toast({
        title: "Status Updated",
        description: `Route status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update route status",
        variant: "destructive"
      });
    }
  };

  const activeRoutes = filteredRoutes.filter(r => r.status === 'active');
  const inactiveRoutes = filteredRoutes.filter(r => r.status === 'inactive');
  const todaySchedules = schedules.filter(s => s.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Routes & Schedules
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage bus routes, schedules, and transportation planning
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Routes</p>
                <p className="text-3xl font-bold text-purple-600">{routes.length}</p>
              </div>
              <Route className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                <p className="text-3xl font-bold text-green-600">{activeRoutes.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Schedules</p>
                <p className="text-3xl font-bold text-blue-600">{todaySchedules.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-orange-600">
                  {schedules.filter(s => s.status === 'in-progress').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search routes by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Dialog open={isCreateRouteOpen} onOpenChange={setIsCreateRouteOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Route
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Route</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="routeName">Route Name *</Label>
                        <Input
                          id="routeName"
                          placeholder="e.g., Campus to City Center"
                          value={newRoute.name}
                          onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={newRoute.status} onValueChange={(value: any) => setNewRoute({...newRoute, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startPoint">Start Point *</Label>
                        <Input
                          id="startPoint"
                          placeholder="e.g., ADUSTECH Main Gate"
                          value={newRoute.startPoint}
                          onChange={(e) => setNewRoute({...newRoute, startPoint: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endPoint">End Point *</Label>
                        <Input
                          id="endPoint"
                          placeholder="e.g., Kano City Center"
                          value={newRoute.endPoint}
                          onChange={(e) => setNewRoute({...newRoute, endPoint: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="distance">Distance</Label>
                        <Input
                          id="distance"
                          placeholder="e.g., 25 km"
                          value={newRoute.distance}
                          onChange={(e) => setNewRoute({...newRoute, distance: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="estimatedTime">Estimated Time</Label>
                        <Input
                          id="estimatedTime"
                          placeholder="e.g., 45 minutes"
                          value={newRoute.estimatedTime}
                          onChange={(e) => setNewRoute({...newRoute, estimatedTime: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stops">Stops (comma separated)</Label>
                      <Input
                        id="stops"
                        placeholder="e.g., Main Gate, Junction A, Shopping Mall"
                        value={newRoute.stops}
                        onChange={(e) => setNewRoute({...newRoute, stops: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the route"
                        value={newRoute.description}
                        onChange={(e) => setNewRoute({...newRoute, description: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleCreateRoute} className="w-full">
                      Create Route
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Add Schedule
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Schedule</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="scheduleRoute">Route *</Label>
                      <Select value={newSchedule.routeId} onValueChange={(value) => setNewSchedule({...newSchedule, routeId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Route" />
                        </SelectTrigger>
                        <SelectContent>
                          {routes.map((route) => (
                            <SelectItem key={route.id} value={route.id}>
                              {route.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="scheduleBus">Bus *</Label>
                      <Select value={newSchedule.busId} onValueChange={(value) => setNewSchedule({...newSchedule, busId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Bus" />
                        </SelectTrigger>
                        <SelectContent>
                          {buses.map((bus) => (
                            <SelectItem key={bus.id} value={bus.id}>
                              {bus.plateNumber} ({bus.capacity} seats)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="departureTime">Departure Time *</Label>
                        <Input
                          id="departureTime"
                          type="time"
                          value={newSchedule.departureTime}
                          onChange={(e) => setNewSchedule({...newSchedule, departureTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="arrivalTime">Arrival Time</Label>
                        <Input
                          id="arrivalTime"
                          type="time"
                          value={newSchedule.arrivalTime}
                          onChange={(e) => setNewSchedule({...newSchedule, arrivalTime: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scheduleDate">Date *</Label>
                        <Input
                          id="scheduleDate"
                          type="date"
                          value={newSchedule.date}
                          onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select value={newSchedule.frequency} onValueChange={(value: any) => setNewSchedule({...newSchedule, frequency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleCreateSchedule} className="w-full">
                      Create Schedule
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Routes ({filteredRoutes.length})</TabsTrigger>
          <TabsTrigger value="schedules">Schedules ({schedules.length})</TabsTrigger>
          <TabsTrigger value="today">Today's Schedule ({todaySchedules.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
              <CardDescription>Manage all bus routes and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Start Point</TableHead>
                    <TableHead>End Point</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Est. Time</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => {
                    const routeBookings = bookings.filter(b => b.routeId === route.id);
                    return (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>{route.startPoint}</TableCell>
                        <TableCell>{route.endPoint}</TableCell>
                        <TableCell>{route.distance}</TableCell>
                        <TableCell>{route.estimatedTime}</TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium text-blue-600">{routeBookings.length}</span>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={route.status}
                            onValueChange={(status: 'active' | 'inactive') => handleStatusChange(route.id, status)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRoute(route);
                              setIsRouteDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules">
          <Card>
            <CardHeader>
              <CardTitle>All Schedules</CardTitle>
              <CardDescription>View and manage all bus schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => {
                    const route = routes.find(r => r.id === schedule.routeId);
                    const bus = buses.find(b => b.id === schedule.busId);
                    return (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{route?.name}</TableCell>
                        <TableCell>{bus?.plateNumber}</TableCell>
                        <TableCell>{schedule.date}</TableCell>
                        <TableCell>{schedule.departureTime}</TableCell>
                        <TableCell>{schedule.arrivalTime}</TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{schedule.passengers}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            schedule.status === 'completed' ? 'default' :
                            schedule.status === 'in-progress' ? 'secondary' :
                            schedule.status === 'cancelled' ? 'destructive' : 'outline'
                          }>
                            {schedule.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Real-time view of today's bus operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedules.map((schedule) => {
                  const route = routes.find(r => r.id === schedule.routeId);
                  const bus = buses.find(b => b.id === schedule.busId);
                  return (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          schedule.status === 'completed' ? 'bg-green-100' :
                          schedule.status === 'in-progress' ? 'bg-orange-100' :
                          schedule.status === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {schedule.status === 'completed' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                           schedule.status === 'in-progress' ? <Activity className="h-5 w-5 text-orange-600" /> :
                           schedule.status === 'cancelled' ? <AlertTriangle className="h-5 w-5 text-red-600" /> :
                           <Clock className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{route?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Bus: {bus?.plateNumber} • {schedule.departureTime} - {schedule.arrivalTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-medium">{schedule.passengers}</p>
                          <p className="text-xs text-muted-foreground">passengers</p>
                        </div>
                        <Badge variant={
                          schedule.status === 'completed' ? 'default' :
                          schedule.status === 'in-progress' ? 'secondary' :
                          schedule.status === 'cancelled' ? 'destructive' : 'outline'
                        }>
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {todaySchedules.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No schedules for today</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Route Details Modal */}
      <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Route Details: {selectedRoute?.name}</DialogTitle>
          </DialogHeader>
          {selectedRoute && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Route Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Route Name</p>
                        <p className="text-muted-foreground">{selectedRoute.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Badge>{selectedRoute.status}</Badge>
                      </div>
                      <div>
                        <p className="font-medium">Start Point</p>
                        <p className="text-muted-foreground">{selectedRoute.startPoint}</p>
                      </div>
                      <div>
                        <p className="font-medium">End Point</p>
                        <p className="text-muted-foreground">{selectedRoute.endPoint}</p>
                      </div>
                      <div>
                        <p className="font-medium">Distance</p>
                        <p className="text-muted-foreground">{selectedRoute.distance}</p>
                      </div>
                      <div>
                        <p className="font-medium">Estimated Time</p>
                        <p className="text-muted-foreground">{selectedRoute.estimatedTime}</p>
                      </div>
                    </div>
                    {selectedRoute.description && (
                      <div>
                        <p className="font-medium">Description</p>
                        <p className="text-muted-foreground">{selectedRoute.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Route Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {bookings.filter(b => b.routeId === selectedRoute.id).length}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Bookings</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {schedules.filter(s => s.routeId === selectedRoute.id).length}
                        </p>
                        <p className="text-sm text-muted-foreground">Schedules</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">95%</p>
                        <p className="text-sm text-muted-foreground">On-Time Rate</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-600">4.8</p>
                        <p className="text-sm text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedRoute.stops && selectedRoute.stops.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Route Stops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoute.stops.map((stop, index) => (
                        <Badge key={index} variant="outline">
                          {stop}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}