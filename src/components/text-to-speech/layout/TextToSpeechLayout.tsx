import PageHeader from "@/components/shared/PageHeader"
import { ReactNode } from "react"
interface TextToSpeechLayoutProps {
    children: ReactNode
}
const TextToSpeechLayout = ({ children }: TextToSpeechLayoutProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Text to speech" />
      {children}
    </div>
  );
};
export default TextToSpeechLayout