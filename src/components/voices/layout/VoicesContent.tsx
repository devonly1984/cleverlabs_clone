"use client"

import { useTRPC } from "@/lib/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import VoicesList from "./VoicesList";
import { voicesSearchParams } from "@/lib/nuqs/params";
import { useQueryState } from "nuqs";
const VoicesContent = () => {
    const trpc = useTRPC();
    const [query] = useQueryState("query", voicesSearchParams.query);
    const { data } = useSuspenseQuery(trpc.voices.getAll.queryOptions({query}));
  return (
  <>
  <VoicesList title="Team Voices" voices={data.custom}/>
  <VoicesList title="Built-in Voices" voices={data.system}/>
  </>
  )
}
export default VoicesContent