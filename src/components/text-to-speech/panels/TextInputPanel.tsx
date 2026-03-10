"use client"
import { useStore } from "@tanstack/react-form"
import { Coins } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { Textarea} from "@/components/ui/textarea";
import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "@/constants"
import { ttsFormOptions } from "@/lib/schemas/TTSFormSchema";
import { useTypedAppFormContext } from "@/hooks/useAppForm";
import GenerateButton from "../buttons/GenerateButton";
const TextInputPanel = () => {
const Textform = useTypedAppFormContext(ttsFormOptions);
const text = useStore(Textform.store, (s) => s.values.text);
const isSubmitting = useStore(Textform.store, (s) => s.isSubmitting);
const isValid = useStore(Textform.store, (s) => s.isValid);
  return (
    <div className="flex h-full min-h-0 flex-col flex-1">
      <div className="relative min-h-0 flex-1">
        <Textform.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here"
              className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            />
          )}
        </Textform.Field>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>
      {/**Action bar */}
      <div className="shrink-0 p-4 lg:p-6">
        {/**Mobile Layout */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex items-center gap-2">   </div>
            <GenerateButton
              className="w-full"
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              onSubmit={() => Textform.handleSubmit()}
            />
       
          </div>
          {text.length > 0 ? (
            <div className="lg:flex items-center justify-between hidden">
              <Badge variant={"outline"} className="border-dashed gap-1.5">
                <Coins className="size-3 text-chart-5" />
                <span className="text-xs">
                  <span className="tabluar-nums">
                    ${(text.length * COST_PER_UNIT).toFixed(4)}
                  </span>{" "}
                  estimated
                </span>
              </Badge>
              <div className="flex items-center gap-3">
                <p className="text-xs tracking-tight">
                  {text.length.toLocaleString()}
                  <span className="text-muted-foreground">
                    {" "}
                    / {TEXT_MAX_LENGTH.toLocaleString()} characters
                  </span>
                </p>
                <GenerateButton
                  size="sm"
                  disabled={isSubmitting || !isValid}
                  isSubmitting={isSubmitting}
                  onSubmit={() => Textform.handleSubmit()}
                />
              </div>
            </div>
          ) : (
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground">
                Get started by typing or pasting text above
              </p>
            </div>
          )}
        </div>
      </div>

  );
}
export default TextInputPanel