import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

import { cn } from "@/lib/utils"

const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap', })

export const metadata: Metadata = {
  title: "IntelliFix",
  description: "IntelliFix, an Ai Powered Debugging and Optimization Tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        roboto.className
      )}> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
