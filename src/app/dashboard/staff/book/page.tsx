import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function StaffBookPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Book a Seat</h1>
      <Card>
        <CardHeader>
          <CardTitle>Reserve Your Seat</CardTitle>
          <CardDescription>
            Book your seat on the bus for your upcoming trip.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Booking functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}