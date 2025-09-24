'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Route, Clock, MapPin } from 'lucide-react';

export default function StudentRoutesPage() {
  const routes = [
    {
      id: 1,
      name: 'Lagos Express',
      from: 'ADUSTECH Campus',
      to: 'Lagos Island',
      schedule: '7:00 AM, 2:00 PM, 6:00 PM',
      duration: '45 mins',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ibadan Route',
      from: 'ADUSTECH Campus',
      to: 'Ibadan Central',
      schedule: '8:00 AM, 4:00 PM',
      duration: '2 hours',
      status: 'active'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bus Routes & Schedule</h1>
        <p className="text-gray-600">View available bus routes and their schedules</p>
      </div>

      <div className="grid gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  {route.name}
                </CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {route.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">{route.from}</p>
                    <p className="text-xs text-gray-500">to {route.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Schedule</p>
                    <p className="text-xs text-gray-500">{route.schedule}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">Duration</p>
                  <p className="text-xs text-gray-500">{route.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}