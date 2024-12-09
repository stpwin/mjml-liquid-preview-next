"use client"

import { Copy, Check, Code, Braces } from "lucide-react"
import { useState } from "react"
import { useMJMLProcessor } from "@/hooks/use-mjml-processor"
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
  const { toast } = useToast()
  const [copying, setCopying] = useState(false)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      setCopying(true)
      await navigator.clipboard.writeText(text)
      toast({
        description: `${type} copied to clipboard!`,
        variant: "success",
      })
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

  const handleCopyHTML = () => {
    copyToClipboard(html, "HTML")
  }

  const handleCopyMJML = () => {
    copyToClipboard(content, "MJML")
  }

  const handleCopyLocalLiquid = () => {
    const localLiquid = localStorage.getItem("local_liquid") || "{}"
    copyToClipboard(localLiquid, "Local Liquid")
  }

  const handleCopySharedLiquid = () => {
    const sharedLiquid = localStorage.getItem("shared_liquid") || "{}"
    copyToClipboard(sharedLiquid, "Shared Liquid")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {copying ? (
            <Check className="h-[1.2rem] w-[1.2rem] text-green-500" />
          ) : (
            <Copy className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyHTML}>
          <Code className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy HTML</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyMJML}>
          <Code className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy MJML</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLocalLiquid}>
          <Braces className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy Local Liquid</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopySharedLiquid}>
          <Braces className="h-4 w-4 mr-2" />
          <span className="font-sans">Copy Shared Liquid</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 