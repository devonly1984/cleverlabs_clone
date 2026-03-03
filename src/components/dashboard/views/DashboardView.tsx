import PageHeader from "@/components/shared/PageHeader";
import HeroPattern from "../shared/HeroPattern"
import DashboardHeader from "@/components/shared/DashboardHeader";
import TextInputPanel from "../inputs/TextInputPanel";
import QuickActionsPanel from "../inputs/QuickActionsPanel";

const DashboardView = () => {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
export default DashboardView