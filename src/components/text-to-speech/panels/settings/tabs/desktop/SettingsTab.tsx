"use client";
import { useStore } from "@tanstack/react-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import { useTypedAppFormContext } from "@/hooks/useAppForm";
import { sliders } from "@/constants/sliders";
import { ttsFormOptions } from "@/lib/schemas/TTSFormSchema";
import VoiceSelector from "@/components/voices/VoiceSelector";

const SettingsTab = () => {
  const settingsForm = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(settingsForm.store, (s) => s.isSubmitting);
  return (
    <>
      {/**Voice Style Dropdown */}
      <div className="border b border-dashed p-4">
        <VoiceSelector />
      </div>
      {/**Voice Adjustments */}
      <div className="flex-1 p-4">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <settingsForm.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {slider.leftLabel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {slider.rightLabel}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className="**:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-track]:h-1 "
                  />
                </Field>
              )}
            </settingsForm.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
};
export default SettingsTab;
