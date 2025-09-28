'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  GraduationCap,
  UserCheck,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllBookings, getBookingsByPassenger, type Booking } from '@/lib/booking-service';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'staff';
  regNumber?: string;
  staffId?: string;
  course?: string;
  department?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin?: string;
  totalBookings: number;
  totalSpent: number;
}

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const allBookings = await getAllBookings();
        setBookings(allBookings);

        // Create sample users based on bookings + some additional mock data
        const sampleUsers: User[] = [
          {
            id: 'UG20/COMS/1284',
            name: 'John Doe',
            email: 'john.doe@student.adustech.edu.ng',
            type: 'student',
            regNumber: 'UG20/COMS/1284',
            course: 'Computer Science',
            phone: '+2348123456789',
            status: 'active',
            joinDate: '2024-01-15',
            lastLogin: '2024-01-20',
            totalBookings: allBookings.filter(b => b.passengerId === 'UG20/COMS/1284').length,
            totalSpent: allBookings.filter(b => b.passengerId === 'UG20/COMS/1284').reduce((sum, b) => sum + b.amount, 0)
          },
          {
            id: 'Staff/Adustech/0001',
            name: 'Dr. Sarah Ahmed',
            email: 'sarah.ahmed@adustech.edu.ng',
            type: 'staff',
            staffId: 'Staff/Adustech/0001',
            department: 'Computer Science',
            phone: '+2348987654321',
            status: 'active',
            joinDate: '2023-09-01',
            lastLogin: '2024-01-19',
            totalBookings: allBookings.filter(b => b.passengerId === 'Staff/Adustech/0001').length,
            totalSpent: allBookings.filter(b => b.passengerId === 'Staff/Adustech/0001').reduce((sum, b) => sum + b.amount, 0)
          },
          {
            id: 'UG21/ICT/0456',
            name: 'Fatima Ibrahim',
            email: 'fatima.ibrahim@student.adustech.edu.ng',
            type: 'student',
            regNumber: 'UG21/ICT/0456',
            course: 'Information Communication Technology',
            phone: '+2347012345678',
            status: 'active',
            joinDate: '2024-01-10',
            lastLogin: '2024-01-18',
            totalBookings: allBookings.filter(b => b.passengerId === 'UG21/ICT/0456').length,
            totalSpent: allBookings.filter(b => b.passengerId === 'UG21/ICT/0456').reduce((sum, b) => sum + b.amount, 0)
          },
          {
            id: 'UG20/MATHS/0789',
            name: 'Ahmad Suleiman',
            email: 'ahmad.suleiman@student.adustech.edu.ng',
            type: 'student',
            regNumber: 'UG20/MATHS/0789',
            course: 'Mathematics',
            phone: '+2348555123456',
            status: 'suspended',
            joinDate: '2024-01-08',
            lastLogin: '2024-01-15',
            totalBookings: 2,
            totalSpent: 5000
          },
          {
            id: 'Staff/Adustech/0002',
            name: 'Prof. Mohammed Kano',
            email: 'mohammed.kano@adustech.edu.ng',
            type: 'staff',
            staffId: 'Staff/Adustech/0002',
            department: 'Mathematics',
            phone: '+2349087654321',
            status: 'active',
            joinDate: '2023-08-15',
            lastLogin: '2024-01-17',
            totalBookings: 0,
            totalSpent: 0
          }
        ];

        setUsers(sampleUsers);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.regNumber && user.regNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (user.staffId && user.staffId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterType === 'all' || user.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleViewUser = async (user: User) => {
    setSelectedUser(user);
    try {
      const bookings = await getBookingsByPassenger(user.id);
      setUserBookings(bookings);
    } catch (error) {
      console.error('Error loading user bookings:', error);
      setUserBookings([]);
    }
    setIsUserDialogOpen(true);
  };

  const handleUserStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast({
      title: "User Status Updated",
      description: `User status changed to ${newStatus}`,
    });
  };

  const studentUsers = filteredUsers.filter(u => u.type === 'student');
  const staffUsers = filteredUsers.filter(u => u.type === 'staff');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage students and staff members across the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <p className="text-3xl font-bold text-green-600">{studentUsers.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Staff</p>
                <p className="text-3xl font-bold text-purple-600">{staffUsers.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold text-orange-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="student">Students Only</SelectItem>
                <SelectItem value="staff">Staff Only</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
          <TabsTrigger value="students">Students ({studentUsers.length})</TabsTrigger>
          <TabsTrigger value="staff">Staff ({staffUsers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete list of students and staff members</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID/Registration</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course/Department</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.regNumber || user.staffId}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.type === 'student' ? 'secondary' : 'outline'}>
                          {user.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.course || user.department}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium text-blue-600">{user.totalBookings}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">
                          ₦{user.totalSpent.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === 'active' ? 'default' :
                          user.status === 'suspended' ? 'destructive' : 'secondary'
                        }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Registered student accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Registration Number</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.regNumber}</TableCell>
                      <TableCell>{user.course}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium text-blue-600">{user.totalBookings}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>Registered staff accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.staffId}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium text-blue-600">{user.totalBookings}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Details Modal */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details: {selectedUser?.name}</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Name</p>
                        <p className="text-muted-foreground">{selectedUser.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="font-medium">Type</p>
                        <Badge>{selectedUser.type}</Badge>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Badge variant={selectedUser.status === 'active' ? 'default' : 'destructive'}>
                          {selectedUser.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">
                          {selectedUser.type === 'student' ? 'Registration Number' : 'Staff ID'}
                        </p>
                        <p className="text-muted-foreground">
                          {selectedUser.regNumber || selectedUser.staffId}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">
                          {selectedUser.type === 'student' ? 'Course' : 'Department'}
                        </p>
                        <p className="text-muted-foreground">
                          {selectedUser.course || selectedUser.department}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Total Bookings</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedUser.totalBookings}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Spent</p>
                        <p className="text-2xl font-bold text-green-600">
                          ₦{selectedUser.totalSpent.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Join Date</p>
                        <p className="text-muted-foreground">{selectedUser.joinDate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Login</p>
                        <p className="text-muted-foreground">{selectedUser.lastLogin || 'Never'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking History */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  {userBookings.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Bus</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Seat</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{booking.busPlateNumber}</TableCell>
                            <TableCell>{booking.routeName}</TableCell>
                            <TableCell>{booking.seatNumber}</TableCell>
                            <TableCell>₦{booking.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={
                                booking.status === 'confirmed' ? 'default' :
                                booking.status === 'cancelled' ? 'destructive' : 'secondary'
                              }>
                                {booking.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No bookings found</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}