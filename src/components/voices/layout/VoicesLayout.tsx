import PageHeader from "@/components/shared/PageHeader"
import { ReactNode } from "react"

const VoicesLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Voices" />
      {children}
    </div>
  );
}
export default VoicesLayout