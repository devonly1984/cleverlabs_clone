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