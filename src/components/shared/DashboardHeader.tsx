"use client"

import { useUser } from "@clerk/nextjs"

import DashboardButtons from "../dashboard/buttons/DashboardButtons";

const DashboardHeader = () => {
    const { isLoaded, user } = useUser();
  return (
    <div className="lg:flex items-start justify-between hidden">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Nice to see you</p>
        <h1 className="text-2l lg:text-3xl font-semibold tracking-tight">
          {isLoaded
            ? (user?.fullName ?? user?.firstName ?? "there")
            : "..."}
        </h1>
      </div>
      <DashboardButtons />
      
    </div>
  );
}
export default DashboardHeader