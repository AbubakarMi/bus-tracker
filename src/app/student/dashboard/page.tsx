'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Bus,
  Calendar,
  Navigation,
  Users,
  CheckCircle,
  Star,
  Activity,
  ArrowRight,
  Bell,
  Settings,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Shield,
  Heart,
  Smartphone
} from 'lucide-react';

export default function StudentDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Bus, value: "47", label: "Total Trips", color: "bg-primary", textColor: "text-primary", growth: "+12%" },
    { icon: CheckCircle, value: "42", label: "Completed", color: "bg-accent", textColor: "text-accent", growth: "+8%" },
    { icon: Clock, value: "2", label: "Upcoming", color: "bg-chart-4", textColor: "text-chart-4", growth: "+1" },
    { icon: Star, value: "₦18K", label: "Total Spent", color: "bg-chart-5", textColor: "text-chart-5", growth: "+15%" }
  ];

  const worldClassFeatures = [
    {
      icon: Zap,
      title: "AI-Powered Route Optimization",
      description: "Smart algorithms predict the fastest routes in real-time",
      color: "bg-chart-4"
    },
    {
      icon: Globe,
      title: "Real-Time GPS Tracking",
      description: "Track your bus location with 99.9% accuracy",
      color: "bg-primary"
    },
    {
      icon: Shield,
      title: "Enhanced Safety Features",
      description: "Emergency alerts and driver verification system",
      color: "bg-accent"
    },
    {
      icon: Heart,
      title: "Carbon Footprint Tracking",
      description: "Monitor your environmental impact and earn eco-points",
      color: "bg-chart-2"
    },
    {
      icon: Smartphone,
      title: "Smart Notifications",
      description: "Personalized alerts and journey updates",
      color: "bg-chart-5"
    },
    {
      icon: Award,
      title: "Student Rewards Program",
      description: "Earn points and unlock exclusive discounts",
      color: "bg-chart-1"
    }
  ];

  const achievements = [
    { name: "Early Bird", icon: "🌅", progress: 80, description: "Take 10 morning trips" },
    { name: "Eco Warrior", icon: "🌱", progress: 60, description: "Save 100kg CO2" },
    { name: "Frequent Traveler", icon: "🚌", progress: 90, description: "Complete 50 trips" },
    { name: "Route Explorer", icon: "🗺️", progress: 40, description: "Use 5 different routes" }
  ];

  const upcomingTrips = [
    {
      id: 1,
      route: "Lagos Express",
      time: "8:30 AM",
      date: "Today",
      status: "on-time",
      seat: "A12",
      price: "₦5,500",
      gate: "Gate 3"
    },
    {
      id: 2,
      route: "Campus Shuttle", 
      time: "2:15 PM",
      date: "Tomorrow",
      status: "confirmed",
      seat: "B8",
      price: "₦300",
      gate: "Gate 1"
    }
  ];

  const recentActivity = [
    { message: 'Trip completed: Lagos Express', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { message: 'New booking confirmed for tomorrow', time: '5 hours ago', icon: Calendar, color: 'text-blue-600' },
    { message: 'Earned 50 eco-points', time: '1 day ago', icon: Star, color: 'text-yellow-600' },
    { message: 'Route update: Campus Loop', time: '2 days ago', icon: Bus, color: 'text-purple-600' }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-3 py-2 space-y-3">
        
        {/* Header Section */}
        <div className="mb-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1 animate-gradient-text">
                Welcome back, Student! 👋
              </h1>
              <p className="text-base text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
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
              <Button className="gradient-bg-primary btn-interactive glow-primary hover-lift">
                <Navigation className="h-4 w-4 mr-2" />
                Track Live Bus
              </Button>
              <Button asChild variant="outline" className="border-2 border-border hover:border-primary/50 feature-card">
                <Link href="/student/book">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {stats.map((stat, index) => (
            <Card key={index} className="modern-card feature-card group animate-scale-in stagger-${index + 1}">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${stat.color} group-hover:animate-pulse`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full animate-breathe">
                        {stat.growth}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color} group-hover:h-2 transition-all duration-300`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* World Class Features Section */}
        <Card className="mb-3 shadow-xl border-0 gradient-bg-primary text-white overflow-hidden animate-glow-pulse">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl animate-slide-in-left">
              <Globe className="h-7 w-7 animate-float" />
              World-Class Features
            </CardTitle>
            <p className="text-primary-foreground/80 animate-slide-in-right">Experience the future of student transportation</p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worldClassFeatures.map((feature, index) => (
              <div key={index} className="glass-card rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer magnetic-hover group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3 group-hover:animate-bounce`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:animate-gradient-text">{feature.title}</h4>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="mb-3 modern-card">
          <CardHeader className="bg-gradient-to-r from-chart-4 to-chart-1 text-white">
            <CardTitle className="flex items-center gap-2 text-xl animate-slide-in-up">
              <Award className="h-6 w-6 animate-float-delay-1" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 modern-card hover-lift group animate-slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl group-hover:animate-bounce">{achievement.icon}</span>
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={achievement.progress} className="flex-1 h-2 group-hover:h-3 transition-all" />
                    <span className="text-sm font-medium text-accent">{achievement.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-3">
          
          {/* Upcoming Trips */}
          <Card className="xl:col-span-2 modern-card animate-slide-in-left">
            <CardHeader className="gradient-bg-primary text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bus className="h-6 w-6 animate-float" />
                Your Next Trips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {upcomingTrips.map((trip, index) => (
                <div key={trip.id} className="p-4 modern-card hover-lift group animate-slide-in-up border-l-4 border-primary" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{trip.route}</h4>
                        <Badge variant={trip.status === 'on-time' ? 'default' : 'secondary'} className="text-xs">
                          {trip.status === 'on-time' ? 'On Time' : 'Confirmed'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {trip.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Seat {trip.seat}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trip.gate}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent mb-2">{trip.price}</div>
                      <Button variant="outline" size="sm" className="btn-interactive hover-lift">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button asChild className="w-full h-12 gradient-bg-primary btn-interactive glow-primary text-white">
                <Link href="/student/book">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book New Trip
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="modern-card animate-slide-in-right">
            <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-1 text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6 animate-float-delay-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all hover-lift group animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="p-2 bg-muted rounded-full group-hover:bg-primary/20 transition-colors">
                    <activity.icon className={`h-4 w-4 ${activity.color} group-hover:animate-pulse`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 btn-interactive hover-lift">
                <Bell className="h-4 w-4 mr-2" />
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        <Card className="modern-card gradient-bg-secondary text-white animate-glow-pulse overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 animate-morphing"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left animate-slide-in-left">
                  <h3 className="text-2xl font-bold mb-2 animate-gradient-text">Ready for Your Next Adventure?</h3>
                  <p className="text-primary-foreground/90 text-lg">Book now and enjoy seamless travel with real-time tracking</p>
                </div>
                <div className="flex flex-wrap gap-4 animate-slide-in-right">
                  <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-muted btn-interactive feature-card">
                    <Link href="/student/book">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Trip Now
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/20 btn-interactive">
                    <MapPin className="h-5 w-5 mr-2" />
                    Live Bus Map
                  </Button>
                  <Button asChild size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/20 btn-interactive">
                    <Link href="/student/settings">
                      <Settings className="h-5 w-5 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}