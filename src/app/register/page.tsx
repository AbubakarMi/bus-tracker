'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { registerStudent, registerStaff, isValidStudentRegNo, isValidStaffId } from '@/lib/auth-utils';

// Course mapping based on registration number prefix
const COURSE_MAPPING: { [key: string]: string } = {
  'COMS': 'Computer Science',
  'ICT': 'Information Communication Technology',
  'BIOL': 'Biology',
  'MATHS': 'Mathematics',
  'STA': 'Statistics',
  'CRS': 'Crop Science',
  'BIOC': 'Biochemistry',
  'CHEM': 'Chemistry'
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff' | null>(null);
  const [detectedCourse, setDetectedCourse] = useState('');
  const [regInput, setRegInput] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  // Auto-detect user type and course based on input
  useEffect(() => {
    if (!regInput.trim()) {
      setUserType(null);
      setDetectedCourse('');
      return;
    }

    // Check if it's a student registration number
    if (isValidStudentRegNo(regInput)) {
      setUserType('student');
      // Extract course from registration number (e.g., UG20/COMS/1284)
      const parts = regInput.split('/');
      if (parts.length >= 2) {
        const courseCode = parts[1].toUpperCase();
        const course = COURSE_MAPPING[courseCode] || courseCode;
        setDetectedCourse(course);
        setFormData(prev => ({ ...prev, course }));
      }
    }
    // Check if it's a staff ID
    else if (isValidStaffId(regInput)) {
      setUserType('staff');
      setDetectedCourse('');
    }
    else {
      setUserType(null);
      setDetectedCourse('');
    }
  }, [regInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userType) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid registration number or staff ID",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
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

    let result;
    if (userType === 'student') {
      result = await registerStudent(
        regInput,
        formData.password,
        formData.name,
        formData.course || detectedCourse
      );
    } else {
      result = await registerStaff(
        regInput,
        formData.password,
        formData.name,
        formData.department
      );
    }

    if (result) {
      toast({
        title: "Registration Successful!",
        description: `You can now log in with your ${userType === 'student' ? 'registration number' : 'staff ID'} and password.`,
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="regInput">Registration Number / Staff ID *</Label>
              <Input
                id="regInput"
                placeholder="UG20/COMS/1284 or Staff/Adustech/1022"
                value={regInput}
                onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                required
              />
              <p className="text-xs text-muted-foreground">
                Format: UGYear/Course/Number (for students) or Staff/Adustech/Number (for staff)
              </p>
              {userType && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Detected as: {userType === 'student' ? 'Student' : 'Staff'}
                  {detectedCourse && ` - ${detectedCourse}`}
                </p>
              )}
            </div>

            {userType && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                {userType === 'student' && (
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input
                      id="course"
                      placeholder="Course name"
                      value={formData.course || detectedCourse}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      readOnly={!!detectedCourse}
                      className={detectedCourse ? "bg-muted" : ""}
                    />
                    {detectedCourse && (
                      <p className="text-xs text-muted-foreground">
                        Auto-detected from registration number
                      </p>
                    )}
                  </div>
                )}

                {userType === 'staff' && (
                  <div className="space-y-2">
                    <Label htmlFor="department">Department (Optional)</Label>
                    <Input
                      id="department"
                      placeholder="Your department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
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
                  {isLoading ? 'Creating Account...' : `Register as ${userType === 'student' ? 'Student' : 'Staff'}`}
                </Button>
              </>
            )}
          </form>

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