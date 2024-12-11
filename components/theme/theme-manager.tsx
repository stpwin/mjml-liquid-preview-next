"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useDropdownState } from "@/hooks/use-dropdown-state"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeManager() {
  const { setTheme } = useTheme()
  const { isOpen, onOpenChange } = useDropdownState('theme')
  const { isAltPressed } = useKeyboard()

  useHotkeys('alt+5', (e) => {
    e.preventDefault()
    onOpenChange(true)
  }, { enableOnFormTags: true, enableOnContentEditable: true })

  const lightRef = useHotkeys('alt+l', (e) => {
    e.preventDefault()
    if (isOpen) {
      setTheme("light")
      onOpenChange(false)
    }
  }, [isOpen])

  const darkRef = useHotkeys('alt+d', (e) => {
    e.preventDefault()
    if (isOpen) {
      setTheme("dark")
      onOpenChange(false)
    }
  }, [isOpen])

  const systemRef = useHotkeys('alt+s', (e) => {
    e.preventDefault()
    if (isOpen) {
      setTheme("system")
      onOpenChange(false)
    }
  }, [isOpen])

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
        <DropdownMenuItem onClick={() => {
          setTheme("light")
          onOpenChange(false)
        }} className="relative">
          <Sun className="mr-2 h-4 w-4" />
          <span className="font-sans">Light</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              l
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setTheme("dark")
          onOpenChange(false)
        }} className="relative">
          <Moon className="mr-2 h-4 w-4" />
          <span className="font-sans">Dark</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              d
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setTheme("system")
          onOpenChange(false)
        }} className="relative">
          <Monitor className="mr-2 h-4 w-4" />
          <span className="font-sans">System</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              s
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 