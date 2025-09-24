'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bus,
  Calendar,
  MapPin,
  Route,
  History,
  Settings,
  Bell,
  Menu,
  X,
  Search,
  LogOut,
  UserCheck,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/staff/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Stats'
  },
  {
    title: 'Book Travel',
    href: '/staff/book',
    icon: Calendar,
    description: 'Reserve Your Seat'
  },
  {
    title: 'Live Tracking',
    href: '/staff/tracking',
    icon: MapPin,
    description: 'Track Your Bus',
    badge: 'Live'
  },
  {
    title: 'My Bookings',
    href: '/staff/bookings',
    icon: Bus,
    description: 'View Bookings'
  },
  {
    title: 'Routes & Schedule',
    href: '/staff/routes',
    icon: Route,
    description: 'Bus Routes Info'
  },
  {
    title: 'Trip History',
    href: '/staff/history',
    icon: History,
    description: 'Past Journeys'
  },
  {
    title: 'Reports',
    href: '/staff/reports',
    icon: ClipboardList,
    description: 'Travel Reports'
  },
  {
    title: 'Settings',
    href: '/staff/settings',
    icon: Settings,
    description: 'Account Settings'
  }
];

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      <div className="relative z-10 flex h-screen">
        {/* Professional Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 xs:w-72 sm:w-80 md:w-72 lg:w-80 xl:w-72 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-10",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full bg-white/95 backdrop-blur-sm border-r border-blue-200/50 shadow-xl shadow-blue-500/5 overflow-hidden pointer-events-auto">

            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-14 sm:h-16 px-3 xs:px-4 sm:px-6 border-b border-blue-200/50">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <UserCheck className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base xs:text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">ADUSTECH</h1>
                  <p className="text-xs text-blue-600/70 hidden xs:block truncate">Staff Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-500 hover:bg-gray-100 flex-shrink-0 p-1"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 text-sm bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-500 transition-all duration-200 rounded-lg"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 xs:py-3 sm:py-4 px-2 xs:px-3 sm:px-4">
              <ul className="space-y-0.5 xs:space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center px-2 py-2 xs:px-2 xs:py-2 sm:px-3 sm:py-3 text-xs xs:text-sm font-medium rounded-lg xs:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer",
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className={cn(
                          "h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-2 xs:mr-2 sm:mr-3 transition-all duration-300 transform group-hover:scale-110 flex-shrink-0",
                          isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate text-xs xs:text-xs sm:text-sm leading-tight">{item.title}</span>
                            {item.badge && (
                              <Badge className={cn(
                                "ml-1 xs:ml-1 sm:ml-2 text-xs flex-shrink-0 px-1 py-0.5",
                                item.badge === 'Live'
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-600 border-gray-200"
                              )}>
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5 hidden sm:block leading-tight">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* System Status */}
            <div className="p-4 border-t border-gray-200">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">System Status</span>
                </div>
                <p className="text-xs text-green-600">All systems operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white/95 backdrop-blur-sm border-b border-blue-200/50 sticky top-0 z-30 shadow-sm">
            <div className="px-3 xs:px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-12 xs:h-14 sm:h-16">
                <div className="flex items-center space-x-2 xs:space-x-2 sm:space-x-4 min-w-0 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-gray-500 hover:bg-gray-100 flex-shrink-0 p-1"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Menu className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <div className="min-w-0">
                    <h1 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">Staff Dashboard</h1>
                    <p className="text-xs sm:text-sm text-gray-500 hidden xs:block truncate">Bus Booking & Tracking System</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-4 flex-shrink-0">
                  {/* Notifications */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative text-gray-500 hover:bg-gray-100 p-1 xs:p-2"
                    >
                      <Bell className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
                      <div className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 bg-red-500 rounded-full w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                        <span className="text-xs xs:text-xs text-white font-bold">1</span>
                      </div>
                    </Button>
                  </div>

                  {/* Staff Profile */}
                  <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 pl-1 xs:pl-2 sm:pl-4 border-l border-gray-200">
                    <div className="text-right hidden lg:block">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Staff User</p>
                      <p className="text-xs text-gray-500 truncate">Transport Dept.</p>
                    </div>
                    <Avatar className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8">
                      <AvatarImage src="/staff-avatar.jpg" />
                      <AvatarFallback className="bg-blue-600 text-white text-xs xs:text-xs sm:text-sm font-medium">
                        SF
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:bg-gray-100 p-1"
                      title="Logout"
                      onClick={() => {
                        localStorage.removeItem('currentUser');
                        window.location.href = '/';
                      }}
                    >
                      <LogOut className="h-3 w-3 xs:h-3 xs:w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-6">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

    </div>
  );
}