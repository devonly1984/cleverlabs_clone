import { TTSVoiceItem } from "../../../constants/type";

export interface TTSVoicesContextValue {
    customVoices: TTSVoiceItem[];
    systemVoices: TTSVoiceItem[];
    allVoices: TTSVoiceItem[]
}