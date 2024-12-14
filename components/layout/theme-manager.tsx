"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useUIState } from "@/hooks/use-ui-state"
import { UI_STATE, HOTKEYS } from "@/lib/constants"
import { HotkeyDropdownItem } from "@/components/shared/hotkeys/hotkey-dropdown-item"
import { useHotkeysHandler } from "../../hooks/use-hotkeys-handler"
import { HotkeyIconButton } from "../shared/hotkeys/hotkey-icon-button"

export function ThemeManager() {
  const { theme, setTheme } = useTheme()
  const { isOpen, onOpenChange } = useUIState(UI_STATE.THEME)

  useHotkeysHandler({
    hotkey: HOTKEYS.TOGGLE_THEME.key,
    onTrigger: () => {
      onOpenChange(!isOpen)
    },
  })

  const lightRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_LIGHT.key,
    onTrigger: () => {
      if (isOpen) {
        setTheme("light")
        onOpenChange(false)
      }
    },
    dependencies: [isOpen]
  })

  const darkRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_DARK.key,
    onTrigger: () => {
      if (isOpen) {
        setTheme("dark")
        onOpenChange(false)
      }
    },
    dependencies: [isOpen]
  })

  const systemRef = useHotkeysHandler({
    hotkey: HOTKEYS.THEME_SYSTEM.key,
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
        <HotkeyIconButton
          icon={theme === "light" ? Sun : Moon}
          hotkey={HOTKEYS.TOGGLE_THEME.hint}
          srText={HOTKEYS.TOGGLE_THEME.description}
          title={HOTKEYS.TOGGLE_THEME.description}
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
          hotkey={HOTKEYS.THEME_LIGHT.hint}
          onClick={() => {
            setTheme("light")
            onOpenChange(false)
          }}
        />
        <HotkeyDropdownItem
          icon={Moon}
          label="Dark"
          hotkey={HOTKEYS.THEME_DARK.hint}
          onClick={() => {
            setTheme("dark")
            onOpenChange(false)
          }}
        />
        <HotkeyDropdownItem
          icon={Monitor}
          label="System"
          hotkey={HOTKEYS.THEME_SYSTEM.hint}
          onClick={() => {
            setTheme("system")
            onOpenChange(false)
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 