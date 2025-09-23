'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className={`flex items-center gap-2 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}