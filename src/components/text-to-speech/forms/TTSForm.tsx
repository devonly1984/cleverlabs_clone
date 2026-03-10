"use client";
import { useAppForm } from "@/hooks/useAppForm";
import {
  defaultTTSValues,
  ttsFormOptions,
  ttsFormSchema,
  TTSFormValues,
} from "@/lib/schemas/TTSFormSchema";
import { ReactNode } from "react";

interface TTSFormProps {
  children: ReactNode;
  defaultValues?: TTSFormValues;
}
const TTSForm = ({ children, defaultValues }: TTSFormProps) => {
  const ttsForm = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return <ttsForm.AppForm>{children}</ttsForm.AppForm>;
};
export default TTSForm;
