'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, MapPin, Calendar, Clock } from 'lucide-react';

export default function StudentHistoryPage() {
  const tripHistory = [
    {
      id: 1,
      route: 'Lagos Express',
      date: '2024-09-20',
      time: '7:00 AM',
      from: 'ADUSTECH Campus',
      to: 'Lagos Island',
      status: 'completed',
      seat: 'A12',
      fare: '₦2,500'
    },
    {
      id: 2,
      route: 'Ibadan Route',
      date: '2024-09-18',
      time: '8:00 AM',
      from: 'ADUSTECH Campus',
      to: 'Ibadan Central',
      status: 'completed',
      seat: 'B08',
      fare: '₦3,000'
    },
    {
      id: 3,
      route: 'Lagos Express',
      date: '2024-09-15',
      time: '2:00 PM',
      from: 'ADUSTECH Campus',
      to: 'Lagos Island',
      status: 'cancelled',
      seat: 'A15',
      fare: '₦2,500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip History</h1>
        <p className="text-gray-600">View your past journeys and trip details</p>
      </div>

      <div className="grid gap-4">
        {tripHistory.map((trip) => (
          <Card key={trip.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  {trip.route}
                </CardTitle>
                <Badge className={getStatusColor(trip.status)}>
                  {trip.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">{trip.date}</p>
                    <p className="text-xs text-gray-500">{trip.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">{trip.from}</p>
                    <p className="text-xs text-gray-500">to {trip.to}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">Seat: {trip.seat}</p>
                  <p className="text-xs text-gray-500">Fare: {trip.fare}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{trip.fare}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}