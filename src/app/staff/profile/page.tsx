'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Camera,
  Save,
  CheckCircle,
  Edit,
  Activity,
  TrendingUp,
  Users,
  Bus,
  Award,
  Star,
  Briefcase,
  Settings,
  Lock,
  Bell,
  Globe,
  Smartphone,
  CreditCard,
  Heart,
  UserCheck
} from 'lucide-react';

export default function StaffProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState({
    personal: false,
    security: false,
    preferences: false
  });

  const [staffData, setStaffData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@buscompany.com',
    phone: '+234 803 456 7890',
    employeeId: 'STF-2024-001',
    department: 'Fleet Operations',
    position: 'Senior Fleet Manager',
    joinDate: '2022-03-15',
    location: 'Lagos Main Office',
    bio: 'Experienced fleet manager with 8+ years in transportation operations. Specialized in route optimization and driver management.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: true,
    dashboardTheme: 'system',
    language: 'English',
    timezone: 'UTC+1 (Lagos)',
    autoLogout: '30'
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} data:`, staffData, preferences);
    setIsEditing(prev => ({ ...prev, [section]: false }));
  };

  const statsCards = [
    { icon: Bus, value: '18', label: 'Buses Managed', color: 'bg-primary', trend: '+2 this week' },
    { icon: Users, value: '45', label: 'Drivers Supervised', color: 'bg-accent', trend: '+3 new hires' },
    { icon: CheckCircle, value: '94.5%', label: 'On-Time Performance', color: 'bg-chart-2', trend: '+2.1% improvement' },
    { icon: TrendingUp, value: '₦2.8M', label: 'Weekly Revenue', color: 'bg-chart-4', trend: '+15% vs last week' }
  ];

  const achievements = [
    { name: 'Fleet Excellence Award', icon: '🏆', year: '2024', description: 'Outstanding performance in fleet management' },
    { name: 'Safety Champion', icon: '🛡️', year: '2023', description: 'Zero accidents for 12 consecutive months' },
    { name: 'Team Leader', icon: '👥', year: '2023', description: 'Successfully managed team of 20+ drivers' },
    { name: 'Innovation Award', icon: '💡', year: '2022', description: 'Implemented new route optimization system' }
  ];

  const recentActivity = [
    { action: 'Approved maintenance for BUS-012', time: '2 hours ago', icon: CheckCircle, color: 'text-accent' },
    { action: 'Updated driver schedules for Lagos Express', time: '5 hours ago', icon: Calendar, color: 'text-primary' },
    { action: 'Completed monthly fleet report', time: '1 day ago', icon: Activity, color: 'text-chart-4' },
    { action: 'Onboarded new driver: Ahmed Hassan', time: '2 days ago', icon: UserCheck, color: 'text-chart-2' },
    { action: 'Resolved fuel efficiency alert for BUS-007', time: '3 days ago', icon: TrendingUp, color: 'text-chart-5' }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-3 py-2 space-y-3">

        {/* Header Section */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-foreground mb-1 animate-gradient-text">
            Staff Profile 👤
          </h1>
          <p className="text-base text-muted-foreground">
            Manage your account settings and professional information
          </p>
        </div>

        {/* Profile Overview Card */}
        <Card className="modern-card animate-slide-in-up overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-32 gradient-bg-primary">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60 animate-morphing"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end gap-6">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src="/api/placeholder/150/150" alt={staffData.name} />
                      <AvatarFallback className="text-2xl font-bold bg-white text-primary">
                        {staffData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-white text-primary hover:bg-muted">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-white pb-2">
                    <h2 className="text-2xl font-bold animate-gradient-text">{staffData.name}</h2>
                    <p className="text-primary-foreground/90 text-lg">{staffData.position}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {staffData.employeeId}
                      </Badge>
                      <span className="text-sm text-primary-foreground/80">{staffData.department}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {statsCards.map((stat, index) => (
            <Card key={index} className="modern-card feature-card group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-full ${stat.color} group-hover:animate-pulse`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <p className="text-xs text-accent font-medium animate-breathe">{stat.trend}</p>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color} group-hover:h-2 transition-all duration-300`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="personal" className="space-y-3">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-12 modern-card">
            <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="gradient-bg-primary text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 animate-float" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditing(prev => ({ ...prev, personal: !prev.personal }))}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditing.personal ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={staffData.name}
                      onChange={(e) => setStaffData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing.personal}
                      className="h-11 feature-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={staffData.email}
                      onChange={(e) => setStaffData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing.personal}
                      className="h-11 feature-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={staffData.phone}
                      onChange={(e) => setStaffData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing.personal}
                      className="h-11 feature-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={staffData.employeeId}
                      disabled
                      className="h-11 feature-card bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={staffData.department}
                      onChange={(e) => setStaffData(prev => ({ ...prev, department: e.target.value }))}
                      disabled={!isEditing.personal}
                      className="h-11 feature-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={staffData.position}
                      onChange={(e) => setStaffData(prev => ({ ...prev, position: e.target.value }))}
                      disabled={!isEditing.personal}
                      className="h-11 feature-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={staffData.joinDate}
                      disabled
                      className="h-11 feature-card bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Office Location</Label>
                    <Input
                      id="location"
                      value={staffData.location}
                      onChange={(e) => setStaffData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing.personal}
                      className="h-11 feature-card"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={staffData.bio}
                    onChange={(e) => setStaffData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing.personal}
                    rows={4}
                    className="feature-card resize-none"
                    placeholder="Tell us about your professional background and expertise..."
                  />
                </div>

                {isEditing.personal && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => handleSave('personal')}
                      className="gradient-bg-primary btn-interactive glow-primary hover-lift"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(prev => ({ ...prev, personal: false }))}
                      className="btn-interactive hover-lift"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-1 to-chart-4 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 animate-float" />
                    Security Settings
                  </CardTitle>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditing(prev => ({ ...prev, security: !prev.security }))}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Lock className="h-4 w-4 mr-1" />
                    {isEditing.security ? 'Cancel' : 'Change Password'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {isEditing.security ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={staffData.currentPassword}
                          onChange={(e) => setStaffData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="h-11 pr-10 feature-card"
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-11 px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={staffData.newPassword}
                        onChange={(e) => setStaffData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="h-11 feature-card"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={staffData.confirmPassword}
                        onChange={(e) => setStaffData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="h-11 feature-card"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleSave('security')}
                        className="bg-chart-1 hover:bg-chart-1/90 btn-interactive glow-primary hover-lift text-white"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(prev => ({ ...prev, security: false }))}
                        className="btn-interactive hover-lift"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 modern-card border-l-4 border-accent">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold text-foreground">Account Security</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your account is secured with strong encryption. Last password change: Never
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-accent">Strong security enabled</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 modern-card hover-lift group">
                        <div className="flex items-center gap-3 mb-2">
                          <Lock className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <h4 className="font-semibold text-foreground">Two-Factor Auth</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security</p>
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      </div>

                      <div className="p-4 modern-card hover-lift group">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="h-5 w-5 text-chart-4 group-hover:animate-bounce" />
                          <h4 className="font-semibold text-foreground">Login Sessions</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Manage active sessions</p>
                        <Badge className="text-xs bg-chart-4/20 text-chart-4">2 Active</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-1 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-6 w-6 animate-float" />
                    System Preferences
                  </CardTitle>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditing(prev => ({ ...prev, preferences: !prev.preferences }))}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditing.preferences ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Notification Settings
                    </h4>

                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Email Notifications</Label>
                          <p className="text-xs text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreferences(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                          disabled={!isEditing.preferences}
                          className={preferences.emailNotifications ? 'bg-accent/20 text-accent' : ''}
                        >
                          {preferences.emailNotifications ? 'On' : 'Off'}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">SMS Alerts</Label>
                          <p className="text-xs text-muted-foreground">Critical alerts via SMS</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreferences(prev => ({ ...prev, smsAlerts: !prev.smsAlerts }))}
                          disabled={!isEditing.preferences}
                          className={preferences.smsAlerts ? 'bg-accent/20 text-accent' : ''}
                        >
                          {preferences.smsAlerts ? 'On' : 'Off'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Regional Settings
                    </h4>

                    <div className="space-y-4 pl-7">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Language</Label>
                        <Input
                          value={preferences.language}
                          onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                          disabled={!isEditing.preferences}
                          className="h-10 feature-card"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Timezone</Label>
                        <Input
                          value={preferences.timezone}
                          onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                          disabled={!isEditing.preferences}
                          className="h-10 feature-card"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing.preferences && (
                  <div className="flex gap-3 pt-6 border-t">
                    <Button
                      onClick={() => handleSave('preferences')}
                      className="bg-chart-5 hover:bg-chart-5/90 btn-interactive glow-primary hover-lift text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(prev => ({ ...prev, preferences: false }))}
                      className="btn-interactive hover-lift"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-2 to-chart-4 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 animate-float" />
                  Professional Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 modern-card hover-lift group animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl group-hover:animate-bounce">{achievement.icon}</span>
                        <div>
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{achievement.name}</h4>
                          <p className="text-sm text-accent font-medium">{achievement.year}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="gradient-bg-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6 animate-float" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 modern-card hover-lift group animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="p-2 bg-muted rounded-full group-hover:bg-primary/20 transition-colors">
                        <activity.icon className={`h-4 w-4 ${activity.color} group-hover:animate-pulse`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 btn-interactive hover-lift">
                  <Clock className="h-4 w-4 mr-2" />
                  View Full Activity Log
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}