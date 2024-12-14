"use client"

import React, { useState, useRef, useEffect } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tooltipVariants = cva(
  "absolute z-50 overflow-hidden whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      horizontal: {
        left: "left-0",
        center: "left-1/2 -translate-x-1/2",
        right: "right-0"
      },
      vertical: {
        top: "-top-8",
        bottom: "top-full mt-2"
      }
    },
    defaultVariants: {
      horizontal: "center",
      vertical: "bottom"
    }
  }
)

interface SimpleTooltipProps {
  children: React.ReactNode
  content?: React.ReactNode
  className?: string
  tooltipClassName?: string
  tooltipVariants?: Partial<VariantProps<typeof tooltipVariants>>
}

export function SimpleTooltip({
  children,
  content,
  className,
  tooltipClassName,
  tooltipVariants: userTooltipVariants
}: SimpleTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [autoTooltipVariants, setAutoTooltipVariants] = useState<VariantProps<typeof tooltipVariants>>({
    horizontal: "center",
    vertical: "bottom"
  })

  useEffect(() => {
    if (containerRef.current && showTooltip) {
      const rect = containerRef.current.getBoundingClientRect()
      const rightSpace = window.innerWidth - rect.right
      const leftSpace = rect.left
      const bottomSpace = window.innerHeight - rect.bottom

      setAutoTooltipVariants({
        horizontal: 
          rightSpace < 100 ? "right" : 
          leftSpace < 100 ? "left" : 
          "center",
        vertical: bottomSpace < 50 ? "top" : "bottom"
      })
    }
  }, [showTooltip])

  const finalTooltipVariants = userTooltipVariants || autoTooltipVariants

  return (
    <div 
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && content && (
        <div className={cn(tooltipVariants(finalTooltipVariants), tooltipClassName)}>
          {content}
        </div>
      )}
    </div>
  )
}

export { type VariantProps as TooltipVariantProps, tooltipVariants } 