"use client"
import { ChevronDown } from "lucide-react"
import { useStore } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { DrawerTrigger } from "@/components/ui/drawer";
import VoiceAvatar from "@/components/voices/voice-avatar/VoiceAvatar";
import { useTypedAppFormContext } from "@/hooks/useAppForm";
import { useTTSVoices } from "../contexts/TTSVoicesContext";
import { ttsFormOptions } from "@/lib/schemas/TTSFormSchema";

const VoiceSelectorButton = () => {
    const {allVoices} = useTTSVoices();
    const voiceSelectorForm = useTypedAppFormContext(ttsFormOptions);
    const voiceId = useStore(
      voiceSelectorForm.store,
      (s) => s.values.voiceId,
    );
    const currentVoice =
      allVoices.find((v) => v.id === voiceId) ?? allVoices[0];
const buttonLabel = currentVoice?.name ?? "Select a voice"

  return (
    <DrawerTrigger asChild>
      <Button
        value={"outline"}
        size="sm"
        className="flex flex-1 justify-start gap-2 px-2"
      >
        {currentVoice && (
          <VoiceAvatar
            seed={currentVoice.id}
            name={currentVoice.name}
            className="size-6"
          />
        )}
        <span className="flex-1 truncate text-left text-sm font-medium">
          {buttonLabel}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </Button>
    </DrawerTrigger>
  );
}
export default VoiceSelectorButton