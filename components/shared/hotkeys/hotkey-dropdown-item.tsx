"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { HotkeyHint } from "./hotkey-hint"
import { LucideIcon } from "lucide-react"

interface HotkeyDropdownItemProps {
  icon: LucideIcon
  label: string
  hotkey: string
  onClick?: () => void
  className?: string
}

export function HotkeyDropdownItem({
  icon: Icon,
  label,
  hotkey,
  onClick,
  className = ""
}: HotkeyDropdownItemProps) {
  return (
    <DropdownMenuItem onClick={onClick} className={`relative ${className}`}>
      <Icon className="mr-2 h-4 w-4" />
      <span className="font-sans">{label}</span>
      <HotkeyHint hotkey={hotkey} variant="middle-right" />
    </DropdownMenuItem>
  )
} 