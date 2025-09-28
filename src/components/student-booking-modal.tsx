'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getAllBuses, getAllRoutes, type Bus, type Route } from '@/lib/bus-service';
import { createBooking, getSeatAvailability, generateAvailableSeats, type Booking } from '@/lib/booking-service';
import { Bus as BusIcon, MapPin, Clock, Users, CreditCard, CheckCircle } from 'lucide-react';

interface StudentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}

export function StudentBookingModal({ isOpen, onClose, userData }: StudentBookingModalProps) {
  const { toast } = useToast();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [availableSeats, setAvailableSeats] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState({
    tripDate: '',
    tripTime: '08:00',
    amount: 2500
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Bus, 2: Select Route, 3: Select Seat, 4: Confirm

  useEffect(() => {
    const loadData = async () => {
      try {
        const [busesData, routesData] = await Promise.all([
          getAllBuses(),
          getAllRoutes()
        ]);
        setBuses(busesData.filter(bus => bus.status === 'available' || bus.status === 'in-service'));
        setRoutes(routesData.filter(route => route.status === 'active'));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const loadSeats = async () => {
      if (selectedBus) {
        try {
          const availability = await getSeatAvailability(selectedBus.id);
          const available = generateAvailableSeats(selectedBus.capacity, availability.bookedSeatNumbers);
          setAvailableSeats(available);
        } catch (error) {
          console.error('Error loading seats:', error);
        }
      }
    };

    loadSeats();
  }, [selectedBus]);

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
    setSelectedRoute(null);
    setSelectedSeat('');
    setStep(2);
  };

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
    setSelectedSeat('');
    setStep(3);
  };

  const handleSeatSelect = (seat: string) => {
    setSelectedSeat(seat);
    setStep(4);
  };

  const handleConfirmBooking = async () => {
    if (!selectedBus || !selectedRoute || !selectedSeat || !userData) {
      toast({
        title: "Error",
        description: "Please complete all booking details",
        variant: "destructive"
      });
      return;
    }

    if (!bookingData.tripDate) {
      toast({
        title: "Error",
        description: "Please select a trip date",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'> = {
        busId: selectedBus.id,
        busPlateNumber: selectedBus.plateNumber,
        routeId: selectedRoute.id,
        routeName: selectedRoute.name,
        passengerId: userData.id,
        passengerName: userData.name,
        passengerEmail: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '.')}@student.adustech.edu.ng`,
        passengerType: userData.role === 'student' ? 'student' : 'staff',
        passengerRegNumber: userData.regNumber,
        passengerStaffId: userData.staffId,
        seatNumber: selectedSeat,
        bookingDate: new Date().toISOString().split('T')[0],
        tripDate: bookingData.tripDate,
        tripTime: bookingData.tripTime,
        departurePoint: selectedRoute.startPoint,
        arrivalPoint: selectedRoute.endPoint,
        status: 'confirmed',
        paymentStatus: 'paid',
        amount: bookingData.amount,
        bookingTime: new Date().toISOString()
      };

      await createBooking(booking);

      toast({
        title: "Booking Confirmed! 🎉",
        description: `Seat ${selectedSeat} booked successfully on bus ${selectedBus.plateNumber}`,
      });

      // Reset form and close modal
      setStep(1);
      setSelectedBus(null);
      setSelectedRoute(null);
      setSelectedSeat('');
      setBookingData({
        tripDate: '',
        tripTime: '08:00',
        amount: 2500
      });
      onClose();

    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Unable to complete booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderBusSelection = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Choose Your Bus</h3>
        <p className="text-muted-foreground">Select from available buses</p>
      </div>
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {buses.map((bus) => (
          <Card
            key={bus.id}
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary"
            onClick={() => handleBusSelect(bus)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BusIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{bus.plateNumber}</h4>
                    <p className="text-sm text-muted-foreground">{bus.model || 'Bus'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={bus.status === 'available' ? 'secondary' : 'default'}>
                    {bus.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {bus.capacity} seats
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRouteSelection = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Choose Your Route</h3>
        <p className="text-muted-foreground">Bus: {selectedBus?.plateNumber}</p>
      </div>
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {routes.map((route) => (
          <Card
            key={route.id}
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary"
            onClick={() => handleRouteSelect(route)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{route.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {route.startPoint} → {route.endPoint}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{route.estimatedTime}</p>
                  <p className="text-sm text-muted-foreground">{route.distance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button variant="outline" onClick={() => setStep(1)}>
        Back to Bus Selection
      </Button>
    </div>
  );

  const renderSeatSelection = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Choose Your Seat</h3>
        <p className="text-muted-foreground">
          Bus: {selectedBus?.plateNumber} | Route: {selectedRoute?.name}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
        {availableSeats.slice(0, 32).map((seat) => (
          <Button
            key={seat}
            variant={selectedSeat === seat ? "default" : "outline"}
            size="sm"
            onClick={() => handleSeatSelect(seat)}
            className="h-10"
          >
            {seat}
          </Button>
        ))}
      </div>

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Available: {availableSeats.length} seats</span>
        <span>Capacity: {selectedBus?.capacity} seats</span>
      </div>

      <Button variant="outline" onClick={() => setStep(2)}>
        Back to Route Selection
      </Button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Confirm Your Booking</h3>
        <p className="text-muted-foreground">Please review your booking details</p>
      </div>

      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Bus</p>
              <p className="text-muted-foreground">{selectedBus?.plateNumber}</p>
            </div>
            <div>
              <p className="font-medium">Seat</p>
              <p className="text-muted-foreground">{selectedSeat}</p>
            </div>
            <div>
              <p className="font-medium">Route</p>
              <p className="text-muted-foreground">{selectedRoute?.name}</p>
            </div>
            <div>
              <p className="font-medium">Distance</p>
              <p className="text-muted-foreground">{selectedRoute?.distance}</p>
            </div>
            <div>
              <p className="font-medium">From</p>
              <p className="text-muted-foreground">{selectedRoute?.startPoint}</p>
            </div>
            <div>
              <p className="font-medium">To</p>
              <p className="text-muted-foreground">{selectedRoute?.endPoint}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trip Details */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="tripDate">Trip Date</Label>
          <Input
            id="tripDate"
            type="date"
            value={bookingData.tripDate}
            onChange={(e) => setBookingData(prev => ({ ...prev, tripDate: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <Label htmlFor="tripTime">Departure Time</Label>
          <Select value={bookingData.tripTime} onValueChange={(value) => setBookingData(prev => ({ ...prev, tripTime: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="06:00">6:00 AM</SelectItem>
              <SelectItem value="08:00">8:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payment */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <span className="font-medium">Total Amount</span>
            </div>
            <span className="text-xl font-bold text-green-600">₦{bookingData.amount.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
          Back to Seats
        </Button>
        <Button
          onClick={handleConfirmBooking}
          disabled={isLoading || !bookingData.tripDate}
          className="flex-1"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Booking...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Booking
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BusIcon className="h-5 w-5" />
            Book Your Trip
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && renderBusSelection()}
          {step === 2 && renderRouteSelection()}
          {step === 3 && renderSeatSelection()}
          {step === 4 && renderConfirmation()}
        </div>
      </DialogContent>
    </Dialog>
  );
}