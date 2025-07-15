import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Space_Grotesk, Newsreader, JetBrains_Mono, Inter } from "next/font/google";

import { Providers } from "@/app/providers"
import { Toaster } from "@/components/ui/toaster";
import { HelpDialog } from "@/components/layout/help";
import { JsonLd } from "@/components/seo/json-ld";

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

interface BaseLayoutProps {
  children: React.ReactNode;
  overflowHidden?: boolean;
  Header: React.ComponentType;
}

export function BaseLayout({ children, Header, overflowHidden = true }: BaseLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <JsonLd />
      </Head>

      <body className={`${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col h-screen`}>
        <Analytics />
        <Providers>
          <Header />
          <main className={`flex-1 ${overflowHidden ? "overflow-hidden" : ""}`}>
            {children}
          </main>
          <Toaster />
          <HelpDialog />
        </Providers>
      </body>
    </html>
  );
}