"use client"

import Link from "next/link"
import { ThemeManager } from "@/components/layout/theme-manager"
import { LiquidManager } from "@/components/liquid/liquid-manager"
import { ViewportManager } from "@/components/previewer/viewport-manager"
import { CopyManager } from "@/components/layout/copy-manager"
import { InfoButton } from "@/components/layout/info"
import { useLayout } from "@/hooks/use-layout"
import { LayoutManager } from "@/components/layout/layout-manager"

export function Header() {
  const { isFullScreen } = useLayout();

  return (
    <header className={`top-0 z-50 w-full border-b transition-colors duration-200 ${
      isFullScreen 
        ? 'fixed border-transparent bg-transparent'
        : 'sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className={`${isFullScreen ? 'px-4' : 'container'} mx-auto flex h-14 justify-between`}>
        <div className="flex items-center">
          <Link className="flex items-center space-x-2" href="/">
            <span className={`font-sans font-bold ${isFullScreen ? 'hidden' : 'sm:inline-block'}`}>
              MJMLiquid
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <ViewportManager />
            <LiquidManager />
            <CopyManager />
            <LayoutManager />
            <ThemeManager />
            <InfoButton />
          </nav>
        </div>
      </div>
    </header>
  )
} 