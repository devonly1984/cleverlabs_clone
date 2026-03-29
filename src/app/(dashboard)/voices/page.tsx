import VoicesView from "@/components/voices/views/VoicesView";
import { voicesSearchParamsCache } from "@/lib/nuqs/params";
import { HydrateClient, prefetch, trpc } from "@/lib/trpc/server";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Voices",
};
interface VoicesPageProps {
    searchParams: Promise<SearchParams>;
}
const VoicesPage = async ({ searchParams }: VoicesPageProps) => {
    const {query} = await voicesSearchParamsCache.parse(searchParams)

    prefetch(trpc.voices.getAll.queryOptions({query}));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
};
export default VoicesPage;
