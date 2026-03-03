
import { SidebarTrigger } from "../ui/sidebar"
import { cn } from "@/lib/utils"

import DashboardButtons from "../dashboard/buttons/DashboardButtons";
interface PageHeaderProps {
    title:string;
    className?:string
}
const PageHeader = ({ title, className }: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
     <DashboardButtons/>
    </div>
  );
};
export default PageHeader