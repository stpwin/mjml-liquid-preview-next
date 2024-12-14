import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Space_Grotesk, Newsreader, JetBrains_Mono, Inter } from "next/font/google";

import { Providers } from "./providers"
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { WelcomeToast } from "@/components/shared/toasts/welcome-toast";
import { HelpDialog } from "@/components/layout/help";
import { JsonLd } from "@/components/seo/json-ld";

export { metadata } from "@/components/seo/metadata"

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

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <JsonLd />
      </head>

      <body className={`${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col h-screen`}>
        <Analytics />
        <Providers>
          <Header />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
          <Toaster />
          <HelpDialog />
          <Footer />
          <WelcomeToast />
        </Providers>
      </body>
    </html>
  );
}
