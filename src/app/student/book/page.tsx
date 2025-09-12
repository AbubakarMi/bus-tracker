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
  ArrowLeft
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

export default function StudentBooking() {
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
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
      description: `Your seat has been reserved for ${selectedDate && format(selectedDate, 'MMM dd, yyyy')} at ${selectedTime}.`
    });
    
    setIsBooking(false);
    setStep(4);
  };

  if (step === 4) {
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
    <div className="h-screen bg-white flex flex-col">
      
      {/* Fixed Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Book Your Trip</h1>
            <p className="text-blue-200 text-sm">Step {step} of 3</p>
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
      <div className="bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
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

          {/* Step 3: Passenger Details */}
          {step === 3 && (
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
                    disabled={isBooking || !passengerInfo.name || !passengerInfo.email}
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