import { TTSVoiceItem } from "../type";

export interface TTSVoicesContextValue {
    customVoices: TTSVoiceItem[];
    systemVoices: TTSVoiceItem[];
    allVoices: TTSVoiceItem[]
}