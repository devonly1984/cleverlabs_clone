import { VOICE_CATEGORIES } from '@/components/voices/constants/voice-categories';
import { VoiceCategory } from '@/generated/prisma/enums';
import {z} from 'zod';

export const createVoiceSchema = z.object({
    name: z.string().min(1,"Voice name is required"),
    category: z.enum(VOICE_CATEGORIES as [VoiceCategory,...VoiceCategory[]]),
    language: z.string().min(1,"Language is required"),
    description: z.string().nullish()
})

export const createFormSchema = z.object({
    name: z.string().min(1,"Name is required"),
    file: z.instanceof(File,{message: "An audio file is required"}).nullable().refine(f=>f!==null,"An Audio File is Required"),
    category: z.string().min(1,"A Category is required"),
    language: z.string().min(1,"A Language is required"),
    description: z.string()
})