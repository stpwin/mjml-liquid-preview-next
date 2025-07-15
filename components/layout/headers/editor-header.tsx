"use client"

// import Link from "next/link"
import { ThemeManager } from "@/components/layout/theme-manager"
import { LiquidManager } from "@/components/liquid/liquid-manager"
import { ViewportManager } from "@/components/previewer/viewport-manager"
import { ExportManager } from "@/components/layout/export-manager"
import { useLayout } from "@/hooks/use-layout"
import { LayoutManager } from "@/components/layout/layout-manager"
import { LoadTemplateMenu } from "@/components/load-template-menu"
import { ViewTemplateMenu } from "@/components/view-template-menu"

export function EditorHeader() {
  const { isFullScreen } = useLayout();

  // const renderLogo = () => {
  //   return (
  //     <Link className="flex items-center space-x-2" href="/">
  //       <span className={`font-sans ${isFullScreen ? 'hidden' : 'sm:inline-block'}`}>
  //         MJMLiquid
  //       </span>
  //     </Link>
  //   )
  // }

  return (
    <header className={`top-0 z-50 w-full border-b transition-colors duration-200 px-5 ${
      isFullScreen
        ? 'fixed border-transparent bg-transparent'
        : 'sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className={`${isFullScreen ? 'px-4' : 'container'} mx-auto flex h-14 justify-between`}>
        <div className="flex items-center">
          {/* {renderLogo()} */}
          <LoadTemplateMenu />
          <ViewTemplateMenu />
        </div>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <ViewportManager />
            <LiquidManager />
            <ExportManager />
            <LayoutManager />
            <ThemeManager />
          </nav>
        </div>
      </div>
    </header>
  )
}