"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function WelcomeToast() {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Welcome to MJML + Liquid Preview!",
      description: (
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-start gap-2">
            <span className="font-sans text-xs">
              Pro tip: hold the <kbd className="px-1 py-0.5 rounded bg-muted">⌥</kbd> or <kbd className="px-1 py-0.5 rounded bg-muted">alt</kbd> keys to see keyboard shortcuts for faster navigation.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-px bg-border" />
            <span className="font-sans text-xs text-muted-foreground text-right">
              Developed with ❤︎ by <Link href="https://github.com/lohkokwee" target="_blank" className="text-primary underline">@lohkokwee</Link>
            </span>
          </div>
        </div>
      ),
      duration: 10000,
    })
  }, [toast])

  return null
} 