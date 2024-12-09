"use client"

import { Github, Link } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/lohkokwee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <Github className="h-4 w-5" />
          </a>
          <a
            href="https://kokwee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <Link className="h-4 w-4" />
          </a>
        </div>
        {/* <a
          href="https://buymeacoffee.com/kokwee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm">
            <span className="font-sans">Buy me a coffee :)</span>
          </Button>
        </a> */}
      </div>
    </footer>
  )
} 