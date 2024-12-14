"use client"

import { Button } from "@/components/ui/button"
import { HotkeyHint } from "./hotkey-hint"
import { LucideIcon } from "lucide-react"

interface HotkeyButtonProps {
  icon: LucideIcon
  hotkey: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  title?: string
  isActive?: boolean
}

export function HotkeyButton({
  icon: Icon,
  hotkey,
  onClick,
  variant = "ghost",
  size = "icon",
  className = "",
  title,
  isActive = false
}: HotkeyButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`relative ${className} ${
        isActive ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" : ""
      }`}
      title={title}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
      <HotkeyHint hotkey={hotkey} />
    </Button>
  )
} 