'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Bus } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Bus className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            This might happen if you're trying to access a route that's not available for your user role.
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/" className="w-full">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>

            <Link href="/student/dashboard" className="w-full">
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Student Dashboard
              </Button>
            </Link>

            <Link href="/staff/dashboard" className="w-full">
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Staff Dashboard
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-6">
            Need help? Contact transport@adustech.edu.ng
          </div>
        </CardContent>
      </Card>
    </div>
  );
}