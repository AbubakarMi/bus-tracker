'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, GraduationCap, Truck } from 'lucide-react';

export function LoginInstructions() {
  const accounts = [
    {
      role: 'Admin',
      icon: <Crown className="h-5 w-5" />,
      email: 'admin@adustech.edu.ng',
      password: 'password123',
      description: 'Full system access, create drivers, manage routes',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      role: 'Driver',
      icon: <Truck className="h-5 w-5" />,
      email: 'driver1@adustech.edu.ng',
      password: 'password123',
      description: 'Driver dashboard, route management, passenger tracking',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      role: 'Student',
      icon: <GraduationCap className="h-5 w-5" />,
      email: 'UG20/COMS/1284',
      password: 'password123',
      description: 'Book buses, track routes, view schedules',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      role: 'Staff',
      icon: <Users className="h-5 w-5" />,
      email: 'Staff/Adustech/1022',
      password: 'password123',
      description: 'Fleet management, booking assistance, reports',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Demo Login Credentials
        </CardTitle>
        <CardDescription>
          Use these credentials to test different user roles. All accounts use the default password: <code className="bg-muted px-1 rounded">password123</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {accounts.map((account, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {account.icon}
                <span className="font-medium">{account.role}</span>
              </div>
              <Badge className={account.color}>
                {account.role}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Email/ID:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                  {account.email}
                </code>
              </div>
              <div>
                <p className="text-muted-foreground">Password:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                  {account.password}
                </code>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              {account.description}
            </p>
          </div>
        ))}

        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">System Features</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Admin:</strong> Create drivers, assign buses, manage routes</li>
            <li>• <strong>Driver:</strong> Real-time tracking, passenger management, route updates</li>
            <li>• <strong>Student/Staff:</strong> Track buses on registered routes only</li>
            <li>• <strong>Real-time Updates:</strong> Live location and status updates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}