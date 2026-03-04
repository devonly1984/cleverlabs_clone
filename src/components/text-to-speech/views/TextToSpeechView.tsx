

import {TextInputPanel,VoicePreviewPlaceholder,SettingsPanel} from '@/components/text-to-speech/panels'


const TextToSpeechView = () => {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <TextInputPanel />
        <VoicePreviewPlaceholder />
      </div>
      <SettingsPanel/>
    </div>
  );
}
export default TextToSpeechView