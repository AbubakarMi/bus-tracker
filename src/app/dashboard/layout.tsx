import type { PropsWithChildren } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="h-screen w-full bg-muted/40 flex">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-hidden flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
