'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RealTimeTracker } from '@/components/tracking/real-time-tracker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, AlertCircle } from 'lucide-react';

export default function StudentTrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleStartTracking = () => {
    if (!trackingId.trim()) {
      return;
    }
    setIsTracking(true);
  };

  if (isTracking) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-headline">Bus Tracking</h1>
          <Button variant="outline" onClick={() => setIsTracking(false)}>
            Back to Search
          </Button>
        </div>

        <RealTimeTracker
          userInfo={{
            userId: 'UG20/COMS/1284',
            routeId: 'route-1',
            routeName: 'Campus to City Center',
            busId: 'BUS-001',
            busPlateNumber: trackingId || 'ADUS-001',
            driverName: 'Mohammed Ali',
            pickupPoint: 'ADU Campus Gate',
            dropoffPoint: 'Kano City Center',
            status: 'waiting'
          }}
          allowedRoutes={['route-1']}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-4">Track Your Bus</h1>
        <p className="text-muted-foreground">
          Enter your booking ID or bus number to track your bus in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Your Bus</CardTitle>
            <CardDescription>
              Enter your booking reference or bus number to start tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tracking-id">Booking ID or Bus Number</Label>
              <Input
                id="tracking-id"
                placeholder="e.g., BK-001 or ADUS-001"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>

            <Button onClick={handleStartTracking} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Start Tracking
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You can only track buses on routes you are registered for. This ensures privacy and security for all passengers.
              </AlertDescription>
            </Alert>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium">Tracking Features:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                  <li>Real-time bus location updates</li>
                  <li>Estimated arrival times</li>
                  <li>Route progress tracking</li>
                  <li>Driver contact information</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">Need Help?</h4>
                <p className="text-muted-foreground mt-1">
                  Contact the transport office at +234-800-ADUSTECH or transport@adustech.edu.ng
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}