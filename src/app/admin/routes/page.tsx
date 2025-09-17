'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Edit,
  Trash2,
  Route,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';

interface RouteData {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number; // in kilometers
  estimatedDuration: number; // in minutes
  stops: string[];
  status: 'active' | 'inactive' | 'suspended';
  pricePerKm: number;
  totalPrice: number;
}

interface ScheduleData {
  id: string;
  routeId: string;
  routeName: string;
  busId: string;
  busNumber: string;
  driverId: string;
  driverName: string;
  departureTime: string;
  arrivalTime: string;
  frequency: 'daily' | 'weekdays' | 'weekends' | 'custom';
  daysOfWeek: string[];
  capacity: number;
  currentBookings: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export default function RouteScheduleManagement() {
  const [routes, setRoutes] = useState<RouteData[]>([
    {
      id: '1',
      name: 'Campus to City Center',
      origin: 'ADUSTECH Campus',
      destination: 'Kano City Center',
      distance: 15.5,
      estimatedDuration: 45,
      stops: ['ADUSTECH Main Gate', 'Hotoro Junction', 'Yankura', 'City Center'],
      status: 'active',
      pricePerKm: 10,
      totalPrice: 155
    },
    {
      id: '2',
      name: 'Campus to Hotoro',
      origin: 'ADUSTECH Campus',
      destination: 'Hotoro Market',
      distance: 8.2,
      estimatedDuration: 25,
      stops: ['ADUSTECH Main Gate', 'Hotoro Junction', 'Hotoro Market'],
      status: 'active',
      pricePerKm: 12,
      totalPrice: 98
    },
    {
      id: '3',
      name: 'Campus to Sabon Gari',
      origin: 'ADUSTECH Campus',
      destination: 'Sabon Gari',
      distance: 12.8,
      estimatedDuration: 35,
      stops: ['ADUSTECH Main Gate', 'Yankura', 'Kano Central', 'Sabon Gari'],
      status: 'active',
      pricePerKm: 11,
      totalPrice: 141
    }
  ]);

  const [schedules, setSchedules] = useState<ScheduleData[]>([
    {
      id: '1',
      routeId: '1',
      routeName: 'Campus to City Center',
      busId: '1',
      busNumber: 'ADUS-001',
      driverId: '1',
      driverName: 'Ahmed Musa',
      departureTime: '07:00',
      arrivalTime: '07:45',
      frequency: 'weekdays',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      capacity: 35,
      currentBookings: 28,
      status: 'scheduled'
    },
    {
      id: '2',
      routeId: '2',
      routeName: 'Campus to Hotoro',
      busId: '2',
      busNumber: 'ADUS-002',
      driverId: '2',
      driverName: 'Fatima Hassan',
      departureTime: '08:00',
      arrivalTime: '08:25',
      frequency: 'daily',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      capacity: 28,
      currentBookings: 22,
      status: 'scheduled'
    },
    {
      id: '3',
      routeId: '3',
      routeName: 'Campus to Sabon Gari',
      busId: '3',
      busNumber: 'ADUS-003',
      driverId: '3',
      driverName: 'Ibrahim Yusuf',
      departureTime: '09:00',
      arrivalTime: '09:35',
      frequency: 'weekdays',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      capacity: 42,
      currentBookings: 0,
      status: 'cancelled'
    }
  ]);

  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleData | null>(null);

  const [routeFormData, setRouteFormData] = useState<Partial<RouteData>>({
    name: '',
    origin: '',
    destination: '',
    distance: 0,
    estimatedDuration: 0,
    stops: [],
    status: 'active',
    pricePerKm: 10
  });

  const [scheduleFormData, setScheduleFormData] = useState<Partial<ScheduleData>>({
    routeId: '',
    busId: '',
    driverId: '',
    departureTime: '',
    arrivalTime: '',
    frequency: 'weekdays',
    daysOfWeek: [],
    status: 'scheduled'
  });

  const [newStop, setNewStop] = useState('');

  const resetRouteForm = () => {
    setRouteFormData({
      name: '',
      origin: '',
      destination: '',
      distance: 0,
      estimatedDuration: 0,
      stops: [],
      status: 'active',
      pricePerKm: 10
    });
    setEditingRoute(null);
  };

  const resetScheduleForm = () => {
    setScheduleFormData({
      routeId: '',
      busId: '',
      driverId: '',
      departureTime: '',
      arrivalTime: '',
      frequency: 'weekdays',
      daysOfWeek: [],
      status: 'scheduled'
    });
    setEditingSchedule(null);
  };

  const handleAddRoute = () => {
    setEditingRoute(null);
    resetRouteForm();
    setIsRouteDialogOpen(true);
  };

  const handleEditRoute = (route: RouteData) => {
    setEditingRoute(route);
    setRouteFormData(route);
    setIsRouteDialogOpen(true);
  };

  const handleSaveRoute = () => {
    const totalPrice = (routeFormData.distance || 0) * (routeFormData.pricePerKm || 0);

    if (editingRoute) {
      setRoutes(routes.map(route =>
        route.id === editingRoute.id
          ? { ...routeFormData, id: editingRoute.id, totalPrice } as RouteData
          : route
      ));
    } else {
      const newRoute: RouteData = {
        ...routeFormData,
        id: Date.now().toString(),
        totalPrice
      } as RouteData;
      setRoutes([...routes, newRoute]);
    }
    setIsRouteDialogOpen(false);
    resetRouteForm();
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes(routes.filter(route => route.id !== routeId));
    setSchedules(schedules.filter(schedule => schedule.routeId !== routeId));
  };

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    resetScheduleForm();
    setIsScheduleDialogOpen(true);
  };

  const handleEditSchedule = (schedule: ScheduleData) => {
    setEditingSchedule(schedule);
    setScheduleFormData(schedule);
    setIsScheduleDialogOpen(true);
  };

  const handleSaveSchedule = () => {
    const selectedRoute = routes.find(r => r.id === scheduleFormData.routeId);

    if (editingSchedule) {
      setSchedules(schedules.map(schedule =>
        schedule.id === editingSchedule.id
          ? {
              ...scheduleFormData,
              id: editingSchedule.id,
              routeName: selectedRoute?.name || '',
              busNumber: `ADUS-${scheduleFormData.busId?.padStart(3, '0')}`,
              driverName: `Driver ${scheduleFormData.driverId}`,
              capacity: 35,
              currentBookings: editingSchedule.currentBookings
            } as ScheduleData
          : schedule
      ));
    } else {
      const newSchedule: ScheduleData = {
        ...scheduleFormData,
        id: Date.now().toString(),
        routeName: selectedRoute?.name || '',
        busNumber: `ADUS-${scheduleFormData.busId?.padStart(3, '0')}`,
        driverName: `Driver ${scheduleFormData.driverId}`,
        capacity: 35,
        currentBookings: 0
      } as ScheduleData;
      setSchedules([...schedules, newSchedule]);
    }
    setIsScheduleDialogOpen(false);
    resetScheduleForm();
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
  };

  const addStop = () => {
    if (newStop.trim()) {
      setRouteFormData({
        ...routeFormData,
        stops: [...(routeFormData.stops || []), newStop.trim()]
      });
      setNewStop('');
    }
  };

  const removeStop = (index: number) => {
    const updatedStops = routeFormData.stops?.filter((_, i) => i !== index) || [];
    setRouteFormData({ ...routeFormData, stops: updatedStops });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Routes & Schedules</h1>
        <p className="text-gray-600 mt-1">Manage bus routes and scheduling</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Schedules</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {schedules.filter(s => s.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schedules.reduce((sum, schedule) => sum + schedule.currentBookings, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Route Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{Math.round(routes.reduce((sum, route) => sum + route.totalPrice, 0) / routes.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Routes and Schedules */}
      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
        </TabsList>

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Bus Routes</h2>
            <Button onClick={handleAddRoute} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Route</span>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Origin - Destination</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{route.origin} → {route.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>{route.distance} km</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{route.estimatedDuration} min</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">₦{route.totalPrice}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{route.stops.length} stops</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(route.status)}>
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRoute(route)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteRoute(route.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedules Tab */}
        <TabsContent value="schedules" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Bus Schedules</h2>
            <Button onClick={handleAddSchedule} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Schedule</span>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.routeName}</TableCell>
                      <TableCell>{schedule.busNumber}</TableCell>
                      <TableCell>{schedule.driverName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{schedule.departureTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>{schedule.arrivalTime}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{schedule.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {schedule.currentBookings}/{schedule.capacity}
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round((schedule.currentBookings / schedule.capacity) * 100)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSchedule(schedule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Route Dialog */}
      <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRoute ? 'Edit Route' : 'Add New Route'}</DialogTitle>
            <DialogDescription>
              {editingRoute ? 'Update route information' : 'Create a new bus route'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="routeName">Route Name</Label>
                <Input
                  id="routeName"
                  value={routeFormData.name}
                  onChange={(e) => setRouteFormData({ ...routeFormData, name: e.target.value })}
                  placeholder="e.g., Campus to City Center"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={routeFormData.status}
                  onValueChange={(value) => setRouteFormData({ ...routeFormData, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={routeFormData.origin}
                  onChange={(e) => setRouteFormData({ ...routeFormData, origin: e.target.value })}
                  placeholder="Starting point"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={routeFormData.destination}
                  onChange={(e) => setRouteFormData({ ...routeFormData, destination: e.target.value })}
                  placeholder="End point"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  value={routeFormData.distance}
                  onChange={(e) => setRouteFormData({ ...routeFormData, distance: parseFloat(e.target.value) })}
                  placeholder="Distance in kilometers"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={routeFormData.estimatedDuration}
                  onChange={(e) => setRouteFormData({ ...routeFormData, estimatedDuration: parseInt(e.target.value) })}
                  placeholder="Duration in minutes"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerKm">Price per KM (₦)</Label>
                <Input
                  id="pricePerKm"
                  type="number"
                  value={routeFormData.pricePerKm}
                  onChange={(e) => setRouteFormData({ ...routeFormData, pricePerKm: parseFloat(e.target.value) })}
                  placeholder="Price per kilometer"
                />
              </div>

              <div className="space-y-2">
                <Label>Total Price</Label>
                <div className="text-2xl font-bold text-green-600">
                  ₦{((routeFormData.distance || 0) * (routeFormData.pricePerKm || 0)).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Stops Management */}
            <div className="space-y-2">
              <Label>Route Stops</Label>
              <div className="flex space-x-2">
                <Input
                  value={newStop}
                  onChange={(e) => setNewStop(e.target.value)}
                  placeholder="Add a stop"
                  onKeyPress={(e) => e.key === 'Enter' && addStop()}
                />
                <Button type="button" onClick={addStop}>Add Stop</Button>
              </div>
              <div className="space-y-2">
                {routeFormData.stops?.map((stop, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span>{index + 1}. {stop}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeStop(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRouteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRoute}>
              {editingRoute ? 'Update Route' : 'Create Route'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}</DialogTitle>
            <DialogDescription>
              {editingSchedule ? 'Update schedule information' : 'Create a new bus schedule'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduleRoute">Route</Label>
              <Select
                value={scheduleFormData.routeId}
                onValueChange={(value) => setScheduleFormData({ ...scheduleFormData, routeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a route" />
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

            <div className="space-y-2">
              <Label htmlFor="scheduleBus">Bus</Label>
              <Select
                value={scheduleFormData.busId}
                onValueChange={(value) => setScheduleFormData({ ...scheduleFormData, busId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a bus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">ADUS-001</SelectItem>
                  <SelectItem value="2">ADUS-002</SelectItem>
                  <SelectItem value="3">ADUS-003</SelectItem>
                  <SelectItem value="4">ADUS-004</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleDriver">Driver</Label>
              <Select
                value={scheduleFormData.driverId}
                onValueChange={(value) => setScheduleFormData({ ...scheduleFormData, driverId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ahmed Musa</SelectItem>
                  <SelectItem value="2">Fatima Hassan</SelectItem>
                  <SelectItem value="3">Ibrahim Yusuf</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={scheduleFormData.frequency}
                onValueChange={(value) => setScheduleFormData({ ...scheduleFormData, frequency: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                type="time"
                value={scheduleFormData.departureTime}
                onChange={(e) => setScheduleFormData({ ...scheduleFormData, departureTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <Input
                id="arrivalTime"
                type="time"
                value={scheduleFormData.arrivalTime}
                onChange={(e) => setScheduleFormData({ ...scheduleFormData, arrivalTime: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSchedule}>
              {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}