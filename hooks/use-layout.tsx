"use client";

import { createContext, useContext, useState } from "react";

interface LayoutContextType {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => setIsFullScreen(prev => !prev);

  return (
    <LayoutContext.Provider value={{ isFullScreen, toggleFullScreen }}>
      {children}
    </LayoutContext.Provider>
  );
} 