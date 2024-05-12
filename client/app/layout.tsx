import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google'

import { cn } from "@/lib/utils"
import Providers from "./providers";
import { getServerSession } from "next-auth";
const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap', })

export const metadata: Metadata = {
  title: "IntelliFix",
  description: "IntelliFix, an Ai Powered Debugging and Optimization Tool.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        roboto.className
      )}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
