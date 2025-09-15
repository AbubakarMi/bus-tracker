'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
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
  UserPlus,
  Phone,
  Mail,
  IdCard,
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
  Briefcase
} from 'lucide-react';
import { format } from 'date-fns';

export default function StaffBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingType, setBookingType] = useState('individual'); // individual or bulk

  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    emergencyContact: '',
    specialRequirements: '',
    paymentMethod: 'company',
    departmentCode: '',
    approvalCode: ''
  });

  const [bulkPassengers, setBulkPassengers] = useState([
    { id: 1, name: '', email: '', phone: '', seat: '', status: 'pending' }
  ]);

  const routes = [
    {
      id: 'lagos-express',
      name: 'Lagos Express',
      from: 'Lagos Island',
      to: 'Victoria Island',
      duration: '45 mins',
      price: 5500,
      description: 'Premium express service with AC and WiFi'
    },
    {
      id: 'campus-shuttle',
      name: 'Campus Shuttle',
      from: 'Main Gate',
      to: 'Campus Center',
      duration: '15 mins',
      price: 300,
      description: 'Regular campus transportation service'
    },
    {
      id: 'airport-link',
      name: 'Airport Link',
      from: 'City Center',
      to: 'Murtala Muhammed Airport',
      duration: '1hr 20mins',
      price: 8500,
      description: 'Direct airport connection with luggage service'
    }
  ];

  const trips = selectedRoute ? [
    { id: '1', time: '07:30', available: 12, total: 45, status: 'available' },
    { id: '2', time: '09:15', available: 8, total: 45, status: 'available' },
    { id: '3', time: '11:00', available: 3, total: 45, status: 'limited' },
    { id: '4', time: '13:45', available: 0, total: 45, status: 'full' },
    { id: '5', time: '15:30', available: 18, total: 45, status: 'available' },
    { id: '6', time: '17:15', available: 25, total: 45, status: 'available' }
  ] : [];

  const generateSeatMap = () => {
    const seats = [];
    const seatLabels = ['A', 'B', 'C', 'D'];

    for (let row = 1; row <= 10; row++) {
      for (let col = 0; col < 4; col++) {
        const seatNumber = `${seatLabels[col]}${row}`;
        const isOccupied = Math.random() > 0.7; // Random occupied seats
        const isSelected = selectedSeats.includes(seatNumber);

        seats.push({
          number: seatNumber,
          occupied: isOccupied,
          selected: isSelected,
          row: row,
          col: col
        });
      }
    }
    return seats;
  };

  const handleSeatClick = (seatNumber: string, isOccupied: boolean) => {
    if (isOccupied) return;

    if (bookingType === 'individual') {
      setSelectedSeats([seatNumber]);
    } else {
      setSelectedSeats(prev =>
        prev.includes(seatNumber)
          ? prev.filter(s => s !== seatNumber)
          : [...prev, seatNumber]
      );
    }
  };

  const addBulkPassenger = () => {
    setBulkPassengers(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: '',
        email: '',
        phone: '',
        seat: '',
        status: 'pending'
      }
    ]);
  };

  const removeBulkPassenger = (id: number) => {
    setBulkPassengers(prev => prev.filter(p => p.id !== id));
  };

  const updateBulkPassenger = (id: number, field: string, value: string) => {
    setBulkPassengers(prev =>
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const handleBooking = async () => {
    console.log('Processing staff booking:', {
      bookingType,
      route: selectedRoute,
      trip: selectedTrip,
      date: selectedDate,
      seats: selectedSeats,
      passenger: passengerData,
      bulkPassengers: bookingType === 'bulk' ? bulkPassengers : null
    });

    // Simulate booking process
    setTimeout(() => {
      alert('Booking confirmed! Confirmation details have been sent to the passenger(s).');
      // Reset form
      setCurrentStep(1);
      setSelectedSeats([]);
      setPassengerData({
        name: '',
        email: '',
        phone: '',
        idNumber: '',
        emergencyContact: '',
        specialRequirements: '',
        paymentMethod: 'company',
        departmentCode: '',
        approvalCode: ''
      });
    }, 2000);
  };

  const selectedRouteData = routes.find(r => r.id === selectedRoute);
  const selectedTripData = trips.find(t => t.id === selectedTrip);
  const progress = (currentStep / 4) * 100;

  const stepTitles = [
    'Select Route & Schedule',
    'Choose Seats',
    'Passenger Information',
    'Confirm & Book'
  ];

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-3 py-2 space-y-3">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-foreground mb-1 animate-gradient-text">
            Staff Booking Portal 🎫
          </h1>
          <p className="text-base text-muted-foreground">
            Book transportation for employees, students, and guests
          </p>
        </div>

        {/* Booking Type Selection */}
        <Card className="modern-card animate-slide-in-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-6">
              <Button
                variant={bookingType === 'individual' ? 'default' : 'outline'}
                onClick={() => {
                  setBookingType('individual');
                  setCurrentStep(1);
                  setSelectedSeats([]);
                }}
                className="h-16 px-8 gradient-bg-primary btn-interactive hover-lift text-white"
              >
                <User className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Individual Booking</div>
                  <div className="text-sm opacity-90">Book for one passenger</div>
                </div>
              </Button>
              <Button
                variant={bookingType === 'bulk' ? 'default' : 'outline'}
                onClick={() => {
                  setBookingType('bulk');
                  setCurrentStep(1);
                  setSelectedSeats([]);
                }}
                className="h-16 px-8 bg-accent hover:bg-accent/90 btn-interactive hover-lift text-white"
              >
                <Users className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Bulk Booking</div>
                  <div className="text-sm opacity-90">Book for multiple passengers</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

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
                    index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs font-medium hidden lg:block">{title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="space-y-3">

          {/* Step 1: Route & Schedule Selection */}
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

              {/* Route Selection */}
              <Card className="modern-card animate-slide-in-up">
                <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-1 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-6 w-6 animate-float-delay-1" />
                    Choose Route
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {routes.map((route, index) => (
                    <div
                      key={route.id}
                      onClick={() => setSelectedRoute(route.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover-lift animate-slide-in-up ${
                        selectedRoute === route.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <Bus className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{route.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {route.from} → {route.to}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-accent">₦{route.price.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {route.duration}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{route.description}</p>

                      {selectedRoute === route.id && (
                        <div className="mt-4 pt-4 border-t animate-slide-in-up">
                          <Label className="text-sm font-medium text-foreground mb-3 block">Select Departure Time</Label>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {trips.map((trip) => (
                              <Button
                                key={trip.id}
                                variant={selectedTrip === trip.id ? 'default' : 'outline'}
                                onClick={() => setSelectedTrip(trip.id)}
                                disabled={trip.status === 'full'}
                                className={`h-16 flex-col btn-interactive hover-lift ${
                                  selectedTrip === trip.id ? 'gradient-bg-primary text-white' : ''
                                }`}
                              >
                                <div className="font-bold text-lg">{trip.time}</div>
                                <div className="text-xs">
                                  {trip.status === 'full' ? (
                                    <Badge variant="destructive" className="text-xs">Full</Badge>
                                  ) : trip.status === 'limited' ? (
                                    <Badge variant="secondary" className="text-xs">{trip.available} left</Badge>
                                  ) : (
                                    <span className="text-muted-foreground">{trip.available} available</span>
                                  )}
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedDate || !selectedRoute || !selectedTrip}
                  className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
                >
                  Next: Choose Seats
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Seat Selection */}
          {currentStep === 2 && (
            <div className="space-y-3 animate-fade-in">
              <Card className="modern-card animate-slide-in-up">
                <CardHeader className="bg-gradient-to-r from-chart-2 to-chart-4 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 animate-float" />
                    Seat Selection ({bookingType === 'bulk' ? 'Multiple' : '1'} Passenger{bookingType === 'bulk' ? 's' : ''})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">

                  {/* Bus Layout */}
                  <div className="bg-muted/50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-muted border-2 border-border rounded"></div>
                          <span className="text-sm">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary rounded"></div>
                          <span className="text-sm">Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-destructive rounded"></div>
                          <span className="text-sm">Occupied</span>
                        </div>
                      </div>
                      <Badge className="bg-accent/20 text-accent">
                        {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
                      </Badge>
                    </div>

                    <div className="max-w-md mx-auto">
                      {/* Driver Area */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-12 bg-chart-1/20 rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-chart-1" />
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
                            className={`h-12 text-xs font-bold border-2 transition-all hover-lift ${
                              seat.occupied
                                ? 'bg-destructive text-white border-destructive cursor-not-allowed'
                                : seat.selected
                                ? 'bg-primary text-white border-primary animate-pulse'
                                : 'bg-background hover:border-primary/50 btn-interactive'
                            }`}
                          >
                            {seat.number}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selected Seats Summary */}
                  {selectedSeats.length > 0 && (
                    <div className="p-4 modern-card animate-slide-in-up">
                      <h4 className="font-semibold text-foreground mb-3">Selected Seats</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seat) => (
                          <Badge key={seat} className="bg-primary/20 text-primary px-3 py-1">
                            {seat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
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
                  disabled={selectedSeats.length === 0}
                  className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
                >
                  Next: Passenger Info
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Passenger Information */}
          {currentStep === 3 && (
            <div className="space-y-3 animate-fade-in">

              {bookingType === 'individual' ? (
                // Individual Passenger Form
                <Card className="modern-card animate-slide-in-up">
                  <CardHeader className="gradient-bg-primary text-white">
                    <CardTitle className="flex items-center gap-2">
                      <IdCard className="h-6 w-6 animate-float" />
                      Passenger Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={passengerData.name}
                          onChange={(e) => setPassengerData(prev => ({ ...prev, name: e.target.value }))}
                          className="h-11 feature-card"
                          placeholder="Enter passenger's full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={passengerData.email}
                          onChange={(e) => setPassengerData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-11 feature-card"
                          placeholder="passenger@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={passengerData.phone}
                          onChange={(e) => setPassengerData(prev => ({ ...prev, phone: e.target.value }))}
                          className="h-11 feature-card"
                          placeholder="+234 800 000 0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idNumber">ID Number</Label>
                        <Input
                          id="idNumber"
                          value={passengerData.idNumber}
                          onChange={(e) => setPassengerData(prev => ({ ...prev, idNumber: e.target.value }))}
                          className="h-11 feature-card"
                          placeholder="Employee/Student ID"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          value={passengerData.emergencyContact}
                          onChange={(e) => setPassengerData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          className="h-11 feature-card"
                          placeholder="+234 800 000 0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="departmentCode">Department Code</Label>
                        <Input
                          id="departmentCode"
                          value={passengerData.departmentCode}
                          onChange={(e) => setPassengerData(prev => ({ ...prev, departmentCode: e.target.value }))}
                          className="h-11 feature-card"
                          placeholder="e.g., HR, IT, FIN"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={passengerData.specialRequirements}
                        onChange={(e) => setPassengerData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                        className="feature-card resize-none"
                        rows={3}
                        placeholder="Any special requirements or notes..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select value={passengerData.paymentMethod} onValueChange={(value) => setPassengerData(prev => ({ ...prev, paymentMethod: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company">Company Account</SelectItem>
                          <SelectItem value="department">Department Budget</SelectItem>
                          <SelectItem value="personal">Personal Payment</SelectItem>
                          <SelectItem value="reimbursement">Expense Reimbursement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Bulk Passengers Form
                <Card className="modern-card animate-slide-in-up">
                  <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-1 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 animate-float" />
                        Bulk Passenger Information ({bulkPassengers.length} passengers)
                      </div>
                      <Button
                        onClick={addBulkPassenger}
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Passenger
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {bulkPassengers.map((passenger, index) => (
                      <div key={passenger.id} className="p-4 modern-card border-l-4 border-primary animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-foreground">Passenger {index + 1}</h4>
                          {bulkPassengers.length > 1 && (
                            <Button
                              onClick={() => removeBulkPassenger(passenger.id)}
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name *</Label>
                            <Input
                              value={passenger.name}
                              onChange={(e) => updateBulkPassenger(passenger.id, 'name', e.target.value)}
                              className="h-10 feature-card"
                              placeholder="Enter name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Email *</Label>
                            <Input
                              type="email"
                              value={passenger.email}
                              onChange={(e) => updateBulkPassenger(passenger.id, 'email', e.target.value)}
                              className="h-10 feature-card"
                              placeholder="Enter email"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Phone *</Label>
                            <Input
                              value={passenger.phone}
                              onChange={(e) => updateBulkPassenger(passenger.id, 'phone', e.target.value)}
                              className="h-10 feature-card"
                              placeholder="Enter phone"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Assigned Seat</Label>
                            <Select value={passenger.seat} onValueChange={(value) => updateBulkPassenger(passenger.id, 'seat', value)}>
                              <SelectTrigger className="h-10 feature-card">
                                <SelectValue placeholder="Auto assign" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedSeats.map(seat => (
                                  <SelectItem key={seat} value={seat}>{seat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Group Booking Settings
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Group Payment Method</Label>
                          <Select value={passengerData.paymentMethod} onValueChange={(value) => setPassengerData(prev => ({ ...prev, paymentMethod: value }))}>
                            <SelectTrigger className="h-10 feature-card">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="company">Company Account</SelectItem>
                              <SelectItem value="department">Department Budget</SelectItem>
                              <SelectItem value="event">Event Budget</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Approval Code</Label>
                          <Input
                            value={passengerData.approvalCode}
                            onChange={(e) => setPassengerData(prev => ({ ...prev, approvalCode: e.target.value }))}
                            className="h-10 feature-card"
                            placeholder="Enter approval code"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                  disabled={
                    bookingType === 'individual'
                      ? !passengerData.name || !passengerData.email || !passengerData.phone
                      : bulkPassengers.some(p => !p.name || !p.email || !p.phone)
                  }
                  className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
                >
                  Next: Confirm Booking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-3 animate-fade-in">
              <Card className="modern-card animate-slide-in-up">
                <CardHeader className="bg-gradient-to-r from-chart-2 to-chart-4 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 animate-float" />
                    Booking Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">

                  {/* Trip Summary */}
                  <div className="p-4 modern-card border-l-4 border-primary">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Bus className="h-5 w-5 text-primary" />
                      Trip Summary
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Route:</span>
                        <span className="font-medium text-foreground ml-2">{selectedRouteData?.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium text-foreground ml-2">
                          {selectedDate ? format(selectedDate, "PPP") : 'Not selected'}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Departure:</span>
                        <span className="font-medium text-foreground ml-2">{selectedTripData?.time}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Seats:</span>
                        <span className="font-medium text-foreground ml-2">{selectedSeats.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Summary */}
                  <div className="p-4 modern-card border-l-4 border-accent">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      Passenger{bookingType === 'bulk' ? 's' : ''} Summary
                    </h4>

                    {bookingType === 'individual' ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium text-foreground">{passengerData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium text-foreground">{passengerData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="font-medium text-foreground">{passengerData.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bulkPassengers.map((passenger, index) => (
                          <div key={passenger.id} className="p-3 bg-muted/30 rounded-lg">
                            <div className="font-medium text-foreground mb-1">Passenger {index + 1}</div>
                            <div className="text-sm text-muted-foreground">
                              {passenger.name} • {passenger.email} • {passenger.phone}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cost Summary */}
                  <div className="p-4 modern-card border-l-4 border-chart-4">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-chart-4" />
                      Cost Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Price:</span>
                        <span className="font-medium text-foreground">₦{selectedRouteData?.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Passengers:</span>
                        <span className="font-medium text-foreground">
                          {bookingType === 'individual' ? 1 : bulkPassengers.length}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span className="text-foreground">Total:</span>
                        <span className="text-accent">
                          ₦{((selectedRouteData?.price || 0) * (bookingType === 'individual' ? 1 : bulkPassengers.length)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="p-4 modern-card border-l-4 border-chart-5">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-chart-5" />
                      Payment Method
                    </h4>
                    <Badge className="bg-chart-5/20 text-chart-5">
                      {passengerData.paymentMethod.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Badge>
                  </div>
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
                  onClick={handleBooking}
                  className="gradient-bg-primary btn-interactive glow-primary hover-lift px-8"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}