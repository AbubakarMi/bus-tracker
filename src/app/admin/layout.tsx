'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bus,
  Users,
  UserCheck,
  Route,
  MapPin,
  Settings,
  Activity,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  Sparkles,
  Brain,
  Cpu,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    title: 'Live Tracking',
    href: '/admin/tracking',
    icon: MapPin,
    description: 'Real-time Bus Monitoring',
    badge: 'Live'
  },
  {
    title: 'Bus Fleet',
    href: '/admin/buses',
    icon: Bus,
    description: 'Manage Buses & Seats'
  },
  {
    title: 'Drivers',
    href: '/admin/drivers',
    icon: UserCheck,
    description: 'Driver Management'
  },
  {
    title: 'Routes & Schedules',
    href: '/admin/routes',
    icon: Route,
    description: 'Route Planning'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'Students & Staff'
  },
  {
    title: 'Activity Logs',
    href: '/admin/activity',
    icon: Activity,
    description: 'System Monitoring'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System Configuration'
  }
];

export default function AdminLayout({
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
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full bg-white/95 backdrop-blur-sm border-r border-blue-200/50 shadow-xl shadow-blue-500/5">

            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-blue-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ADUSTECH</h1>
                  <p className="text-xs text-blue-600/70">Bus Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-500 hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-500 transition-all duration-200 rounded-lg"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-4">
              <ul className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg",
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className={cn(
                          "h-5 w-5 mr-3 transition-all duration-300 transform group-hover:scale-110",
                          isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <Badge className={cn(
                                "ml-2 text-xs",
                                item.badge === 'Live'
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-600 border-gray-200"
                              )}>
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
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
            <div className="px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-gray-500 hover:bg-gray-100"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">Bus Fleet Management System</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative text-gray-500 hover:bg-gray-100"
                    >
                      <Bell className="h-5 w-5" />
                      <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">3</span>
                      </div>
                    </Button>
                  </div>

                  {/* Admin Profile */}
                  <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">System Administrator</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.jpg" />
                      <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                        AU
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:bg-gray-100"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="px-6 lg:px-8 py-6">
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