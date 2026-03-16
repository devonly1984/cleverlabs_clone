"use client";

import { VoicePreviewPanelVoice } from "@/lib/types/type";

import PlaybackControls from "../buttons/PlaybackControls";

interface VoicePreviewPanelProps {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
}
const VoicePreviewPanel = ({
  audioUrl,
  voice,
  text,
}: VoicePreviewPanelProps) => {
   return (
    <div className="h-full gap-8 flex-col border-t hidden flex-1 lg:flex">
      <div className="p-6 pb-0">
        <h3 className="font-semibold text-foreground">Voice Preview</h3>
      </div>
      {/**Content */}

      <PlaybackControls audioUrl={audioUrl} text={text} voice={voice} />
    </div>
  );
};
export default VoicePreviewPanel;
