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
import { Home, Users, Bus, Route, Ticket, Settings, LifeBuoy, LogOut, MapPin, User } from 'lucide-react';
import { Logo } from '../logo';
import { Separator } from '../ui/separator';

const studentLinks = [
  { href: '/student/dashboard', icon: <Home />, label: 'Overview' },
  { href: '/student/book', icon: <Ticket />, label: 'Book Bus' },
  { href: '/student/profile', icon: <User />, label: 'Profile' },
  { href: '/student/settings', icon: <Settings />, label: 'Settings' },
];

const staffLinks = [
  { href: '/dashboard/staff', icon: <Home />, label: 'Overview' },
  { href: '/dashboard/staff/book', icon: <Ticket />, label: 'Book a Seat' },
  { href: '/dashboard/staff/track', icon: <MapPin />, label: 'Track Bus' },
];

const driverLinks = [
  { href: '/dashboard/driver', icon: <Route />, label: 'My Trip' },
];

const adminLinks = [
  { href: '/dashboard/admin', icon: <Users />, label: 'Users' },
  { href: '/dashboard/admin/routes', icon: <Route />, label: 'Routes' },
  { href: '/dashboard/admin/buses', icon: <Bus />, label: 'Buses' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  
  const isStudent = pathname?.startsWith('/student');
  const isStaff = pathname?.startsWith('/staff');
  
  const currentLinks = isStudent ? studentLinks : isStaff ? staffLinks : studentLinks;

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {currentLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild tooltip={link.label}>
                <Link href={link.href}>{link.icon}<span>{link.label}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/"><LogOut /><span>Logout</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
