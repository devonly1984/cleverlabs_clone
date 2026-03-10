"use client";
import { useStore } from "@tanstack/react-form";
import { VOICE_CATEGORY_LABELS } from "@/components/voices/constants/voice-categories";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypedAppFormContext } from "@/hooks/useAppForm";
import VoiceAvatar from "./voice-avatar/VoiceAvatar";
import { useTTSVoices } from "@/components/text-to-speech/contexts/TTSVoicesContext";
import { ttsFormOptions } from "@/lib/schemas/TTSFormSchema";

const VoiceSelector = () => {
    const {
      customVoices,
      systemVoices,
      allVoices: voices,
    } = useTTSVoices();

    const voiceSelectorForm = useTypedAppFormContext(ttsFormOptions);
    const voiceId = useStore(
      voiceSelectorForm.store,
      (s) => s.values.voiceId,
    );
    const isSubmitting = useStore(
      voiceSelectorForm.store,
      (s) => s.isSubmitting,
    );
   
    const selectedVoice = voices.find((v) => v.id === voiceId);
    const hasMissingSelectedVoice = Boolean(voiceId) && !selectedVoice;
    const currentVoice = selectedVoice
      ? selectedVoice
      : hasMissingSelectedVoice
        ? {
            id: voiceId,
            name: "Unavailable voice",
            category: null as null,
          }
        : voices[0];
    
  
  return (
    <Field>
      <FieldLabel>Voice Style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(v) =>
          voiceSelectorForm.setFieldValue("voiceId", v)
        }
        disabled={isSubmitting}
      >
        <SelectTrigger className="w-full h-auto gap-1 rounded-lg bg-white px-2 py-1">
          <SelectValue>
            {currentVoice && (
              <>
                <VoiceAvatar
                  seed={currentVoice.id}
                  name={currentVoice.name}
                />
                <span className="text-sm font-medium tracking-tight truncate">
                  {currentVoice.name}
                  {currentVoice.category &&
                    ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                </span>
              </>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hasMissingSelectedVoice && currentVoice && (
            <>
              <SelectGroup>
                <SelectLabel>Selected Voice</SelectLabel>
                <SelectItem value={currentVoice.id}>
                  <VoiceAvatar
                    seed={currentVoice.id}
                    name={currentVoice.name}
                  />
                  <span className="text-sm font-medium  truncate">
                    {currentVoice.name}
                    {currentVoice.category &&
                      ` - ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                  </span>
                </SelectItem>
              </SelectGroup>
              {(customVoices.length > 0 || systemVoices.length > 0) && (
                <SelectSeparator />
              )}
            </>
          )}
          {customVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Team Voices</SelectLabel>
              {customVoices.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  <VoiceAvatar seed={v.id} name={v.name} />
                  <span className="text-sm font-medium  truncate">
                    {v.name}` - ${VOICE_CATEGORY_LABELS[v.category]}`
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
          {customVoices.length > 0 && systemVoices.length > 0 && (
            <SelectSeparator />
          )}
{systemVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Built-in Voices</SelectLabel>
              {systemVoices.map((v) => {
                
                return (
                  <SelectItem key={v.id} value={v.id}>
                    <VoiceAvatar seed={v.id} name={v.name} />
                    <span className="text-sm font-medium  truncate">
                      {v.name}` - ${VOICE_CATEGORY_LABELS[v.category]}`
                    </span>
                  </SelectItem>
                );
              })}
              )
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </Field>
  );
}
export default VoiceSelector