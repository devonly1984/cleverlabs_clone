import { AudioLines, Home, LayoutGrid,  Volume2 } from "lucide-react";
import { MenuItem } from "./type";

export const mainMenuItems:MenuItem[]=[
    {
        title: "Dashboard",
        url: '/',
        icon: Home
    },
    {
        title: "Explore voices",
        url: '/voices',
        icon: LayoutGrid
    },
    {
        title: "Text to speech",
        url: '/text-to-speech',
        icon: AudioLines
    },
    {
        title: "Voice cloning",
        icon: Volume2
    }
]

export const TEXT_MAX_LENGTH = 5000
export const COST_PER_UNIT=0.0003
export const tabTriggerClassName = 
  "flex-1 h-full gap-2 bg-transparent rounded-none border-x-0 border-t-0 border-b-px border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none";
