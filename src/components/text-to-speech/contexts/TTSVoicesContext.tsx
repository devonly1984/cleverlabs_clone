"use client";
import { TTSVoicesContextValue } from '@/constants/voices/voices-context';
import {createContext,ReactNode,useContext} from 'react';

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null);
interface TTSVoicesProviderProps {
    children: ReactNode;
    value: TTSVoicesContextValue;
}
export const TTSVoicesProvider = ({
  children,
  value,
}: TTSVoicesProviderProps) => {
    return (
      <TTSVoicesContext.Provider value={value}>
        {children}
      </TTSVoicesContext.Provider>
    );
};
export const useTTSVoices = ()=>{
    const context = useContext(TTSVoicesContext);
    if (!context) {
        throw new Error(
          "useTTSVoices must be used within a TTSVoicesProvider",
        );
    }
    return context;
}
