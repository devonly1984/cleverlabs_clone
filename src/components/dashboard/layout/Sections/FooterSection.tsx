import { SidebarFooter, SidebarMenuItem } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { UserButton } from "@clerk/nextjs"

const FooterSection = () => {
  return (
    <SidebarFooter className="gap-3 py-3">
      <SidebarMenuItem>
        <UserButton
          showName
          fallback={
            <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-white" />
          }
          appearance={{
            elements: {
              rootBox:
                "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
              userButtonTrigger:
                "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
              userButtonBox: "flex-row-reverse! gap-2!",
              userButtonOuterIdentifier:
                "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
              userButtonAvatarBox: "size-6!",
            },
          }}
        />
      </SidebarMenuItem>
    </SidebarFooter>
  );
}
export default FooterSection