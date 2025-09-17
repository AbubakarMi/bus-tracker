'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Plus,
  Edit,
  Trash2,
  Settings,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Bus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusData {
  id: string;
  number: string;
  model: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'offline';
  route: string;
  driver: string;
  purchaseDate: string;
  plateNumber: string;
  fuelType: 'diesel' | 'petrol' | 'electric';
  lastMaintenance: string;
  nextMaintenance: string;
  pricePerSeat: number;
  departureTime: string;
  destination: string;
}

interface SeatConfiguration {
  rows: number;
  seatsPerRow: number;
  layout: string[];
}

export default function BusManagement() {
  const [buses, setBuses] = useState<BusData[]>([
    {
      id: '1',
      number: 'ADUS-001',
      model: 'Toyota Hiace',
      capacity: 35,
      status: 'active',
      route: 'Campus to City Center',
      driver: 'Ahmed Musa',
      purchaseDate: '2023-01-15',
      plateNumber: 'KN-123-ABC',
      fuelType: 'diesel',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      pricePerSeat: 150,
      departureTime: '07:00',
      destination: 'City Center'
    },
    {
      id: '2',
      number: 'ADUS-002',
      model: 'Mercedes Sprinter',
      capacity: 28,
      status: 'active',
      route: 'Campus to Hotoro',
      driver: 'Fatima Hassan',
      purchaseDate: '2023-03-20',
      plateNumber: 'KN-456-DEF',
      fuelType: 'diesel',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      pricePerSeat: 200,
      departureTime: '08:00',
      destination: 'Hotoro'
    },
    {
      id: '3',
      number: 'ADUS-003',
      model: 'Toyota Coaster',
      capacity: 42,
      status: 'maintenance',
      route: 'Campus to Sabon Gari',
      driver: 'Ibrahim Yusuf',
      purchaseDate: '2022-11-10',
      plateNumber: 'KN-789-GHI',
      fuelType: 'diesel',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      pricePerSeat: 180,
      departureTime: '09:00',
      destination: 'Sabon Gari'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<BusData | null>(null);
  const [isSeatDialogOpen, setIsSeatDialogOpen] = useState(false);
  const [selectedBusForSeats, setSelectedBusForSeats] = useState<BusData | null>(null);

  const [formData, setFormData] = useState<Partial<BusData>>({
    number: '',
    model: '',
    capacity: 0,
    status: 'active',
    route: '',
    driver: '',
    plateNumber: '',
    fuelType: 'diesel',
    pricePerSeat: 0,
    departureTime: '',
    destination: ''
  });

  const resetForm = () => {
    setFormData({
      number: '',
      model: '',
      capacity: 0,
      status: 'active',
      route: '',
      driver: '',
      plateNumber: '',
      fuelType: 'diesel',
      pricePerSeat: 0,
      departureTime: '',
      destination: ''
    });
    setEditingBus(null);
  };

  const handleAddBus = () => {
    setEditingBus(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditBus = (bus: BusData) => {
    setEditingBus(bus);
    setFormData(bus);
    setIsDialogOpen(true);
  };

  const handleSaveBus = () => {
    if (editingBus) {
      // Update existing bus
      setBuses(buses.map(bus => bus.id === editingBus.id ? { ...formData, id: editingBus.id } as BusData : bus));
    } else {
      // Add new bus
      const newBus: BusData = {
        ...formData,
        id: Date.now().toString(),
        purchaseDate: new Date().toISOString().split('T')[0],
        lastMaintenance: new Date().toISOString().split('T')[0],
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      } as BusData;
      setBuses([...buses, newBus]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteBus = (busId: string) => {
    setBuses(buses.filter(bus => bus.id !== busId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openSeatConfiguration = (bus: BusData) => {
    setSelectedBusForSeats(bus);
    setIsSeatDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bus Management</h1>
          <p className="text-gray-600 mt-1">Manage your fleet of buses, routes, and configurations</p>
        </div>
        <Button onClick={handleAddBus} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Bus</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {buses.filter(bus => bus.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {buses.reduce((total, bus) => total + bus.capacity, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {buses.filter(bus => bus.status === 'maintenance').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bus Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bus Fleet</CardTitle>
          <CardDescription>Complete list of all buses in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus Number</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price/Seat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.number}</TableCell>
                  <TableCell>{bus.model}</TableCell>
                  <TableCell>{bus.route}</TableCell>
                  <TableCell>{bus.driver}</TableCell>
                  <TableCell>{bus.capacity} seats</TableCell>
                  <TableCell>₦{bus.pricePerSeat}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(bus.status)}>
                      {bus.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBus(bus)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSeatConfiguration(bus)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBus(bus.id)}
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

      {/* Add/Edit Bus Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBus ? 'Edit Bus' : 'Add New Bus'}</DialogTitle>
            <DialogDescription>
              {editingBus ? 'Update bus information' : 'Add a new bus to your fleet'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Bus Number</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="e.g., ADUS-004"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g., Toyota Hiace"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plateNumber">Plate Number</Label>
              <Input
                id="plateNumber"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                placeholder="e.g., KN-123-ABC"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                placeholder="Number of seats"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => setFormData({ ...formData, fuelType: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                placeholder="e.g., Campus to City Center"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Final destination"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver">Driver</Label>
              <Input
                id="driver"
                value={formData.driver}
                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                placeholder="Driver name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerSeat">Price per Seat (₦)</Label>
              <Input
                id="pricePerSeat"
                type="number"
                value={formData.pricePerSeat}
                onChange={(e) => setFormData({ ...formData, pricePerSeat: parseInt(e.target.value) })}
                placeholder="Price in Naira"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                type="time"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBus}>
              {editingBus ? 'Update Bus' : 'Add Bus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Seat Configuration Dialog */}
      <Dialog open={isSeatDialogOpen} onOpenChange={setIsSeatDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Seat Configuration - {selectedBusForSeats?.number}</DialogTitle>
            <DialogDescription>
              Configure the seat layout for this bus
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {selectedBusForSeats && (
              <SeatConfigurationComponent bus={selectedBusForSeats} />
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSeatDialogOpen(false)}>
              Close
            </Button>
            <Button>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Seat Configuration Component
function SeatConfigurationComponent({ bus }: { bus: BusData }) {
  const [rows, setRows] = useState(7);
  const [seatsPerRow, setSeatsPerRow] = useState(5);

  const generateSeatLayout = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        if (seat === 3) {
          rowSeats.push({ type: 'aisle', id: `aisle-${row}` });
        }
        rowSeats.push({
          type: 'seat',
          id: `${row}${String.fromCharCode(64 + seat)}`,
          available: true
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const seatLayout = generateSeatLayout();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rows">Number of Rows</Label>
          <Input
            id="rows"
            type="number"
            min="1"
            max="15"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="seatsPerRow">Seats per Row</Label>
          <Input
            id="seatsPerRow"
            type="number"
            min="2"
            max="6"
            value={seatsPerRow}
            onChange={(e) => setSeatsPerRow(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="text-center mb-4">
          <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-t-lg inline-block">
            Driver
          </div>
        </div>

        <div className="space-y-2">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center items-center space-x-1">
              {row.map((item, seatIndex) => (
                item.type === 'aisle' ? (
                  <div key={item.id} className="w-8"></div>
                ) : (
                  <div
                    key={item.id}
                    className={cn(
                      "w-10 h-10 border-2 rounded flex items-center justify-center text-xs font-medium cursor-pointer",
                      item.available
                        ? "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                        : "bg-red-100 border-red-300 text-red-700"
                    )}
                  >
                    {item.id}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}