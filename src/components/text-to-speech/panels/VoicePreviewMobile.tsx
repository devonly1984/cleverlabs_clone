"use client";
import { useRef, useState, useEffect } from "react";
import { Download, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceAvatar from "@/components/voices/voice-avatar/VoiceAvatar";
import { VoicePreviewPanelVoice } from "@/lib/types/type";
import { useIsMobile } from "@/hooks/use-mobile";

interface VoicePreviewMobileProps {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
}
const VoicePreviewMobile = ({
  audioUrl,
  voice,
  text,
}: VoicePreviewMobileProps) => {
  const isMobile = useIsMobile();
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceId = voice?.id ?? null;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.pause();
    audio.currentTime = 0;
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  useEffect(()=>{
    if (!isMobile) {
      audioRef.current?.pause();
    }
  },[isMobile])
  const TogglePlayPause = ()=>{
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
  }
    const handleDownload = () => {
    
    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };
  if (!audioUrl) return null;
  return (
    <div className="border-t lg:hidden p-4 ">
      <audio ref={audioRef} src={audioUrl} />
      <div className="grid items-center gap-4 grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{text}</p>
          {selectedVoiceName && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <VoiceAvatar
                seed={selectedVoiceId ?? selectedVoiceName}
                name={selectedVoiceName}
                className="shrink-0"
              />
              <span className="truncate">{selectedVoiceName}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size={"icon"} onClick={handleDownload}>
            <Download className="size-4" />
          </Button>
          <Button
            variant={"default"}
            size={"icon"}
            className="rounded-full"
            onClick={TogglePlayPause}
          >
            {isPlaying ? (
              <Pause className="fill-background" />
            ) : (
              <Play className="fill-background" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default VoicePreviewMobile;
