'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Bell,
  Shield,
  User,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Globe,
  Palette,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Lock,
  Key,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  HelpCircle,
  MessageSquare,
  Phone,
  Clock,
  MapPin,
  Calendar,
  Database,
  FileText,
  Activity,
  Zap,
  Users,
  Bus,
  Briefcase
} from 'lucide-react';

export default function StaffSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    displayName: 'Sarah Johnson',
    jobTitle: 'Senior Fleet Manager',
    department: 'Fleet Operations',
    workingHours: '09:00 - 17:00',
    timezone: 'UTC+1 (Lagos)',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    theme: 'system'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: true,
    desktopNotifications: false,
    soundEnabled: true,
    newBookingAlerts: true,
    maintenanceAlerts: true,
    driverStatusUpdates: true,
    systemUpdates: false,
    marketingEmails: false,
    digestFrequency: 'daily',
    alertTiming: 'immediate'
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30',
    autoLogout: true,
    passwordExpiry: '90',
    allowedDevices: 'unlimited'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'internal',
    dataSharing: false,
    analyticsOptIn: true,
    locationTracking: true,
    activityLogging: true,
    cookiePreferences: 'essential',
    dataRetention: '2years',
    exportData: false
  });

  const [accountSettings, setAccountSettings] = useState({
    accountStatus: 'active',
    lastLogin: '2024-01-15 09:30',
    accountCreated: '2022-03-15',
    storageUsed: '2.1',
    storageLimit: '10',
    backupEnabled: true,
    autoSync: true,
    dataExport: false,
    deleteAccount: false
  });

  const handleSave = async (category: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${category} settings`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSecuritySettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      alert('Password updated successfully');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-3 py-2 space-y-3">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-foreground mb-1 animate-gradient-text">
            Staff Settings ⚙️
          </h1>
          <p className="text-base text-muted-foreground">
            Customize your experience and manage your account preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-3">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-12 modern-card">
            <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <Eye className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2 data-[state=active]:gradient-bg-primary data-[state=active]:text-white">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="gradient-bg-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 animate-float" />
                  General Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">

                {/* Display Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    Display Settings
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={generalSettings.displayName}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, displayName: e.target.value }))}
                        className="h-11 feature-card"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={generalSettings.jobTitle}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, jobTitle: e.target.value }))}
                        className="h-11 feature-card"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={generalSettings.theme} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, theme: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4" />
                              System
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">🇺🇸 English</SelectItem>
                          <SelectItem value="French">🇫🇷 French</SelectItem>
                          <SelectItem value="Yoruba">🇳🇬 Yoruba</SelectItem>
                          <SelectItem value="Hausa">🇳🇬 Hausa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Work Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Work Settings
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    <div className="space-y-2">
                      <Label htmlFor="workingHours">Working Hours</Label>
                      <Input
                        id="workingHours"
                        value={generalSettings.workingHours}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, workingHours: e.target.value }))}
                        className="h-11 feature-card"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC+1 (Lagos)">UTC+1 (Lagos)</SelectItem>
                          <SelectItem value="UTC+0 (London)">UTC+0 (London)</SelectItem>
                          <SelectItem value="UTC+3 (Nairobi)">UTC+3 (Nairobi)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select value={generalSettings.dateFormat} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, dateFormat: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={generalSettings.department}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, department: e.target.value }))}
                        className="h-11 feature-card"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleSave('general')}
                  disabled={isLoading}
                  className="gradient-bg-primary btn-interactive glow-primary hover-lift"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-4 to-chart-1 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-6 w-6 animate-float" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">

                {/* Communication Methods */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Communication Methods
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications', icon: Bell },
                      { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical alerts via SMS', icon: Smartphone },
                      { key: 'desktopNotifications', label: 'Desktop Notifications', desc: 'System tray notifications', icon: Monitor }
                    ].map((item, index) => (
                      <div key={item.key} className="flex items-center justify-between p-4 modern-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <div>
                            <Label className="font-medium text-foreground">{item.label}</Label>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, [item.key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fleet Management Alerts */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Bus className="h-5 w-5 text-primary" />
                    Fleet Management Alerts
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    {[
                      { key: 'newBookingAlerts', label: 'New Booking Alerts', desc: 'When new bookings are made', icon: Calendar },
                      { key: 'maintenanceAlerts', label: 'Maintenance Alerts', desc: 'Vehicle maintenance reminders', icon: Settings },
                      { key: 'driverStatusUpdates', label: 'Driver Status Updates', desc: 'Driver check-ins and updates', icon: Users },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'Platform updates and changes', icon: RefreshCw }
                    ].map((item, index) => (
                      <div key={item.key} className="flex items-center justify-between p-4 modern-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <div>
                            <Label className="font-medium text-foreground">{item.label}</Label>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, [item.key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Timing & Frequency
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    <div className="space-y-2">
                      <Label htmlFor="digestFrequency">Digest Frequency</Label>
                      <Select value={notificationSettings.digestFrequency} onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, digestFrequency: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 modern-card">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5 text-primary" />
                        <div>
                          <Label className="font-medium text-foreground">Sound Notifications</Label>
                          <p className="text-xs text-muted-foreground">Play sound for notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.soundEnabled}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, soundEnabled: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleSave('notifications')}
                  disabled={isLoading}
                  className="bg-chart-4 hover:bg-chart-4/90 btn-interactive glow-primary hover-lift text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Notification Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

              {/* Password Change */}
              <Card className="modern-card animate-slide-in-left">
                <CardHeader className="bg-gradient-to-r from-chart-1 to-chart-5 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-6 w-6 animate-float" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="h-11 pr-10 feature-card"
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="h-11 pr-10 feature-card"
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={securitySettings.confirmPassword}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="h-11 feature-card"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <Button
                    onClick={handlePasswordChange}
                    disabled={isLoading || !securitySettings.currentPassword || !securitySettings.newPassword || !securitySettings.confirmPassword}
                    className="w-full bg-chart-1 hover:bg-chart-1/90 btn-interactive glow-primary hover-lift text-white"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </CardContent>
              </Card>

              {/* Security Options */}
              <Card className="modern-card animate-slide-in-right">
                <CardHeader className="gradient-bg-primary text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 animate-float-delay-1" />
                    Security Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">

                  {[
                    { key: 'twoFactorEnabled', label: 'Two-Factor Authentication', desc: 'Add extra security layer', icon: Smartphone },
                    { key: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified of new logins', icon: Bell },
                    { key: 'autoLogout', label: 'Auto Logout', desc: 'Auto logout after inactivity', icon: Clock }
                  ].map((item, index) => (
                    <div key={item.key} className="flex items-center justify-between p-4 modern-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-primary group-hover:animate-bounce" />
                        <div>
                          <Label className="font-medium text-foreground">{item.label}</Label>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings[item.key as keyof typeof securitySettings] as boolean}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, [item.key]: checked }))}
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}>
                      <SelectTrigger className="h-11 feature-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => handleSave('security')}
                    disabled={isLoading}
                    className="w-full gradient-bg-primary btn-interactive glow-primary hover-lift"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Security Settings'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-3 animate-fade-in">
            <Card className="modern-card animate-slide-in-up">
              <CardHeader className="bg-gradient-to-r from-chart-2 to-chart-4 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-6 w-6 animate-float" />
                  Privacy & Data Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">

                {/* Data & Privacy */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data & Privacy
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    {[
                      { key: 'dataSharing', label: 'Data Sharing', desc: 'Share anonymous usage data', icon: Globe },
                      { key: 'analyticsOptIn', label: 'Analytics', desc: 'Help improve the platform', icon: Activity },
                      { key: 'locationTracking', label: 'Location Tracking', desc: 'Track location for fleet management', icon: MapPin },
                      { key: 'activityLogging', label: 'Activity Logging', desc: 'Log system activities', icon: FileText }
                    ].map((item, index) => (
                      <div key={item.key} className="flex items-center justify-between p-4 modern-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <div>
                            <Label className="font-medium text-foreground">{item.label}</Label>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={privacySettings[item.key as keyof typeof privacySettings] as boolean}
                          onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, [item.key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile & Visibility */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile & Visibility
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select value={privacySettings.profileVisibility} onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="internal">Internal Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataRetention">Data Retention</Label>
                      <Select value={privacySettings.dataRetention} onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, dataRetention: value }))}>
                        <SelectTrigger className="h-11 feature-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="5years">5 Years</SelectItem>
                          <SelectItem value="forever">Keep Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleSave('privacy')}
                  disabled={isLoading}
                  className="bg-chart-2 hover:bg-chart-2/90 btn-interactive glow-primary hover-lift text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Privacy Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

              {/* Account Information */}
              <Card className="modern-card animate-slide-in-left">
                <CardHeader className="bg-gradient-to-r from-chart-5 to-chart-2 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 animate-float" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">

                  <div className="space-y-4">
                    {[
                      { label: 'Account Status', value: accountSettings.accountStatus, icon: CheckCircle, color: 'text-accent' },
                      { label: 'Last Login', value: accountSettings.lastLogin, icon: Clock, color: 'text-muted-foreground' },
                      { label: 'Account Created', value: accountSettings.accountCreated, icon: Calendar, color: 'text-muted-foreground' },
                      { label: 'Storage Used', value: `${accountSettings.storageUsed}GB / ${accountSettings.storageLimit}GB`, icon: Database, color: 'text-primary' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 modern-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${item.color} group-hover:animate-bounce`} />
                          <span className="font-medium text-muted-foreground">{item.label}</span>
                        </div>
                        <span className="font-semibold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between p-4 modern-card hover-lift group">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="h-5 w-5 text-primary group-hover:animate-spin" />
                        <div>
                          <Label className="font-medium text-foreground">Auto Backup</Label>
                          <p className="text-xs text-muted-foreground">Automatic data backup</p>
                        </div>
                      </div>
                      <Switch
                        checked={accountSettings.backupEnabled}
                        onCheckedChange={(checked) => setAccountSettings(prev => ({ ...prev, backupEnabled: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card className="modern-card animate-slide-in-right">
                <CardHeader className="gradient-bg-primary text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 animate-float-delay-1" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">

                  <Button variant="outline" className="w-full justify-start gap-3 h-12 btn-interactive hover-lift">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Export My Data</div>
                      <div className="text-xs text-muted-foreground">Download all your data</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="w-full justify-start gap-3 h-12 btn-interactive hover-lift">
                    <Upload className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Import Data</div>
                      <div className="text-xs text-muted-foreground">Import data from backup</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="w-full justify-start gap-3 h-12 btn-interactive hover-lift">
                    <RefreshCw className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Clear Cache</div>
                      <div className="text-xs text-muted-foreground">Clear temporary data</div>
                    </div>
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h4 className="font-semibold text-destructive">Danger Zone</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" className="w-full hover-lift" disabled>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}