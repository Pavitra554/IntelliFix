"use client";

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";

export default function Providers({
    children, session
  }: Readonly<{
    children: React.ReactNode;
    session: any
  }>){
    return(
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </SessionProvider>
    )
}