'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bus, 
  BarChart3, 
  Wrench, 
  Bell,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  DollarSign,
  Activity,
  MapPin,
  Fuel,
  Settings,
  TrendingUp,
  Navigation,
  Shield,
  Zap,
  MessageSquare,
  UserCheck,
  Timer
} from 'lucide-react';

export default function StaffDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fleetStats = [
    { icon: Bus, value: "18", label: "Active Buses", color: "bg-blue-500", change: "+2", trend: "up" },
    { icon: DollarSign, value: "₦2.8M", label: "Today's Revenue", color: "bg-green-500", change: "+12%", trend: "up" },
    { icon: Activity, value: "156", label: "Daily Trips", color: "bg-purple-500", change: "+8", trend: "up" },
    { icon: Wrench, value: "4", label: "In Maintenance", color: "bg-orange-500", change: "-1", trend: "down" }
  ];

  const activeBuses = [
    {
      id: 'BUS-001',
      route: "Lagos Express",
      driver: { name: "Emeka Johnson", rating: 4.9 },
      capacity: 45,
      occupied: 38,
      status: "on-time",
      location: "Mile 12, Lagos",
      fuelLevel: 85,
      revenue: 197000,
      alerts: []
    },
    {
      id: 'BUS-002', 
      route: "Campus Shuttle",
      driver: { name: "Fatima Adebayo", rating: 4.8 },
      capacity: 30,
      occupied: 22,
      status: "arriving",
      location: "UI Main Gate",
      fuelLevel: 62,
      revenue: 78900,
      alerts: ["Low fuel warning"]
    },
    {
      id: 'BUS-003',
      route: "Abuja Metro",
      driver: { name: "Ibrahim Musa", rating: 4.6 },
      capacity: 50,
      occupied: 12,
      status: "delayed",
      location: "Central Business District",
      fuelLevel: 45,
      revenue: 234500,
      alerts: ["Running 10 mins late", "Low occupancy"]
    }
  ];

  const maintenanceQueue = [
    {
      id: 'BUS-012',
      issue: 'Engine Service Due',
      priority: 'high',
      estimatedTime: '4 hours',
      technician: 'Abdul Rasheed',
      status: 'in-progress',
      progress: 65
    },
    {
      id: 'BUS-007',
      issue: 'Brake Pad Replacement',
      priority: 'medium',
      estimatedTime: '2 hours',
      technician: 'Kemi Okafor',
      status: 'scheduled',
      progress: 0
    },
    {
      id: 'BUS-015',
      issue: 'AC System Check',
      priority: 'low',
      estimatedTime: '1 hour',
      technician: 'Ahmed Sule',
      status: 'pending',
      progress: 0
    }
  ];

  const recentAlerts = [
    { message: 'BUS-001 due for service in 2 days', type: 'maintenance', priority: 'medium', time: '1h ago', icon: Wrench },
    { message: 'BUS-002 fuel level below 30%', type: 'fuel', priority: 'high', time: '2h ago', icon: Fuel },
    { message: 'Lagos Express route experiencing delays', type: 'delay', priority: 'low', time: '3h ago', icon: Clock },
    { message: 'New driver Ibrahim Musa completed training', type: 'driver', priority: 'info', time: '5h ago', icon: UserCheck }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Fleet Command Center 🚌
              </h1>
              <p className="text-lg text-gray-600 flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-600" />
                {currentTime.toLocaleDateString('en-NG', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime.toLocaleTimeString('en-NG', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg hover:shadow-xl transition-all">
                <Settings className="h-4 w-4 mr-2" />
                Fleet Control
              </Button>
              <Button variant="outline" className="border-2 border-slate-300 hover:border-slate-500 shadow-lg hover:shadow-xl transition-all">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {fleetStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">vs yesterday</span>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="fleet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 h-12">
            <TabsTrigger value="fleet" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <Bus className="h-4 w-4" />
              Fleet Status
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fleet" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              
              {/* Active Fleet */}
              <Card className="xl:col-span-3 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Navigation className="h-6 w-6" />
                    Active Fleet ({fleetStats[0].value} buses)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {activeBuses.map((bus) => (
                    <div key={bus.id} className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border-l-4 border-slate-600 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Bus className="h-8 w-8 text-slate-600" />
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                              bus.status === 'on-time' ? 'bg-green-500' : 
                              bus.status === 'arriving' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-lg font-bold text-gray-900">{bus.id}</h4>
                              <Badge variant="outline" className="text-xs font-medium">
                                {bus.route}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <UserCheck className="h-3 w-3" />
                              {bus.driver.name} • ⭐ {bus.driver.rating}
                            </p>
                          </div>
                        </div>
                        <Badge variant={bus.status === 'on-time' ? 'default' : bus.status === 'arriving' ? 'secondary' : 'destructive'} className="text-sm">
                          {bus.status === 'on-time' ? 'On Time' : bus.status === 'arriving' ? 'Arriving' : 'Delayed'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span className="truncate">{bus.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-slate-500" />
                          <span>{bus.occupied}/{bus.capacity} passengers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Fuel className="h-4 w-4 text-slate-500" />
                          <span className={bus.fuelLevel < 30 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                            {bus.fuelLevel}% fuel
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-slate-500" />
                          <span className="font-semibold text-green-600">₦{bus.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Progress value={(bus.occupied / bus.capacity) * 100} className="w-32 h-2" />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Navigation className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>

                      {bus.alerts.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {bus.alerts.map((alert, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                              <AlertTriangle className="h-3 w-3" />
                              {alert}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Controls */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Zap className="h-6 w-6" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" variant="default">
                    <div className="p-2 bg-white/20 rounded">
                      <Bus className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Dispatch Bus</div>
                      <div className="text-xs opacity-90">Send bus to route</div>
                    </div>
                  </Button>
                  
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" variant="default">
                    <div className="p-2 bg-white/20 rounded">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Driver Alert</div>
                      <div className="text-xs opacity-90">Send notifications</div>
                    </div>
                  </Button>
                  
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800" variant="default">
                    <div className="p-2 bg-white/20 rounded">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Maintenance</div>
                      <div className="text-xs opacity-90">Schedule service</div>
                    </div>
                  </Button>
                  
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">System Status</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">All Online</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Update</span>
                      <span className="font-medium text-xs">Just now</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Wrench className="h-6 w-6" />
                  Maintenance Queue ({maintenanceQueue.length} buses)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {maintenanceQueue.map((item, index) => (
                    <div key={index} className="p-4 border rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-orange-50 to-red-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">{item.id}</Badge>
                          <div>
                            <h4 className="font-bold text-gray-900">{item.issue}</h4>
                            <p className="text-sm text-gray-600">Technician: {item.technician}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            item.priority === 'high' ? 'destructive' : 
                            item.priority === 'medium' ? 'default' : 'secondary'
                          } className="text-xs">
                            {item.priority} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.status === 'in-progress' ? (
                              <><Activity className="h-3 w-3 mr-1" /> In Progress</>
                            ) : item.status === 'scheduled' ? (
                              <><Timer className="h-3 w-3 mr-1" /> Scheduled</>
                            ) : (
                              <><Clock className="h-3 w-3 mr-1" /> Pending</>
                            )}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Est. time: {item.estimatedTime}</span>
                          {item.progress > 0 && (
                            <span>Progress: {item.progress}%</span>
                          )}
                        </div>
                        {item.progress > 0 && (
                          <Progress value={item.progress} className="w-32 h-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Bell className="h-6 w-6" />
                  System Alerts ({recentAlerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-red-50 to-orange-50">
                      <div className={`p-2 rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100' :
                        alert.priority === 'medium' ? 'bg-yellow-100' :
                        alert.priority === 'low' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <alert.icon className={`h-5 w-5 ${
                          alert.priority === 'high' ? 'text-red-600' :
                          alert.priority === 'medium' ? 'text-yellow-600' :
                          alert.priority === 'low' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900">{alert.message}</p>
                          <Badge variant={
                            alert.priority === 'high' ? 'destructive' : 
                            alert.priority === 'medium' ? 'default' :
                            alert.priority === 'low' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {alert.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <CardTitle className="text-xl">Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Today</span>
                      <span className="text-xl font-bold text-green-600">₦2.8M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Yesterday</span>
                      <span className="text-lg font-semibold">₦2.5M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">This Week</span>
                      <span className="text-lg font-semibold">₦18.6M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">This Month</span>
                      <span className="text-lg font-semibold">₦78.2M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-xl">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Avg Occupancy</span>
                      <span className="text-xl font-bold text-blue-600">78%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">On-Time Performance</span>
                      <span className="text-lg font-semibold">94.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Fuel Efficiency</span>
                      <span className="text-lg font-semibold">12.8 km/l</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Customer Rating</span>
                      <span className="text-lg font-semibold">⭐ 4.7/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Bar */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-slate-800 to-gray-900 text-white mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">Fleet Performance Overview</h3>
                <p className="text-slate-300 text-lg">All systems operational • 18 buses active • Revenue up 12%</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-slate-800 hover:bg-slate-100 shadow-lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Generate Report
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg">
                  <Settings className="h-5 w-5 mr-2" />
                  System Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}