'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Bus,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Users,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Navigation,
  Star,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Download,
  Send,
  Shield,
  Activity,
  DollarSign,
  Route,
  User,
  Briefcase,
  Wifi,
  Battery,
  Zap,
  RefreshCw,
  Timer,
  Phone,
  Mail,
  IdCard,
  Printer,
  QrCode,
  Share,
  BookOpen,
  Ticket
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function StudentBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [realTimeBuses, setRealTimeBuses] = useState<any[]>([]);

  const [passengerData, setPassengerData] = useState({
    name: 'Student User',
    email: 'student@university.edu',
    phone: '+234 803 456 7890',
    studentId: 'STU-2024-001',
    emergencyContact: '+234 801 234 5678'
  });

  // Real-time bus data with live updates
  useEffect(() => {
    const updateBusData = () => {
      const buses = [
        {
          id: 'BUS-001',
          route: 'Lagos Express',
          from: 'Lagos Island',
          to: 'Victoria Island',
          duration: '45 mins',
          price: 5500,
          trips: [
            { id: '1', time: '07:30', available: 12, total: 45, status: 'available', delay: 0 },
            { id: '2', time: '09:15', available: 8, total: 45, status: 'available', delay: 2 },
            { id: '3', time: '11:00', available: 3, total: 45, status: 'limited', delay: 0 },
            { id: '4', time: '13:45', available: 0, total: 45, status: 'full', delay: 0 },
            { id: '5', time: '15:30', available: 18, total: 45, status: 'available', delay: 0 },
            { id: '6', time: '17:15', available: 25, total: 45, status: 'available', delay: 0 }
          ],
          amenities: ['wifi', 'ac', 'charging'],
          driver: 'Emeka Johnson',
          rating: 4.9,
          currentLocation: 'Mile 2 Bridge',
          nextArrival: '8 mins'
        },
        {
          id: 'BUS-003',
          route: 'Campus Shuttle',
          from: 'Main Gate',
          to: 'Campus Center',
          duration: '15 mins',
          price: 300,
          trips: [
            { id: '1', time: '08:00', available: 15, total: 30, status: 'available', delay: 0 },
            { id: '2', time: '08:30', available: 22, total: 30, status: 'available', delay: 0 },
            { id: '3', time: '09:00', available: 8, total: 30, status: 'available', delay: 0 },
            { id: '4', time: '09:30', available: 5, total: 30, status: 'limited', delay: 0 },
            { id: '5', time: '10:00', available: 12, total: 30, status: 'available', delay: 0 }
          ],
          amenities: ['ac'],
          driver: 'Fatima Adebayo',
          rating: 4.8,
          currentLocation: 'Library Complex',
          nextArrival: '3 mins'
        },
        {
          id: 'BUS-007',
          route: 'Airport Link',
          from: 'City Center',
          to: 'Murtala Muhammed Airport',
          duration: '1hr 20mins',
          price: 8500,
          trips: [
            { id: '1', time: '06:00', available: 4, total: 50, status: 'limited', delay: 0 },
            { id: '2', time: '08:30', available: 0, total: 50, status: 'full', delay: 5 },
            { id: '3', time: '11:00', available: 15, total: 50, status: 'available', delay: 0 },
            { id: '4', time: '14:30', available: 28, total: 50, status: 'available', delay: 0 },
            { id: '5', time: '17:00', available: 10, total: 50, status: 'available', delay: 0 }
          ],
          amenities: ['wifi', 'ac', 'charging', 'luggage'],
          driver: 'Ibrahim Musa',
          rating: 4.6,
          currentLocation: 'Ikeja Along',
          nextArrival: '25 mins'
        }
      ];
      setRealTimeBuses(buses);
    };

    updateBusData();
    const interval = setInterval(updateBusData, 15000); // Update every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const selectedRouteData = realTimeBuses.find(r => r.id === selectedRoute);
  const selectedTripData = selectedRouteData?.trips.find(t => t.id === selectedTrip);
  const progress = (currentStep / 5) * 100;

  const stepTitles = [
    'Select Route',
    'Choose Time',
    'Pick Seat',
    'Payment',
    'Confirmation'
  ];

  // Generate seat map with real-time availability
  const generateSeatMap = () => {
    const seats = [];
    const seatLabels = ['A', 'B', 'C', 'D'];
    const totalSeats = selectedTripData?.total || 45;
    const availableSeats = selectedTripData?.available || 0;
    const occupiedCount = totalSeats - availableSeats;

    for (let row = 1; row <= Math.ceil(totalSeats / 4); row++) {
      for (let col = 0; col < 4 && ((row - 1) * 4 + col) < totalSeats; col++) {
        const seatNumber = `${seatLabels[col]}${row}`;
        const seatIndex = (row - 1) * 4 + col;
        const isOccupied = seatIndex < occupiedCount;
        const isSelected = selectedSeat === seatNumber;

        seats.push({
          number: seatNumber,
          occupied: isOccupied,
          selected: isSelected,
          row: row,
          col: col,
          price: selectedRouteData?.price || 0
        });
      }
    }
    return seats;
  };

  const handleSeatClick = (seatNumber: string, isOccupied: boolean) => {
    if (isOccupied) return;
    setSelectedSeat(seatNumber);
  };

  const processPayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate ticket data
      const ticket = {
        ticketId: `TKT-${Date.now()}`,
        passengerName: passengerData.name,
        route: selectedRouteData?.route,
        from: selectedRouteData?.from,
        to: selectedRouteData?.to,
        date: selectedDate ? format(selectedDate, 'PPP') : 'Today',
        time: selectedTripData?.time,
        seat: selectedSeat,
        busId: selectedRoute,
        gate: 'Gate 3',
        boardingTime: selectedTripData?.time,
        price: selectedRouteData?.price,
        paymentMethod: paymentMethod,
        bookingDate: new Date().toLocaleString(),
        qrCode: `QR-${Date.now()}`,
        status: 'confirmed'
      };

      setTicketData(ticket);
      setBookingComplete(true);
      setCurrentStep(5);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const printTicket = () => {
    window.print();
  };

  const shareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bus Ticket',
        text: `Ticket: ${ticketData?.ticketId} - ${ticketData?.route}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-3 py-2 space-y-3">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-foreground mb-1 animate-gradient-text">
            Book Your Journey 🎫
          </h1>
          <p className="text-base text-muted-foreground">
            Real-time availability • Live seat selection • Instant confirmation
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="modern-card animate-slide-in-up">
          <CardContent className="p-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Booking Progress</span>
                <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3 animate-pulse" />
            </div>
            <div className="flex justify-between">
              {stepTitles.map((title, index) => (
                <div key={index} className={`text-center ${index + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold transition-all ${
                    index + 1 <= currentStep ? 'bg-primary text-white animate-pulse' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1 <= currentStep && currentStep !== 5 ? (
                      index + 1
                    ) : index + 1 === currentStep && currentStep === 5 ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs font-medium hidden lg:block">{title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Route Selection */}
        {currentStep === 1 && (
          <div className="space-y-3 animate-fade-in">

            {/* Date Selection */}
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="gradient-bg-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6 animate-float" />
                  Select Travel Date
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full lg:w-auto h-12 px-6 feature-card btn-interactive hover-lift">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Live Route Selection */}
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-1 text-white">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center gap-2">
                    <Route className="h-6 w-6 animate-float-delay-1" />
                    Live Routes Available
                  </div>
                  <Badge className="bg-white/20 text-white">
                    {realTimeBuses.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {realTimeBuses.map((route, index) => {
                  const totalAvailableSeats = route.trips.reduce((sum: number, trip: any) => sum + trip.available, 0);
                  return (
                    <div
                      key={route.id}
                      onClick={() => setSelectedRoute(route.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover-lift animate-slide-in-up relative overflow-hidden ${
                        selectedRoute === route.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Live Indicator */}
                      <div className="absolute top-4 right-4 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">LIVE</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/20 rounded-lg">
                            <Bus className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-foreground">{route.route}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {route.from} → {route.to}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {route.duration}
                              </span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {totalAvailableSeats} seats available
                              </span>
                              <span className="text-sm flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                {route.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent">₦{route.price.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">per seat</div>
                        </div>
                      </div>

                      {/* Current Location */}
                      <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Navigation className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Current Location:</span>
                            <span className="text-sm">{route.currentLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium">Next arrival: {route.nextArrival}</span>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Features:</span>
                          <div className="flex gap-2">
                            {route.amenities.includes('wifi') && (
                              <Badge variant="outline" className="text-xs">
                                <Wifi className="h-3 w-3 mr-1" />
                                WiFi
                              </Badge>
                            )}
                            {route.amenities.includes('ac') && (
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                AC
                              </Badge>
                            )}
                            {route.amenities.includes('charging') && (
                              <Badge variant="outline" className="text-xs">
                                <Battery className="h-3 w-3 mr-1" />
                                Charging
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Driver: {route.driver}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedDate || !selectedRoute}
                className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
              >
                Next: Choose Time
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {currentStep === 2 && selectedRouteData && (
          <div className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-2 to-chart-4 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 animate-float" />
                  Available Departure Times - {selectedRouteData.route}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedRouteData.trips.map((trip: any) => (
                    <Button
                      key={trip.id}
                      variant={selectedTrip === trip.id ? 'default' : 'outline'}
                      onClick={() => setSelectedTrip(trip.id)}
                      disabled={trip.status === 'full'}
                      className={`h-24 flex-col gap-2 btn-interactive hover-lift relative overflow-hidden ${
                        selectedTrip === trip.id ? 'gradient-bg-primary text-white' : ''
                      } ${trip.status === 'full' ? 'opacity-50' : ''}`}
                    >
                      <div className="font-bold text-xl">{trip.time}</div>
                      <div className="text-sm">
                        {trip.status === 'full' ? (
                          <Badge variant="destructive" className="text-xs">FULL</Badge>
                        ) : trip.status === 'limited' ? (
                          <Badge variant="secondary" className="text-xs">{trip.available} left</Badge>
                        ) : (
                          <span className="text-muted-foreground">{trip.available} available</span>
                        )}
                      </div>
                      {trip.delay > 0 && (
                        <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                          +{trip.delay}m
                        </Badge>
                      )}
                      {trip.status === 'available' && trip.available > 10 && (
                        <div className="absolute top-2 left-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="btn-interactive hover-lift"
              >
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedTrip}
                className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
              >
                Next: Pick Seat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Seat Selection */}
        {currentStep === 3 && selectedTripData && (
          <div className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-1 to-chart-5 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 animate-float" />
                    Choose Your Seat
                  </div>
                  <Badge className="bg-white/20 text-white">
                    {selectedTripData.available} Available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">

                {/* Seat Map Legend */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-muted border-2 border-border rounded"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-destructive rounded"></div>
                    <span className="text-sm">Occupied</span>
                  </div>
                </div>

                {/* Bus Layout */}
                <div className="max-w-md mx-auto bg-muted/30 rounded-2xl p-6">

                  {/* Driver Area */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-16 bg-chart-1/20 rounded-lg flex items-center justify-center">
                      <User className="h-8 w-8 text-chart-1" />
                      <span className="ml-2 text-sm font-medium">Driver</span>
                    </div>
                  </div>

                  {/* Seats Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {generateSeatMap().map((seat) => (
                      <Button
                        key={seat.number}
                        variant="outline"
                        onClick={() => handleSeatClick(seat.number, seat.occupied)}
                        disabled={seat.occupied}
                        className={`h-14 text-sm font-bold border-2 transition-all hover-lift ${
                          seat.occupied
                            ? 'bg-destructive text-white border-destructive cursor-not-allowed'
                            : seat.selected
                            ? 'bg-primary text-white border-primary animate-pulse shadow-lg'
                            : 'bg-background hover:border-primary/50 btn-interactive'
                        }`}
                      >
                        {seat.number}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selected Seat Info */}
                {selectedSeat && (
                  <div className="mt-6 p-4 modern-card animate-slide-in-up">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Selected Seat: {selectedSeat}</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedRouteData?.route} • {selectedTripData.time} • {selectedDate ? format(selectedDate, 'MMM d') : 'Today'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">₦{selectedRouteData?.price.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total fare</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="btn-interactive hover-lift"
              >
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                disabled={!selectedSeat}
                className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
              >
                Next: Payment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {currentStep === 4 && (
          <div className="space-y-3 animate-fade-in">

            {/* Booking Summary */}
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="gradient-bg-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-6 w-6 animate-float" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route:</span>
                      <span className="font-medium">{selectedRouteData?.route}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From - To:</span>
                      <span className="font-medium">{selectedRouteData?.from} → {selectedRouteData?.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{selectedDate ? format(selectedDate, 'PPP') : 'Today'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure:</span>
                      <span className="font-medium">{selectedTripData?.time}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seat:</span>
                      <span className="font-medium">{selectedSeat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bus ID:</span>
                      <span className="font-medium">{selectedRoute}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{selectedRouteData?.duration}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-accent">₦{selectedRouteData?.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-4 to-chart-1 text-white">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 animate-float" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Cash Payment */}
                  <div
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover-lift ${
                      paymentMethod === 'cash' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-full">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="font-bold text-foreground">Pay with Cash</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Pay the driver directly when boarding the bus
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">No advance payment required</span>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover-lift ${
                      paymentMethod === 'transfer' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-foreground">Bank Transfer</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Secure online payment via bank transfer
                    </p>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Secure & guaranteed seat</span>
                    </div>
                  </div>
                </div>

                {/* Transfer Details */}
                {paymentMethod === 'transfer' && (
                  <div className="p-4 bg-muted/30 rounded-lg animate-slide-in-up">
                    <h5 className="font-semibold text-foreground mb-3">Bank Transfer Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Bank Name:</span>
                        <span className="font-medium ml-2">First Bank Nigeria</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium ml-2">3012345678</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="font-medium ml-2">Bus Tracker Ltd</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold text-accent ml-2">₦{selectedRouteData?.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-sm font-medium">Upload Payment Proof</Label>
                      <Input type="file" accept="image/*" className="mt-1" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(3)}
                className="btn-interactive hover-lift"
              >
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                Back
              </Button>
              <Button
                onClick={processPayment}
                disabled={!paymentMethod || isLoading}
                className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Confirm Booking
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation & Ticket */}
        {currentStep === 5 && ticketData && (
          <div className="space-y-3 animate-fade-in">

            {/* Success Message */}
            <Card className="modern-card animate-slide-in-up border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed! 🎉</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Your seat has been reserved and ticket generated successfully
                </p>
                <Badge className="bg-green-100 text-green-700 px-4 py-2 text-lg">
                  Ticket ID: {ticketData.ticketId}
                </Badge>
              </CardContent>
            </Card>

            {/* Digital Ticket */}
            <Card className="modern-card animate-slide-in-up border-0 shadow-xl" id="ticket">
              <CardHeader className="gradient-bg-primary text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-6 w-6" />
                    Digital Bus Ticket
                  </div>
                  <Badge className="bg-white/20 text-white">
                    {ticketData.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Passenger & Journey Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2">{ticketData.passengerName}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Route:</span>
                          <span className="font-medium ml-2">{ticketData.route}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Bus ID:</span>
                          <span className="font-medium ml-2">{ticketData.busId}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium ml-2">{ticketData.date}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Departure:</span>
                          <span className="font-medium ml-2">{ticketData.time}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Seat:</span>
                          <span className="font-bold text-primary ml-2 text-lg">{ticketData.seat}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gate:</span>
                          <span className="font-medium ml-2">{ticketData.gate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Boarding:</span>
                          <span className="font-medium ml-2">{ticketData.boardingTime}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-bold text-accent ml-2">₦{ticketData.price?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Payment:</span>
                          <span className="font-medium ml-2 capitalize">{ticketData.paymentMethod}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Booked:</span>
                          <span className="font-medium ml-2">{ticketData.bookingDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code & Actions */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-white rounded-lg border-2 border-dashed border-muted-foreground/30">
                      <QrCode className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Scan QR code for verification</p>
                      <p className="text-xs text-muted-foreground mt-1">Code: {ticketData.qrCode}</p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    Important Information
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Please arrive at the boarding gate 15 minutes before departure</li>
                    <li>• Show this ticket to the driver when boarding</li>
                    <li>• Keep your phone charged for QR code verification</li>
                    <li>• Contact support if you need to make changes: +234 800 BUS HELP</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={printTicket} className="gradient-bg-primary btn-interactive hover-lift">
                <Printer className="h-5 w-5 mr-2" />
                Print Ticket
              </Button>
              <Button onClick={shareTicket} variant="outline" className="btn-interactive hover-lift">
                <Share className="h-5 w-5 mr-2" />
                Share Ticket
              </Button>
              <Button asChild variant="outline" className="btn-interactive hover-lift">
                <Link href="/student/dashboard">
                  <Activity className="h-5 w-5 mr-2" />
                  View Dashboard
                </Link>
              </Button>
              <Button onClick={() => {
                setCurrentStep(1);
                setSelectedRoute('');
                setSelectedTrip('');
                setSelectedSeat('');
                setPaymentMethod('');
                setBookingComplete(false);
                setTicketData(null);
              }} variant="outline" className="btn-interactive hover-lift">
                <Plus className="h-5 w-5 mr-2" />
                Book Another Trip
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}