'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Users, Bus, Route, Activity } from 'lucide-react';
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
    licenseNumber: '',
    password: ''
  });

  const handleCreateDriver = () => {
    if (!newDriver.email || !newDriver.name || !newDriver.password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
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

    setDrivers([...drivers, driver]);
    setNewDriver({ email: '', name: '', phone: '', licenseNumber: '', password: '' });
    setIsDriverDialogOpen(false);

    toast({
      title: "Success",
      description: "Driver created successfully",
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold">{drivers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bus className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Buses</p>
                <p className="text-2xl font-bold">{buses.filter(b => b.status === 'in-service').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Route className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                <p className="text-2xl font-bold">{routes.filter(r => r.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">On Route</p>
                <p className="text-2xl font-bold">{drivers.filter(d => d.status === 'on-route').length}</p>
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
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Initial password"
                          value={newDriver.password}
                          onChange={(e) => setNewDriver({...newDriver, password: e.target.value})}
                        />
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
