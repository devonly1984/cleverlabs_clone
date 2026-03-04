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