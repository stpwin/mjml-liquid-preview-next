"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface LiquidInjectorProps {
  type: "local" | "shared"
  isOpen: boolean
  onClose: () => void
  onSave: (value: string) => void
}

export function LiquidInjector({ type, isOpen, onClose, onSave }: LiquidInjectorProps) {
  const [value, setValue] = useState("")
  const storageKey = type === "local" ? "local_liquid" : "shared_liquid"

  useEffect(() => {
    if (isOpen) {
      try {
        const storedValue = localStorage.getItem(storageKey) || "{}"
        setValue(storedValue)
      } catch (e) {
        console.error("Failed to load liquid template:", e)
        setValue("{}")
      }
    }
  }, [isOpen, storageKey])

  const handleSave = () => {
    try {
      JSON.parse(value)
      onSave(value)
      onClose()
    } catch (e) {
      console.error("Invalid JSON format:", e)
    }
  }

  const handleReset = () => {
    setValue("{}")
    onSave("{}")
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{type === "local" ? "Local Liquid" : "Shared Liquid"}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your liquid variables as JSON..."
            className="min-h-[300px] font-mono"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
