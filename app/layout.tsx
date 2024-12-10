import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";

import { Providers } from "./providers"
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { WelcomeToast } from "@/components/shared/welcome-toast";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const newsreader = Newsreader({ 
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "MJML Preview",
  description: "MJML Preview with Liquid templating",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col h-screen`}>
        <Analytics />
        <Providers>
          <Header />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
          <Toaster />
          <Footer />
          <WelcomeToast />
        </Providers>
      </body>
    </html>
  );
}
