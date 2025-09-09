import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DriverPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Driver Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Current Trip</CardTitle>
          <CardDescription>
            This is where drivers will see their assigned trip, passenger list, and update their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Driver controls and trip information will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
