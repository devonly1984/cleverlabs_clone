import { AppRouter } from "@/lib/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { LucideIcon } from "lucide-react";

interface MenuItem {
    title: string;
    url?:string;
    icon: LucideIcon;
    onClick?: () => void;
}
interface NavSectionProps {
    label?:string;
    items: MenuItem[];
    pathname: string;
}
export interface QuickAction {
    title:string;
    description:string;
    gradient:string;
    href: string;
}
export type UploadAudioOptions= {
    buffer: Buffer;
    key:string;
    contentType?: string;
}
export type TTSVoiceItem = inferRouterOutputs<AppRouter>['voices']['getAll']['custom'][number]
export interface Slider {
  id: "temperature" | "topP" | "topK" | "repetitionPenalty";
  label:string;
  leftLabel:string;
  rightLabel:string;
  min:number;
  max:number;
  step:number;
  defaultValue:number;
}
export type VoicePreviewPanelVoice = {
  id?: string;
  name: string;
}
export type VoicePreviewMobileVoice = {
  id?: string;
  name: string;
}