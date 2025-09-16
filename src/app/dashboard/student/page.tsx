import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StudentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Student Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Student!</CardTitle>
          <CardDescription>
            Manage your bookings and track your bus in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/dashboard/student/track">Track My Bus <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
           <Button asChild variant="secondary">
            <Link href="/dashboard/student/book">Book a New Trip</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
