'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Home, Users, Bus, Route, Ticket, Settings, LifeBuoy, LogOut, MapPin, User, LayoutDashboard, UserCheck, Activity, Bell } from 'lucide-react';
import { Logo } from '../logo';
import { Separator } from '../ui/separator';

const studentLinks = [
  { href: '/student/dashboard', icon: <Home />, label: 'Overview' },
  { href: '/student/book', icon: <Ticket />, label: 'Book Bus' },
  { href: '/student/tracking', icon: <MapPin />, label: 'Track Bus' },
  { href: '/student/bookings', icon: <Route />, label: 'My Bookings' },
  { href: '/student/profile', icon: <User />, label: 'Profile' },
  { href: '/student/settings', icon: <Settings />, label: 'Settings' },
];

const staffLinks = [
  { href: '/staff/dashboard', icon: <Home />, label: 'Fleet Control' },
  { href: '/staff/tracking', icon: <MapPin />, label: 'Track Fleet' },
  { href: '/staff/bookings', icon: <Ticket />, label: 'Manage Bookings' },
  { href: '/staff/routes', icon: <Route />, label: 'Routes' },
  { href: '/staff/reports', icon: <Users />, label: 'Reports' },
  { href: '/staff/profile', icon: <User />, label: 'Profile' },
  { href: '/staff/settings', icon: <Settings />, label: 'Settings' },
];

const driverLinks = [
  { href: '/dashboard/driver', icon: <Route />, label: 'My Trip' },
];

const adminLinks = [
  { href: '/dashboard/admin', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/dashboard/admin/tracking', icon: <MapPin />, label: 'Live Tracking' },
  { href: '/dashboard/admin/buses', icon: <Bus />, label: 'Bus Fleet' },
  { href: '/dashboard/admin/drivers', icon: <UserCheck />, label: 'Drivers' },
  { href: '/dashboard/admin/routes', icon: <Route />, label: 'Routes & Schedules' },
  { href: '/dashboard/admin/users', icon: <Users />, label: 'Users' },
  { href: '/dashboard/admin/activity', icon: <Activity />, label: 'Activity Logs' },
  { href: '/dashboard/admin/settings', icon: <Settings />, label: 'Settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isStudent = pathname?.startsWith('/student');
  const isStaff = pathname?.startsWith('/staff');
  const isDriver = pathname?.startsWith('/dashboard/driver');
  const isAdmin = pathname?.startsWith('/dashboard/admin');

  const currentLinks = isStudent ? studentLinks :
                      isStaff ? staffLinks :
                      isDriver ? driverLinks :
                      isAdmin ? adminLinks :
                      studentLinks;

  return (
    <Sidebar className="border-r-0 bg-gradient-to-b from-slate-50 to-slate-100">
      <SidebarHeader className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Bus className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ADUSTECH
            </h1>
            <p className="text-xs text-slate-500">Transport Hub</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <div className="space-y-1">
          {currentLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={link.label}
                  className={isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:from-blue-600 hover:to-indigo-600"
                    : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                  }
                >
                  <Link href={link.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200">
                    <span className={`${isActive ? 'text-white' : 'text-slate-500'}`}>
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userData');
                window.location.href = '/login';
              }}
              tooltip="Logout"
              className="hover:bg-red-50 hover:text-red-600 text-slate-600 mx-3 my-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
