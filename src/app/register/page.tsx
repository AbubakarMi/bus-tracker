'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, GraduationCap, Users, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { registerStudent, registerStaff, isValidStudentRegNo, isValidStaffId } from '@/lib/auth-utils';

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Student form state
  const [studentForm, setStudentForm] = useState({
    regNumber: '',
    name: '',
    course: '',
    password: '',
    confirmPassword: ''
  });

  // Staff form state
  const [staffForm, setStaffForm] = useState({
    staffId: '',
    name: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidStudentRegNo(studentForm.regNumber)) {
      toast({
        title: "Invalid Registration Number",
        description: "Please use format: UG20/COMS/1284",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (studentForm.password !== studentForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (studentForm.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = registerStudent(
      studentForm.regNumber,
      studentForm.password,
      studentForm.name,
      studentForm.course
    );

    if (result) {
      toast({
        title: "Registration Successful!",
        description: "You can now log in with your registration number and password.",
      });
      router.push('/login');
    } else {
      toast({
        title: "Registration Failed",
        description: "Please check your details and try again.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  const handleStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidStaffId(staffForm.staffId)) {
      toast({
        title: "Invalid Staff ID",
        description: "Please use format: Staff/Adustech/1022",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (staffForm.password !== staffForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (staffForm.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = registerStaff(
      staffForm.staffId,
      staffForm.password,
      staffForm.name,
      staffForm.department
    );

    if (result) {
      toast({
        title: "Registration Successful!",
        description: "You can now log in with your staff ID and password.",
      });
      router.push('/login');
    } else {
      toast({
        title: "Registration Failed",
        description: "Please check your details and try again.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Register for ADUSTECH Bus Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="staff" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Staff
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4">
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number *</Label>
                  <Input
                    id="regNumber"
                    placeholder="UG20/COMS/1284"
                    value={studentForm.regNumber}
                    onChange={(e) => setStudentForm({...studentForm, regNumber: e.target.value.toUpperCase()})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Format: UGYear/Course/Number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentName">Full Name *</Label>
                  <Input
                    id="studentName"
                    placeholder="Your full name"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course (Optional)</Label>
                  <Select onValueChange={(value) => setStudentForm({...studentForm, course: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentPassword">Password *</Label>
                  <div className="relative">
                    <Input
                      id="studentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({...studentForm, password: e.target.value})}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentConfirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="studentConfirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={studentForm.confirmPassword}
                      onChange={(e) => setStudentForm({...studentForm, confirmPassword: e.target.value})}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Register as Student'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="staff" className="space-y-4">
              <form onSubmit={handleStaffSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="staffId">Staff ID *</Label>
                  <Input
                    id="staffId"
                    placeholder="Staff/Adustech/1022"
                    value={staffForm.staffId}
                    onChange={(e) => setStaffForm({...staffForm, staffId: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Format: Staff/Adustech/Number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staffName">Full Name *</Label>
                  <Input
                    id="staffName"
                    placeholder="Your full name"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({...staffForm, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department (Optional)</Label>
                  <Select onValueChange={(value) => setStaffForm({...staffForm, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transport Department">Transport Department</SelectItem>
                      <SelectItem value="Academic Affairs">Academic Affairs</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="IT Department">IT Department</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staffPassword">Password *</Label>
                  <div className="relative">
                    <Input
                      id="staffPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={staffForm.password}
                      onChange={(e) => setStaffForm({...staffForm, password: e.target.value})}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staffConfirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="staffConfirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={staffForm.confirmPassword}
                      onChange={(e) => setStaffForm({...staffForm, confirmPassword: e.target.value})}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Register as Staff'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}