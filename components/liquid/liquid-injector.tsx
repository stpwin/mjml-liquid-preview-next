"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCcw, Save, Sparkles, Maximize2, Minimize2 } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS } from "@/lib/constants"
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

export const ASCENDA_LIQUID_TEMPLATE = {
  "hide_ascenda_brand": false,
  "theme_brand_primary_color": "#22285A",
  "theme_brand_secondary_color": "#FFC0CB",
  "theme_brand_header_color": "#22285A",
  "theme_brand_header_background_color": "#FFFFFF",
  "theme_brand_header_font_family": "Lexend",
  "theme_brand_header_font_family_url": "https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap",
  "theme_brand_body_font_color": "#22285A",
  "theme_brand_body_font_family": "Lexend",
  "theme_brand_body_font_family_url": "https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap",
  "theme_brand_navigation_background_color": "#FFFFFF",
  "theme_brand_navigation_logo": "",
  "theme_brand_navigation_text_color": "#22285A",
  "theme_brand_footer_background_color": "#FFFFFF",
  "theme_brand_footer_color": "#22285A",
  "theme_brand_footer_logo": "",
  "theme_brand_brand_logo": "",
  "theme_brand_inverted_logo": "",
  "theme_brand_primary_button_border_width": "1px",
  "theme_brand_primary_button_border_radius": "4px",
  "theme_brand_secondary_button_border_width": "1px",
  "theme_brand_secondary_button_border_radius": "4px",
  "theme_brand_primary_200_color": "#c8c9d6",
  "theme_brand_secondary_200_color": "#ffeff2",
  "ascenda_contact_email": "rewardscentral@support.ascenda.com",
  "ascenda_contact_phone": "[+00 (00) 1234 5678]"
}

export function LiquidInjector({ type, isOpen, onOpenChange }: LiquidInjectorProps) {
  const [value, setValue] = useState("")
  const [isMac, setIsMac] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { toast } = useToast()
  const storageKey = type === "local" ? STORAGE_KEYS.LOCAL_LIQUID : STORAGE_KEYS.SHARED_LIQUID
  const [storedLiquid, setStoredLiquid] = useLocalStorage<Record<string, unknown>>(storageKey, {})
  const { refreshTemplate } = useMJMLProcessor()
  const { isAltPressed } = useKeyboard()

  useEffect(() => {
    setIsMac(navigator.platform.includes('Mac'))
  }, [])

  useEffect(() => {
    if (isOpen) {
      setValue(JSON.stringify(storedLiquid, null, 2))
    } else {
      setIsExpanded(false)
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
    setValue(JSON.stringify({}, null, 2))
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
    setIsExpanded(prev => !prev)
  }, [])

  useHotkeys('alt+enter', (e) => {
    e.preventDefault()
    if (isOpen) {
      handleSave()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen, handleSave])

  useHotkeys('alt+r', (e) => {
    e.preventDefault()
    if (isOpen) {
      handleReset()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen])

  useHotkeys('alt+g', (e) => {
    e.preventDefault()
    if (isOpen && type === "shared") {
      handleGenerateAscenda()
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true }, [isOpen, type])

  useHotkeys('alt+e', (e) => {
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
                    r
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
              Tip: hit {isMac ? '⌥' : 'alt'} to view the available hotkey combinations or Esc to close the sheet!
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
