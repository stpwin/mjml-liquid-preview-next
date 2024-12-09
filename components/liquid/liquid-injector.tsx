"use client"

import { useState, useEffect } from "react"
import { RefreshCcw, Save, Sparkles } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import useMJMLProcessor from "@/hooks/use-mjml-processor"

interface LiquidInjectorProps {
  type: "local" | "shared"
  isOpen: boolean
  onClose: () => void
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
  "theme_brand_secondary_200_color": "#ffeff2"
} 

interface LiquidInjectorProps {
  type: "local" | "shared"
  isOpen: boolean
  onClose: () => void
}

export function LiquidInjector({ type, isOpen, onClose }: LiquidInjectorProps) {
  const [value, setValue] = useState("")
  const [isMac, setIsMac] = useState(false)
  const { toast } = useToast()
  const storageKey = type === "local" ? STORAGE_KEYS.LOCAL_LIQUID : STORAGE_KEYS.SHARED_LIQUID
  const [storedLiquid, setStoredLiquid] = useLocalStorage<Record<string, unknown>>(storageKey, {})
  const { refreshTemplate } = useMJMLProcessor()

  useEffect(() => {
    setIsMac(navigator.platform.includes('Mac'))
  }, [])

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
      onClose()
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSave()
    }
  }

  const renderAscendaLiquidGenerateButton = () => {
    if (type === "shared") {
      return (
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGenerateAscenda}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          <span className="font-sans">Generate Ascenda liquid</span>
        </Button>
      )
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{type === "local" ? "Local Liquid" : "Shared Liquid"}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {renderAscendaLiquidGenerateButton()}
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your liquid variables as JSON..."
            className="min-h-[300px] font-mono"
          />
          <div className="flex justify-end items-center space-x-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
              <span className="font-sans">Reset</span>
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4" />
              <span className="font-sans">Save</span>
            </Button>
          </div>
          <div className="flex justify-end items-end">
            <span className="font-sans text-sm text-muted-foreground text-right">
              Tip: if you&apos;re typing in the TextArea, simply press {isMac ? '⌘' : 'Ctrl'} + Enter to save!
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
