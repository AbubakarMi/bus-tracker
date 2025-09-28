'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle, User, GraduationCap, Users, BookOpen, Building, Lock, Sparkles, Shield, Globe, Zap, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { registerStudent, registerStaff, isValidStudentRegNo, isValidStaffId, getDashboardPath } from '@/lib/auth-utils';
import { Logo } from '@/components/logo';
import { WorldClassWelcomePopup } from '@/components/world-class-welcome-popup';
import { cn } from '@/lib/utils';

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

const departmentOptions = [
  'Transport Department',
  'Academic Affairs',
  'Administration',
  'IT Department',
  'Security',
  'Maintenance',
  'Human Resources',
  'Finance',
  'Student Affairs'
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [userType, setUserType] = useState<'student' | 'staff' | null>(null);
  const [detectedCourse, setDetectedCourse] = useState('');
  const [regInput, setRegInput] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  // Validation states
  const [validations, setValidations] = useState({
    regInput: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  // Auto-detect user type and course based on input
  useEffect(() => {
    if (!regInput.trim()) {
      setUserType(null);
      setDetectedCourse('');
      setValidations(prev => ({ ...prev, regInput: false }));
      return;
    }

    // Check if it's a student registration number
    if (isValidStudentRegNo(regInput)) {
      setUserType('student');
      setValidations(prev => ({ ...prev, regInput: true }));
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
      setValidations(prev => ({ ...prev, regInput: true }));
      setDetectedCourse('');
    }
    else {
      setUserType(null);
      setDetectedCourse('');
      setValidations(prev => ({ ...prev, regInput: false }));
    }
  }, [regInput]);

  // Validation functions
  const validateName = (name: string) => {
    const isValid = name.trim().length >= 2;
    setValidations(prev => ({ ...prev, name: isValid }));
    return isValid;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setValidations(prev => ({ ...prev, email: isValid }));
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = password.length >= 6;
    setValidations(prev => ({ ...prev, password: isValid }));
    return isValid;
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    const isValid = confirmPassword === password && confirmPassword.length > 0;
    setValidations(prev => ({ ...prev, confirmPassword: isValid }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Comprehensive validation
    const newErrors: Record<string, string> = {};

    if (!userType) {
      newErrors.regInput = "Please enter a valid registration number or staff ID";
    }

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      let result;
      if (userType === 'student') {
        result = await registerStudent(
          regInput,
          formData.password,
          formData.name,
          formData.course || detectedCourse,
          formData.email
        );
      } else {
        result = await registerStaff(
          regInput,
          formData.password,
          formData.name,
          formData.department,
          formData.email
        );
      }

      if (result) {
        // Set authentication state immediately after successful registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(result));

        // Set user data for welcome popup and show it
        setRegisteredUser(result);
        setShowWelcomePopup(true);
      } else {
        throw new Error('Registration failed - user may already exist');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "User already exists. Try logging in.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && userType && regInput.trim()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-primary/8 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-accent/8 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block space-y-8"
            >
              <div className="text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center justify-center lg:justify-start mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Logo />
                </motion.div>

                <motion.h1
                  className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Join ADUSTECH
                  <br />
                  Smart Transport
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-600 mt-4 max-w-md mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Experience seamless campus transportation with our intelligent bus tracking system
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { icon: Globe, label: "Real-time Tracking", color: "text-primary" },
                  { icon: Shield, label: "Secure Platform", color: "text-accent" },
                  { icon: Zap, label: "Instant Updates", color: "text-primary" },
                  { icon: Sparkles, label: "Smart Features", color: "text-accent" }
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className={cn("h-5 w-5", feature.color)} />
                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl relative overflow-hidden">
                {/* Card background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full translate-y-12 -translate-x-12" />

                <CardHeader className="space-y-4 pb-6 relative z-10">
                  {/* Mobile Logo */}
                  <div className="lg:hidden text-center mb-4">
                    <motion.div
                      className="inline-flex items-center justify-center relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <Logo />
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="gap-2 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Login
                      </Button>
                    </Link>

                    {/* Step Indicator */}
                    <div className="flex items-center space-x-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                        step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        1
                      </div>
                      <div className={cn(
                        "w-12 h-0.5 transition-all",
                        step >= 2 ? "bg-primary" : "bg-muted"
                      )} />
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                        step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        2
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <motion.h1
                      className="font-headline text-3xl md:text-4xl font-bold tracking-tight relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {step === 1 ? (
                        <>
                          <span className="block text-foreground">Join Our</span>
                          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Smart Campus
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="block text-foreground">Almost</span>
                          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            There!
                          </span>
                          <motion.span
                            className="inline-block ml-2 text-2xl"
                            animate={{
                              rotate: [0, 15, -15, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            🎉
                          </motion.span>
                        </>
                      )}
                    </motion.h1>

                    <motion.p
                      className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto mt-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {step === 1
                        ? "Enter your credentials to unlock seamless campus transportation. Your journey begins here!"
                        : "Complete your profile to access your personalized dashboard and start exploring."
                      }
                    </motion.p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-3">
                          <Label htmlFor="regInput" className="text-base font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Registration Number / Staff ID
                          </Label>
                          <div className="relative">
                            <Input
                              id="regInput"
                              placeholder="Enter your reg no/staff id"
                              value={regInput}
                              onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                              className={cn(
                                "h-12 text-lg transition-all duration-300 pr-12",
                                validations.regInput ? "border-accent bg-accent/5" : "",
                                errors.regInput ? "border-destructive bg-destructive/5" : ""
                              )}
                            />
                            {validations.regInput && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
                            )}
                            {errors.regInput && (
                              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                            )}
                          </div>

                          {errors.regInput && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              {errors.regInput}
                            </p>
                          )}
                        </div>

                        <AnimatePresence>
                          {userType && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4"
                            >
                              <div className="flex items-center gap-3">
                                {userType === 'student' ? (
                                  <GraduationCap className="h-6 w-6 text-blue-500" />
                                ) : (
                                  <Users className="h-6 w-6 text-green-500" />
                                )}
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    ✓ Detected as {userType === 'student' ? 'Student' : 'Staff'}
                                  </p>
                                  {detectedCourse && (
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                      <BookOpen className="h-3 w-3" />
                                      {detectedCourse}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Button
                          onClick={handleNext}
                          disabled={!userType || !regInput.trim()}
                          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                        >
                          Continue to Details
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <form onSubmit={handleSubmit} className="space-y-5">
                          {/* Personal Information Section */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-2 bg-blue-500 rounded-lg">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                            </div>

                            <div className="grid gap-4">
                              {/* Name Field */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-2"
                              >
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  Full Name
                                </Label>
                                <div className="relative group">
                                  <Input
                                    id="name"
                                    placeholder="e.g., John Doe"
                                    value={formData.name}
                                    onChange={(e) => {
                                      setFormData({...formData, name: e.target.value});
                                      validateName(e.target.value);
                                    }}
                                    className={cn(
                                      "h-11 border-2 transition-all duration-300 pl-4 pr-12 bg-white/80 backdrop-blur-sm",
                                      "focus:bg-white focus:border-blue-500 focus:ring-0 focus:ring-blue-200",
                                      "group-hover:border-blue-300",
                                      validations.name ? "border-green-500 bg-green-50/30" : "",
                                      errors.name ? "border-red-500 bg-red-50/30" : ""
                                    )}
                                    required
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {validations.name && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-1 bg-green-100 rounded-full"
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      </motion.div>
                                    )}
                                    {errors.name && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-1 bg-red-100 rounded-full"
                                      >
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                                {errors.name && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <XCircle className="h-3 w-3" />
                                    {errors.name}
                                  </motion.p>
                                )}
                              </motion.div>

                              {/* Email Field */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                              >
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  Email Address
                                </Label>
                                <div className="relative group">
                                  <Input
                                    id="email"
                                    type="email"
                                    placeholder="e.g., john.doe@example.com"
                                    value={formData.email}
                                    onChange={(e) => {
                                      setFormData({...formData, email: e.target.value});
                                      validateEmail(e.target.value);
                                    }}
                                    className={cn(
                                      "h-11 border-2 transition-all duration-300 pl-4 pr-12 bg-white/80 backdrop-blur-sm",
                                      "focus:bg-white focus:border-blue-500 focus:ring-0 focus:ring-blue-200",
                                      "group-hover:border-blue-300",
                                      validations.email ? "border-green-500 bg-green-50/30" : "",
                                      errors.email ? "border-red-500 bg-red-50/30" : ""
                                    )}
                                    required
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {validations.email && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-1 bg-green-100 rounded-full"
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      </motion.div>
                                    )}
                                    {errors.email && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-1 bg-red-100 rounded-full"
                                      >
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                                {errors.email && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <XCircle className="h-3 w-3" />
                                    {errors.email}
                                  </motion.p>
                                )}
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  Used for password reset and notifications
                                </p>
                              </motion.div>
                            </div>
                          </div>

                          {/* Academic/Work Information Section */}
                          {userType && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-green-500 rounded-lg">
                                  {userType === 'student' ? (
                                    <GraduationCap className="h-4 w-4 text-white" />
                                  ) : (
                                    <Building className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {userType === 'student' ? 'Academic Information' : 'Work Information'}
                                </h3>
                              </div>

                              {userType === 'student' && (
                                <div className="space-y-2">
                                  <Label htmlFor="course" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Course of Study
                                  </Label>
                                  <div className="relative group">
                                    <Input
                                      id="course"
                                      placeholder="e.g., Computer Science"
                                      value={formData.course || detectedCourse}
                                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                                      readOnly={!!detectedCourse}
                                      className={cn(
                                        "h-11 border-2 transition-all duration-300 pl-4 bg-white/80 backdrop-blur-sm",
                                        "focus:bg-white focus:border-green-500 focus:ring-0",
                                        "group-hover:border-green-300",
                                        detectedCourse ? "bg-green-50/50 text-green-800 border-green-300" : ""
                                      )}
                                    />
                                    {detectedCourse && (
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="p-1 bg-green-100 rounded-full"
                                        >
                                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        </motion.div>
                                      </div>
                                    )}
                                  </div>
                                  {detectedCourse && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="text-xs text-green-600 flex items-center gap-1"
                                    >
                                      <Sparkles className="h-3 w-3" />
                                      Auto-detected from your registration number
                                    </motion.p>
                                  )}
                                </div>
                              )}

                              {userType === 'staff' && (
                                <div className="space-y-2">
                                  <Label htmlFor="department" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Department
                                  </Label>
                                  <div className="relative group">
                                    <select
                                      id="department"
                                      value={formData.department}
                                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                                      className={cn(
                                        "w-full h-11 px-4 border-2 rounded-lg transition-all duration-300 bg-white/80 backdrop-blur-sm",
                                        "focus:bg-white focus:border-green-500 focus:ring-0",
                                        "group-hover:border-green-300 text-gray-700"
                                      )}
                                    >
                                      <option value="">Select department (optional)</option>
                                      {departmentOptions.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Building className="h-3 w-3" />
                                    Optional - helps us organize staff by department
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* Security Section */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-2 bg-purple-500 rounded-lg">
                                <Lock className="h-4 w-4 text-white" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-800">Security Setup</h3>
                            </div>

                            <div className="space-y-4">
                              {/* Password Field */}
                              <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                  Create Password
                                </Label>
                                <div className="relative group">
                                  <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter a strong password (min 6 characters)"
                                    value={formData.password}
                                    onChange={(e) => {
                                      setFormData({...formData, password: e.target.value});
                                      validatePassword(e.target.value);
                                      if (formData.confirmPassword) {
                                        validateConfirmPassword(formData.confirmPassword, e.target.value);
                                      }
                                    }}
                                    className={cn(
                                      "h-11 border-2 transition-all duration-300 pl-4 pr-20 bg-white/80 backdrop-blur-sm",
                                      "focus:bg-white focus:border-purple-500 focus:ring-0",
                                      "group-hover:border-purple-300",
                                      validations.password ? "border-green-500 bg-green-50/30" : "",
                                      errors.password ? "border-red-500 bg-red-50/30" : ""
                                    )}
                                    required
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {validations.password && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-1 bg-green-100 rounded-full"
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      </motion.div>
                                    )}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="h-8 w-8 p-0 hover:bg-purple-100 rounded-full transition-colors"
                                    >
                                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </div>
                                {errors.password && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <XCircle className="h-3 w-3" />
                                    {errors.password}
                                  </motion.p>
                                )}
                              </div>

                              {/* Confirm Password Field */}
                              <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                  Confirm Password
                                </Label>
                                <div className="relative group">
                                  <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                      setFormData({...formData, confirmPassword: e.target.value});
                                      validateConfirmPassword(e.target.value, formData.password);
                                    }}
                                    className={cn(
                                      "h-11 border-2 transition-all duration-300 pl-4 pr-20 bg-white/80 backdrop-blur-sm",
                                      "focus:bg-white focus:border-purple-500 focus:ring-0",
                                      "group-hover:border-purple-300",
                                      validations.confirmPassword ? "border-green-500 bg-green-50/30" : "",
                                      errors.confirmPassword ? "border-red-500 bg-red-50/30" : ""
                                    )}
                                    required
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {validations.confirmPassword && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="p-1 bg-green-100 rounded-full"
                                      >
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      </motion.div>
                                    )}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      className="h-8 w-8 p-0 hover:bg-purple-100 rounded-full transition-colors"
                                    >
                                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </div>
                                {errors.confirmPassword && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <XCircle className="h-3 w-3" />
                                    {errors.confirmPassword}
                                  </motion.p>
                                )}

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 p-3 bg-white/60 rounded-lg border border-purple-200"
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <Shield className="h-4 w-4 text-purple-600" />
                                      <span className="text-sm font-medium text-gray-700">Password Security</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className={cn(
                                        "flex items-center gap-1",
                                        formData.password.length >= 6 ? "text-green-600" : "text-gray-400"
                                      )}>
                                        {formData.password.length >= 6 ?
                                          <CheckCircle2 className="h-3 w-3" /> :
                                          <XCircle className="h-3 w-3" />
                                        }
                                        6+ characters
                                      </div>
                                      <div className={cn(
                                        "flex items-center gap-1",
                                        validations.confirmPassword ? "text-green-600" : "text-gray-400"
                                      )}>
                                        {validations.confirmPassword ?
                                          <CheckCircle2 className="h-3 w-3" /> :
                                          <XCircle className="h-3 w-3" />
                                        }
                                        Passwords match
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>

                          {/* Action Buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-4 pt-6"
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1"
                            >
                              <Button
                                type="button"
                                onClick={handleBack}
                                variant="outline"
                                className="w-full h-12 text-base font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                              >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Back
                              </Button>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-2"
                            >
                              <Button
                                type="submit"
                                disabled={isLoading || isRedirecting || !Object.values(validations).every(Boolean)}
                                className={cn(
                                  "w-full h-12 text-base font-semibold text-white shadow-xl relative overflow-hidden",
                                  "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
                                  "hover:from-blue-700 hover:via-purple-700 hover:to-pink-700",
                                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                                  "transition-all duration-300"
                                )}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{ duration: 0.6 }}
                                />
                                <span className="relative z-10 flex items-center justify-center">
                                  {isLoading ? (
                                <motion.div
                                  className="flex items-center"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <motion.div
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  Creating Account...
                                </motion.div>
                              ) : isRedirecting ? (
                                <motion.div
                                  className="flex items-center"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <motion.div
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  Redirecting to Dashboard...
                                </motion.div>
                              ) : (
                                "Complete Registration"
                              )}
                                </span>
                            </Button>
                          </motion.div>
                          </motion.div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer */}
                  <div className="text-center pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Welcome Popup */}
      {showWelcomePopup && registeredUser && (
        <WorldClassWelcomePopup
          user={registeredUser}
          isVisible={showWelcomePopup}
          onClose={() => {
            setShowWelcomePopup(false);
          }}
          onContinue={() => {
            setShowWelcomePopup(false);
            // This will be handled by the popup component
          }}
          isNewUser={true}
        />
      )}
    </div>
  );
}