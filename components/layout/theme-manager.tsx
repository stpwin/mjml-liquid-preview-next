"use client"

import * as React from "react"
import { useTheme } from "next-themes"
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
import { HotkeyButton } from "../shared/hotkeys/hotkey-button"

export function ThemeManager() {
  const { theme, setTheme } = useTheme()
  const { isOpen, onOpenChange } = useUIState(UI_STATE.THEME)

  useHotkeysHandler({
    hotkey: HOTKEYS.TOGGLE_THEME,
    onTrigger: () => {
      onOpenChange(!isOpen)
    },
  })

  const lightRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_LIGHT,
    onTrigger: () => {
      if (isOpen) {
        setTheme("light")
        onOpenChange(false)
      }
    },
    dependencies: [isOpen]
  })

  const darkRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_DARK,
    onTrigger: () => {
      if (isOpen) {
        setTheme("dark")
        onOpenChange(false)
      }
    },
    dependencies: [isOpen]
  })

  const systemRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_SYSTEM,
    onTrigger: () => {
      if (isOpen) {
        setTheme("system")
        onOpenChange(false)
      }
    },
    dependencies: [isOpen]
  })

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <HotkeyButton
          icon={theme === "light" ? Sun : Moon}
          hotkey="5"
          srText="Toggle theme"
          showHotkeyOverride={isOpen}
        />
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