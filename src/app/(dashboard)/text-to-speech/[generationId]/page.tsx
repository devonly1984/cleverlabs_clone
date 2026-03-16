import TextToSpeechDetailView from "@/components/text-to-speech/views/TextToSpeechDetailView";
import { trpc, HydrateClient, prefetch } from "@/lib/trpc/server";

interface TextToSpeechDetailPageProps {
    params: Promise<{generationId:string}>;
}
const TextToSpeechDetailPage = async({params}:TextToSpeechDetailPageProps) => {
    const {generationId} = await params;
    prefetch(trpc.generations.getById.queryOptions({ id: generationId }));
    prefetch(trpc.voices.getAll.queryOptions());
    prefetch(trpc.generations.getAll.queryOptions())
  return (
    <HydrateClient>
      <TextToSpeechDetailView generationId={generationId} />
    </HydrateClient>
  );
};
export default TextToSpeechDetailPage;
