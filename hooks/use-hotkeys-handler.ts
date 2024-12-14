"use client"

import { useHotkeys } from "react-hotkeys-hook"
import { useUIState } from "@/hooks/use-ui-state"
import { UI_STATE } from "@/lib/constants"

interface UseHotkeyHandlerProps {
  hotkey: string
  uiStateKey?: keyof typeof UI_STATE
  onTrigger?: () => void
  dependencies?: any[]
  options?: {
    enableOnFormTags?: boolean
    enableOnContentEditable?: boolean
  }
}

export function useHotkeysHandler({
  hotkey,
  uiStateKey,
  onTrigger,
  dependencies = [],
  options = {
    enableOnFormTags: true,
    enableOnContentEditable: true
  }
}: UseHotkeyHandlerProps) {
  const { isOpen, onOpenChange } = useUIState(uiStateKey as keyof typeof UI_STATE)

  return useHotkeys(hotkey, (e) => {
    e.preventDefault()
    
    onTrigger?.()
  }, [...dependencies, isOpen], options)
} 