"use client"
import Link from "next/link"

import { ThemeManager } from "@/components/layout/theme-manager"

type LandingHeaderProps = {
  hasLogo?: boolean
}

export function LandingHeader({ hasLogo = false }: LandingHeaderProps) {
  const renderLogo = () => {
    return (
      <Link className="flex items-center space-x-2" href="/">
        <span className={`font-sans sm:inline-block`}>
          MJMLiquid
        </span>
      </Link>
    )
  }

  return (
    <header className={`top-0 z-50 w-full border-b transition-colors duration-200 px-5 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
      <div className={`container mx-auto flex h-14 ${hasLogo ? 'justify-between' : 'justify-end'}`}>
        <div className="flex items-center">
          {hasLogo && renderLogo()}
        </div>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <ThemeManager />
          </nav>
        </div>
      </div>
    </header>
  )
} 