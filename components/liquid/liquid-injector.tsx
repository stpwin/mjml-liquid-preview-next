"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCcw, Save, Sparkles, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

import { JSONEditor } from "./json-editor"
import useMJMLProcessor from "@/hooks/use-mjml-processor"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useToast } from "@/hooks/use-toast"
import { useHotkeysHandler } from "@/hooks/use-hotkeys-handler"
import { HotkeyIconButton } from "../shared/hotkeys/hotkey-icon-button"
import { STORAGE_KEYS, HOTKEYS, DEFAULT_LOCAL_LIQUID, DEFAULT_SHARED_LIQUID, ASCENDA_LIQUID_TEMPLATE } from "@/lib/constants"

interface LiquidInjectorProps {
  type: "local" | "shared"
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function LiquidInjector({ type, isOpen, onOpenChange }: LiquidInjectorProps) {
  const [value, setValue] = useState("")
  const [isExpanded, setIsExpanded] = useLocalStorage(STORAGE_KEYS.LIQUID_EXPANDED, false)
  const { toast } = useToast()
  const storageKey = type === "local" ? STORAGE_KEYS.LOCAL_LIQUID : STORAGE_KEYS.SHARED_LIQUID
  const defaultLiquid = type === "local" ? DEFAULT_LOCAL_LIQUID : DEFAULT_SHARED_LIQUID
  const [storedLiquid, setStoredLiquid] = useLocalStorage<Record<string, unknown>>(storageKey, defaultLiquid)
  const { refreshTemplate } = useMJMLProcessor()
  const { isAltPressed } = useKeyboard()

  useEffect(() => {
    if (isOpen) {
      setValue(JSON.stringify(storedLiquid, null, 2))
    }
  }, [isOpen, storedLiquid])

  const handleSave = () => {
    try {
      const parsedValue = JSON.parse(value)
      setStoredLiquid(parsedValue)
      refreshTemplate()
      toast({
        description: `${type === "local" ? "Local" : "Shared"} Liquid saved!`,
        variant: "success",
      })
      onOpenChange(false)
    } catch {
      toast({
        description: "Invalid JSON format",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setValue(JSON.stringify(defaultLiquid, null, 2))
    toast({
      description: "Reset Liquid to empty JSON - click Save to confirm your changes",
    })
  }

  const handleGenerateAscenda = () => {
    setValue(JSON.stringify(ASCENDA_LIQUID_TEMPLATE, null, 2))
    toast({
      description: "Generated Ascenda shared Liquid template - click Save to confirm your changes",
    })
  }

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [setIsExpanded, isExpanded])

  useHotkeysHandler({
    hotkey: HOTKEYS.LIQUID_SAVE.key,
    onTrigger: () => {
      if (isOpen) { handleSave() }
    },
    dependencies: [isOpen, handleSave]
  })

  useHotkeysHandler({
    hotkey: HOTKEYS.LIQUID_RESET.key,
    onTrigger: () => {
      if (isOpen) { handleReset() }
    },
    dependencies: [isOpen, handleReset]
  })

  useHotkeysHandler({
    hotkey: HOTKEYS.LIQUID_GENERATE.key,
    onTrigger: () => {
      if (isOpen && type === "shared") { handleGenerateAscenda() }
    },
    dependencies: [isOpen, type]
  })

  useHotkeysHandler({
    hotkey: HOTKEYS.LIQUID_EXPAND.key,
    onTrigger: () => {
      if (isOpen) { toggleExpand() }
    },
    dependencies: [isOpen, toggleExpand]
  })

  const renderAscendaLiquidGenerateButton = () => {
    if (type === "shared") {
      return (
        <Button
          variant="outline"
          className="w-full relative"
          onClick={handleGenerateAscenda}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          <span className="font-sans">{HOTKEYS.LIQUID_GENERATE.description}</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              {HOTKEYS.LIQUID_GENERATE.hint}
            </span>
          )}
        </Button>
      )
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right"
        className={cn(
          "transition-all duration-300 sm:max-w-none",
          isExpanded ? "!w-[90vw] sm:!w-[50vw]" : "w-[400px] sm:w-[540px]"
        )}
      >
        <SheetHeader>
          <SheetTitle>{type === "local" ? "Local Liquid" : "Shared Liquid"}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {renderAscendaLiquidGenerateButton()}
          <div className="border rounded-md overflow-hidden">
            <JSONEditor
              value={value}
              onChange={setValue}
              className="min-h-[300px]"
              isExpanded={isExpanded}
            />
          </div>
          <div className="flex justify-between items-center">
            <HotkeyIconButton
              icon={isExpanded ? Minimize2 : Maximize2}
              hotkey={HOTKEYS.LIQUID_EXPAND.hint}
              srText={HOTKEYS.LIQUID_EXPAND.description}
              title={HOTKEYS.LIQUID_EXPAND.description}
              onClick={toggleExpand}
              isActive={isExpanded}
              variant="outline"
            />
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleReset} className="relative">
                <RefreshCcw className="h-4 w-4" />
                <span className="font-sans">Reset</span>
                {isAltPressed && (
                  <span className="absolute mx-auto text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
                    ⌫
                  </span>
                )}
              </Button>
              <Button onClick={handleSave} className="relative">
                <Save className="h-4 w-4" />
                <span className="font-sans">Save</span>
                {isAltPressed && (
                  <span className="absolute mx-auto text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
                    ↩
                  </span>
                )}
              </Button>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <span className="font-sans text-sm text-muted-foreground text-right">
              Tip: hit <kbd className="px-1 py-0.5 rounded bg-muted">⌥</kbd> or <kbd className="px-1 py-0.5 rounded bg-muted">alt</kbd> to view the available hotkey combinations or <kbd className="px-1 py-0.5 rounded bg-muted">Esc</kbd> to close the sheet!
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
