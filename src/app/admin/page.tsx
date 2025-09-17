'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bus,
  Users,
  UserCheck,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusStatus {
  id: string;
  number: string;
  route: string;
  status: 'active' | 'maintenance' | 'offline';
  passengers: number;
  capacity: number;
  driver: string;
  location: { lat: number; lng: number };
  eta: string;
}

interface DashboardStats {
  totalBuses: number;
  activeBuses: number;
  totalUsers: number;
  totalDrivers: number;
  todayBookings: number;
  revenue: number;
  alerts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBuses: 12,
    activeBuses: 8,
    totalUsers: 1247,
    totalDrivers: 15,
    todayBookings: 89,
    revenue: 4500,
    alerts: 3
  });

  const [buses, setBuses] = useState<BusStatus[]>([
    {
      id: '1',
      number: 'ADUS-001',
      route: 'Campus to City Center',
      status: 'active',
      passengers: 28,
      capacity: 35,
      driver: 'Ahmed Musa',
      location: { lat: 11.0775, lng: 7.7142 },
      eta: '5 mins'
    },
    {
      id: '2',
      number: 'ADUS-002',
      route: 'Campus to Hotoro',
      status: 'active',
      passengers: 22,
      capacity: 35,
      driver: 'Fatima Hassan',
      location: { lat: 11.0721, lng: 7.7245 },
      eta: '12 mins'
    },
    {
      id: '3',
      number: 'ADUS-003',
      route: 'Campus to Sabon Gari',
      status: 'maintenance',
      passengers: 0,
      capacity: 35,
      driver: 'Ibrahim Yusuf',
      location: { lat: 11.0648, lng: 7.7389 },
      eta: 'N/A'
    },
    {
      id: '4',
      number: 'ADUS-004',
      route: 'Campus to Yan Awaki',
      status: 'active',
      passengers: 31,
      capacity: 35,
      driver: 'Aisha Abdullahi',
      location: { lat: 11.0892, lng: 7.7021 },
      eta: '8 mins'
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update with simulated new data
    setStats(prev => ({
      ...prev,
      activeBuses: Math.floor(Math.random() * 3) + 7,
      todayBookings: prev.todayBookings + Math.floor(Math.random() * 5),
      alerts: Math.floor(Math.random() * 5)
    }));

    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your bus transportation system</p>
        </div>
        <Button
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBuses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeBuses} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Students and staff registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayBookings}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.alerts}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Live Bus Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Live Bus Tracking</span>
          </CardTitle>
          <CardDescription>
            Real-time status and location of all buses in the fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buses.map((bus) => {
              const occupancyPercentage = Math.round((bus.passengers / bus.capacity) * 100);

              return (
                <div key={bus.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-lg">{bus.number}</span>
                        <Badge className={getStatusColor(bus.status)}>
                          {bus.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{bus.route}</p>
                      <p className="text-xs text-gray-500">Driver: {bus.driver}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Occupancy</p>
                      <p className={cn("text-lg font-semibold", getOccupancyColor(occupancyPercentage))}>
                        {bus.passengers}/{bus.capacity}
                      </p>
                      <p className="text-xs text-gray-400">{occupancyPercentage}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">ETA</p>
                      <p className="text-lg font-semibold flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {bus.eta}
                      </p>
                    </div>

                    <Button variant="outline" size="sm">
                      Track
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Bus ADUS-001 departed Campus at 2:30 PM</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">New student registered: UG25/COMS/1295</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Bus ADUS-003 scheduled for maintenance</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Route schedule updated for City Center</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">45 bookings made for tomorrow</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>System Alerts</span>
            </CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">Bus ADUS-003 Breakdown</p>
                    <p className="text-sm text-red-600">Engine malfunction reported</p>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-yellow-800">Driver Ahmed Late</p>
                    <p className="text-sm text-yellow-600">15 minutes behind schedule</p>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">High Demand Route</p>
                    <p className="text-sm text-blue-600">City Center route at 95% capacity</p>
                  </div>
                  <Badge variant="outline">Info</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}