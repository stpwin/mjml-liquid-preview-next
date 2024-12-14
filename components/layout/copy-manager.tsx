"use client"

import { useState } from "react"
import { Copy, Check, Code, Braces } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useToast } from "@/hooks/use-toast"
import { useUIState } from "@/hooks/use-ui-state"
import { useMJMLProcessor } from "@/hooks/use-mjml-processor"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useHotkeysHandler } from "@/hooks/use-hotkeys-handler"
import { HotkeyIconButton } from "../shared/hotkeys/hotkey-icon-button"
import { HotkeyDropdownItem } from "../shared/hotkeys/hotkey-dropdown-item"
import { STORAGE_KEYS, UI_STATE, HOTKEYS } from "@/lib/constants"

export function CopyManager() {
  const { content, html } = useMJMLProcessor()
  const [localLiquid] = useLocalStorage(STORAGE_KEYS.LOCAL_LIQUID, "{}")
  const [sharedLiquid] = useLocalStorage(STORAGE_KEYS.SHARED_LIQUID, "{}")
  const { toast } = useToast()
  const [copying, setCopying] = useState(false)
  const { isOpen, onOpenChange } = useUIState(UI_STATE.COPY)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      setCopying(true)
      await navigator.clipboard.writeText(text)
      toast({
        description: `${type} copied to clipboard!`,
        variant: "success",
      })
      onOpenChange(false)
    } catch (err) {
      console.error("Failed to copy text: ", err)
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard",
      })
    } finally {
      setTimeout(() => {
        setCopying(false)
      }, 1000);
    }
  }

  const handleCopyHTML = () => copyToClipboard(html, "HTML")
  const handleCopyMJML = () => copyToClipboard(content, "MJML")
  const handleCopyLocalLiquid = () => copyToClipboard(JSON.stringify(localLiquid, null, 2), "Local Liquid")
  const handleCopySharedLiquid = () => copyToClipboard(JSON.stringify(sharedLiquid, null, 2), "Shared Liquid")

  useHotkeysHandler({
    hotkey: HOTKEYS.TOGGLE_COPY.key,
    onTrigger: () => { onOpenChange(!isOpen) },
  })

  const htmlRef = useHotkeysHandler({
    hotkey: HOTKEYS.COPY_HTML.key,
    onTrigger: () => { if (isOpen) handleCopyHTML() },
    dependencies: [isOpen, html]
  })
  
  const mjmlRef = useHotkeysHandler({
    hotkey: HOTKEYS.COPY_MJML.key,
    onTrigger: () => { if (isOpen) handleCopyMJML() },
    dependencies: [isOpen, content]
  })

  const localRef = useHotkeysHandler({
    hotkey: HOTKEYS.COPY_LOCAL.key,
    onTrigger: () => { if (isOpen) handleCopyLocalLiquid() },
    dependencies: [isOpen, localLiquid]
  })

  const sharedRef = useHotkeysHandler({
    hotkey: HOTKEYS.COPY_SHARED.key,
    onTrigger: () => { if (isOpen) handleCopySharedLiquid() },
    dependencies: [isOpen, sharedLiquid]
  })

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <HotkeyIconButton
          icon={copying ? <Check className="text-green-500" /> : Copy}
          hotkey={HOTKEYS.TOGGLE_COPY.hint}
          srText={HOTKEYS.TOGGLE_COPY.description}
          title={HOTKEYS.TOGGLE_COPY.description}
          showHotkeyOverride={isOpen}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]" align="end" ref={(el) => {
        htmlRef(el)
        mjmlRef(el)
        localRef(el)
        sharedRef(el)
      }}>
        <HotkeyDropdownItem
          icon={Code}
          label={HOTKEYS.COPY_HTML.description}
          hotkey={HOTKEYS.COPY_HTML.hint}
          onClick={handleCopyHTML}
        />
        <HotkeyDropdownItem
          icon={Code}
          label={HOTKEYS.COPY_MJML.description}
          hotkey={HOTKEYS.COPY_MJML.hint}
          onClick={handleCopyMJML}
        />
        <HotkeyDropdownItem
          icon={Braces}
          label={HOTKEYS.COPY_LOCAL.description}
          hotkey={HOTKEYS.COPY_LOCAL.hint}
          onClick={handleCopyLocalLiquid}
        />
        <HotkeyDropdownItem
          icon={Braces}
          label={HOTKEYS.COPY_SHARED.description}
          hotkey={HOTKEYS.COPY_SHARED.hint}
          onClick={handleCopySharedLiquid}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 