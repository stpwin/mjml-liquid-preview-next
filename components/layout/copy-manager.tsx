"use client"

import { Copy, Check, Code, Braces } from "lucide-react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useUIState } from "@/hooks/use-ui-state"
import { useMJMLProcessor } from "@/hooks/use-mjml-processor"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, UI_STATE, HOTKEYS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function CopyManager() {
  const { content, html } = useMJMLProcessor()
  const [localLiquid] = useLocalStorage(STORAGE_KEYS.LOCAL_LIQUID, "{}")
  const [sharedLiquid] = useLocalStorage(STORAGE_KEYS.SHARED_LIQUID, "{}")
  const { toast } = useToast()
  const [copying, setCopying] = useState(false)
  const { isOpen, onOpenChange } = useUIState(UI_STATE.COPY)
  const { isAltPressed } = useKeyboard()

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

  useHotkeys(HOTKEYS.TOGGLE_COPY, (e) => {
    e.preventDefault()
    onOpenChange(!isOpen)
  }, { enableOnFormTags: true, enableOnContentEditable: true })

  const htmlRef = useHotkeys(HOTKEYS.COPY_HTML, (e) => {
    e.preventDefault()
    if (isOpen) handleCopyHTML()
  }, [isOpen, html])

  const mjmlRef = useHotkeys(HOTKEYS.COPY_MJML, (e) => {
    e.preventDefault()
    if (isOpen) handleCopyMJML()
  }, [isOpen, content])

  const localRef = useHotkeys(HOTKEYS.COPY_LOCAL, (e) => {
    e.preventDefault()
    if (isOpen) handleCopyLocalLiquid()
  }, [isOpen, localLiquid])

  const sharedRef = useHotkeys(HOTKEYS.COPY_SHARED, (e) => {
    e.preventDefault()
    if (isOpen) handleCopySharedLiquid()
  }, [isOpen, sharedLiquid])

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {copying ? (
            <Check className="h-[1.2rem] w-[1.2rem] text-green-500" />
          ) : (
            <Copy className="h-[1.2rem] w-[1.2rem]" />
          )}
          {isAltPressed && !isOpen && (
            <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
              3
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]" align="end" ref={(el) => {
        htmlRef(el)
        mjmlRef(el)
        localRef(el)
        sharedRef(el)
      }}>
        <DropdownMenuItem onClick={handleCopyHTML} className="relative">
          <Code className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy HTML</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              h
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyMJML} className="relative">
          <Code className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy MJML</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              m
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLocalLiquid} className="relative">
          <Braces className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy Local Liquid</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              l
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopySharedLiquid} className="relative">
          <Braces className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy Shared Liquid</span>
          {isAltPressed && (
            <span className="absolute right-2 text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
              s
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 