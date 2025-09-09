
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { RoadAnimation } from '@/components/auth/road-animation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Briefcase, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { app } from '@/lib/firebase';

const auth = getAuth(app);

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
  const { toast } = useToast();
  const router = useRouter();

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
        description: error.message || 'There was a problem with your request.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <h1 className="font-headline text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your ID to begin the registration process.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration / Staff ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., UG24/CSC/1002 or S1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div
                className={cn(
                  'grid gap-4 transition-all duration-500 ease-in-out',
                  isIdEntered
                    ? 'max-h-[500px] opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                )}
              >
                {userRole === 'student' && (
                  <div className="grid gap-2">
                    <Label>Account Type</Label>
                    <Badge variant="secondary" className="w-fit py-2 px-3">
                       <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                       <span>Student Account Detected</span>
                    </Badge>
                  </div>
                )}
                {userRole === 'staff' && (
                  <div className="grid gap-2">
                    <Label>Account Type</Label>
                    <Badge variant="secondary" className="w-fit py-2 px-3">
                      <Briefcase className="mr-2 h-4 w-4 text-blue-500"/>
                      <span>Staff Account Detected</span>
                    </Badge>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Robinson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={!isIdEntered || isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create an account
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <RoadAnimation />
      </div>
    </div>
  );
}
