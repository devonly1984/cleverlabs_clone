import TextToSpeechLayout from "@/components/text-to-speech/layout/TextToSpeechLayout"
import { ReactNode } from "react"
const Layout = ({ children }: { children: ReactNode }) => {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
};

export default Layout;