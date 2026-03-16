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