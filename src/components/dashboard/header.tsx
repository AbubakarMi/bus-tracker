'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { formatDisplayName, type UserData } from '@/lib/auth-utils';

export function DashboardHeader() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData: UserData = JSON.parse(userDataStr);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  const getPageTitle = () => {
    if (pathname?.includes('/admin')) {
      if (pathname.includes('/tracking')) return 'Live Tracking';
      if (pathname.includes('/buses')) return 'Bus Fleet';
      if (pathname.includes('/drivers')) return 'Drivers';
      if (pathname.includes('/routes')) return 'Routes & Schedules';
      if (pathname.includes('/users')) return 'Users';
      if (pathname.includes('/activity')) return 'Activity Logs';
      if (pathname.includes('/settings')) return 'Settings';
      return 'Admin Dashboard';
    }
    if (pathname?.includes('/driver')) return 'Driver Dashboard';
    if (pathname?.includes('/student')) return 'Student Dashboard';
    if (pathname?.includes('/staff')) return 'Staff Dashboard';
    return 'Dashboard';
  };

  const getUserInitials = () => {
    if (!currentUser) return 'U';
    if (currentUser.name) {
      const names = currentUser.name.split(' ');
      return names.length >= 2
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    if (currentUser.role === 'admin') return 'AU';
    return 'U';
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
      <div className="flex flex-1 items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-500">ADUSTECH Bus Management System</p>
        </div>

        <div className="relative w-full max-w-sm ml-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-blue-600 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            {currentUser && (
              <>
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{formatDisplayName(currentUser)}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}