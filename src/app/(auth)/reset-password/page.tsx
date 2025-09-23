'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';
import { RoadAnimation } from '@/components/auth/road-animation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { resetPasswordWithOTP } from '@/lib/auth-utils';
import { Loader2, Lock, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff, Shield, KeyRound, Mail } from 'lucide-react';

const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  otp: z.string().length(6, 'Verification code must be 6 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [resetComplete, setResetComplete] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = await resetPasswordWithOTP(values.email, values.otp, values.password);

      if (result.success) {
        setResetComplete(true);
        toast({
          title: 'Password Reset Successful!',
          description: result.message,
          variant: 'default',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Resetting Password',
          description: result.message,
        });
      }
    } catch (error: any) {
      console.error('Password Reset Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error Resetting Password',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (resetComplete) {
    return (
      <div className="container relative min-h-screen w-full lg:grid lg:grid-cols-2 xl:min-h-[800px]">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <motion.div
          className="flex items-center justify-center py-12 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto grid w-[420px] gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  className="font-headline text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Password Reset Complete!
                </motion.h1>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Your password has been successfully reset. You can now log in with your new password.
                </motion.p>

                <motion.div
                  className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Shield className="h-4 w-4 inline mr-2 text-primary" />
                  Your account is now secure with the new password
                </motion.div>
              </div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full h-12 text-lg font-semibold gradient-bg-primary text-white hover:scale-105 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Login
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Background with Road Animation */}
        <div className="hidden bg-muted lg:block relative">
          <RoadAnimation />
        </div>
      </div>
    );
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
                <span className="block">Reset Your</span>
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Password
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
                  🔒
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Enter your email, the 6-digit verification code sent to you, and your new password.
              </motion.p>
            </motion.div>

            {/* Reset Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div
                className="glass-card p-3 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <KeyRound className="h-5 w-5 text-primary mx-auto mb-1" />
                </motion.div>
                <p className="text-xs font-semibold">OTP Verification</p>
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
                <p className="text-xs font-semibold">Secure Reset</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
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
                            placeholder="Enter your email address"
                            {...field}
                            className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* OTP Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <KeyRound className="h-4 w-4 text-primary" />
                          Verification Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter 6-digit code"
                            {...field}
                            className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm text-center tracking-widest font-mono"
                            maxLength={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* New Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              {...field}
                              className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm pr-12"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                >
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              {...field}
                              className="h-12 text-lg border-2 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm pr-12"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
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
                  transition={{ duration: 0.6, delay: 1.8 }}
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
                          Resetting password...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Lock className="mr-3 h-5 w-5" />
                          Reset Password
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 }}
                  className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3"
                >
                  <Shield className="h-4 w-4 inline mr-2 text-primary" />
                  Verification codes expire in 15 minutes and can only be used once
                </motion.div>
              </form>
            </Form>
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div
            className="mt-6 text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <motion.div
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Remember your password?{' '}
              <a
                href="/login"
                className="font-semibold text-primary hover:text-accent transition-colors duration-200 relative group"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" />
                  Back to Login
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Background with Road Animation */}
      <div className="hidden bg-muted lg:block relative">
        <RoadAnimation />
      </div>
    </div>
  );
}