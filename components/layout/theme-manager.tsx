"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useUIState } from "@/hooks/use-ui-state"
import { UI_STATE, HOTKEYS } from "@/lib/constants"
import { HotkeyDropdownItem } from "@/components/shared/hotkeys/hotkey-dropdown-item"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor } from "lucide-react"
import { useHotkeysHandler } from "../../hooks/use-hotkeys-handler"

export function ThemeManager() {
  const { setTheme } = useTheme()
  const { isOpen, onOpenChange } = useUIState(UI_STATE.THEME)
  const { isAltPressed } = useKeyboard()

  useHotkeys(HOTKEYS.TOGGLE_THEME, (e) => {
    e.preventDefault()
    onOpenChange(!isOpen)
  }, { enableOnFormTags: true, enableOnContentEditable: true })

  const lightRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_LIGHT,
    onTrigger: () => {
      setTheme("light")
      onOpenChange(false)
    }
  })

  const darkRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_DARK,
    onTrigger: () => {
      setTheme("dark")
      onOpenChange(false)
    }
  })

  const systemRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_SYSTEM,
    onTrigger: () => {
      setTheme("system")
      onOpenChange(false)
    }
  })

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          {isAltPressed && !isOpen && (
            <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
              5
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[140px]" align="end" ref={(el) => {
        lightRef(el)
        darkRef(el)
        systemRef(el)
      }}>
        <HotkeyDropdownItem
          icon={Sun}
          label="Light"
          hotkey="l"
          onClick={() => {
            setTheme("light")
            onOpenChange(false)
          }}
        />
        <HotkeyDropdownItem
          icon={Moon}
          label="Dark"
          hotkey="d"
          onClick={() => {
            setTheme("dark")
            onOpenChange(false)
          }}
        />
        <HotkeyDropdownItem
          icon={Monitor}
          label="System"
          hotkey="s"
          onClick={() => {
            setTheme("system")
            onOpenChange(false)
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 