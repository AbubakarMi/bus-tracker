import type { PropsWithChildren } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export default function StaffLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="h-screen w-full bg-muted/40 flex">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-hidden">
          <main className="h-full overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}