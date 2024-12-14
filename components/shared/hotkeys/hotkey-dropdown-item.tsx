"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { HotkeyHint } from "./hotkey-hint"
import { LucideIcon } from "lucide-react"
import { useKeyboard } from "@/hooks/use-keyboard"

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
  const { isAltPressed } = useKeyboard()

  return (
    <DropdownMenuItem onClick={onClick} className={`relative ${className}`}>
      <Icon className="mr-2 h-4 w-4" />
      <span className="font-sans">{label}</span>
      <HotkeyHint hotkey={hotkey} show={isAltPressed} variant="middle-right" />
    </DropdownMenuItem>
  )
} 