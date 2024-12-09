"use client"

import { useLayout } from "@/hooks/use-layout"

interface ContentWrapperProps {
  children: React.ReactNode;
}

export function ContentWrapper({ children }: ContentWrapperProps) {
  const { isFullScreen } = useLayout();
  
  return (
    <div className={`h-full overflow-auto ${isFullScreen ? 'pt-14' : ''}`}>
      {children}
    </div>
  );
} 