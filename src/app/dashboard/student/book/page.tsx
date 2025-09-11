'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Bus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Navigation,
  CreditCard,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { format } from 'date-fns';

const routes = [
  {
    id: 1,
    name: "Route 42 - Campus to Downtown",
    from: "Main Campus",
    to: "Downtown Center",
    duration: "25 mins",
    price: 550,
    times: ["7:30 AM", "8:30 AM", "9:30 AM", "12:30 PM", "2:15 PM", "4:45 PM", "6:15 PM"],
    availability: { "7:30 AM": 8, "8:30 AM": 3, "9:30 AM": 12, "12:30 PM": 15, "2:15 PM": 7, "4:45 PM": 2, "6:15 PM": 11 }
  },
  {
    id: 2,
    name: "Route 15 - Library to Dorms",
    from: "Central Library",
    to: "Student Dorms",
    duration: "18 mins",
    price: 300,
    times: ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"],
    availability: { "8:00 AM": 5, "10:00 AM": 9, "1:00 PM": 14, "3:00 PM": 6, "5:00 PM": 1, "7:00 PM": 8 }
  },
  {
    id: 3,
    name: "Route 28 - Sports Complex Loop",
    from: "Sports Complex",
    to: "Campus Loop",
    duration: "35 mins",
    price: 425,
    times: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
    availability: { "9:00 AM": 10, "11:00 AM": 13, "2:00 PM": 16, "4:00 PM": 4, "6:00 PM": 9 }
  }
];

export default function StudentBookPage() {
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [passengerInfo, setPassengerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const handleRouteSelect = (route: typeof routes[0]) => {
    setSelectedRoute(route);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBooking = async () => {
    if (!selectedRoute || !selectedDate || !selectedTime || !passengerInfo.name || !passengerInfo.email) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your seat has been reserved for ${format(selectedDate, 'MMM dd, yyyy')} at ${selectedTime}.`
    });
    
    setIsBooking(false);
    setStep(4);
  };

  const getAvailabilityColor = (available: number) => {
    if (available <= 2) return 'bg-red-100 text-red-700 border-red-200';
    if (available <= 5) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getAvailabilityText = (available: number) => {
    if (available <= 2) return 'Almost Full';
    if (available <= 5) return 'Limited';
    return 'Available';
  };

  if (step === 4) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold font-headline">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your bus seat has been successfully reserved.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Save this information for your trip</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Route</Label>
                <p className="font-semibold">{selectedRoute?.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                <p className="font-semibold">
                  {selectedDate && format(selectedDate, 'MMM dd, yyyy')} at {selectedTime}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Passenger</Label>
                <p className="font-semibold">{passengerInfo.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Total Price</Label>
                <p className="font-semibold text-green-600">₦{selectedRoute?.price.toLocaleString()}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <a href="/dashboard/student/track" className="flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Track Bus
                </a>
              </Button>
              <Button variant="outline" onClick={() => {
                setStep(1);
                setSelectedRoute(null);
                setSelectedDate(undefined);
                setSelectedTime('');
                setPassengerInfo({ name: '', email: '', phone: '', studentId: '' });
              }}>
                Book Another Trip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber 
                ? 'bg-blue-600 text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${
                step > stepNumber ? 'bg-blue-600' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-headline">Choose Your Route</h1>
            <p className="text-muted-foreground">Select the bus route that works best for you</p>
          </div>

          <div className="grid gap-4">
            {routes.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-all cursor-pointer group" onClick={() => handleRouteSelect(route)}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {route.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{route.from} → {route.to}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">₦{route.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="gap-1">
                        <Bus className="w-3 h-3" />
                        {route.times.length} trips/day
                      </Badge>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedRoute && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-headline">Select Date & Time</h1>
              <p className="text-muted-foreground">{selectedRoute.name}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pick a Date</CardTitle>
                <CardDescription>Choose your travel date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Times</CardTitle>
                <CardDescription>
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM dd, yyyy') : 'Select a date first'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid gap-3">
                    {selectedRoute.times.map((time) => {
                      const available = selectedRoute.availability[time];
                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          disabled={available === 0}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={getAvailabilityColor(available)}
                            >
                              {available > 0 ? `${available} seats` : 'Full'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {getAvailabilityText(available)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Please select a date to see available times</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === 3 && selectedRoute && selectedDate && selectedTime && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-headline">Passenger Details</h1>
              <p className="text-muted-foreground">Complete your booking information</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We'll use this to send you booking confirmations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={passengerInfo.name}
                        onChange={(e) => setPassengerInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      placeholder="Your student ID"
                      value={passengerInfo.studentId}
                      onChange={(e) => setPassengerInfo(prev => ({ ...prev, studentId: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={passengerInfo.email}
                        onChange={(e) => setPassengerInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="(123) 456-7890"
                        value={passengerInfo.phone}
                        onChange={(e) => setPassengerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleBooking} 
                  className="w-full mt-6" 
                  size="lg"
                  disabled={isBooking}
                >
                  {isBooking ? "Processing..." : `Complete Booking - ₦${selectedRoute.price.toLocaleString()}`}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Route</Label>
                  <p className="font-semibold text-sm">{selectedRoute.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedRoute.from} → {selectedRoute.to}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                  <p className="font-semibold">{format(selectedDate, 'MMM dd, yyyy')}</p>
                  <p className="text-sm text-muted-foreground">{selectedTime}</p>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="font-semibold">{selectedRoute.duration}</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Total Price</Label>
                  <p className="text-xl font-bold text-green-600">
                    ₦{selectedRoute.price.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}