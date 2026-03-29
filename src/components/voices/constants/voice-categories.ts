import type { VoiceCategory } from "@/generated/prisma/client";
import locale from "locale-codes";

export const VOICE_CATEGORY_LABELS: Record<VoiceCategory, string> = {
  AUDIOBOOK: "Audiobook",
  CONVERSATIONAL: "Conversational",
  CUSTOMER_SERVICE: "Customer Service",
  GENERAL: "General",
  NARRATIVE: "Narrative",
  CHARACTERS: "Characters",
  MEDITATION: "Meditation",
  MOTIVATIONAL: "Motivational",
  PODCAST: "Podcast",
  ADVERTISING: "Advertising",
  VOICEOVER: "Voiceover",
  CORPORATE: "Corporate",
};

export const VOICE_CATEGORIES = Object.keys(
  VOICE_CATEGORY_LABELS,
) as VoiceCategory[];

export const LANGUAGE_OPTIONS = locale.all.filter(l=>l.tag && l.tag.includes("-") && l.name).map(l=>({
  value: l.tag,
  label: l.location ? `${l.name} (${l.location})` : l.name
}))