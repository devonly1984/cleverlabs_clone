"use client";
import { usePathname } from "next/navigation";

import {
 
  Settings,
  Headphones,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useClerk } from "@clerk/nextjs";
import { MenuItem } from "@/constants/type";
import NavSection from "./Sections/NavSection";
import { mainMenuItems } from "@/constants";
import DashboardFooter from "./Sections/FooterSection";
import DashboardHeader from "./Sections/HeaderSection";

const DashboardSidebar = () => {
    const pathname = usePathname();
    const clerk = useClerk();
const otherMenuItems: MenuItem[] = [
  {
    title: "Settings",
    icon: Settings,
    onClick: () => clerk.openOrganizationProfile(),
  },
  {
    title: "Help and Support",
    url: "mailto:business@codewithantonio.com",
    icon: Headphones,
  },
];    
  return (
    <Sidebar collapsible="icon">
      <DashboardHeader/>
      <div className="border-b border-dashed border-border">
        <SidebarContent>
          <NavSection items={mainMenuItems} pathname={pathname} />
          <NavSection
            label="Others"
            items={otherMenuItems}
            pathname={pathname}
          />
        </SidebarContent>
      </div>
      <div className="border-b border-dashed border-border" />
      <DashboardFooter />
      <SidebarRail />
    </Sidebar>
  );
};
export default DashboardSidebar;
