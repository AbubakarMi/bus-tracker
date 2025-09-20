'use client';

import React, { useState, useEffect } from 'react';
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
  Shield
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

interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  estimatedTime: string;
  distance: string;
  status: 'active' | 'inactive';
}

interface Bus {
  id: string;
  plateNumber: string;
  capacity: number;
  driverId?: string;
  routeId?: string;
  status: 'available' | 'in-service' | 'maintenance';
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

  const [routes] = useState<Route[]>([
    {
      id: '1',
      name: 'Campus to City Center',
      startPoint: 'ADU Campus Gate',
      endPoint: 'Kano City Center',
      estimatedTime: '45 mins',
      distance: '25 km',
      status: 'active'
    }
  ]);

  const [buses] = useState<Bus[]>([
    {
      id: '1',
      plateNumber: 'BUS-001',
      capacity: 45,
      driverId: '1',
      routeId: '1',
      status: 'in-service'
    }
  ]);

  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    email: '',
    name: '',
    phone: '',
    licenseNumber: ''
  });

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
                  +2 this month
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
                <p className="text-sm font-medium text-muted-foreground mb-1">Today's Trips</p>
                <p className="text-3xl font-bold text-purple-600">147</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from yesterday
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
        <TabsList>
          <TabsTrigger value="drivers">Driver Management</TabsTrigger>
          <TabsTrigger value="buses">Bus Management</TabsTrigger>
          <TabsTrigger value="routes">Route Management</TabsTrigger>
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
              <CardTitle>Bus Management</CardTitle>
              <CardDescription>
                Manage bus fleet and assignments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plate Number</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buses.map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell className="font-medium">{bus.plateNumber}</TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>
                        {bus.driverId ? drivers.find(d => d.id === bus.driverId)?.name || 'Unknown' : 'Unassigned'}
                      </TableCell>
                      <TableCell>
                        {bus.routeId ? routes.find(r => r.id === bus.routeId)?.name || 'Unknown' : 'Unassigned'}
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

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
              <CardDescription>
                Manage bus routes and schedules.
              </CardDescription>
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
      </Tabs>
    </div>
  );
}
