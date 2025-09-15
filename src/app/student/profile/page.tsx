'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Phone,
  Camera,
  Edit,
  Save,
  X,
  MapPin,
  Calendar,
  Award,
  Shield,
  Key,
  Bell,
  CreditCard,
  History
} from 'lucide-react';

export default function StudentProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@student.edu',
    phone: '+234 801 234 5678',
    studentId: 'STU001234',
    department: 'Computer Science',
    level: '300 Level',
    address: '15 University Road, Campus',
    dateOfBirth: '1999-05-15',
    emergencyContact: '+234 803 456 7890',
    emergencyContactName: 'Jane Doe (Mother)'
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been successfully updated."
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleImageUpload = async () => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    toast({
      title: "Profile Photo Updated! 📸",
      description: "Your profile photo has been successfully uploaded."
    });
  };

  const stats = [
    { icon: History, value: "47", label: "Total Trips", color: "bg-blue-500" },
    { icon: Award, value: "1,250", label: "Points Earned", color: "bg-yellow-500" },
    { icon: MapPin, value: "8", label: "Routes Used", color: "bg-green-500" },
    { icon: Shield, value: "Gold", label: "Status Level", color: "bg-purple-500" }
  ];

  const recentTrips = [
    { id: 1, route: "Lagos Express", date: "2024-01-15", amount: "₦5,500", status: "Completed" },
    { id: 2, route: "Campus Shuttle", date: "2024-01-14", amount: "₦300", status: "Completed" },
    { id: 3, route: "Lagos Express", date: "2024-01-13", amount: "₦5,500", status: "Completed" },
    { id: 4, route: "Campus Loop", date: "2024-01-12", amount: "₦200", status: "Completed" }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={handleImageUpload}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <User className="h-4 w-4" />
              {profile.department} • {profile.level}
            </p>
            <Badge variant="secondary" className="mt-2">
              Student ID: {profile.studentId}
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid lg:grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={isEditing ? editForm.name : profile.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editForm.email : profile.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={isEditing ? editForm.phone : profile.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={profile.studentId}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={isEditing ? editForm.department : profile.department}
                      onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      value={isEditing ? editForm.level : profile.level}
                      onChange={(e) => setEditForm({...editForm, level: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      value={isEditing ? editForm.address : profile.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="dob"
                        type="date"
                        value={isEditing ? editForm.dateOfBirth : profile.dateOfBirth}
                        onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="emergency"
                        value={isEditing ? editForm.emergencyContact : profile.emergencyContact}
                        onChange={(e) => setEditForm({...editForm, emergencyContact: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyName"
                    value={isEditing ? editForm.emergencyContactName : profile.emergencyContactName}
                    onChange={(e) => setEditForm({...editForm, emergencyContactName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900">Password</h4>
                      <p className="text-sm text-blue-700 mb-3">Last changed 30 days ago</p>
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-green-700 mb-3">Add an extra layer of security to your account</p>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Trip Reminders</h4>
                      <p className="text-sm text-gray-600">Get notified about upcoming trips</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Booking Confirmations</h4>
                      <p className="text-sm text-gray-600">Receive booking confirmation messages</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Promotional Offers</h4>
                      <p className="text-sm text-gray-600">Get notified about discounts and offers</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Travel History */}
          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Travel History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trip.route}</h4>
                          <p className="text-sm text-gray-600">{trip.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{trip.amount}</p>
                        <Badge variant="secondary" className="text-xs">
                          {trip.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}