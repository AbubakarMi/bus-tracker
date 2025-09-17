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
  Star,
  Sparkles,
  Target,
  Cpu,
  Radio,
  Wifi,
  Eye,
  Brain,
  Atom
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
    <div className="relative">
      {/* Quantum Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 space-y-12">
        {/* EXTREME Hero Section */}
        <div className="text-center py-12">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="relative neural-float">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                    <Brain className="h-10 w-10 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                    <Atom className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-3xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                    NEURAL FLEET
                  </h1>
                  <p className="text-2xl font-bold text-cyan-300 animate-pulse">Quantum Transportation Matrix</p>
                </div>
              </div>
              <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto mb-8">
                Advanced AI-powered fleet management • Real-time neural processing • Quantum-enhanced monitoring
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={refreshData}
                  disabled={isRefreshing}
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 text-white px-10 py-4 rounded-2xl shadow-2xl shadow-cyan-500/50 transition-all duration-500 hover:scale-105 text-lg font-bold border-2 border-cyan-400/30"
                >
                  <RefreshCw className={cn("h-6 w-6 mr-3", isRefreshing && "animate-spin")} />
                  <span>QUANTUM SYNC</span>
                </Button>
                <div className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-2xl backdrop-blur-sm">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                  <span className="text-emerald-300 font-bold">NEURAL ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVOLUTIONARY Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Fleet Status Card - EXTREME */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-60 transition-all duration-1000"></div>
            <Card className="relative bg-gradient-to-br from-slate-800/90 via-blue-900/50 to-slate-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-3xl shadow-2xl shadow-cyan-500/20 overflow-hidden transition-all duration-500 hover:scale-105 group">

              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-400/5 to-indigo-400/10 animate-pulse"></div>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 3) * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + Math.random()}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Data Flow Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-pulse delay-500"></div>

              <CardContent className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-indigo-600/30 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                      <Bus className="h-8 w-8 text-cyan-300 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-300/60 text-sm font-bold tracking-wider">NEURAL FLEET</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
                      <span className="text-xs text-cyan-400 font-medium">QUANTUM</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-5xl font-black text-cyan-100 mb-2 quantum-glow">{stats.totalBuses}</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-1000 animate-pulse"
                        style={{ width: `${(stats.activeBuses / stats.totalBuses) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-emerald-300 font-bold text-lg">{stats.activeBuses}</span>
                  </div>
                  <p className="text-cyan-200/80 text-sm font-medium">
                    <Zap className="inline h-4 w-4 mr-1 text-emerald-400" />
                    Neural systems online
                  </p>
                </div>

                {/* Holographic Effect */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full animate-ping"></div>
              </CardContent>
            </Card>
          </div>

          {/* Community Card - EXTREME */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-60 transition-all duration-1000"></div>
            <Card className="relative bg-gradient-to-br from-slate-800/90 via-emerald-900/30 to-slate-800/90 backdrop-blur-xl border border-emerald-400/30 rounded-3xl shadow-2xl shadow-emerald-500/20 overflow-hidden transition-all duration-500 hover:scale-105 group">

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-green-400/5 to-teal-400/10 animate-pulse"></div>

              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-400/60 rounded-full animate-ping"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${15 + (i % 4) * 20}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${1.5 + Math.random()}s`
                    }}
                  ></div>
                ))}
              </div>

              <CardContent className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/30 via-green-500/30 to-teal-600/30 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                      <Users className="h-8 w-8 text-emerald-300 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-300/60 text-sm font-bold tracking-wider">NEURAL COMMUNITY</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400 font-medium">CONNECTED</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-5xl font-black text-emerald-100 mb-2 quantum-glow">{stats.totalUsers.toLocaleString()}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-700/30 rounded-xl p-2 text-center">
                      <div className="text-emerald-300 font-bold">847</div>
                      <div className="text-xs text-emerald-400/70">Students</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-2 text-center">
                      <div className="text-emerald-300 font-bold">400</div>
                      <div className="text-xs text-emerald-400/70">Staff</div>
                    </div>
                  </div>
                  <p className="text-emerald-200/80 text-sm font-medium">
                    <Brain className="inline h-4 w-4 mr-1 text-emerald-400" />
                    Neural network active
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full animate-ping"></div>
              </CardContent>
            </Card>
          </div>

          {/* Quantum Bookings Card - EXTREME */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-60 transition-all duration-1000"></div>
            <Card className="relative bg-gradient-to-br from-slate-800/90 via-amber-900/30 to-slate-800/90 backdrop-blur-xl border border-amber-400/30 rounded-3xl shadow-2xl shadow-amber-500/20 overflow-hidden transition-all duration-500 hover:scale-105 group">

              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-400/5 to-red-400/10 animate-pulse"></div>

              <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400/60 rounded-full animate-ping"
                    style={{
                      left: `${10 + i * 10}%`,
                      top: `${10 + (i % 5) * 20}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${1 + Math.random()}s`
                    }}
                  ></div>
                ))}
              </div>

              <CardContent className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400/30 via-orange-500/30 to-red-600/30 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                      <TrendingUp className="h-8 w-8 text-amber-300 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-300/60 text-sm font-bold tracking-wider">QUANTUM FLOW</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-amber-400 animate-pulse" />
                      <span className="text-xs text-amber-400 font-medium">TRENDING</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-5xl font-black text-amber-100 mb-2 quantum-glow">{stats.todayBookings}</div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-300 font-bold text-lg">+12%</span>
                    <span className="text-amber-200/70 text-sm">neural boost</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-3">
                    <div className="text-amber-200 font-bold text-sm">₦{(stats.todayBookings * 150).toLocaleString()}</div>
                    <div className="text-amber-300/70 text-xs">Revenue projection</div>
                  </div>
                  <p className="text-amber-200/80 text-sm font-medium">
                    <Atom className="inline h-4 w-4 mr-1 text-amber-400" />
                    Quantum processing active
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full animate-ping"></div>
              </CardContent>
            </Card>
          </div>

          {/* Critical Alerts Card - EXTREME */}
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-60 transition-all duration-1000"></div>
            <Card className="relative bg-gradient-to-br from-slate-800/90 via-rose-900/30 to-slate-800/90 backdrop-blur-xl border border-rose-400/30 rounded-3xl shadow-2xl shadow-rose-500/20 overflow-hidden transition-all duration-500 hover:scale-105 group">

              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-pink-400/5 to-red-400/10 animate-pulse"></div>

              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-rose-400/60 rounded-full animate-ping"
                    style={{
                      left: `${5 + i * 8}%`,
                      top: `${5 + (i % 6) * 15}%`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: `${0.8 + Math.random()}s`
                    }}
                  ></div>
                ))}
              </div>

              <CardContent className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-400/30 via-pink-500/30 to-red-600/30 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                      <AlertTriangle className="h-8 w-8 text-rose-300 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-transparent rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-300/60 text-sm font-bold tracking-wider">NEURAL ALERTS</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Eye className="h-4 w-4 text-rose-400 animate-pulse" />
                      <span className="text-xs text-rose-400 font-medium">MONITORING</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-5xl font-black text-rose-100 mb-2 quantum-glow animate-pulse">{stats.alerts}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-rose-200/70 text-sm">Critical</span>
                      <span className="text-rose-300 font-bold">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200/70 text-sm">Warning</span>
                      <span className="text-amber-300 font-bold">2</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl p-3 border border-rose-400/20">
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-rose-400 animate-pulse" />
                      <span className="text-rose-200 font-bold text-sm">Neural scan active</span>
                    </div>
                  </div>
                  <p className="text-rose-200/80 text-sm font-medium">
                    <Target className="inline h-4 w-4 mr-1 text-rose-400" />
                    Threat analysis running
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full animate-ping"></div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* REVOLUTIONARY Bus Tracking Matrix */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-indigo-400/10 rounded-3xl blur-2xl"></div>
          <Card className="relative bg-gradient-to-br from-slate-800/90 via-blue-900/20 to-slate-800/90 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl shadow-2xl shadow-cyan-500/20 overflow-hidden">

            {/* Matrix Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 20px,
                  rgba(34, 211, 238, 0.1) 21px,
                  rgba(34, 211, 238, 0.1) 22px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 20px,
                  rgba(34, 211, 238, 0.1) 21px,
                  rgba(34, 211, 238, 0.1) 22px
                )`
              }}></div>
            </div>

            <CardHeader className="relative bg-gradient-to-r from-cyan-600/80 via-blue-600/80 to-indigo-600/80 text-white border-b border-cyan-400/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <MapPin className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-2xl animate-pulse"></div>
                  </div>
                  <div>
                    <CardTitle className="text-4xl font-black flex items-center space-x-3">
                      <span>NEURAL FLEET MATRIX</span>
                      <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                    </CardTitle>
                    <CardDescription className="text-cyan-100 text-xl font-semibold">
                      Quantum-enhanced real-time monitoring • AI predictive analysis
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">{buses.filter(b => b.status === 'active').length}</div>
                  <div className="text-cyan-100 text-lg font-bold">NEURAL ACTIVE</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Brain className="h-5 w-5 text-cyan-300 animate-pulse" />
                    <span className="text-cyan-300 text-sm font-bold">AI MONITORING</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative p-10">
              <div className="space-y-8">
                {buses.map((bus, index) => {
                  const occupancyPercentage = Math.round((bus.passengers / bus.capacity) * 100);

                  return (
                    <div
                      key={bus.id}
                      className="group relative p-8 bg-gradient-to-r from-slate-700/40 via-slate-600/30 to-slate-700/40 rounded-3xl border border-cyan-400/20 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-700 hover:scale-[1.02] overflow-hidden"
                      style={{
                        animationDelay: `${index * 200}ms`,
                        animation: 'fadeInUp 0.8s ease-out forwards'
                      }}
                    >
                      {/* Neural Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-indigo-400/5 group-hover:from-cyan-400/10 group-hover:via-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-700"></div>

                      {/* Data Flow Animation */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'dataFlow 2s ease-in-out infinite' }}></div>

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                          {/* Quantum Bus Avatar */}
                          <div className="relative">
                            <div className={cn(
                              "w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-2xl transition-all duration-500 group-hover:scale-110 neural-float",
                              bus.status === 'active'
                                ? "bg-gradient-to-br from-emerald-500 via-cyan-500 to-teal-500 shadow-emerald-500/50"
                                : bus.status === 'maintenance'
                                ? "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-amber-500/50"
                                : "bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 shadow-rose-500/50"
                            )}>
                              {bus.id}
                            </div>
                            <div className={cn(
                              "absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-slate-800 flex items-center justify-center transition-all duration-300",
                              bus.status === 'active' ? "bg-emerald-400 animate-pulse" :
                              bus.status === 'maintenance' ? "bg-amber-400" : "bg-rose-400"
                            )}>
                              {bus.status === 'active' && <Zap className="h-4 w-4 text-white" />}
                              {bus.status === 'maintenance' && <AlertTriangle className="h-4 w-4 text-white" />}
                            </div>

                            {/* Hologram Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-400/20 rounded-3xl animate-pulse"></div>
                          </div>

                          {/* Neural Bus Info */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                              <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-100 to-blue-100 bg-clip-text text-transparent">{bus.number}</h3>
                              <Badge className={cn("px-4 py-2 text-sm font-bold border-2 rounded-xl", getStatusColor(bus.status))}>
                                {bus.status.toUpperCase()}
                              </Badge>
                              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-xl border border-cyan-400/30">
                                <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
                                <span className="text-cyan-300 text-sm font-bold">CONNECTED</span>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-slate-200">{bus.route}</p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <UserCheck className="h-5 w-5 text-cyan-400" />
                                <span className="text-slate-300 font-medium">Neural Pilot: <span className="text-cyan-300 font-bold">{bus.driver}</span></span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quantum Metrics */}
                        <div className="flex items-center space-x-10">
                          {/* Neural Occupancy Display */}
                          <div className="text-center">
                            <p className="text-slate-400 mb-3 font-bold">NEURAL LOAD</p>
                            <div className="relative w-24 h-24">
                              {/* Outer Ring */}
                              <div className="absolute inset-0 rounded-full border-8 border-slate-700"></div>

                              {/* Progress Ring */}
                              <div
                                className="absolute inset-0 rounded-full border-8 border-transparent transition-all duration-1000"
                                style={{
                                  background: `conic-gradient(${
                                    occupancyPercentage >= 90 ? '#ef4444' :
                                    occupancyPercentage >= 70 ? '#f59e0b' :
                                    '#10b981'
                                  } ${occupancyPercentage * 3.6}deg, transparent 0deg)`,
                                  mask: 'radial-gradient(circle at center, transparent 60%, black 60%)'
                                }}
                              ></div>

                              {/* Center Display */}
                              <div className="absolute inset-4 bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-full flex items-center justify-center border border-cyan-400/30">
                                <div className="text-center">
                                  <div className={cn("text-2xl font-black", getOccupancyColor(occupancyPercentage))}>
                                    {occupancyPercentage}%
                                  </div>
                                </div>
                              </div>

                              {/* Glow Effect */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 animate-pulse"></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-3 font-medium">{bus.passengers}/{bus.capacity} neural units</p>
                          </div>

                          {/* Quantum ETA */}
                          <div className="text-center">
                            <p className="text-slate-400 mb-3 font-bold">QUANTUM ETA</p>
                            <div className="relative">
                              <div className="bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-indigo-500/80 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-cyan-500/30 backdrop-blur-sm border border-cyan-400/30">
                                <div className="flex items-center space-x-3">
                                  <Clock className="h-6 w-6 animate-pulse" />
                                  <span className="text-2xl font-black">{bus.eta}</span>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl animate-pulse"></div>
                            </div>
                          </div>

                          {/* Neural Action */}
                          <Button className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-cyan-500/30 transition-all duration-500 hover:scale-110 text-lg font-bold border-2 border-cyan-400/30">
                            <Target className="h-6 w-6 mr-3" />
                            NEURAL TRACK
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

        <div className="h-20"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dataFlow {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }

        @keyframes neuralFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(1deg);
          }
          50% {
            transform: translateY(-4px) rotate(0deg);
          }
          75% {
            transform: translateY(-12px) rotate(-1deg);
          }
        }

        @keyframes quantumGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.6);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          33% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
          66% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.8;
          }
        }

        @keyframes hologramFlicker {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes neuralPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(34, 211, 238, 0);
          }
        }

        .neural-float {
          animation: neuralFloat 6s ease-in-out infinite;
        }

        .quantum-glow {
          animation: quantumGlow 3s ease-in-out infinite;
        }

        .particle-float {
          animation: particleFloat 4s ease-in-out infinite;
        }

        .hologram-flicker {
          animation: hologramFlicker 2s ease-in-out infinite;
        }

        .neural-pulse {
          animation: neuralPulse 2s infinite;
        }

        /* Advanced gradient overlays */
        .neural-gradient {
          background: linear-gradient(135deg,
            rgba(34, 211, 238, 0.1) 0%,
            rgba(59, 130, 246, 0.1) 25%,
            rgba(99, 102, 241, 0.1) 50%,
            rgba(139, 92, 246, 0.1) 75%,
            rgba(34, 211, 238, 0.1) 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Matrix rain effect */
        .matrix-rain::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 2px,
            rgba(34, 211, 238, 0.03) 2px,
            rgba(34, 211, 238, 0.03) 4px
          );
          animation: matrixRain 20s linear infinite;
        }

        @keyframes matrixRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        /* Quantum field effect */
        .quantum-field {
          position: relative;
          overflow: hidden;
        }

        .quantum-field::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle,
            rgba(34, 211, 238, 0.03) 0%,
            transparent 1%),
            radial-gradient(circle at 20% 80%,
            rgba(59, 130, 246, 0.03) 0%,
            transparent 1%),
            radial-gradient(circle at 80% 20%,
            rgba(99, 102, 241, 0.03) 0%,
            transparent 1%);
          background-size: 50px 50px, 80px 80px, 120px 120px;
          animation: quantumField 30s linear infinite;
        }

        @keyframes quantumField {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}