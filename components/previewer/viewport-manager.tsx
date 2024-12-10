"use client"

import { useRef, useState } from "react"
import { Monitor, Smartphone, Maximize } from "lucide-react"
import { useViewport } from "@/hooks/use-viewport"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useDropdownState } from "@/hooks/use-dropdown-state"
import { useHotkeys } from "react-hotkeys-hook"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const VIEWPORT_PRESETS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 375, height: 667 }
} as const

interface ViewportSize {
  width: number
  height: number
}

export function ViewportManager() {
  const { preset, setPreset, setSize } = useViewport()
  const { isAltPressed } = useKeyboard()
  const { isOpen, onOpenChange } = useDropdownState('viewport')
  const [customSize, setCustomSize] = useState<ViewportSize>({ width: 800, height: 600 })
  const [inputValues, setInputValues] = useState({
    width: customSize.width.toString(),
    height: customSize.height.toString()
  })
  const widthInputRef = useRef<HTMLInputElement>(null)
  const heightInputRef = useRef<HTMLInputElement>(null)

  const handlePresetChange = (newPreset: "desktop" | "mobile") => {
    setPreset(newPreset)
    const newSize = VIEWPORT_PRESETS[newPreset]
    setSize(newSize)
    setInputValues({
      width: newSize.width.toString(),
      height: newSize.height.toString()
    })
    setCustomSize(newSize)
    onOpenChange(false)
  }

  const handleCustomSizeChange = (dimension: "width" | "height", value: string) => {
    setInputValues(prev => ({ ...prev, [dimension]: value }))

    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue > 0) {
      const newSize = { ...customSize, [dimension]: numValue }
      setCustomSize(newSize)
      if (preset === "custom") {
        setSize(newSize)
      }
    }
  }

  const handleCustomSelect = () => {
    const width = parseInt(inputValues.width, 10)
    const height = parseInt(inputValues.height, 10)
    
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
      const newSize = { width, height }
      setCustomSize(newSize)
      setSize(newSize)
      setPreset("custom")
      onOpenChange(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'width' | 'height') => {
    if (e.key === 'Enter') {
      handleCustomSelect()
    } else if (e.key === 'Tab' && !e.shiftKey && field === 'width') {
      e.preventDefault()
      heightInputRef.current?.focus()
    } else if (e.key === 'Tab' && e.shiftKey && field === 'height') {
      e.preventDefault()
      widthInputRef.current?.focus()
    }
  }

  useHotkeys('alt+1', (e) => {
    e.preventDefault()
    onOpenChange(true)
  }, [])

  const desktopRef = useHotkeys('alt+d', (e) => {
    e.preventDefault()
    if (isOpen) handlePresetChange("desktop")
  }, [isOpen])

  const mobileRef = useHotkeys('alt+m', (e) => {
    e.preventDefault()
    if (isOpen) handlePresetChange("mobile")
  }, [isOpen])

  useHotkeys('alt+w', (e) => {
    e.preventDefault()
    if (isOpen) {
      widthInputRef.current?.focus()
      widthInputRef.current?.select()
    }
  }, [isOpen], { enableOnFormTags: true })

  useHotkeys('alt+h', (e) => {
    e.preventDefault()
    if (isOpen) {
      heightInputRef.current?.focus()
      heightInputRef.current?.select()
    }
  }, [isOpen], { enableOnFormTags: true })

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {preset === "desktop" && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
          {preset === "mobile" && <Smartphone className="h-[1.2rem] w-[1.2rem]" />}
          {preset === "custom" && <Maximize className="h-[1.2rem] w-[1.2rem]" />}
          {isAltPressed && !isOpen && (
            <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
              1
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]" ref={(el) => {
        desktopRef(el)
        mobileRef(el)
      }}>
        <DropdownMenuItem onClick={() => handlePresetChange("desktop")} className="relative">
          <Monitor className="mr-2 h-4 w-4" />
          <span className="font-sans">Desktop</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              d
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePresetChange("mobile")} className="relative">
          <Smartphone className="mr-2 h-4 w-4" />
          <span className="font-sans">Mobile</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              m
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2">
          <div className="mb-2">
            <span className="font-sans text-sm">Custom Size</span>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="relative w-full">
              <Input
                ref={widthInputRef}
                type="text"
                value={inputValues.width}
                onChange={(e) => handleCustomSizeChange("width", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'width')}
                className="w-full pr-6 font-sans"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                w
              </span>
            </div>
            <div className="relative w-full">
              <Input
                ref={heightInputRef}
                type="text"
                value={inputValues.height}
                onChange={(e) => handleCustomSizeChange("height", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'height')}
                className="w-full pr-6 font-sans"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                h
              </span>
            </div>
          </div>
          <Button 
            onClick={handleCustomSelect} 
            className="w-full"
            variant="secondary"
            size="sm"
            disabled={!inputValues.width || !inputValues.height}
          >
            <span className="font-sans">{preset === "custom" ? "Applying custom size..." : "Apply custom size"}</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}