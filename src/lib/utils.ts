import { regionNames } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"


export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
export const formatTime = (seconds:number):string=>{
  return format(new Date(seconds*1000),
    'mm:ss')
}
export const parseLanguage = (locale:string)=>{
  const [,country] = locale.split('-');
  if (!country) return {flag:"",region:locale}

  const flag = [...country.toUpperCase()].map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join("")
  const region= regionNames.of(country) ?? country;
  return { flag, region }
}
export const formatFileSize = (bytes:number)=>{
  if (bytes<1024) return `${bytes} B`;
  if (bytes < 1024*1024) return `${(bytes/1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
