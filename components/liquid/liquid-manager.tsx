"use client"

import { useState } from "react"
import { Droplets, User, Users } from "lucide-react"
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
import { LiquidInjector } from "./liquid-injector"

export function LiquidManager() {
  const [localOpen, setLocalOpen] = useState(false)
  const [sharedOpen, setSharedOpen] = useState(false)
  const { isOpen, onOpenChange } = useDropdownState('liquid')
  const { isAltPressed } = useKeyboard()

  useHotkeys('alt+2', (e) => {
    e.preventDefault()
    onOpenChange(true)
  }, [])

  const localRef = useHotkeys('alt+l', (e) => {
    e.preventDefault()
    if (isOpen) {
      setLocalOpen(true)
      onOpenChange(false)
    }
  }, [isOpen])

  const sharedRef = useHotkeys('alt+s', (e) => {
    e.preventDefault()
    if (isOpen) {
      setSharedOpen(true)
      onOpenChange(false)
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
            setLocalOpen(true)
            onOpenChange(false)
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
            setSharedOpen(true)
            onOpenChange(false)
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
        isOpen={localOpen}
        onClose={() => setLocalOpen(false)}
      />
      <LiquidInjector
        type="shared"
        isOpen={sharedOpen}
        onClose={() => setSharedOpen(false)}
      />
    </>
  )
} 