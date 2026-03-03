import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const cookiesStore = await cookies()
    const defaultOpen =
      cookiesStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main className="flex flex-1 min-h-0 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
