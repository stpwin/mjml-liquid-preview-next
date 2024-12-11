"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCcw, Save, Sparkles, Maximize2, Minimize2 } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, HOTKEYS, DEFAULT_LOCAL_LIQUID, DEFAULT_SHARED_LIQUID, ASCENDA_LIQUID_TEMPLATE } from "@/lib/constants"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { JSONEditor } from "./json-editor"
import useMJMLProcessor from "@/hooks/use-mjml-processor"
import { cn } from "@/lib/utils"
import { useKeyboard } from "@/hooks/use-keyboard"

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

  useHotkeys(HOTKEYS.LIQUID_SAVE, (e) => {
    e.preventDefault()
    if (isOpen) {
      handleSave()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen, handleSave])

  useHotkeys(HOTKEYS.LIQUID_RESET, (e) => {
    e.preventDefault()
    if (isOpen) {
      handleReset()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen])

  useHotkeys(HOTKEYS.LIQUID_GENERATE, (e) => {
    e.preventDefault()
    if (isOpen && type === "shared") {
      handleGenerateAscenda()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen, type])

  useHotkeys(HOTKEYS.LIQUID_EXPAND, (e) => {
    e.preventDefault()
    if (isOpen) {
      toggleExpand()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen, toggleExpand])

  const renderAscendaLiquidGenerateButton = () => {
    if (type === "shared") {
      return (
        <Button
          variant="outline"
          className="w-full relative"
          onClick={handleGenerateAscenda}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          <span className="font-sans">Generate Ascenda liquid</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              g
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
            <Button
              variant="outline"
              size="icon"
              onClick={toggleExpand}
              title={isExpanded ? "Shrink sheet" : "Expand sheet"}
              className={cn(
                "relative",
                isExpanded ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" : ""
              )}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              {isAltPressed && (
                <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
                  e
                </span>
              )}
            </Button>
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
