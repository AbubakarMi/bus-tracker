'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserRole, UserData, getDashboardPath } from '@/lib/auth-utils';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export default function RouteGuard({
  children,
  allowedRoles = [],
  requireAuth = true
}: RouteGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = () => {
    setIsLoading(true);

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/register', '/forgot-password'];

    if (publicRoutes.includes(pathname)) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    if (!requireAuth) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userDataStr = localStorage.getItem('userData');

    if (!isLoggedIn || !userDataStr) {
      // Redirect to login if not authenticated
      router.push('/login');
      setIsLoading(false);
      return;
    }

    try {
      const userData: UserData = JSON.parse(userDataStr);

      // If specific roles are required, check if user has permission
      if (allowedRoles.length > 0) {
        if (!allowedRoles.includes(userData.role)) {
          // Redirect to appropriate dashboard if wrong role
          const correctPath = getDashboardPath(userData.role);
          router.push(correctPath);
          setIsLoading(false);
          return;
        }
      }

      // Check route-specific permissions
      if (pathname.startsWith('/dashboard/admin') && userData.role !== 'admin') {
        router.push(getDashboardPath(userData.role));
        setIsLoading(false);
        return;
      }

      if (pathname.startsWith('/dashboard/driver') && userData.role !== 'driver') {
        router.push(getDashboardPath(userData.role));
        setIsLoading(false);
        return;
      }

      if (pathname.startsWith('/student') && userData.role !== 'student') {
        router.push(getDashboardPath(userData.role));
        setIsLoading(false);
        return;
      }

      if (pathname.startsWith('/staff') && userData.role !== 'staff') {
        router.push(getDashboardPath(userData.role));
        setIsLoading(false);
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      router.push('/login');
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}