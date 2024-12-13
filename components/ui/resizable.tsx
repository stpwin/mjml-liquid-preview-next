"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

export interface ResizableHandleProps extends React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> {
  withHandle?: boolean
  isAltPressed?: boolean
  leftHint?: string
  rightHint?: string
}

const ResizableHandle = ({
  withHandle,
  className,
  isAltPressed,
  leftHint,
  rightHint,
  ...props
}: ResizableHandleProps) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
    {isAltPressed && (
      <>
        {leftHint && (
          <div className="absolute left-0 pb-1 top-1/2 -translate-x-[24px] -translate-y-1/2 z-50">
            <span className="text-[10px] font-mono bg-muted/90 p-1 rounded shadow-sm backdrop-blur-sm">
              {leftHint}
            </span>
          </div>
        )}
        {rightHint && (
          <div className="absolute right-0 pb-1 top-1/2 translate-x-[24px] -translate-y-1/2 z-50">
            <span className="text-[10px] font-mono bg-muted/90 p-1 rounded shadow-sm backdrop-blur-sm">
              {rightHint}
            </span>
          </div>
        )}
      </>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
