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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface DriverData {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  assignedBus: string;
  experience: number; // years
  rating: number; // 1-5 stars
  totalTrips: number;
  lastTrip: string;
  photo?: string;
}

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<DriverData[]>([
    {
      id: '1',
      name: 'Ahmed Musa',
      email: 'ahmed.musa@adustech.edu.ng',
      phone: '+234 802 123 4567',
      licenseNumber: 'DL-ABC-123456',
      licenseExpiry: '2025-06-15',
      dateOfBirth: '1985-03-20',
      address: 'Hotoro, Kano State',
      emergencyContact: 'Fatima Musa',
      emergencyPhone: '+234 803 234 5678',
      joinDate: '2023-01-15',
      status: 'active',
      assignedBus: 'ADUS-001',
      experience: 8,
      rating: 4.8,
      totalTrips: 245,
      lastTrip: '2024-03-15'
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima.hassan@adustech.edu.ng',
      phone: '+234 803 345 6789',
      licenseNumber: 'DL-DEF-789012',
      licenseExpiry: '2025-12-20',
      dateOfBirth: '1990-07-12',
      address: 'Sabon Gari, Kano State',
      emergencyContact: 'Ibrahim Hassan',
      emergencyPhone: '+234 804 345 6789',
      joinDate: '2023-03-10',
      status: 'active',
      assignedBus: 'ADUS-002',
      experience: 5,
      rating: 4.6,
      totalTrips: 189,
      lastTrip: '2024-03-15'
    },
    {
      id: '3',
      name: 'Ibrahim Yusuf',
      email: 'ibrahim.yusuf@adustech.edu.ng',
      phone: '+234 805 456 7890',
      licenseNumber: 'DL-GHI-345678',
      licenseExpiry: '2024-08-30',
      dateOfBirth: '1982-11-05',
      address: 'Kano Municipal, Kano State',
      emergencyContact: 'Aisha Yusuf',
      emergencyPhone: '+234 806 456 7890',
      joinDate: '2022-11-20',
      status: 'inactive',
      assignedBus: 'ADUS-003',
      experience: 12,
      rating: 4.9,
      totalTrips: 398,
      lastTrip: '2024-03-10'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<DriverData | null>(null);
  const [viewingDriver, setViewingDriver] = useState<DriverData | null>(null);

  const [formData, setFormData] = useState<Partial<DriverData>>({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpiry: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    status: 'active',
    assignedBus: '',
    experience: 0
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      licenseExpiry: '',
      dateOfBirth: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      status: 'active',
      assignedBus: '',
      experience: 0
    });
    setEditingDriver(null);
  };

  const handleAddDriver = () => {
    setEditingDriver(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditDriver = (driver: DriverData) => {
    setEditingDriver(driver);
    setFormData(driver);
    setIsDialogOpen(true);
  };

  const handleViewDriver = (driver: DriverData) => {
    setViewingDriver(driver);
    setIsViewDialogOpen(true);
  };

  const handleSaveDriver = () => {
    if (editingDriver) {
      // Update existing driver
      setDrivers(drivers.map(driver =>
        driver.id === editingDriver.id ? { ...formData, id: editingDriver.id } as DriverData : driver
      ));
    } else {
      // Add new driver
      const newDriver: DriverData = {
        ...formData,
        id: Date.now().toString(),
        joinDate: new Date().toISOString().split('T')[0],
        rating: 0,
        totalTrips: 0,
        lastTrip: ''
      } as DriverData;
      setDrivers([...drivers, newDriver]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteDriver = (driverId: string) => {
    setDrivers(drivers.filter(driver => driver.id !== driverId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isLicenseExpired = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600 mt-1">Manage your bus drivers and their information</p>
        </div>
        <Button onClick={handleAddDriver} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Driver</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {drivers.filter(driver => driver.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">License Expiring</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {drivers.filter(driver => isLicenseExpiringSoon(driver.licenseExpiry)).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(drivers.reduce((sum, driver) => sum + driver.rating, 0) / drivers.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Drivers List</CardTitle>
          <CardDescription>Complete list of all drivers in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Assigned Bus</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={driver.photo} />
                        <AvatarFallback>
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-500">{driver.experience} years exp.</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{driver.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{driver.licenseNumber}</p>
                      <div className="flex items-center space-x-1">
                        {isLicenseExpired(driver.licenseExpiry) ? (
                          <Badge variant="destructive" className="text-xs">Expired</Badge>
                        ) : isLicenseExpiringSoon(driver.licenseExpiry) ? (
                          <Badge variant="secondary" className="text-xs">Expiring Soon</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Valid</Badge>
                        )}
                        <span className="text-xs text-gray-500">{driver.licenseExpiry}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{driver.assignedBus}</p>
                      <p className="text-sm text-gray-500">{driver.totalTrips} trips</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-yellow-500">{getRatingStars(driver.rating)}</p>
                      <p className="text-sm text-gray-500">{driver.rating}/5.0</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(driver.status)}>
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDriver(driver)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditDriver(driver)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDriver(driver.id)}
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

      {/* Add/Edit Driver Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingDriver ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
            <DialogDescription>
              {editingDriver ? 'Update driver information' : 'Add a new driver to your fleet'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Driver's full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="driver@adustech.edu.ng"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 XXX XXX XXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                placeholder="DL-XXX-XXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseExpiry">License Expiry</Label>
              <Input
                id="licenseExpiry"
                type="date"
                value={formData.licenseExpiry}
                onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                placeholder="Years of driving experience"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
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
              <Label htmlFor="assignedBus">Assigned Bus</Label>
              <Select
                value={formData.assignedBus}
                onValueChange={(value) => setFormData({ ...formData, assignedBus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a bus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADUS-001">ADUS-001</SelectItem>
                  <SelectItem value="ADUS-002">ADUS-002</SelectItem>
                  <SelectItem value="ADUS-003">ADUS-003</SelectItem>
                  <SelectItem value="ADUS-004">ADUS-004</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="Emergency contact name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                placeholder="+234 XXX XXX XXXX"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full residential address"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDriver}>
              {editingDriver ? 'Update Driver' : 'Add Driver'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Driver Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Driver Details - {viewingDriver?.name}</DialogTitle>
            <DialogDescription>
              Complete information about this driver
            </DialogDescription>
          </DialogHeader>

          {viewingDriver && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={viewingDriver.photo} />
                  <AvatarFallback className="text-xl">
                    {viewingDriver.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewingDriver.name}</h3>
                  <p className="text-gray-600">{viewingDriver.email}</p>
                  <Badge className={getStatusColor(viewingDriver.status)}>
                    {viewingDriver.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Personal Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{viewingDriver.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Born: {viewingDriver.dateOfBirth}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{viewingDriver.address}</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-lg">Emergency Contact</h4>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {viewingDriver.emergencyContact}</p>
                    <p><strong>Phone:</strong> {viewingDriver.emergencyPhone}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Professional Information</h4>
                  <div className="space-y-2">
                    <p><strong>License:</strong> {viewingDriver.licenseNumber}</p>
                    <p><strong>Expiry:</strong> {viewingDriver.licenseExpiry}</p>
                    <p><strong>Experience:</strong> {viewingDriver.experience} years</p>
                    <p><strong>Assigned Bus:</strong> {viewingDriver.assignedBus}</p>
                    <p><strong>Join Date:</strong> {viewingDriver.joinDate}</p>
                  </div>

                  <h4 className="font-semibold text-lg">Performance</h4>
                  <div className="space-y-2">
                    <p><strong>Rating:</strong> {getRatingStars(viewingDriver.rating)} ({viewingDriver.rating}/5.0)</p>
                    <p><strong>Total Trips:</strong> {viewingDriver.totalTrips}</p>
                    <p><strong>Last Trip:</strong> {viewingDriver.lastTrip}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}