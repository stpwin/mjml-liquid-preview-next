"use client"

import React from "react"
import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { HotkeyHint } from "./hotkey-hint"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import { useKeyboard } from "@/hooks/use-keyboard"

interface HotkeyIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon | React.ReactNode
  hotkey: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  title?: string
  isActive?: boolean
  srText?: string
  showHotkeyOverride?: boolean
}

export function HotkeyIconButton({
  icon: Icon,
  hotkey,
  onClick,
  variant = "ghost",
  size = "icon",
  className = "",
  title,
  isActive = false,
  showHotkeyOverride = false,
  srText = "",
  ...props
}: HotkeyIconButtonProps) {
  const { isAltPressed } = useKeyboard()

  return (
    <SimpleTooltip content={title}>
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={`relative ${className} ${
          isActive ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" : ""
        }`}
        {...props}
      >
        <span className="sr-only">{srText}</span>
        {React.isValidElement(Icon) ? Icon : React.createElement(Icon as LucideIcon, { className: "h-[1.2rem] w-[1.2rem]" })}
        {isAltPressed && <HotkeyHint show={isAltPressed && !showHotkeyOverride} hotkey={hotkey} />}
      </Button>
    </SimpleTooltip>
  )
} 