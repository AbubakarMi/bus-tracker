'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Bus,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Users
} from 'lucide-react';
import { format } from 'date-fns';

const routes = [
  {
    id: 1,
    name: "Lagos Express",
    from: "Lagos (Ojuelegba)",
    to: "Abuja (Berger)",
    duration: "6 hrs",
    price: 5500,
    times: ["6:00 AM", "8:00 AM", "12:00 PM", "4:00 PM"],
    availability: { "6:00 AM": 8, "8:00 AM": 3, "12:00 PM": 12, "4:00 PM": 15 }
  },
  {
    id: 2,
    name: "Campus Shuttle",
    from: "UI Main Gate",
    to: "Student Hostels", 
    duration: "25 mins",
    price: 300,
    times: ["7:00 AM", "9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    availability: { "7:00 AM": 5, "9:00 AM": 9, "11:00 AM": 14, "1:00 PM": 6, "3:00 PM": 1 }
  }
];

// Bus seat layout (40 seats)
const generateSeats = () => {
  const seats = [];
  for (let i = 1; i <= 40; i++) {
    const row = Math.ceil(i / 4);
    const position = ((i - 1) % 4) + 1;
    const seatNumber = `${String.fromCharCode(65 + Math.floor((i - 1) / 4))}${position}`;
    seats.push({
      number: seatNumber,
      isAvailable: Math.random() > 0.3, // 70% availability
      price: Math.random() > 0.8 ? 'premium' : 'regular'
    });
  }
  return seats;
};

export default function StudentBooking() {
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [seats, setSeats] = useState(generateSeats());
  const [passengerInfo, setPassengerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const handleBooking = async () => {
    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your seat ${selectedSeat} has been reserved for ${selectedDate && format(selectedDate, 'MMM dd, yyyy')} at ${selectedTime}.`
    });

    setIsBooking(false);
    setStep(5);
  };

  if (step === 5) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center space-y-6 p-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your bus seat has been successfully reserved.</p>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-semibold">{selectedRoute?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {selectedDate && format(selectedDate, 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seat:</span>
                <span className="font-semibold">{selectedSeat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-green-600">₦{selectedRoute?.price.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link href="/student/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              Book Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">

      {/* Fixed Header */}
      <div className="bg-blue-600 text-white p-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Book Your Trip</h1>
            <p className="text-blue-200 text-sm">Step {step} of 4</p>
          </div>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Link href="/student/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 p-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <div className="grid grid-cols-4 gap-16 text-center">
              <span className={step >= 1 ? 'text-blue-600 font-medium' : ''}>Choose Route</span>
              <span className={step >= 2 ? 'text-blue-600 font-medium' : ''}>Date & Time</span>
              <span className={step >= 3 ? 'text-blue-600 font-medium' : ''}>Select Seat</span>
              <span className={step >= 4 ? 'text-blue-600 font-medium' : ''}>Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 overflow-auto">
        <div className="max-w-7xl mx-auto h-full">
          
          {/* Step 1: Choose Route */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Choose Your Route</h2>
              
              <div className="grid gap-4">
                {routes.map((route) => (
                  <Card key={route.id} className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500" 
                        onClick={() => { setSelectedRoute(route); setStep(2); }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{route.name}</h3>
                          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{route.from}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ArrowRight className="w-4 h-4" />
                              <span>{route.to}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{route.duration}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-green-600 text-lg">₦{route.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="ml-4">
                          Select <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && selectedRoute && (
            <div className="grid grid-cols-2 gap-8 h-full">
              
              <Card>
                <CardHeader>
                  <CardTitle>Pick Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Times</CardTitle>
                  <p className="text-sm text-gray-600">{selectedRoute.name}</p>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-2">
                      {selectedRoute.times.map((time) => {
                        const available = selectedRoute.availability[time];
                        return (
                          <button
                            key={time}
                            onClick={() => { setSelectedTime(time); setStep(3); }}
                            disabled={available === 0}
                            className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{time}</span>
                            </div>
                            <Badge variant={available > 5 ? 'default' : available > 0 ? 'secondary' : 'destructive'}>
                              {available > 0 ? `${available} seats` : 'Full'}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a date first</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Seat Selection */}
          {step === 3 && selectedRoute && selectedDate && selectedTime && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Choose Your Seat</h2>
                <p className="text-gray-600">Select your preferred seat for the journey</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bus Layout */}
                <Card className="lg:col-span-2">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="h-5 w-5" />
                      Bus Layout - {selectedRoute.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="font-medium">Front of Bus</span>
                        <span className="text-gray-600">Driver</span>
                      </div>

                      {/* Seat Grid */}
                      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                        {seats.map((seat, index) => (
                          <button
                            key={seat.number}
                            onClick={() => seat.isAvailable && setSelectedSeat(seat.number)}
                            disabled={!seat.isAvailable}
                            className={`
                              h-12 w-12 rounded-lg border-2 text-xs font-medium transition-all
                              ${!seat.isAvailable
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                                : selectedSeat === seat.number
                                  ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                                  : seat.price === 'premium'
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100'
                                    : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                              }
                            `}
                          >
                            {seat.isAvailable ? seat.number : 'X'}
                          </button>
                        ))}
                      </div>

                      {/* Legend */}
                      <div className="flex justify-center gap-6 mt-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                          <span>Premium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-300 rounded"></div>
                          <span>Occupied</span>
                        </div>
                      </div>
                    </div>

                    {selectedSeat && (
                      <Button onClick={() => setStep(4)} className="w-full" size="lg">
                        Continue with Seat {selectedSeat}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Seat Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-600">Route</Label>
                      <p className="font-semibold">{selectedRoute.name}</p>
                      <p className="text-sm text-gray-600">{selectedRoute.from} → {selectedRoute.to}</p>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-600">Date & Time</Label>
                      <p className="font-semibold">
                        {selectedDate && format(selectedDate, 'MMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600">{selectedTime}</p>
                    </div>

                    {selectedSeat && (
                      <>
                        <div>
                          <Label className="text-sm text-gray-600">Selected Seat</Label>
                          <p className="font-semibold text-blue-600">{selectedSeat}</p>
                          <Badge variant={seats.find(s => s.number === selectedSeat)?.price === 'premium' ? 'secondary' : 'default'} className="text-xs">
                            {seats.find(s => s.number === selectedSeat)?.price === 'premium' ? 'Premium Seat' : 'Regular Seat'}
                          </Badge>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <Label>Total Price</Label>
                            <p className="text-xl font-bold text-green-600">
                              ₦{selectedRoute.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Passenger Details */}
          {step === 4 && (
            <div className="grid grid-cols-3 gap-8">
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Passenger Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Enter your full name"
                          value={passengerInfo.name}
                          onChange={(e) => setPassengerInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={passengerInfo.email}
                          onChange={(e) => setPassengerInfo(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="(123) 456-7890"
                        value={passengerInfo.phone}
                        onChange={(e) => setPassengerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleBooking} 
                    className="w-full mt-6" 
                    size="lg"
                    disabled={isBooking || !passengerInfo.name || !passengerInfo.email || !selectedSeat}
                  >
                    {isBooking ? "Processing..." : `Complete Booking - ₦${selectedRoute?.price.toLocaleString()}`}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-600">Route</Label>
                    <p className="font-semibold">{selectedRoute?.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">Date & Time</Label>
                    <p className="font-semibold">
                      {selectedDate && format(selectedDate, 'MMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600">{selectedTime}</p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Selected Seat</Label>
                    <p className="font-semibold text-blue-600">{selectedSeat}</p>
                    <Badge variant={seats.find(s => s.number === selectedSeat)?.price === 'premium' ? 'secondary' : 'default'} className="text-xs mt-1">
                      {seats.find(s => s.number === selectedSeat)?.price === 'premium' ? 'Premium Seat' : 'Regular Seat'}
                    </Badge>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <Label>Total Price</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ₦{selectedRoute?.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}