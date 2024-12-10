"use client"

import { Copy, Check, Code, Braces } from "lucide-react"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useDropdownState } from "@/hooks/use-dropdown-state"
import { useMJMLProcessor } from "@/hooks/use-mjml-processor"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS } from "@/lib/constants"
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
  const { isOpen, onOpenChange } = useDropdownState('copy')
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

  useHotkeys('alt+3', (e) => {
    e.preventDefault()
    onOpenChange(true)
  }, [])

  const htmlRef = useHotkeys('alt+h', (e) => {
    e.preventDefault()
    if (isOpen) handleCopyHTML()
  }, [isOpen, html])

  const mjmlRef = useHotkeys('alt+m', (e) => {
    e.preventDefault()
    if (isOpen) handleCopyMJML()
  }, [isOpen, content])

  const localRef = useHotkeys('alt+l', (e) => {
    e.preventDefault()
    if (isOpen) handleCopyLocalLiquid()
  }, [isOpen, localLiquid])

  const sharedRef = useHotkeys('alt+s', (e) => {
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