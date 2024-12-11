import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";

import { Providers } from "./providers"
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { WelcomeToast } from "@/components/shared/welcome-toast";
import { HelpDialog } from "@/components/layout/help";
import { Inter } from "next/font/google"

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

export const metadata: Metadata = {
  title: "MJML Liquid Preview - Online MJML Editor with Liquid Support",
  description: "Free online MJML editor with Liquid template support. Preview, edit, and test your MJML email templates with local and shared Liquid variables in real-time.",
  keywords: "mjml, liquid, email template, email editor, mjml editor, liquid template, email development, responsive email",
  authors: [{ name: "Kok Wee", url: "https://kokwee.com" }],
  openGraph: {
    title: "MJML Liquid Preview - Online MJML Editor with Liquid Support",
    description: "Free online MJML editor with Liquid template support. Preview, edit, and test your MJML email templates with local and shared Liquid variables in real-time.",
    url: "https://www.mjmliquid.com/",
    siteName: "MJML Liquid Preview",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

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
