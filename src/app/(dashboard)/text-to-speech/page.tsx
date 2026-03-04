import TextToSpeechView from "@/components/text-to-speech/views/TextToSpeechView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Speech",
};
const TextToSpeechPage = () => {
  return <TextToSpeechView />;
};
export default TextToSpeechPage;
