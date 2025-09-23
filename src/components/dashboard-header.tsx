'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Settings, User, Bell, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { logoutUser } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { type UserData } from '@/lib/auth-utils';

interface DashboardHeaderProps {
  user: UserData;
  title?: string;
}

export function DashboardHeader({ user, title }: DashboardHeaderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      toast({
        title: 'Logged Out Successfully',
        description: 'You have been logged out. Redirecting to login page...',
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'There was an error logging you out. Please try again.',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'from-purple-500 to-violet-600';
      case 'staff':
        return 'from-green-500 to-emerald-600';
      case 'student':
        return 'from-blue-500 to-indigo-600';
      case 'driver':
        return 'from-orange-500 to-amber-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Logo />
          </motion.div>

          {title && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {title}
              </h1>
            </motion.div>
          )}
        </div>

        {/* Right side - User menu */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.div
                className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`bg-gradient-to-br ${getRoleColor(user.role)} text-white font-semibold`}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary to-accent bg-clip-border opacity-0 hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-3 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`bg-gradient-to-br ${getRoleColor(user.role)} text-white font-semibold`}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      {user.regNumber && (
                        <span className="text-xs text-gray-500">{user.regNumber}</span>
                      )}
                      {user.staffId && (
                        <span className="text-xs text-gray-500">{user.staffId}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <DropdownMenuItem className="focus:bg-gray-50 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="focus:bg-gray-50 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="focus:bg-red-50 text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  );
}