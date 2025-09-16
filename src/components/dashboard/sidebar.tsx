import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Home, Users, Bus, Route, Ticket, Settings, LifeBuoy, LogOut, MapPin } from 'lucide-react';
import { Logo } from '../logo';
import { Separator } from '../ui/separator';

const studentLinks = [
  { href: '/dashboard/student', icon: <Home />, label: 'Overview' },
  { href: '/dashboard/student/book', icon: <Ticket />, label: 'Book a Seat' },
  { href: '/dashboard/student/track', icon: <MapPin />, label: 'Track Bus' },
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
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href="/dashboard"><Home /><span>Dashboard</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <Separator className="my-2" />
        
        <p className="px-4 text-xs font-semibold text-muted-foreground/80 tracking-wider">Student</p>
        <SidebarMenu>
          {studentLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild tooltip={link.label}>
                <Link href={link.href}>{link.icon}<span>{link.label}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <Separator className="my-2" />

        <p className="px-4 text-xs font-semibold text-muted-foreground/80 tracking-wider">Driver</p>
        <SidebarMenu>
          {driverLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild tooltip={link.label}>
                <Link href={link.href}>{link.icon}<span>{link.label}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <Separator className="my-2" />

        <p className="px-4 text-xs font-semibold text-muted-foreground/80 tracking-wider">Admin</p>
        <SidebarMenu>
          {adminLinks.map((link) => (
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
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/settings"><Settings /><span>Settings</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Support">
              <Link href="/dashboard/support"><LifeBuoy /><span>Support</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
