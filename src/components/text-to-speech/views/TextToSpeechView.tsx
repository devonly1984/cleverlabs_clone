"use client"

import {TextInputPanel,VoicePreviewPlaceholder,SettingsPanel} from '@/components/text-to-speech/panels'
import { useSuspenseQuery } from '@tanstack/react-query';
import TTSForm from '@/components/text-to-speech/forms/TTSForm'
import { defaultTTSValues, type TTSFormValues } from "@/lib/schemas/TTSFormSchema";
import { useTRPC } from '@/lib/trpc/client';
import { TTSVoicesProvider } from '../contexts/TTSVoicesContext';
interface TextToSpeechViewProps {
  initialValues?: Partial<TTSFormValues>
}
const TextToSpeechView = ({ initialValues }: TextToSpeechViewProps) => {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(
    trpc.voices.getAll.queryOptions(),
  );


  const { custom: customVoices, system: systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";
  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;
  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };
  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TTSForm defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TTSForm>
    </TTSVoicesProvider>
  );
};
export default TextToSpeechView