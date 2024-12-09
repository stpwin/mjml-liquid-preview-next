"use client"

import { useState } from "react"
import { Droplets, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiquidInjector } from "./liquid-injector"

export function LiquidManager() {
  const [localOpen, setLocalOpen] = useState(false)
  const [sharedOpen, setSharedOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Droplets className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLocalOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            <span className="font-sans">Local Liquid</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSharedOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            <span className="font-sans">Shared Liquid</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LiquidInjector
        type="local"
        isOpen={localOpen}
        onClose={() => setLocalOpen(false)}
      />
      <LiquidInjector
        type="shared"
        isOpen={sharedOpen}
        onClose={() => setSharedOpen(false)}
      />
    </>
  )
} 