"use client";
import { useAppForm } from "@/hooks/useAppForm";
import {
  defaultTTSValues,
  ttsFormOptions,
  ttsFormSchema,
  TTSFormValues,
} from "@/lib/schemas/TTSFormSchema";
import { ReactNode } from "react";
import {toast} from 'sonner';
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/client";

interface TTSFormProps {
  children: ReactNode;
  defaultValues?: TTSFormValues;
}
const TTSForm = ({ children, defaultValues }: TTSFormProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const createMutation = useMutation(
    trpc.generations.create.mutationOptions({}),
  );
  const ttsForm = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async ({value}) => {
     try {
      const {text,voiceId,temperature,topP,topK,repetitionPenalty} = value;
      const data = await createMutation.mutateAsync({
        text: text.trim(),
        voiceId,
        temperature,
        topP,
        topK,
        repetitionPenalty,
      });
      toast.success("Audio generated successfully!");
      router.push(`/text-to-speech/${data.id}`);
     } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate audio";
          toast.error(message);
     }
    },
  });
  return <ttsForm.AppForm>{children}</ttsForm.AppForm>;
};
export default TTSForm;
