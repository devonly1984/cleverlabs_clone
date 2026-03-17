import type { Metadata } from "next";

import "./globals.css";
import { ReactNode } from "react";
import { inter } from "@/constants/fonts";
import { Toaster } from "@/components/ui/sonner";
import {ClerkProvider} from '@clerk/nextjs'
import { TRPCReactProvider } from "@/lib/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
      <html lang="en" suppressHydrationWarning>
        <body className={` ${inter.variable}antialiased`}>
          <TRPCReactProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};
export default RootLayout;