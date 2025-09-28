'use client';

import React, { useState, useEffect } from 'react';
import { createBus, getAllBuses, updateBus, deleteBus, createRoute, getAllRoutes, initializeDefaultData, type Bus as BusType, type Route as RouteType } from '@/lib/bus-service';
import { getAllBusBookingSummaries, getSeatAvailability, getAllBookings, type BusBookingSummary, type SeatAvailability, type Booking } from '@/lib/booking-service';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Bus,
  Route,
  Activity,
  TrendingUp,
  TrendingDown,
  MapPin,
  UserCheck,
  BarChart3,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Target,
  Zap,
  Shield,
  Eye,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  id: string;
  email: string;
  name: string;
  phone: string;
  licenseNumber: string;
  busAssigned?: string;
  status: 'active' | 'inactive' | 'on-route';
  createdAt: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      email: 'driver1@adustech.edu.ng',
      name: 'Mohammed Ali',
      phone: '+2348123456789',
      licenseNumber: 'ABC123456',
      busAssigned: 'BUS-001',
      status: 'active',
      createdAt: '2024-01-15'
    }
  ]);

  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [buses, setBuses] = useState<BusType[]>([]);
  const [busBookingSummaries, setBusBookingSummaries] = useState<BusBookingSummary[]>([]);
  const [seatAvailabilities, setSeatAvailabilities] = useState<Record<string, SeatAvailability>>({});
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isBusDialogOpen, setIsBusDialogOpen] = useState(false);
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [newBus, setNewBus] = useState({
    plateNumber: '',
    capacity: 45,
    model: '',
    year: '',
    status: 'available' as const
  });
  const [newRoute, setNewRoute] = useState({
    name: '',
    startPoint: '',
    endPoint: '',
    estimatedTime: '',
    distance: '',
    status: 'active' as const,
    description: ''
  });

  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    email: '',
    name: '',
    phone: '',
    licenseNumber: ''
  });

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await initializeDefaultData();
        const [busesData, routesData, bookingSummaries, allBookings] = await Promise.all([
          getAllBuses(),
          getAllRoutes(),
          getAllBusBookingSummaries(),
          getAllBookings()
        ]);

        setBuses(busesData);
        setRoutes(routesData);
        setBusBookingSummaries(bookingSummaries);
        setRecentBookings(allBookings.slice(0, 10)); // Show recent 10 bookings

        // Load seat availabilities for all buses
        const availabilities: Record<string, SeatAvailability> = {};
        for (const bus of busesData) {
          try {
            const availability = await getSeatAvailability(bus.id);
            availabilities[bus.id] = availability;
          } catch (error) {
            console.error(`Error loading availability for bus ${bus.id}:`, error);
          }
        }
        setSeatAvailabilities(availabilities);

      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error",
          description: "Failed to load bus and route data",
          variant: "destructive"
        });
      }
    };
    loadData();
  }, []);

  // Real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [bookingSummaries, allBookings] = await Promise.all([
          getAllBusBookingSummaries(),
          getAllBookings()
        ]);

        setBusBookingSummaries(bookingSummaries);
        setRecentBookings(allBookings.slice(0, 10));

        // Update seat availabilities
        const availabilities: Record<string, SeatAvailability> = {};
        for (const bus of buses) {
          try {
            const availability = await getSeatAvailability(bus.id);
            availabilities[bus.id] = availability;
          } catch (error) {
            console.error(`Error updating availability for bus ${bus.id}:`, error);
          }
        }
        setSeatAvailabilities(availabilities);

      } catch (error) {
        console.error('Error updating real-time data:', error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [buses]);

  const DEFAULT_PASSWORD = 'pass123';

  // Initialize sample drivers in localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');

      // Add sample drivers if they don't exist
      if (!existingDrivers['driver1@adustech.edu.ng']) {
        existingDrivers['driver1@adustech.edu.ng'] = {
          id: '1',
          email: 'driver1@adustech.edu.ng',
          name: 'Mohammed Ali',
          phone: '+2348123456789',
          licenseNumber: 'ABC123456',
          busAssigned: 'BUS-001',
          status: 'active',
          createdAt: '2024-01-15',
          password: DEFAULT_PASSWORD,
          role: 'driver'
        };
      }

      if (!existingDrivers['driver2@adustech.edu.ng']) {
        existingDrivers['driver2@adustech.edu.ng'] = {
          id: '2',
          email: 'driver2@adustech.edu.ng',
          name: 'Fatima Abdullahi',
          phone: '+2348987654321',
          licenseNumber: 'DEF789012',
          busAssigned: 'BUS-002',
          status: 'active',
          createdAt: '2024-01-16',
          password: DEFAULT_PASSWORD,
          role: 'driver'
        };
      }

      localStorage.setItem('registeredDrivers', JSON.stringify(existingDrivers));
    }
  }, []);

  const handleCreateDriver = () => {
    if (!newDriver.email || !newDriver.name) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newDriver.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    const driver: Driver = {
      id: Date.now().toString(),
      email: newDriver.email,
      name: newDriver.name,
      phone: newDriver.phone,
      licenseNumber: newDriver.licenseNumber,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Store driver with default password in localStorage
    if (typeof window !== 'undefined') {
      const existingDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');
      existingDrivers[newDriver.email] = {
        ...driver,
        password: DEFAULT_PASSWORD,
        role: 'driver'
      };
      localStorage.setItem('registeredDrivers', JSON.stringify(existingDrivers));
    }

    setDrivers([...drivers, driver]);
    setNewDriver({ email: '', name: '', phone: '', licenseNumber: '' });
    setIsDriverDialogOpen(false);

    toast({
      title: "Driver Created Successfully",
      description: `Email: ${newDriver.email}\nDefault Password: ${DEFAULT_PASSWORD}\n\nThe driver can now log in using these credentials.`,
    });
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter(d => d.id !== id));
    toast({
      title: "Success",
      description: "Driver deleted successfully",
    });
  };

  const handleCreateBus = async () => {
    if (!newBus.plateNumber || !newBus.capacity) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const createdBus = await createBus({
        plateNumber: newBus.plateNumber,
        capacity: newBus.capacity,
        model: newBus.model,
        year: newBus.year,
        status: newBus.status
      });

      setBuses(prev => [...prev, createdBus]);
      setNewBus({
        plateNumber: '',
        capacity: 45,
        model: '',
        year: '',
        status: 'available'
      });
      setIsBusDialogOpen(false);

      toast({
        title: "Bus Created Successfully",
        description: `Bus ${newBus.plateNumber} has been added to the fleet.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create bus. Please try again.",
        variant: "destructive"
      });
    }
  };

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
      const createdRoute = await createRoute({
        name: newRoute.name,
        startPoint: newRoute.startPoint,
        endPoint: newRoute.endPoint,
        estimatedTime: newRoute.estimatedTime,
        distance: newRoute.distance,
        status: newRoute.status,
        description: newRoute.description
      });

      setRoutes(prev => [...prev, createdRoute]);
      setNewRoute({
        name: '',
        startPoint: '',
        endPoint: '',
        estimatedTime: '',
        distance: '',
        status: 'active',
        description: ''
      });
      setIsRouteDialogOpen(false);

      toast({
        title: "Route Created Successfully",
        description: `Route ${newRoute.name} has been added.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create route. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteBus = async (busId: string) => {
    try {
      await deleteBus(busId);
      setBuses(prev => prev.filter(bus => bus.id !== busId));
      toast({
        title: "Success",
        description: "Bus deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete bus",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome Back, Admin
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your bus fleet and monitor operations from your central command center
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Fleet</p>
                <p className="text-3xl font-bold text-blue-600">{buses.length}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {buses.filter(b => b.status === 'available').length} available
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Drivers</p>
                <p className="text-3xl font-bold text-green-600">{drivers.filter(d => d.status === 'active').length}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All verified
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Routes</p>
                <p className="text-3xl font-bold text-orange-600">{routes.filter(r => r.status === 'active').length}</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  24/7 coverage
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Route className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-purple-600">{recentBookings.length}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {recentBookings.filter(b => b.status === 'confirmed').length} confirmed
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Fleet Utilization</h3>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>In Service</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{buses.filter(b => b.status === 'in-service').length} buses active</span>
                <span>{buses.length} total</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">On-Time Performance</h3>
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>On Time</span>
                <span className="font-medium text-green-600">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>136 on-time arrivals</span>
                <span>Today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">System Health</h3>
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Operational</span>
                <span className="font-medium text-green-600">99.8%</span>
              </div>
              <Progress value={99.8} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>All systems running</span>
                <span>Real-time</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New driver registered</p>
                  <p className="text-xs text-muted-foreground">Mohammed Ali joined the fleet</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Route optimization completed</p>
                  <p className="text-xs text-muted-foreground">Campus to City Center route updated</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Maintenance scheduled</p>
                  <p className="text-xs text-muted-foreground">Bus BUS-001 due for service</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Peak hour analysis ready</p>
                  <p className="text-xs text-muted-foreground">Morning rush hour report generated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              System Alerts
            </CardTitle>
            <CardDescription>Important notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">High priority</p>
                  <p className="text-xs text-red-600">Bus BUS-003 GPS signal lost</p>
                  <p className="text-xs text-red-500">Last seen: Kano City Center</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">Medium priority</p>
                  <p className="text-xs text-amber-600">Driver fatima.ali needs license renewal</p>
                  <p className="text-xs text-amber-500">Expires in 7 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Info</p>
                  <p className="text-xs text-blue-600">System backup completed successfully</p>
                  <p className="text-xs text-blue-500">All data secured</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="drivers" className="space-y-4">
        <TabsList className="grid grid-cols-6 gap-2">
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="buses">Buses</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Driver Management</CardTitle>
                  <CardDescription>
                    Create and manage driver accounts with email and password access.
                  </CardDescription>
                </div>
                <Dialog open={isDriverDialogOpen} onOpenChange={setIsDriverDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Driver</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="driver@adustech.edu.ng"
                          value={newDriver.email}
                          onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Driver Name"
                          value={newDriver.name}
                          onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+234..."
                          value={newDriver.phone}
                          onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="license">License Number</Label>
                        <Input
                          id="license"
                          placeholder="License Number"
                          value={newDriver.licenseNumber}
                          onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                        />
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Driver Login Setup</h4>
                        <div className="text-sm text-blue-800 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <p><strong>Login Email:</strong> The email address entered above</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <p><strong>Password:</strong> <code className="bg-blue-100 px-1 rounded">password123</code> (default)</p>
                          </div>
                          <div className="mt-3 p-2 bg-blue-100 rounded border">
                            <p className="text-xs text-blue-700">
                              <strong>Example:</strong> If you enter <code>john.doe@adustech.edu.ng</code>,
                              the driver will log in with that email and password <code>password123</code>
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleCreateDriver} className="w-full">
                        Create Driver Account
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Bus Assigned</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.licenseNumber}</TableCell>
                      <TableCell>{driver.busAssigned || 'Unassigned'}</TableCell>
                      <TableCell>
                        <Badge variant={
                          driver.status === 'active' ? 'default' :
                          driver.status === 'on-route' ? 'secondary' : 'destructive'
                        }>
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDriver(driver.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Bus Management</CardTitle>
                  <CardDescription>
                    Manage bus fleet and assignments.
                  </CardDescription>
                </div>
                <Dialog open={isBusDialogOpen} onOpenChange={setIsBusDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Bus
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Bus</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="plateNumber">Plate Number *</Label>
                        <Input
                          id="plateNumber"
                          placeholder="e.g., ADU-003"
                          value={newBus.plateNumber}
                          onChange={(e) => setNewBus({...newBus, plateNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="capacity">Capacity *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          placeholder="45"
                          value={newBus.capacity}
                          onChange={(e) => setNewBus({...newBus, capacity: parseInt(e.target.value) || 45})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          placeholder="e.g., Toyota Coaster"
                          value={newBus.model}
                          onChange={(e) => setNewBus({...newBus, model: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          placeholder="e.g., 2022"
                          value={newBus.year}
                          onChange={(e) => setNewBus({...newBus, year: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={newBus.status} onValueChange={(value: any) => setNewBus({...newBus, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="in-service">In Service</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCreateBus} className="w-full">
                        Create Bus
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plate Number</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Available Seats</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buses.map((bus) => {
                    const availability = seatAvailabilities[bus.id];
                    const summary = busBookingSummaries.find(s => s.busId === bus.id);
                    return (
                      <TableRow key={bus.id}>
                        <TableCell className="font-medium">{bus.plateNumber}</TableCell>
                        <TableCell>{bus.capacity} seats</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${availability?.availableSeats === 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {availability?.availableSeats || bus.capacity}
                            </span>
                            <Progress
                              value={availability ? ((availability.bookedSeats / bus.capacity) * 100) : 0}
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium text-blue-600">
                              {summary?.confirmedBookings || 0}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ₦{summary?.revenue?.toLocaleString() || 0}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {bus.driverName || 'Unassigned'}
                        </TableCell>
                        <TableCell>
                          {bus.routeName || 'Unassigned'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            bus.status === 'in-service' ? 'default' :
                            bus.status === 'available' ? 'secondary' : 'destructive'
                          }>
                            {bus.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button variant="outline" size="sm" title="View Details">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBus(bus.id)}
                            title="Delete Bus"
                          >
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Route Management</CardTitle>
                  <CardDescription>
                    Manage bus routes and schedules.
                  </CardDescription>
                </div>
                <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Route
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Route</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="routeName">Route Name *</Label>
                        <Input
                          id="routeName"
                          placeholder="e.g., Campus to Mall"
                          value={newRoute.name}
                          onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                        />
                      </div>
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
                          placeholder="e.g., City Mall"
                          value={newRoute.endPoint}
                          onChange={(e) => setNewRoute({...newRoute, endPoint: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="distance">Distance</Label>
                        <Input
                          id="distance"
                          placeholder="e.g., 15 km"
                          value={newRoute.distance}
                          onChange={(e) => setNewRoute({...newRoute, distance: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="estimatedTime">Estimated Time</Label>
                        <Input
                          id="estimatedTime"
                          placeholder="e.g., 30 minutes"
                          value={newRoute.estimatedTime}
                          onChange={(e) => setNewRoute({...newRoute, estimatedTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
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
              </div>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.startPoint}</TableCell>
                      <TableCell>{route.endPoint}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.estimatedTime}</TableCell>
                      <TableCell>
                        <Badge variant={route.status === 'active' ? 'default' : 'destructive'}>
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all registered students and staff members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID/Reg Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course/Department</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Sample users - in real implementation, fetch from database */}
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>UG20/COMS/1284</TableCell>
                    <TableCell>john.doe@student.adustech.edu.ng</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Student</Badge>
                    </TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium text-blue-600">
                        {recentBookings.filter(b => b.passengerRegNumber === 'UG20/COMS/1284').length}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
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
                  <TableRow>
                    <TableCell className="font-medium">Dr. Sarah Ahmed</TableCell>
                    <TableCell>Staff/Adustech/0001</TableCell>
                    <TableCell>sarah.ahmed@adustech.edu.ng</TableCell>
                    <TableCell>
                      <Badge variant="outline">Staff</Badge>
                    </TableCell>
                    <TableCell>Computer Science Dept</TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium text-blue-600">0</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Real-time system activity and user actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.slice(0, 10).map((booking, index) => (
                  <div key={booking.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      booking.status === 'confirmed' ? 'bg-green-500' :
                      booking.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {booking.status === 'confirmed' ? '✅ New Booking' :
                         booking.status === 'cancelled' ? '❌ Booking Cancelled' : '⏳ Booking Pending'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.passengerName} booked seat {booking.seatNumber} on bus {booking.busPlateNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={
                      booking.status === 'confirmed' ? 'default' :
                      booking.status === 'cancelled' ? 'destructive' : 'secondary'
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                ))}

                {/* Bus Creation Activity */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">🚌 Bus Added to Fleet</p>
                    <p className="text-xs text-muted-foreground">
                      Admin added new bus to the system
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary">System</Badge>
                </div>

                {/* Route Creation Activity */}
                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">🛣️ New Route Created</p>
                    <p className="text-xs text-muted-foreground">
                      Admin created new route in the system
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary">System</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bookingPrice">Default Booking Price (₦)</Label>
                  <Input
                    id="bookingPrice"
                    type="number"
                    defaultValue="2500"
                    placeholder="2500"
                  />
                </div>
                <div>
                  <Label htmlFor="maxBookingDays">Max Advance Booking Days</Label>
                  <Input
                    id="maxBookingDays"
                    type="number"
                    defaultValue="7"
                    placeholder="7"
                  />
                </div>
                <div>
                  <Label htmlFor="cancelationTime">Cancellation Window (hours)</Label>
                  <Input
                    id="cancelationTime"
                    type="number"
                    defaultValue="24"
                    placeholder="24"
                  />
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure notification preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <input type="checkbox" id="emailNotifications" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <input type="checkbox" id="smsNotifications" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <input type="checkbox" id="pushNotifications" defaultChecked className="toggle" />
                </div>
                <Button className="w-full">Update Preferences</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup & Security</CardTitle>
                <CardDescription>
                  Manage data backup and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Generate Backup
                </Button>
                <Button variant="destructive" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reset System
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  Current system status and information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Version</p>
                    <p className="text-muted-foreground">v2.1.0</p>
                  </div>
                  <div>
                    <p className="font-medium">Last Backup</p>
                    <p className="text-muted-foreground">2 hours ago</p>
                  </div>
                  <div>
                    <p className="font-medium">Database Status</p>
                    <p className="text-green-600">✅ Connected</p>
                  </div>
                  <div>
                    <p className="font-medium">Storage Used</p>
                    <p className="text-muted-foreground">2.3 GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
