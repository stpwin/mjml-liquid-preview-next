"use client"

import { useState } from "react"
import { Monitor, Smartphone, Maximize } from "lucide-react"
import { useViewport } from "@/hooks/use-viewport"
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
  const { preset, setPreset, size, setSize } = useViewport()
  const [customSize, setCustomSize] = useState<ViewportSize>({ width: 800, height: 600 })
  const [inputValues, setInputValues] = useState({
    width: customSize.width.toString(),
    height: customSize.height.toString()
  })

  const handlePresetChange = (newPreset: "desktop" | "mobile") => {
    setPreset(newPreset)
    const newSize = VIEWPORT_PRESETS[newPreset]
    setSize(newSize)
    setInputValues({
      width: newSize.width.toString(),
      height: newSize.height.toString()
    })
    setCustomSize(newSize)
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
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {preset === "desktop" && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
          {preset === "mobile" && <Smartphone className="h-[1.2rem] w-[1.2rem]" />}
          {preset === "custom" && <Maximize className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => handlePresetChange("desktop")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span className="font-sans">Desktop</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePresetChange("mobile")}>
          <Smartphone className="mr-2 h-4 w-4" />
          <span className="font-sans">Mobile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2">
          <div className="mb-2">
            <span className="font-sans text-sm">Custom Size</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Width"
              value={inputValues.width}
              onChange={(e) => handleCustomSizeChange("width", e.target.value)}
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Height"
              value={inputValues.height}
              onChange={(e) => handleCustomSizeChange("height", e.target.value)}
              className="w-full"
            />
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