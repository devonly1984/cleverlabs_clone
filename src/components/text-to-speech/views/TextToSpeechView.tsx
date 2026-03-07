"use client"

import {TextInputPanel,VoicePreviewPlaceholder,SettingsPanel} from '@/components/text-to-speech/panels'

import TTSForm from '@/components/text-to-speech/forms/TTSForm'
import { defaultTTSValues } from '@/lib/TTSFormSchema'

const TextToSpeechView = () => {
  return (
    <TTSForm defaultValues={defaultTTSValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TTSForm>
  );
}
export default TextToSpeechView