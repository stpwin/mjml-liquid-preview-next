"use client"

import { useLayout } from "@/hooks/use-layout"
import { Github, BookHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HelpButton } from "@/components/layout/help"
import Link from "next/link"

export function Footer() {
  const { isFullScreen } = useLayout();

  const renderFooterContent = () => {
    if (isFullScreen) return <></>;

    return (
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            href="https://kokwee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <Button variant="ghost" size="icon">
              <BookHeart className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com/lohkokwee/mjml-liquid-preview"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-5" />
            </Button>
          </Link>
          <HelpButton />
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="https://buymeacoffee.com/kokwee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <span className="font-sans">Buy me a coffee :)</span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <footer className={`bottom-0 w-full transition-all duration-200 ${
      isFullScreen 
        ? 'fixed border-transparent bg-transparent pointer-events-none'
        : 'sticky border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'
    }`}>
      <div className="container mx-auto h-14">
        {renderFooterContent()}
      </div>
    </footer>
  )
} 