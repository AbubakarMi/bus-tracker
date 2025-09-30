
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { RoadAnimation } from '@/components/auth/road-animation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { auth as staticAuth, isFirebaseConfigured } from '@/lib/firebase';
import { Loader2, AlertTriangle, Mail, Shield, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, Lock, GraduationCap, Users, Crown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { authenticateUser, detectUserRole, getDashboardPath, formatDisplayName, type UserRole, type UserData } from '@/lib/auth-utils';
import { WorldClassWelcomePopup } from '@/components/world-class-welcome-popup';
import { seedUsersToLocalStorage, checkLocalStorageUsers } from '@/lib/seed-users';
import '@/lib/admin-user-management'; // Load admin utilities

const loginFormSchema = z.object({
  identifier: z.string().min(1, 'Please enter your credentials'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [detectedRole, setDetectedRole] = React.useState<UserRole | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState<UserData | null>(null);
  const [showDebugPanel, setShowDebugPanel] = React.useState(false);
  const [registeredUsersCount, setRegisteredUsersCount] = React.useState({ students: 0, staff: 0 });
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const identifier = form.watch('identifier');

  // Auto-seed test users on component mount if localStorage is empty
  React.useEffect(() => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');

    // Count unique users (divide by 2 because we store by both ID and email)
    const uniqueStudents = new Set(Object.values(registeredUsers).map((u: any) => u.id)).size;
    const uniqueStaff = new Set(Object.values(registeredStaff).map((u: any) => u.id)).size;

    setRegisteredUsersCount({ students: uniqueStudents, staff: uniqueStaff });

    if (uniqueStudents === 0 && uniqueStaff === 0) {
      console.log('🌱 No users found in localStorage, seeding test users...');
      const result = seedUsersToLocalStorage();
      if (result.success) {
        toast({
          title: 'Test Users Loaded',
          description: 'Sample users have been added for testing. Check console for credentials.',
        });
        // Update count after seeding
        const newRegisteredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const newRegisteredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
        const newUniqueStudents = new Set(Object.values(newRegisteredUsers).map((u: any) => u.id)).size;
        const newUniqueStaff = new Set(Object.values(newRegisteredStaff).map((u: any) => u.id)).size;
        setRegisteredUsersCount({ students: newUniqueStudents, staff: newUniqueStaff });
      }
    } else {
      console.log(`📊 Found ${uniqueStudents} students and ${uniqueStaff} staff in localStorage`);
    }

    // Log available users for debugging
    checkLocalStorageUsers();
  }, []);

  React.useEffect(() => {
    if (identifier) {
      const role = detectUserRole(identifier);
      setDetectedRole(role);
    } else {
      setDetectedRole(null);
    }
  }, [identifier]);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Authenticate user using the new system
      const user = await authenticateUser(values.identifier, values.password);

      if (user) {
        // Store auth state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(user));

        // Set user data and show welcome popup
        setLoggedInUser(user);
        setShowWelcomePopup(true);

        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${formatDisplayName(user)}!`,
        });
      } else {
        // Get available users to provide helpful error message
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
        const studentCount = Object.keys(registeredUsers).length / 2; // Divided by 2 because we store by both ID and email
        const staffCount = Object.keys(registeredStaff).length / 2;

        let helpMessage = 'User not found. ';
        if (studentCount === 0 && staffCount === 0) {
          helpMessage += 'No users registered yet. Please register first or use test credentials from the box below.';
        } else {
          helpMessage += `${Math.floor(studentCount)} student(s) and ${Math.floor(staffCount)} staff registered. Check test credentials below or register a new account.`;
        }

        throw new Error(helpMessage);
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'Please check your credentials and try again.',
        duration: 6000, // Show for 6 seconds so user can read it
      });
    } finally {
      setIsLoading(false);
    }
  }

  function getRoleIcon(role: UserRole | null) {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-purple-500" />;
      case 'driver':
        return <Users className="h-4 w-4 text-teal-500" />;
      case 'student':
        return <GraduationCap className="h-4 w-4 text-blue-500" />;
      case 'staff':
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  }

  function getRoleLabel(role: UserRole | null) {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'driver':
        return 'Driver';
      case 'student':
        return 'Student';
      case 'staff':
        return 'Staff';
      default:
        return null;
    }
  }

  return (
    <div className="container relative min-h-screen w-full lg:grid lg:grid-cols-2 xl:min-h-[800px]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <motion.div 
        className="flex items-center justify-center py-12 relative z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mx-auto grid w-[420px] gap-8">
          <motion.div 
            className="grid gap-4 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Enhanced Logo Section */}
            <motion.div 
              className="mb-6 flex justify-center relative"
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

            {/* Enhanced Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-2"
            >
              <motion.h1 
                className="font-headline text-4xl md:text-5xl font-bold tracking-tight relative"
              >
                <span className="block">Welcome</span>
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Back Home
                </span>
                <motion.span
                  className="inline-block ml-3 text-3xl"
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
                  👋
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Sign in to continue your seamless campus transportation journey. 
                <span className="font-semibold text-primary"> Your bus is waiting!</span>
              </motion.p>
            </motion.div>

            {/* Role Detection Indicator */}
            <AnimatePresence>
              {detectedRole && (
                <motion.div
                  className="flex justify-center mt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full border border-primary/20">
                    {getRoleIcon(detectedRole)}
                    <span className="text-sm font-medium text-primary">
                      {getRoleLabel(detectedRole)} Detected
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div 
                className="glass-card p-3 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="h-5 w-5 text-primary mx-auto mb-1" />
                </motion.div>
                <p className="text-xs font-semibold">Smart Login</p>
              </motion.div>
              <motion.div 
                className="glass-card p-3 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="h-5 w-5 text-green-500 mx-auto mb-1" />
                </motion.div>
                <p className="text-xs font-semibold">Secure Access</p>
              </motion.div>
            </motion.div>
          </motion.div>


          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                {/* Enhanced Identifier Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          Student Reg No / Staff ID / Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="Enter your login credentials"
                              {...field}
                              className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm pl-4 pr-16"
                            />
                            <AnimatePresence>
                              {detectedRole && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  <div className="flex items-center gap-2 bg-background/80 rounded-full px-2 py-1 border">
                                    {getRoleIcon(detectedRole)}
                                    <span className="text-xs font-medium">{getRoleLabel(detectedRole)}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Enhanced Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <Lock className="h-4 w-4 text-primary" />
                            Password
                          </FormLabel>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href="/forgot-password"
                              className="text-sm text-primary hover:text-accent transition-colors duration-200 relative group"
                            >
                              <span className="relative z-10">Forgot password?</span>
                              <motion.div
                                className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                              />
                            </Link>
                          </motion.div>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Enter your password" 
                              {...field} 
                              className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm pr-12"
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </motion.button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  className="pt-4"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-semibold gradient-bg-primary text-white hover:scale-105 transition-all duration-300 glow-primary shadow-xl disabled:hover:scale-100 disabled:opacity-50" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          Signing you in...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Sign In
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowRight className="ml-3 h-5 w-5" />
                          </motion.div>
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3"
                >
                  <Shield className="h-4 w-4 inline mr-2 text-primary" />
                  Your login is protected with enterprise-grade security
                </motion.div>
              </form>
            </Form>
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div
            className="mt-6 text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            {/* Test Credentials Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Test Credentials
                </h4>
                <div className="text-xs bg-white/80 rounded px-2 py-1">
                  <span className="text-primary font-semibold">{registeredUsersCount.students}</span> students ·
                  <span className="text-green-600 font-semibold ml-1">{registeredUsersCount.staff}</span> staff
                </div>
              </div>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/60 rounded p-2">
                    <p className="font-medium text-primary">Student</p>
                    <p className="font-mono">UG20/COMS/1184</p>
                    <p className="text-gray-500">password123</p>
                  </div>
                  <div className="bg-white/60 rounded p-2">
                    <p className="font-medium text-green-600">Staff</p>
                    <p className="font-mono text-[10px]">Staff/Adustech/1001</p>
                    <p className="text-gray-500">password123</p>
                  </div>
                </div>
                <div className="bg-white/60 rounded p-2">
                  <p className="font-medium text-purple-600">Admin</p>
                  <p className="font-mono text-[10px]">admin@adustech.edu.ng</p>
                  <p className="text-gray-500">pass123</p>
                </div>
                <button
                  onClick={() => setShowDebugPanel(!showDebugPanel)}
                  className="w-full text-[10px] text-gray-500 hover:text-gray-700 underline mt-1"
                >
                  {showDebugPanel ? 'Hide' : 'Show'} all registered users
                </button>
                {showDebugPanel && (
                  <div className="bg-gray-900 text-green-400 rounded p-2 font-mono text-[10px] max-h-48 overflow-y-auto">
                    {(() => {
                      const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
                      const staff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
                      const uniqueUsers = Array.from(new Set(Object.values(users).map((u: any) => u.id)))
                        .map((id) => Object.values(users).find((u: any) => u.id === id));
                      const uniqueStaff = Array.from(new Set(Object.values(staff).map((u: any) => u.id)))
                        .map((id) => Object.values(staff).find((u: any) => u.id === id));

                      return (
                        <div className="space-y-2">
                          {uniqueUsers.length > 0 && (
                            <div>
                              <div className="text-blue-400 font-bold">STUDENTS:</div>
                              {uniqueUsers.map((user: any) => (
                                <div key={user.id} className="ml-2">
                                  • {user.id} - {user.name}
                                </div>
                              ))}
                            </div>
                          )}
                          {uniqueStaff.length > 0 && (
                            <div>
                              <div className="text-green-400 font-bold">STAFF:</div>
                              {uniqueStaff.map((user: any) => (
                                <div key={user.id} className="ml-2">
                                  • {user.id} - {user.name}
                                </div>
                              ))}
                            </div>
                          )}
                          {uniqueUsers.length === 0 && uniqueStaff.length === 0 && (
                            <div className="text-red-400">No users found</div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-accent transition-colors duration-200 relative group"
              >
                <span className="relative z-10">Create one here</span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Background with Road Animation */}
      <div className="hidden bg-muted lg:block relative">
        <RoadAnimation />
      </div>

      {/* Welcome Popup */}
      {showWelcomePopup && loggedInUser && (
        <WorldClassWelcomePopup
          user={loggedInUser}
          isVisible={showWelcomePopup}
          onClose={() => {
            setShowWelcomePopup(false);
          }}
          onContinue={() => {
            setShowWelcomePopup(false);
            // This will be handled by the popup component
          }}
          isNewUser={false}
        />
      )}
    </div>
  )
}
