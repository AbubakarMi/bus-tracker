'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Home,
  Calendar,
  MapPin,
  FileText,
  Settings,
  CreditCard,
  Users,
  BarChart3,
  Bus,
  Route,
  Activity,
  Briefcase,
  ClipboardList,
  DollarSign,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type UserData } from '@/lib/auth-utils';

interface SidebarNavProps {
  user: UserData;
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const getNavItems = (role: string): NavItem[] => {
  const commonItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: `/${role}/dashboard`,
      icon: Home,
    },
    {
      title: 'Profile',
      href: `/${role}/profile`,
      icon: Users,
    },
    {
      title: 'Settings',
      href: `/${role}/settings`,
      icon: Settings,
    },
  ];

  switch (role) {
    case 'student':
      return [
        commonItems[0], // Dashboard
        {
          title: 'Book Seat',
          href: '/student/book',
          icon: Calendar,
        },
        {
          title: 'My Bookings',
          href: '/student/bookings',
          icon: ClipboardList,
        },
        {
          title: 'Track Bus',
          href: '/student/tracking',
          icon: MapPin,
        },
        commonItems[1], // Profile
        commonItems[2], // Settings
      ];

    case 'staff':
      return [
        commonItems[0], // Dashboard
        {
          title: 'Book Travel',
          href: '/staff/book',
          icon: Calendar,
        },
        {
          title: 'My Bookings',
          href: '/staff/bookings',
          icon: ClipboardList,
        },
        {
          title: 'Track Bus',
          href: '/staff/tracking',
          icon: MapPin,
        },
        {
          title: 'Reports',
          href: '/staff/reports',
          icon: FileText,
        },
        {
          title: 'Routes',
          href: '/staff/routes',
          icon: Route,
        },
        {
          title: 'History',
          href: '/staff/history',
          icon: Activity,
        },
        commonItems[1], // Profile
        commonItems[2], // Settings
      ];

    case 'admin':
      return [
        {
          title: 'Dashboard',
          href: '/admin',
          icon: Home,
        },
        {
          title: 'Buses',
          href: '/admin/buses',
          icon: Bus,
        },
        {
          title: 'Drivers',
          href: '/admin/drivers',
          icon: Users,
        },
        {
          title: 'Routes',
          href: '/admin/routes',
          icon: Route,
        },
        {
          title: 'Users',
          href: '/admin/users',
          icon: Users,
        },
        {
          title: 'Activity',
          href: '/admin/activity',
          icon: Activity,
        },
        {
          title: 'Tracking',
          href: '/admin/tracking',
          icon: MapPin,
        },
        {
          title: 'Reviews',
          href: '/admin/reviews',
          icon: FileText,
        },
        {
          title: 'Settings',
          href: '/admin/settings',
          icon: Settings,
        },
      ];

    default:
      return commonItems;
  }
};

export function SidebarNav({ user, className }: SidebarNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = getNavItems(user.role);

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'from-purple-500 to-violet-600';
      case 'staff':
        return 'from-indigo-500 to-purple-600';
      case 'student':
        return 'from-blue-500 to-indigo-600';
      case 'driver':
        return 'from-orange-500 to-amber-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-70 bg-white border-r border-gray-200 shadow-lg md:translate-x-0 md:static md:shadow-none",
          "md:w-64 lg:w-72",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? `bg-gradient-to-r ${getRoleColor(user.role)} text-white shadow-md`
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                    )} />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-white"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className={`rounded-xl bg-gradient-to-r ${getRoleColor(user.role)} p-4 text-white`}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Quick Stats</p>
                  <p className="text-xs text-white/80">View analytics</p>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}