"use client"

import { Maximize2, Minimize2 } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useLayout } from "@/hooks/use-layout"
import { useUIState } from "@/hooks/use-ui-state"
import { UI_STATE, HOTKEYS } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function LayoutManager() {
  const { isFullScreen, toggleFullScreen } = useLayout()
  const { isAltPressed } = useKeyboard()
  const { onOpenChange } = useUIState(UI_STATE.LAYOUT)

  useHotkeys(HOTKEYS.TOGGLE_LAYOUT, (e) => {
    e.preventDefault()
    onOpenChange(false)
    toggleFullScreen()
  }, { enableOnFormTags: true, enableOnContentEditable: true })

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullScreen}
      className={`relative ${isFullScreen ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : ''}`}
    >
      {isFullScreen ? (
        <Minimize2 className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Maximize2 className="h-[1.2rem] w-[1.2rem]" />
      )}
      {isAltPressed && (
        <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
          4
        </span>
      )}
    </Button>
  )
} 