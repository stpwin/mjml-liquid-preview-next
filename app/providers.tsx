"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { MJMLProvider } from "@/hooks/use-mjml-processor"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <MJMLProvider>
        {children}
      </MJMLProvider>
    </NextThemesProvider>
  )
} 