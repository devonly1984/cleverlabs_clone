import TextToSpeechView from "@/components/text-to-speech/views/TextToSpeechView";
import type { Metadata } from "next";
import { trpc, HydrateClient, prefetch } from "@/lib/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
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
      <ErrorBoundary fallback={<>Something went wrong</>}>
        <TextToSpeechView initialValues={{ text, voiceId }} />
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default TextToSpeechPage;
