import type { Metadata } from "next";

import "./globals.css";
import { ReactNode } from "react";
import { inter } from "@/constants/fonts";
import { Toaster } from "@/components/ui/sonner";
import {ClerkProvider} from '@clerk/nextjs'


export const metadata: Metadata = {
  title: {
    default: "Eleven Labs Clone",
    template: "%s | Eleven Labs Clone",
  },
  description: "Eleven Labs Tut by CWA",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={` ${inter.variable}antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
};
export default RootLayout;