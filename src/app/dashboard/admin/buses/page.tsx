'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bus,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MapPin,
  Users,
  Fuel,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Wrench
} from 'lucide-react';

interface BusData {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  year: number;
  status: 'active' | 'maintenance' | 'inactive';
  currentRoute?: string;
  driver?: string;
  lastMaintenance: string;
  nextMaintenance: string;
  mileage: number;
  fuelLevel: number;
  location: string;
}

export default function AdminBusesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [buses] = useState<BusData[]>([
    {
      id: 'BUS-001',
      plateNumber: 'KN-123-ABC',
      model: 'Mercedes Sprinter',
      capacity: 45,
      year: 2022,
      status: 'active',
      currentRoute: 'Campus ↔ City Center',
      driver: 'Mohammed Ali',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      mileage: 45200,
      fuelLevel: 75,
      location: 'Main Campus'
    },
    {
      id: 'BUS-002',
      plateNumber: 'KN-456-DEF',
      model: 'Toyota Hiace',
      capacity: 35,
      year: 2021,
      status: 'active',
      currentRoute: 'Campus ↔ Hotoro',
      driver: 'Fatima Abdullahi',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      mileage: 38900,
      fuelLevel: 60,
      location: 'Hotoro Terminal'
    },
    {
      id: 'BUS-003',
      plateNumber: 'KN-789-GHI',
      model: 'Iveco Daily',
      capacity: 40,
      year: 2020,
      status: 'maintenance',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      mileage: 62100,
      fuelLevel: 0,
      location: 'Maintenance Bay'
    },
    {
      id: 'BUS-004',
      plateNumber: 'KN-321-JKL',
      model: 'Mercedes Benz',
      capacity: 50,
      year: 2023,
      status: 'inactive',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      mileage: 15600,
      fuelLevel: 85,
      location: 'Depot'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3" />;
      case 'maintenance': return <Wrench className="h-3 w-3" />;
      case 'inactive': return <AlertTriangle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.driver?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const maintenanceBuses = buses.filter(bus => bus.status === 'maintenance').length;
  const totalCapacity = buses.reduce((sum, bus) => sum + bus.capacity, 0);
  const avgMileage = Math.round(buses.reduce((sum, bus) => sum + bus.mileage, 0) / buses.length);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Bus Fleet Management
        </h1>
        <p className="text-muted-foreground">Manage your entire bus fleet operations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Buses</p>
                <p className="text-2xl font-bold text-green-600">{activeBuses}/{buses.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{maintenanceBuses}</p>
              </div>
              <Wrench className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold text-blue-600">{totalCapacity}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Mileage</p>
                <p className="text-2xl font-bold text-purple-600">{avgMileage.toLocaleString()}</p>
              </div>
              <Bus className="h-8 w-8 text-purple-600" />
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
              placeholder="Search buses, models, or drivers..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Bus
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
                    <Bus className="h-3 w-3" />
                    {bus.model} ({bus.year})
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(bus.status)} flex items-center gap-1`}>
                  {getStatusIcon(bus.status)}
                  {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {bus.capacity} seats
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-semibold">{bus.mileage.toLocaleString()} km</p>
                </div>
              </div>

              {/* Route & Driver */}
              {bus.status === 'active' && bus.currentRoute && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{bus.currentRoute}</span>
                  </div>
                  {bus.driver && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Driver: {bus.driver}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{bus.location}</span>
              </div>

              {/* Fuel Level */}
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Fuel Level</span>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {bus.fuelLevel}%
                </div>
              </div>

              {/* Maintenance Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Last Service</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(bus.lastMaintenance).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next Service</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(bus.nextMaintenance).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-3 w-3 mr-1" />
                  Manage
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Bus className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">No buses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or add a new bus to get started.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}