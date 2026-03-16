import { TTSVoiceItem } from "../../../lib/types/type";

export interface TTSVoicesContextValue {
    customVoices: TTSVoiceItem[];
    systemVoices: TTSVoiceItem[];
    allVoices: TTSVoiceItem[]
}