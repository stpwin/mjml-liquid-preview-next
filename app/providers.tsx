"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { MJMLProvider } from "@/hooks/use-mjml-processor"
import { ViewportProvider } from "@/hooks/use-viewport"
import { LayoutProvider } from "@/hooks/use-layout"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <ViewportProvider>
        <MJMLProvider>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </MJMLProvider>
      </ViewportProvider>
    </NextThemesProvider>
  )
} 