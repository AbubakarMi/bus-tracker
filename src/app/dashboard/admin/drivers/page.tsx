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
import {
  UserCheck,
  Car,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Bus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllBuses, type Bus } from '@/lib/bus-service';

interface Driver {
  id: string;
  email: string;
  name: string;
  phone: string;
  licenseNumber: string;
  busAssigned?: string;
  busPlateNumber?: string;
  status: 'active' | 'inactive' | 'on-route' | 'suspended';
  experience: string;
  joinDate: string;
  lastActive?: string;
  totalTrips: number;
  rating: number;
  emergencyContact?: string;
  address?: string;
  licenseExpiry: string;
}

export default function AdminDriversPage() {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [isCreateDriverOpen, setIsCreateDriverOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    email: '',
    name: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    emergencyContact: '',
    address: '',
    licenseExpiry: ''
  });

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const busesData = await getAllBuses();
        setBuses(busesData);

        // Load drivers from localStorage
        const storedDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');

        const sampleDrivers: Driver[] = [
          {
            id: '1',
            email: 'driver1@adustech.edu.ng',
            name: 'Mohammed Ali',
            phone: '+2348123456789',
            licenseNumber: 'ABC123456',
            busAssigned: busesData[0]?.id,
            busPlateNumber: busesData[0]?.plateNumber,
            status: 'active',
            experience: '5 years',
            joinDate: '2024-01-15',
            lastActive: '2024-01-20',
            totalTrips: 145,
            rating: 4.8,
            emergencyContact: '+2348987654321',
            address: 'Kano, Nigeria',
            licenseExpiry: '2025-12-31'
          },
          {
            id: '2',
            email: 'driver2@adustech.edu.ng',
            name: 'Fatima Abdullahi',
            phone: '+2348987654321',
            licenseNumber: 'DEF789012',
            busAssigned: busesData[1]?.id,
            busPlateNumber: busesData[1]?.plateNumber,
            status: 'on-route',
            experience: '3 years',
            joinDate: '2024-01-16',
            lastActive: '2024-01-20',
            totalTrips: 89,
            rating: 4.6,
            emergencyContact: '+2348555111222',
            address: 'Kano, Nigeria',
            licenseExpiry: '2025-06-30'
          },
          {
            id: '3',
            email: 'driver3@adustech.edu.ng',
            name: 'Ibrahim Yusuf',
            phone: '+2347012345678',
            licenseNumber: 'GHI345678',
            status: 'inactive',
            experience: '7 years',
            joinDate: '2023-12-01',
            lastActive: '2024-01-18',
            totalTrips: 234,
            rating: 4.9,
            emergencyContact: '+2347098765432',
            address: 'Kano, Nigeria',
            licenseExpiry: '2024-03-15'
          }
        ];

        // Add drivers from localStorage
        Object.values(storedDrivers).forEach((driver: any) => {
          if (!sampleDrivers.find(d => d.id === driver.id)) {
            sampleDrivers.push({
              ...driver,
              status: driver.status || 'active',
              experience: driver.experience || '2 years',
              joinDate: driver.createdAt?.split('T')[0] || '2024-01-01',
              totalTrips: 0,
              rating: 5.0,
              licenseExpiry: '2025-12-31'
            });
          }
        });

        setDrivers(sampleDrivers);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || driver.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleCreateDriver = () => {
    if (!newDriver.email || !newDriver.name || !newDriver.licenseNumber) {
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
      experience: newDriver.experience || '0 years',
      joinDate: new Date().toISOString().split('T')[0],
      totalTrips: 0,
      rating: 5.0,
      emergencyContact: newDriver.emergencyContact,
      address: newDriver.address,
      licenseExpiry: newDriver.licenseExpiry
    };

    // Store driver in localStorage
    const existingDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');
    existingDrivers[newDriver.email] = {
      ...driver,
      password: 'pass123',
      role: 'driver'
    };
    localStorage.setItem('registeredDrivers', JSON.stringify(existingDrivers));

    setDrivers([...drivers, driver]);
    setNewDriver({
      email: '',
      name: '',
      phone: '',
      licenseNumber: '',
      experience: '',
      emergencyContact: '',
      address: '',
      licenseExpiry: ''
    });
    setIsCreateDriverOpen(false);

    toast({
      title: "Driver Created Successfully",
      description: `${newDriver.name} has been added to the system`,
    });
  };

  const handleAssignBus = (driverId: string, busId: string) => {
    setDrivers(prev => prev.map(driver => {
      if (driver.id === driverId) {
        const bus = buses.find(b => b.id === busId);
        return {
          ...driver,
          busAssigned: busId,
          busPlateNumber: bus?.plateNumber
        };
      }
      return driver;
    }));

    toast({
      title: "Bus Assigned",
      description: "Driver has been assigned to the bus successfully",
    });
  };

  const handleStatusChange = (driverId: string, newStatus: Driver['status']) => {
    setDrivers(prev => prev.map(driver =>
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));

    toast({
      title: "Status Updated",
      description: `Driver status changed to ${newStatus}`,
    });
  };

  const activeDrivers = filteredDrivers.filter(d => d.status === 'active');
  const onRouteDrivers = filteredDrivers.filter(d => d.status === 'on-route');
  const inactiveDrivers = filteredDrivers.filter(d => d.status === 'inactive');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Driver Management
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage bus drivers, assignments, and performance tracking
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                <p className="text-3xl font-bold text-green-600">{drivers.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-3xl font-bold text-blue-600">{activeDrivers.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Route</p>
                <p className="text-3xl font-bold text-orange-600">{onRouteDrivers.length}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-3xl font-bold text-purple-600">
                  {drivers.length > 0 ? (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1) : '0.0'}
                </p>
              </div>
              <Car className="h-8 w-8 text-purple-600" />
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
                  placeholder="Search drivers by name, email, or license..."
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
                <SelectItem value="all">All Drivers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-route">On Route</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isCreateDriverOpen} onOpenChange={setIsCreateDriverOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Driver</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 space-y-4">
                  <div className="col-span-2">
                    <Label htmlFor="driverName">Full Name *</Label>
                    <Input
                      id="driverName"
                      placeholder="Driver Name"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverEmail">Email *</Label>
                    <Input
                      id="driverEmail"
                      type="email"
                      placeholder="driver@adustech.edu.ng"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverPhone">Phone</Label>
                    <Input
                      id="driverPhone"
                      placeholder="+234..."
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverLicense">License Number *</Label>
                    <Input
                      id="driverLicense"
                      placeholder="License Number"
                      value={newDriver.licenseNumber}
                      onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverExperience">Experience</Label>
                    <Input
                      id="driverExperience"
                      placeholder="e.g., 5 years"
                      value={newDriver.experience}
                      onChange={(e) => setNewDriver({...newDriver, experience: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="+234..."
                      value={newDriver.emergencyContact}
                      onChange={(e) => setNewDriver({...newDriver, emergencyContact: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseExpiry">License Expiry</Label>
                    <Input
                      id="licenseExpiry"
                      type="date"
                      value={newDriver.licenseExpiry}
                      onChange={(e) => setNewDriver({...newDriver, licenseExpiry: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Full address"
                      value={newDriver.address}
                      onChange={(e) => setNewDriver({...newDriver, address: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Button onClick={handleCreateDriver} className="w-full">
                      Create Driver Account
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Drivers ({filteredDrivers.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeDrivers.length})</TabsTrigger>
          <TabsTrigger value="on-route">On Route ({onRouteDrivers.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveDrivers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Drivers</CardTitle>
              <CardDescription>Complete list of registered drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Bus Assigned</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Trips</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">{driver.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{driver.licenseNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            Exp: {driver.licenseExpiry}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {driver.busPlateNumber ? (
                          <Badge variant="secondary">{driver.busPlateNumber}</Badge>
                        ) : (
                          <Select onValueChange={(busId) => handleAssignBus(driver.id, busId)}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Assign Bus" />
                            </SelectTrigger>
                            <SelectContent>
                              {buses.map((bus) => (
                                <SelectItem key={bus.id} value={bus.id}>
                                  {bus.plateNumber}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>{driver.experience}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium text-blue-600">{driver.totalTrips}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{driver.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={driver.status}
                          onValueChange={(status: Driver['status']) => handleStatusChange(driver.id, status)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="on-route">On Route</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDriver(driver);
                            setIsDriverDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
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

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Drivers</CardTitle>
              <CardDescription>Currently active and available drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>
                        {driver.busPlateNumber ? (
                          <Badge variant="secondary">{driver.busPlateNumber}</Badge>
                        ) : (
                          <span className="text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>{driver.lastActive || 'Never'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{driver.rating} ★</span>
                          <span className="text-muted-foreground">({driver.totalTrips} trips)</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="on-route">
          <Card>
            <CardHeader>
              <CardTitle>Drivers on Route</CardTitle>
              <CardDescription>Currently driving and in transit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onRouteDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Activity className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Bus: {driver.busPlateNumber} • Rating: {driver.rating} ★
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">On Route</Badge>
                  </div>
                ))}
                {onRouteDrivers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No drivers currently on route</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Drivers</CardTitle>
              <CardDescription>Drivers currently not active</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>License Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inactiveDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>
                        {new Date(driver.licenseExpiry) < new Date() ? (
                          <Badge variant="destructive">Expired</Badge>
                        ) : (
                          <Badge variant="secondary">Valid</Badge>
                        )}
                      </TableCell>
                      <TableCell>{driver.lastActive || 'Never'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(driver.id, 'active')}
                        >
                          Activate
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

      {/* Driver Details Modal */}
      <Dialog open={isDriverDialogOpen} onOpenChange={setIsDriverDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Driver Details: {selectedDriver?.name}</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Name</p>
                        <p className="text-muted-foreground">{selectedDriver.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{selectedDriver.email}</p>
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">{selectedDriver.phone}</p>
                      </div>
                      <div>
                        <p className="font-medium">Emergency Contact</p>
                        <p className="text-muted-foreground">{selectedDriver.emergencyContact}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">{selectedDriver.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">License Number</p>
                        <p className="text-muted-foreground">{selectedDriver.licenseNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium">License Expiry</p>
                        <p className="text-muted-foreground">{selectedDriver.licenseExpiry}</p>
                      </div>
                      <div>
                        <p className="font-medium">Experience</p>
                        <p className="text-muted-foreground">{selectedDriver.experience}</p>
                      </div>
                      <div>
                        <p className="font-medium">Join Date</p>
                        <p className="text-muted-foreground">{selectedDriver.joinDate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Assigned Bus</p>
                        <p className="text-muted-foreground">{selectedDriver.busPlateNumber || 'Not assigned'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Badge>{selectedDriver.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{selectedDriver.totalTrips}</p>
                      <p className="text-sm text-muted-foreground">Total Trips</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{selectedDriver.rating}</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">98%</p>
                      <p className="text-sm text-muted-foreground">On-Time Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">0</p>
                      <p className="text-sm text-muted-foreground">Incidents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}