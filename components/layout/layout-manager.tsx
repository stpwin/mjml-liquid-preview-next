"use client"

import { Maximize2, Minimize2 } from "lucide-react"
import { useLayout } from "@/hooks/use-layout"
import { Button } from "@/components/ui/button"

export function LayoutManager() {
  const { isFullScreen, toggleFullScreen } = useLayout();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullScreen}
      className={isFullScreen ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"' : ''}
    >
      {isFullScreen ? (
        <Minimize2 className="h-4 w-4" />
      ) : (
        <Maximize2 className="h-4 w-4" />
      )}
    </Button>
  );
} 