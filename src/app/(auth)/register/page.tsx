'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserWithEmailAndPassword, type Auth } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { RoadAnimation } from '@/components/auth/road-animation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Briefcase, Loader2, AlertTriangle, CheckCircle, ArrowRight, Shield, Mail, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { auth as staticAuth, isFirebaseConfigured } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const registerFormSchema = z.object({
  idNumber: z.string().min(1, 'Please enter your ID number'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type UserRole = 'student' | 'staff' | null;

export default function RegisterPage() {
  const [userRole, setUserRole] = React.useState<UserRole>(null);
  const [isIdEntered, setIsIdEntered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [auth, setAuth] = React.useState<Auth | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    setAuth(staticAuth);
  }, []);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      idNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const idNumber = form.watch('idNumber');

  React.useEffect(() => {
    if (idNumber) {
      if (/^UG\d{2}\/[A-Z]+\/\d+$/i.test(idNumber)) {
        setUserRole('student');
        setIsIdEntered(true);
      } else if (/^S\d+/i.test(idNumber)) {
        setUserRole('staff');
        setIsIdEntered(true);
      } else {
        setUserRole(null);
        setIsIdEntered(false);
      }
    } else {
      setUserRole(null);
      setIsIdEntered(false);
    }
  }, [idNumber]);

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
     if (!isFirebaseConfigured || !auth) {
       toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'Firebase is not configured. Please check your environment variables.',
      });
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Account Created!',
        description: "You've successfully signed up. Please log in.",
      });
      router.push('/login');
    } catch (error: any) {
      console.error('Registration Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'An unknown error occurred. Please check your configuration and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container relative min-h-screen w-full lg:grid lg:grid-cols-2 xl:min-h-[800px]">

      <motion.div 
        className="flex items-center justify-center py-12 relative z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mx-auto grid w-[450px] gap-8">
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

            {/* Enhanced Title */}
            <motion.h1 
              className="font-headline text-4xl md:text-5xl font-bold tracking-tight relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="block">Create Your</span>
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ADUSTECH Account
              </span>
              <motion.span
                className="inline-block ml-3 text-3xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🎓
              </motion.span>
            </motion.h1>

            {/* Enhanced Description */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Join thousands of students and staff enjoying seamless campus transportation. 
              <span className="font-semibold text-primary"> Get started in seconds!</span>
            </motion.p>

            {/* Progress indicator */}
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((step) => (
                  <motion.div
                    key={step}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      currentStep >= step 
                        ? "bg-gradient-to-r from-primary to-accent" 
                        : "bg-muted"
                    )}
                    whileHover={{ scale: 1.2 }}
                    animate={currentStep === step ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    } : {}}
                    transition={{ duration: 1, repeat: currentStep === step ? Infinity : 0 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Configuration Alert */}
          <AnimatePresence>
            {!isFirebaseConfigured && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Configuration Error</AlertTitle>
                  <AlertDescription>
                    Firebase is not configured. Please add your credentials to the <code>.env</code> file to enable registration.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                {/* Step 1: ID Number */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Registration / Staff ID Number
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="e.g., UG24/CSC/1002 or S1234" 
                              {...field} 
                              disabled={!isFirebaseConfigured}
                              className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                              onChange={(e) => {
                                field.onChange(e);
                                setCurrentStep(e.target.value ? 1 : 0);
                              }}
                            />
                            <AnimatePresence>
                              {userRole && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  <CheckCircle className="h-5 w-5 text-green-500" />
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

                {/* Enhanced Account Type Detection */}
                <AnimatePresence>
                  {isIdEntered && isFirebaseConfigured && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="space-y-6"
                    >
                      {/* Account Type Badge */}
                      <AnimatePresence>
                        {userRole && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.4 }}
                            className="grid gap-3"
                          >
                            <Label className="text-base font-semibold">Account Type Detected</Label>
                            {userRole === 'student' ? (
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative overflow-hidden"
                              >
                                <Badge variant="secondary" className="w-full py-4 px-6 text-base justify-center relative">
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <UserCheck className="mr-3 h-5 w-5 text-green-500" />
                                  <span className="relative z-10">Student Account Detected</span>
                                  <motion.span
                                    className="ml-2 text-lg"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                    🎓
                                  </motion.span>
                                </Badge>
                              </motion.div>
                            ) : (
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative overflow-hidden"
                              >
                                <Badge variant="secondary" className="w-full py-4 px-6 text-base justify-center relative">
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <Briefcase className="mr-3 h-5 w-5 text-blue-500" />
                                  <span className="relative z-10">Staff Account Detected</span>
                                  <motion.span
                                    className="ml-2 text-lg"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                    💼
                                  </motion.span>
                                </Badge>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Step 2: Name Fields */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">First Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Ahmed" 
                                  {...field} 
                                  className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value && form.getValues('lastName')) {
                                      setCurrentStep(2);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">Last Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Hassan" 
                                  {...field} 
                                  className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    if (e.target.value && form.getValues('firstName')) {
                                      setCurrentStep(2);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      {/* Step 3: Email Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="ahmed.hassan@adustech.edu.ng" 
                                  {...field} 
                                  className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      {/* Step 4: Password Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                Password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Create a strong password" 
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
                              <p className="text-xs text-muted-foreground mt-2">
                                Must be at least 8 characters long
                              </p>
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      {/* Enhanced Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="pt-4"
                      >
                        <motion.div
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full h-14 text-lg font-semibold gradient-bg-primary text-white hover:scale-105 transition-all duration-300 glow-primary shadow-xl disabled:hover:scale-100 disabled:opacity-50" 
                            disabled={!isIdEntered || isLoading || !isFirebaseConfigured}
                          >
                            {isLoading ? (
                              <span className="flex items-center justify-center">
                                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                Creating your account...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                Create Account
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
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 mt-4"
                      >
                        <Shield className="h-4 w-4 inline mr-2 text-primary" />
                        Your data is secured with enterprise-grade encryption
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div 
            className="mt-8 text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <motion.div 
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-semibold text-primary hover:text-accent transition-colors duration-200 relative group"
              >
                <span className="relative z-10">Sign in here</span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Additional info */}
            <motion.p
              className="text-xs text-muted-foreground/70 max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
      <div className="hidden bg-muted lg:block">
        <RoadAnimation />
      </div>
    </div>
  );
}