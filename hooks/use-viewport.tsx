"use client"

import { createContext, useContext, useState } from "react"

interface ViewportSize {
  width: number
  height: number
}

interface ViewportContextType {
  size: ViewportSize
  setSize: (size: ViewportSize) => void
  preset: "desktop" | "mobile" | "custom"
  setPreset: (preset: "desktop" | "mobile" | "custom") => void
}

const ViewportContext = createContext<ViewportContextType | null>(null)

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState<ViewportSize>({ width: 1280, height: 800 })
  const [preset, setPreset] = useState<"desktop" | "mobile" | "custom">("desktop")

  return (
    <ViewportContext.Provider
      value={{
        size,
        setSize,
        preset,
        setPreset
      }}
    >
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport() {
  const context = useContext(ViewportContext)
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider")
  }
  return context
} 