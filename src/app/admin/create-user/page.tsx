'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, GraduationCap, Briefcase, CheckCircle, XCircle } from 'lucide-react';

export default function CreateUserPage() {
  const [studentData, setStudentData] = useState({
    regNumber: '',
    name: '',
    email: '',
    course: '',
    password: ''
  });

  const [staffData, setStaffData] = useState({
    staffId: '',
    name: '',
    email: '',
    department: '',
    password: ''
  });

  const [studentResult, setStudentResult] = useState<{ success: boolean; message: string } | null>(null);
  const [staffResult, setStaffResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateStudent = () => {
    try {
      // Direct localStorage save
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

      const newStudent = {
        id: studentData.regNumber,
        role: 'student' as const,
        regNumber: studentData.regNumber,
        name: studentData.name,
        email: studentData.email.toLowerCase(),
        course: studentData.course,
        admissionYear: '20' + studentData.regNumber.substring(2, 4),
        password: studentData.password
      };

      // Save with both ID and email
      registeredUsers[newStudent.id] = newStudent;
      registeredUsers[newStudent.email] = newStudent;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      console.log('✅ Student created:', newStudent);

      setStudentResult({
        success: true,
        message: `Student created! Login with ${studentData.regNumber} and password: ${studentData.password}`
      });

      // Clear form
      setStudentData({ regNumber: '', name: '', email: '', course: '', password: '' });
    } catch (error) {
      setStudentResult({
        success: false,
        message: 'Failed to create student: ' + (error as Error).message
      });
    }
  };

  const handleCreateStaff = () => {
    try {
      // Direct localStorage save
      const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');

      const newStaff = {
        id: staffData.staffId,
        role: 'staff' as const,
        staffId: staffData.staffId,
        name: staffData.name,
        email: staffData.email.toLowerCase(),
        department: staffData.department,
        password: staffData.password
      };

      // Save with both ID and email
      registeredStaff[newStaff.id] = newStaff;
      registeredStaff[newStaff.email] = newStaff;
      localStorage.setItem('registeredStaff', JSON.stringify(registeredStaff));

      console.log('✅ Staff created:', newStaff);

      setStaffResult({
        success: true,
        message: `Staff created! Login with ${staffData.staffId} and password: ${staffData.password}`
      });

      // Clear form
      setStaffData({ staffId: '', name: '', email: '', department: '', password: '' });
    } catch (error) {
      setStaffResult({
        success: false,
        message: 'Failed to create staff: ' + (error as Error).message
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserPlus className="h-8 w-8" />
          Create Users
        </h1>
        <p className="text-muted-foreground mt-2">
          Create student and staff accounts that can login immediately
        </p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">
            <GraduationCap className="h-4 w-4 mr-2" />
            Student
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Briefcase className="h-4 w-4 mr-2" />
            Staff
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Create Student Account</CardTitle>
              <CardDescription>
                Student will be able to login immediately with these credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-regNumber">Registration Number *</Label>
                <Input
                  id="student-regNumber"
                  placeholder="UG20/COMS/1184"
                  value={studentData.regNumber}
                  onChange={(e) => setStudentData({ ...studentData, regNumber: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-name">Full Name *</Label>
                <Input
                  id="student-name"
                  placeholder="Ahmed Hassan"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-email">Email *</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="ahmed.hassan@student.adustech.edu.ng"
                  value={studentData.email}
                  onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-course">Course *</Label>
                <Input
                  id="student-course"
                  placeholder="Computer Science"
                  value={studentData.course}
                  onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-password">Password *</Label>
                <Input
                  id="student-password"
                  type="text"
                  placeholder="Enter password"
                  value={studentData.password}
                  onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  This is the password the student will use to login
                </p>
              </div>

              {studentResult && (
                <Alert variant={studentResult.success ? 'default' : 'destructive'}>
                  <div className="flex items-start gap-2">
                    {studentResult.success ? (
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 mt-0.5" />
                    )}
                    <AlertDescription>{studentResult.message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <Button
                onClick={handleCreateStudent}
                className="w-full"
                disabled={!studentData.regNumber || !studentData.name || !studentData.email || !studentData.password}
              >
                Create Student Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Create Staff Account</CardTitle>
              <CardDescription>
                Staff will be able to login immediately with these credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staff-staffId">Staff ID *</Label>
                <Input
                  id="staff-staffId"
                  placeholder="Staff/Adustech/1001"
                  value={staffData.staffId}
                  onChange={(e) => setStaffData({ ...staffData, staffId: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-name">Full Name *</Label>
                <Input
                  id="staff-name"
                  placeholder="Dr. Ibrahim Musa"
                  value={staffData.name}
                  onChange={(e) => setStaffData({ ...staffData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-email">Email *</Label>
                <Input
                  id="staff-email"
                  type="email"
                  placeholder="ibrahim.musa@adustech.edu.ng"
                  value={staffData.email}
                  onChange={(e) => setStaffData({ ...staffData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-department">Department *</Label>
                <Select
                  value={staffData.department}
                  onValueChange={(value) => setStaffData({ ...staffData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transport Department">Transport Department</SelectItem>
                    <SelectItem value="Academic Affairs">Academic Affairs</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="IT Department">IT Department</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Student Affairs">Student Affairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-password">Password *</Label>
                <Input
                  id="staff-password"
                  type="text"
                  placeholder="Enter password"
                  value={staffData.password}
                  onChange={(e) => setStaffData({ ...staffData, password: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  This is the password the staff will use to login
                </p>
              </div>

              {staffResult && (
                <Alert variant={staffResult.success ? 'default' : 'destructive'}>
                  <div className="flex items-start gap-2">
                    {staffResult.success ? (
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 mt-0.5" />
                    )}
                    <AlertDescription>{staffResult.message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <Button
                onClick={handleCreateStaff}
                className="w-full"
                disabled={!staffData.staffId || !staffData.name || !staffData.email || !staffData.password}
              >
                Create Staff Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}