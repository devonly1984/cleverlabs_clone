"use client";

import {
  TextInputPanel,
  VoicePreviewPanel,
  SettingsPanel,
  VoicePreviewMobile,
} from "@/components/text-to-speech/panels";
import { useSuspenseQueries } from "@tanstack/react-query";
import TTSForm from "@/components/text-to-speech/forms/TTSForm";
import { type TTSFormValues } from "@/lib/schemas/TTSFormSchema";
import { useTRPC } from "@/lib/trpc/client";
import { TTSVoicesProvider } from "../contexts/TTSVoicesContext";

interface TextToSpeechDetailViewProps {
  generationId: string;
}
const TextToSpeechDetailView = ({
  generationId,
}: TextToSpeechDetailViewProps) => {
  const trpc = useTRPC();
  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });
  const data = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";
  const resolvedVoiceId =
    data?.voiceId && allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;
  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };
  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };
  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TTSForm key={generationId} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
               <VoicePreviewMobile
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TTSForm>
    </TTSVoicesProvider>
  );
};
export default TextToSpeechDetailView;
