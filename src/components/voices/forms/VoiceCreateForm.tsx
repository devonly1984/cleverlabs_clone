"use client";
import { ReactNode } from "react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
   
   Upload,
  Mic,
  Tag,
  Layers,
  AlignLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useTRPC } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError } from "@/components/ui/field";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  VOICE_CATEGORIES,
  VOICE_CATEGORY_LABELS,
} from "../constants/voice-categories";
import { createFormSchema } from "@/lib/schemas/createVoiceSchema";
import LanguageComobox from "./LanguageComobox";
import FileDropzone from "./FileDropzone";
import VoiceRecorder from "../VoiceRecorder";
interface VoiceCreateFormProps {
  scrollable?: boolean;
  footer?: (submit: ReactNode) => ReactNode;
  onError?: (message: string) => void;
}
const VoiceCreateForm = ({
  scrollable,
  footer,
  onError,
}: VoiceCreateFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createVoiceMutation = useMutation({
    mutationFn: async ({
      name,
      file,
      category,
      language,
      description,
    }: {
      name: string;
      file: File;
      category: string;
      language: string;
      description: string;
    }) => {
      const params = new URLSearchParams({
        name,
        category,
        language,
      });
      if (description) {
        params.set("description", description);
      }
      const response = await fetch(
        `/api/voices/create?${params.toString()}`,
        {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        },
      );
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Failed to crete voice");
      }
      return response.json();
    },
  });
  const createVoiceForm = useForm({
    defaultValues: {
      name: "",
      file: null as File | null,
      category: "GENERAL" as string,
      language: "en-US",
      description: "",
    },
    validators: {
      onSubmit: createFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createVoiceMutation.mutateAsync({
          name: value.name,
          file: value.file!,
          category: value.category,
          language: value.language,
          description: value.description ?? undefined,
        });
        toast.success("Voice Created Successfully!");
        queryClient.invalidateQueries({
          queryKey: trpc.voices.getAll.queryKey(),
        });
        createVoiceForm.reset();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to create voice";
        if (onError) {
          onError(message);
        } else {
          toast.error(message);
        }
      }
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createVoiceForm.handleSubmit();
      }}
      className={cn(
        "flex flex-col",
        scrollable ? "min-h-0 flex-1" : "gap-6",
      )}
    >
      <div
        className={cn(
          scrollable
            ? "no-scrollbar flex flex-col gap-6 overflow-y-auto px-4"
            : "flex flex-col gap-6",
        )}
      >
        <createVoiceForm.Field name="file">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <Tabs defaultValue="upload">
                  <TabsList className="h-11! w-full">
                    <TabsTrigger value="upload">
                      <Upload className="size-3.5" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="record" >
                      <Mic className="size-3.5" />
                      Record
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload">
                    <FileDropzone
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                  <TabsContent value="record">
                    <VoiceRecorder
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                </Tabs>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </createVoiceForm.Field>
        <createVoiceForm.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-0 flex h-full w-full items-center justify-center">
                    <Tag className="size-4 text-muted-foreground" />
                  </div>
                  <Input
                    id={field.name}
                    placeholder="Voice Label"
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="pl-10"
                  />
                </div>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </createVoiceForm.Field>
        <createVoiceForm.Field name="category">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-0 flex h-full w-full items-center justify-center">
                    <Layers className="size-4 text-muted-foreground" />
                  </div>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_CATEGORIES.map((cat) => (
                        <SelectItem value={cat} key={cat}>
                          {VOICE_CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </createVoiceForm.Field>
        <createVoiceForm.Field name="language">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <LanguageComobox
                  value={field.state.value}
                  onChange={field.handleChange}
                  isInvalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </createVoiceForm.Field>
        <createVoiceForm.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-0 flex h-full w-full items-center justify-center">
                    <AlignLeft className="size-4 text-muted-foreground" />
                  </div>
                  <Textarea
                    id={field.name}
                    placeholder="Describe this voice"
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="min-h-20 pl-10"
                    rows={3}
                  />
                </div>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </createVoiceForm.Field>
        <createVoiceForm.Subscribe
          selector={(s) => ({
            isSubmitting: s.isSubmitting,
          })}
        >
          {({ isSubmitting }) => {
            const submitButton = (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Voice"}
              </Button>
            );
            return footer ? footer(submitButton) : submitButton;
          }}
        </createVoiceForm.Subscribe>
      </div>
    </form>
  );
};
export default VoiceCreateForm;
