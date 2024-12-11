"use client"

import { Droplets, User, Users } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useUIState } from "@/hooks/use-ui-state"
import { UI_STATE, HOTKEYS } from "@/lib/constants"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiquidInjector } from "./liquid-injector"

export function LiquidManager() {
  const { isOpen, onOpenChange } = useUIState(UI_STATE.LIQUID)
  const { isOpen: isLocalOpen, onOpenChange: onLocalOpenChange } = useUIState(UI_STATE.LOCAL_LIQUID_SHEET)
  const { isOpen: isSharedOpen, onOpenChange: onSharedOpenChange } = useUIState(UI_STATE.SHARED_LIQUID_SHEET)
  const { isAltPressed } = useKeyboard()

  useHotkeys(HOTKEYS.TOGGLE_LIQUID, (e) => {
    e.preventDefault()
    onOpenChange(!isOpen)
  }, { enableOnFormTags: true, enableOnContentEditable: true })

  const localRef = useHotkeys(HOTKEYS.LIQUID_LOCAL, (e) => {
    e.preventDefault()
    if (isOpen) {
      onLocalOpenChange(true)
    }
  }, [isOpen])

  const sharedRef = useHotkeys(HOTKEYS.LIQUID_SHARED, (e) => {
    e.preventDefault()
    if (isOpen) {
      onSharedOpenChange(true)
    }
  }, [isOpen])

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Droplets className="h-[1.2rem] w-[1.2rem]" />
            {isAltPressed && !isOpen && (
              <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
                2
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]" align="end" ref={(el) => {
          localRef(el)
          sharedRef(el)
        }}>
          <DropdownMenuItem onClick={() => {
            onLocalOpenChange(true)
          }} className="relative">
            <User className="mr-2 h-4 w-4" />
            <span className="font-sans">Local Liquid</span>
            {isAltPressed && (
              <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
                l
              </span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            onSharedOpenChange(true)
          }} className="relative">
            <Users className="mr-2 h-4 w-4" />
            <span className="font-sans">Shared Liquid</span>
            {isAltPressed && (
              <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
                s
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LiquidInjector
        type="local"
        isOpen={isLocalOpen}
        onOpenChange={onLocalOpenChange}
      />
      <LiquidInjector
        type="shared"
        isOpen={isSharedOpen}
        onOpenChange={onSharedOpenChange}
      />
    </>
  )
} 