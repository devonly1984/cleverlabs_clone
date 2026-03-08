import TextToSpeechView from "@/components/text-to-speech/views/TextToSpeechView";
import type { Metadata } from "next";
import { trpc, HydrateClient, prefetch } from "@/lib/trpc/server";
export const metadata: Metadata = {
  title: "Text to Speech",
};
interface TextToSpeechPageProps {
  searchParams: Promise<{text?:string;voiceId?:string}>
}
const TextToSpeechPage = async({ searchParams }: TextToSpeechPageProps) => {
  const { text, voiceId } = await searchParams;
  prefetch(trpc.voices.getAll.queryOptions());

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
};
export default TextToSpeechPage;
