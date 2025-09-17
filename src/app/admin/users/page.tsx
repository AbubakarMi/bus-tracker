'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  UserCheck,
  GraduationCap,
  Briefcase,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'staff';
  regNumber?: string;
  staffId?: string;
  department?: string;
  course?: string;
  admissionYear?: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
  totalBookings: number;
  lastBooking?: string;
  emergencyContact?: string;
  address?: string;
}

interface BookingActivity {
  id: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'staff';
  busNumber: string;
  route: string;
  bookingDate: string;
  travelDate: string;
  seatNumber: string;
  amount: number;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  paymentMethod: 'cash' | 'card' | 'transfer';
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@student.adustech.edu.ng',
      phone: '+234 802 123 4567',
      role: 'student',
      regNumber: 'UG20/COMS/1284',
      course: 'Computer Science',
      admissionYear: '2020',
      joinDate: '2023-01-15',
      lastLogin: '2024-03-15 14:30',
      status: 'active',
      totalBookings: 45,
      lastBooking: '2024-03-14',
      address: 'Hotoro, Kano State'
    },
    {
      id: '2',
      name: 'Fatima Aliyu',
      email: 'fatima.aliyu@student.adustech.edu.ng',
      phone: '+234 803 234 5678',
      role: 'student',
      regNumber: 'UG25/BCHM/1003',
      course: 'Biochemistry',
      admissionYear: '2025',
      joinDate: '2024-09-01',
      lastLogin: '2024-03-15 09:15',
      status: 'active',
      totalBookings: 12,
      lastBooking: '2024-03-13',
      address: 'Sabon Gari, Kano State'
    },
    {
      id: '3',
      name: 'Musa Ibrahim',
      email: 'musa.ibrahim@adustech.edu.ng',
      phone: '+234 804 345 6789',
      role: 'staff',
      staffId: 'Staff/Adustech/1022',
      department: 'Transport Department',
      joinDate: '2022-03-10',
      lastLogin: '2024-03-15 11:45',
      status: 'active',
      totalBookings: 78,
      lastBooking: '2024-03-15',
      address: 'Kano Municipal, Kano State'
    },
    {
      id: '4',
      name: 'Aisha Abdullahi',
      email: 'aisha.abdullahi@student.adustech.edu.ng',
      phone: '+234 805 456 7890',
      role: 'student',
      regNumber: 'UG22/CHEM/0987',
      course: 'Chemistry',
      admissionYear: '2022',
      joinDate: '2023-08-20',
      lastLogin: '2024-03-10 16:20',
      status: 'inactive',
      totalBookings: 23,
      lastBooking: '2024-02-28',
      address: 'Nassarawa, Kano State'
    }
  ]);

  const [bookingActivities, setBookingActivities] = useState<BookingActivity[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Ahmed Hassan',
      userRole: 'student',
      busNumber: 'ADUS-001',
      route: 'Campus to City Center',
      bookingDate: '2024-03-14 10:30',
      travelDate: '2024-03-15 07:00',
      seatNumber: '12A',
      amount: 155,
      status: 'completed',
      paymentMethod: 'card'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Fatima Aliyu',
      userRole: 'student',
      busNumber: 'ADUS-002',
      route: 'Campus to Hotoro',
      bookingDate: '2024-03-13 14:15',
      travelDate: '2024-03-14 08:00',
      seatNumber: '08B',
      amount: 98,
      status: 'completed',
      paymentMethod: 'cash'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Musa Ibrahim',
      userRole: 'staff',
      busNumber: 'ADUS-001',
      route: 'Campus to City Center',
      bookingDate: '2024-03-15 09:00',
      travelDate: '2024-03-15 07:00',
      seatNumber: '15C',
      amount: 155,
      status: 'confirmed',
      paymentMethod: 'transfer'
    },
    {
      id: '4',
      userId: '1',
      userName: 'Ahmed Hassan',
      userRole: 'student',
      busNumber: 'ADUS-003',
      route: 'Campus to Sabon Gari',
      bookingDate: '2024-03-12 16:45',
      travelDate: '2024-03-13 09:00',
      seatNumber: '20A',
      amount: 141,
      status: 'no-show',
      paymentMethod: 'card'
    },
    {
      id: '5',
      userId: '4',
      userName: 'Aisha Abdullahi',
      userRole: 'student',
      busNumber: 'ADUS-002',
      route: 'Campus to Hotoro',
      bookingDate: '2024-02-28 11:20',
      travelDate: '2024-03-01 08:00',
      seatNumber: '05A',
      amount: 98,
      status: 'cancelled',
      paymentMethod: 'cash'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<UserData | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.regNumber && user.regNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (user.staffId && user.staffId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewUser = (user: UserData) => {
    setViewingUser(user);
    setIsViewDialogOpen(true);
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setBookingActivities(bookingActivities.filter(activity => activity.userId !== userId));
  };

  const getUserStats = () => {
    const totalUsers = users.length;
    const students = users.filter(u => u.role === 'student').length;
    const staff = users.filter(u => u.role === 'staff').length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalBookings = bookingActivities.length;
    const totalRevenue = bookingActivities
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.amount, 0);

    return { totalUsers, students, staff, activeUsers, totalBookings, totalRevenue };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
      case 'no-show':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'student' ? <GraduationCap className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />;
  };

  const getUserBookings = (userId: string) => {
    return bookingActivities.filter(activity => activity.userId === userId);
  };

  const stats = getUserStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage students and staff users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.students}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.staff}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <div className="text-green-600">₦</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Users and Activity */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="activity">Booking Activity</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users by name, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role & ID</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/avatars/${user.id}.jpg`} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {user.phone && (
                            <div className="flex items-center space-x-1 text-sm">
                              <Phone className="h-3 w-3" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {user.role}
                            </Badge>
                            <p className="text-sm font-mono">
                              {user.regNumber || user.staffId}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{user.lastLogin.split(' ')[0]}</p>
                          <p className="text-gray-500">{user.lastLogin.split(' ')[1]}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-semibold">{user.totalBookings}</p>
                          {user.lastBooking && (
                            <p className="text-xs text-gray-500">Last: {user.lastBooking}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={user.status === 'suspended' ? 'default' : 'destructive'}
                            size="sm"
                            onClick={() => handleSuspendUser(user.id)}
                          >
                            {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Activity Log</CardTitle>
              <CardDescription>Complete log of all user booking activities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Bus & Route</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Travel Date</TableHead>
                    <TableHead>Seat</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(activity.userRole)}
                          <div>
                            <p className="font-medium">{activity.userName}</p>
                            <Badge variant="outline" className="text-xs">
                              {activity.userRole}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{activity.busNumber}</p>
                          <p className="text-sm text-gray-500">{activity.route}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{activity.bookingDate.split(' ')[0]}</p>
                          <p className="text-gray-500">{activity.bookingDate.split(' ')[1]}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{activity.travelDate.split(' ')[0]}</p>
                          <p className="text-gray-500">{activity.travelDate.split(' ')[1]}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono font-semibold">
                        {activity.seatNumber}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₦{activity.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {activity.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details - {viewingUser?.name}</DialogTitle>
            <DialogDescription>
              Complete information about this user
            </DialogDescription>
          </DialogHeader>

          {viewingUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/avatars/${viewingUser.id}.jpg`} />
                  <AvatarFallback className="text-xl">
                    {viewingUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewingUser.name}</h3>
                  <p className="text-gray-600">{viewingUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(viewingUser.status)}>
                      {viewingUser.status}
                    </Badge>
                    <Badge variant="outline">
                      {viewingUser.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Personal Information</h4>
                  <div className="space-y-2">
                    {viewingUser.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{viewingUser.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{viewingUser.email}</span>
                    </div>
                    {viewingUser.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{viewingUser.address}</span>
                      </div>
                    )}
                  </div>

                  <h4 className="font-semibold text-lg">Academic/Professional Info</h4>
                  <div className="space-y-2">
                    {viewingUser.regNumber && (
                      <p><strong>Reg Number:</strong> {viewingUser.regNumber}</p>
                    )}
                    {viewingUser.staffId && (
                      <p><strong>Staff ID:</strong> {viewingUser.staffId}</p>
                    )}
                    {viewingUser.course && (
                      <p><strong>Course:</strong> {viewingUser.course}</p>
                    )}
                    {viewingUser.department && (
                      <p><strong>Department:</strong> {viewingUser.department}</p>
                    )}
                    {viewingUser.admissionYear && (
                      <p><strong>Admission Year:</strong> {viewingUser.admissionYear}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Account Information</h4>
                  <div className="space-y-2">
                    <p><strong>Join Date:</strong> {viewingUser.joinDate}</p>
                    <p><strong>Last Login:</strong> {viewingUser.lastLogin}</p>
                    <p><strong>Total Bookings:</strong> {viewingUser.totalBookings}</p>
                    {viewingUser.lastBooking && (
                      <p><strong>Last Booking:</strong> {viewingUser.lastBooking}</p>
                    )}
                  </div>

                  <h4 className="font-semibold text-lg">Recent Bookings</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {getUserBookings(viewingUser.id).slice(0, 5).map((booking) => (
                      <div key={booking.id} className="p-2 border rounded text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{booking.busNumber}</span>
                          <Badge className={getStatusColor(booking.status)} variant="outline">
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-gray-500">{booking.route}</p>
                        <p className="text-xs text-gray-400">{booking.travelDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}