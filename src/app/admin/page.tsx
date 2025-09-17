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
  RefreshCw,
  Activity,
  Zap,
  CalendarDays,
  Route,
  Settings,
  Plus,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState<DashboardStats>({
    totalBuses: 12,
    activeBuses: 8,
    totalUsers: 1247,
    totalDrivers: 15,
    todayBookings: 89,
    revenue: 4500,
    alerts: 3
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'booking', message: 'New booking: ADUS-001 to City Center', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'alert', message: 'Bus ADUS-003 requires maintenance check', time: '15 minutes ago', status: 'warning' },
    { id: 3, type: 'driver', message: 'Driver Ahmed Musa checked in', time: '32 minutes ago', status: 'info' },
    { id: 4, type: 'route', message: 'Route to Hotoro updated', time: '1 hour ago', status: 'info' },
    { id: 5, type: 'booking', message: 'Booking cancelled: ADUS-002', time: '2 hours ago', status: 'error' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    await new Promise(resolve => setTimeout(resolve, 1000));
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
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'offline':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-rose-600';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-emerald-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your bus fleet operations and performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <div className="text-gray-600 text-sm">Current Time</div>
            <div className="text-gray-900 text-lg font-semibold">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <Button
            onClick={refreshData}
            disabled={isRefreshing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm">Total Fleet</div>
                <div className="text-gray-400 text-xs">All Buses</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">{stats.totalBuses}</div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.activeBuses / stats.totalBuses) * 100}%` }}
                  ></div>
                </div>
                <span className="text-green-600 font-medium text-sm">{stats.activeBuses} active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm">Total Users</div>
                <div className="text-gray-400 text-xs">Students & Staff</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-md p-2 text-center">
                  <div className="text-gray-900 font-semibold text-sm">847</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="bg-gray-50 rounded-md p-2 text-center">
                  <div className="text-gray-900 font-semibold text-sm">400</div>
                  <div className="text-xs text-gray-500">Staff</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm">Today's Bookings</div>
                <div className="text-gray-400 text-xs">Daily Activity</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">{stats.todayBookings}</div>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium text-sm">+12% from yesterday</span>
              </div>
              <div className="bg-amber-50 rounded-md p-3">
                <div className="text-gray-900 font-semibold text-sm">₦{(stats.todayBookings * 150).toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Estimated revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm">Active Alerts</div>
                <div className="text-gray-400 text-xs">Requires Attention</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">{stats.alerts}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Critical</span>
                  <span className="text-red-600 font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Warning</span>
                  <span className="text-amber-600 font-semibold">2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">Common management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Add Bus</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <UserCheck className="h-5 w-5" />
              <span className="text-sm">Add Driver</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Route className="h-5 w-5" />
              <span className="text-sm">Create Route</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Settings className="h-5 w-5" />
              <span className="text-sm">Maintenance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Bus Tracking */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Live Bus Tracking</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </CardTitle>
                  <CardDescription className="text-gray-600">Real-time fleet monitoring</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{buses.filter(b => b.status === 'active').length}</div>
                  <div className="text-gray-500 text-sm">Active Buses</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buses.map((bus) => {
                  const occupancyPercentage = Math.round((bus.passengers / bus.capacity) * 100);
                  return (
                    <div key={bus.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold relative",
                            bus.status === 'active' ? "bg-green-600" :
                            bus.status === 'maintenance' ? "bg-amber-600" : "bg-red-600"
                          )}>
                            {bus.id}
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                              bus.status === 'active' ? "bg-green-400" :
                              bus.status === 'maintenance' ? "bg-amber-400" : "bg-red-400"
                            )}></div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{bus.number}</h3>
                              <Badge className={cn(
                                "text-xs",
                                bus.status === 'active' ? "bg-green-100 text-green-800" :
                                bus.status === 'maintenance' ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                              )}>
                                {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{bus.route}</p>
                            <p className="text-gray-500 text-xs">Driver: {bus.driver}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{occupancyPercentage}%</div>
                            <div className="text-xs text-gray-500">{bus.passengers}/{bus.capacity}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{bus.eta}</div>
                            <div className="text-xs text-gray-500">ETA</div>
                          </div>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Latest system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      activity.status === 'success' ? "bg-green-100" :
                      activity.status === 'warning' ? "bg-amber-100" :
                      activity.status === 'error' ? "bg-red-100" : "bg-blue-100"
                    )}>
                      {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-amber-600" />}
                      {activity.status === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                      {activity.status === 'info' && <Activity className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-white border border-gray-200 shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Performance</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Today's metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">On-time Performance</span>
                    <span className="text-sm font-medium text-gray-900">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Fuel Efficiency</span>
                    <span className="text-sm font-medium text-gray-900">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Customer Satisfaction</span>
                    <span className="text-sm font-medium text-gray-900">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}