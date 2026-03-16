"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import VoiceAvatar from "@/components/voices/voice-avatar/VoiceAvatar";
import { useWaveSurfer } from "@/hooks/useWaveSurfer";
import { cn, formatTime } from "@/lib/utils";
import { Download, Pause, Play, Redo, Undo } from "lucide-react";
import { useState } from "react";
    import { VoicePreviewPanelVoice } from "@/lib/types/type";

interface PlaybackControlsProps {
  audioUrl: string;
  text: string;
  voice: VoicePreviewPanelVoice | null;
}
const PlaybackControls = ({
  audioUrl,
  text,
  voice,
}: PlaybackControlsProps) => {

  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = () => {
    setIsDownloading(true);
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

    setTimeout(() => setIsDownloading(false), 1000);
  };
  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekBackward,
    seekForward,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  });
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceId = voice?.id ?? null;
  return (
    
    <div className="relative flex flex-1 items-center justify-center">
      {!isReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Badge
            variant={"outline"}
            className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
          >
            <Spinner className="size-4" />
            <span className="">Loading audio...</span>
          </Badge>
        </div>
      )}
      <div
        ref={containerRef}
        className={cn(
          "w-full cursor-pointer transition-opacity duration-200",
          !isReady && "opacity-0",
        )}
      />

      {/**Time display */}
      <div className="flex items-center justify-center">
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
          {formatTime(currentTime)}&nbsp;
          <div className="text-muted-foreground">
            /&nsp; {formatTime(duration)}
          </div>
        </p>
      </div>
      {/**Footer */}
      <div className="flex flex-col items-center p-6">
        <div className="grid grid-cols-3 w-full">
          {/**Meta */}
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-sm font-medium text-foreground">
              {text}
            </p>
            {selectedVoiceName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <VoiceAvatar
                  seed={selectedVoiceId ?? selectedVoiceName}
                  name={selectedVoiceName}
                  className="shrink-0"
                />
                <span className="truncate">{selectedVoiceName}</span>
              </div>
            )}
          </div>
          {/**Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={"ghost"}
              size="icon-lg"
              className="flex-col"
              onClick={() => seekBackward(10)}
              disabled={!isReady}
            >
              <Undo className="size-4 mb-1" />
              <span className=" text-[10px] font-medium">10</span>
            </Button>

            <Button
              variant={"default"}
              size={"icon-lg"}
              className="rounded-full"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="fill-background" />
              ) : (
                <Play className="fill-background" />
              )}
            </Button>
            <Button
              variant={"ghost"}
              size="icon-lg"
              className="flex-col"
              onClick={() => seekForward(10)}
              disabled={!isReady}
            >
              <Redo className="size-4 mb-1" />
              <span className=" text-[10px] font-medium">10</span>
            </Button>
          </div>
          <div className="flex justify-end">
            <Button
              variant={"outline"}
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="size-4" />
              Download
            </Button>
          </div>
            
                <div className="flex justify-end">
            <Button
              variant={"outline"}
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="size-4" />
              Download
            </Button>
          </div>
            
        </div>
      </div>
    </div>
  );
};
export default PlaybackControls