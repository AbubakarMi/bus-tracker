'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  AlertCircle,
  X,
  Save,
  Phone,
  Mail,
  FileText,
  Wrench
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

  // Quick Access Modals State
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showCreateRouteModal, setShowCreateRouteModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

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
        <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm font-medium">Total Fleet</div>
                <div className="text-blue-500/70 text-xs">All Buses</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stats.totalBuses}</div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 animate-pulse"
                    style={{ width: `${(stats.activeBuses / stats.totalBuses) * 100}%` }}
                  ></div>
                </div>
                <span className="text-green-600 font-semibold text-sm">{stats.activeBuses} active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:scale-105 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm font-medium">Total Users</div>
                <div className="text-emerald-500/70 text-xs">Students & Staff</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{stats.totalUsers.toLocaleString()}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-2 text-center transform hover:scale-105 transition-transform duration-200">
                  <div className="text-emerald-700 font-bold text-sm">847</div>
                  <div className="text-xs text-emerald-600/70">Students</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-lg p-2 text-center transform hover:scale-105 transition-transform duration-200">
                  <div className="text-blue-700 font-bold text-sm">400</div>
                  <div className="text-xs text-blue-600/70">Staff</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 transform hover:scale-105 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm font-medium">Today's Bookings</div>
                <div className="text-amber-500/70 text-xs">Daily Activity</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{stats.todayBookings}</div>
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="h-4 w-4 text-green-600 animate-bounce" />
                <span className="text-green-600 font-semibold text-sm">+12% from yesterday</span>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-lg p-3 transform hover:scale-105 transition-transform duration-200">
                <div className="text-amber-700 font-bold text-sm">₦{(stats.todayBookings * 150).toLocaleString()}</div>
                <div className="text-amber-600/70 text-xs">Estimated revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-lg hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500 transform hover:scale-105 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm font-medium">Active Alerts</div>
                <div className="text-red-500/70 text-xs">Requires Attention</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent animate-pulse">{stats.alerts}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-red-50 border border-red-200/50 rounded-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-red-700 text-sm font-medium">Critical</span>
                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded-full text-xs">1</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-amber-50 border border-amber-200/50 rounded-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-amber-700 text-sm font-medium">Warning</span>
                  <span className="text-amber-600 font-bold bg-amber-100 px-2 py-1 rounded-full text-xs">2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        <CardHeader className="relative">
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">Common management tasks</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 border-blue-200 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              onClick={() => setShowAddBusModal(true)}
            >
              <Plus className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Add Bus</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 border-emerald-200 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              onClick={() => setShowAddDriverModal(true)}
            >
              <UserCheck className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Add Driver</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 border-amber-200 hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              onClick={() => setShowCreateRouteModal(true)}
            >
              <Route className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Create Route</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 border-purple-200 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              onClick={() => setShowMaintenanceModal(true)}
            >
              <Wrench className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Maintenance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Bus Tracking */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Live Bus Tracking</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  </CardTitle>
                  <CardDescription className="text-gray-600">Real-time fleet monitoring</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{buses.filter(b => b.status === 'active').length}</div>
                  <div className="text-green-600 text-sm font-medium">Active Buses</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buses.map((bus) => {
                  const occupancyPercentage = Math.round((bus.passengers / bus.capacity) * 100);
                  return (
                    <div key={bus.id} className="p-4 border border-blue-200/30 rounded-xl hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-[1.02] group bg-gradient-to-r from-white/50 to-blue-50/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold relative shadow-lg transform group-hover:scale-110 transition-transform duration-300",
                            bus.status === 'active' ? "bg-gradient-to-br from-green-500 to-emerald-600" :
                            bus.status === 'maintenance' ? "bg-gradient-to-br from-amber-500 to-orange-600" : "bg-gradient-to-br from-red-500 to-rose-600"
                          )}>
                            {bus.id}
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-md",
                              bus.status === 'active' ? "bg-green-400 animate-pulse" :
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
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-none transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
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
          <Card className="bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center space-x-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Latest system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 transform hover:scale-[1.02] group">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transform group-hover:scale-110 transition-transform duration-200",
                      activity.status === 'success' ? "bg-gradient-to-br from-green-100 to-emerald-100" :
                      activity.status === 'warning' ? "bg-gradient-to-br from-amber-100 to-orange-100" :
                      activity.status === 'error' ? "bg-gradient-to-br from-red-100 to-rose-100" : "bg-gradient-to-br from-blue-100 to-indigo-100"
                    )}>
                      {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-600 animate-pulse" />}
                      {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-amber-600 animate-pulse" />}
                      {activity.status === 'error' && <XCircle className="h-4 w-4 text-red-600 animate-pulse" />}
                      {activity.status === 'info' && <Activity className="h-4 w-4 text-blue-600 animate-pulse" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium group-hover:text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-500 group mt-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Performance</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Today's metrics</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 transition-all duration-200 transform hover:scale-[1.02] group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 font-medium">On-time Performance</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">94%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-green-200 to-emerald-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-1000 animate-pulse" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 transform hover:scale-[1.02] group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 font-medium">Fuel Efficiency</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">87%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 animate-pulse" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-violet-50/50 transition-all duration-200 transform hover:scale-[1.02] group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 font-medium">Customer Satisfaction</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">91%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-purple-200 to-violet-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-full rounded-full transition-all duration-1000 animate-pulse" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Bus Modal */}
      {showAddBusModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-blue-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Bus className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Add New Bus</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAddBusModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="busNumber">Bus Number</Label>
                <Input id="busNumber" placeholder="e.g., ADUS-005" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="e.g., 35" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Bus Model</Label>
                <Input id="model" placeholder="e.g., Mercedes Sprinter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" placeholder="e.g., 2023" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  onClick={() => {
                    // Add bus logic here
                    setShowAddBusModal(false);
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Add Bus
                </Button>
                <Button variant="outline" onClick={() => setShowAddBusModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddDriverModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-emerald-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Add New Driver</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAddDriverModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="driverName">Full Name</Label>
                <Input id="driverName" placeholder="e.g., Ahmed Hassan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input id="licenseNumber" placeholder="e.g., ABC123456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="e.g., +234 801 234 5678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="e.g., ahmed@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" placeholder="e.g., 5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Driver's address" rows={3} />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                  onClick={() => {
                    // Add driver logic here
                    setShowAddDriverModal(false);
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Add Driver
                </Button>
                <Button variant="outline" onClick={() => setShowAddDriverModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Route Modal */}
      {showCreateRouteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Route className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Create New Route</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateRouteModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="routeName">Route Name</Label>
                <Input id="routeName" placeholder="e.g., Campus to City Center" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startPoint">Start Point</Label>
                <Input id="startPoint" placeholder="e.g., ADUSTECH Main Gate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endPoint">End Point</Label>
                <Input id="endPoint" placeholder="e.g., City Center Market" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input id="distance" type="number" placeholder="e.g., 15.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="e.g., 45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fare">Fare (₦)</Label>
                <Input id="fare" type="number" placeholder="e.g., 200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stops">Intermediate Stops</Label>
                <Textarea id="stops" placeholder="List major stops along the route" rows={3} />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  onClick={() => {
                    // Create route logic here
                    setShowCreateRouteModal(false);
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Route
                </Button>
                <Button variant="outline" onClick={() => setShowCreateRouteModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-purple-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Schedule Maintenance</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowMaintenanceModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceBus">Select Bus</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose bus for maintenance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADUS-001">ADUS-001</SelectItem>
                    <SelectItem value="ADUS-002">ADUS-002</SelectItem>
                    <SelectItem value="ADUS-003">ADUS-003</SelectItem>
                    <SelectItem value="ADUS-004">ADUS-004</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceType">Maintenance Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select maintenance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Inspection</SelectItem>
                    <SelectItem value="oil-change">Oil Change</SelectItem>
                    <SelectItem value="tire-replacement">Tire Replacement</SelectItem>
                    <SelectItem value="brake-service">Brake Service</SelectItem>
                    <SelectItem value="engine-repair">Engine Repair</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input id="scheduledDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes about the maintenance" rows={3} />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                  onClick={() => {
                    // Schedule maintenance logic here
                    setShowMaintenanceModal(false);
                  }}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline" onClick={() => setShowMaintenanceModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}