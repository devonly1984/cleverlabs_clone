import VoicesLayout from "@/components/voices/layout/VoicesLayout";
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return <VoicesLayout>{children}</VoicesLayout>
};
export default Layout