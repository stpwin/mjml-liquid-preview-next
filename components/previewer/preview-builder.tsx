"use client";

import { useHotkeys } from "react-hotkeys-hook";
import type { ImperativePanelHandle } from "react-resizable-panels"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { useKeyboard } from "@/hooks/use-keyboard"
import { usePreviewLayout } from "@/hooks/use-preview-layout"
import MJMLEditor from "@/components/previewer/mjml-editor"
import MJMLPreview from "@/components/previewer/mjml-preview"
import useMJMLProcessor from "@/hooks/use-mjml-processor"
import { HOTKEYS } from "@/lib/constants"
import { useRef } from "react"

export const PreviewBuilder = () => {
  const { isAltPressed } = useKeyboard();
  const leftPanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanelRef = useRef<ImperativePanelHandle>(null);
  
  const {
    leftPanelSize,
    rightPanelSize,
    snapToLeft,
    snapToRight,
    snapToCenter
  } = usePreviewLayout();

  const {
    content,
    html,
    error,
    isProcessing
  } = useMJMLProcessor();

  useHotkeys(HOTKEYS.SNAP_PREVIEW_LEFT.key, (e) => {
    e.preventDefault();
    if (leftPanelRef.current) {
      if (leftPanelSize === 50) {
        // If already at center, snap to left
        snapToLeft();
        leftPanelRef.current.resize(0);
        rightPanelRef.current?.resize(100);
      } else {
        // If at any other position, return to center
        snapToCenter();
        leftPanelRef.current.resize(50);
        rightPanelRef.current?.resize(50);
      }
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true });

  useHotkeys(HOTKEYS.SNAP_PREVIEW_RIGHT.key, (e) => {
    e.preventDefault();
    if (leftPanelRef.current) {
      if (leftPanelSize === 50) {
        // If already at center, snap to right
        snapToRight();
        leftPanelRef.current.resize(100);
        rightPanelRef.current?.resize(0);
      } else {
        // If at any other position, return to center
        snapToCenter();
        leftPanelRef.current.resize(50);
        rightPanelRef.current?.resize(50);
      }
    }
  }, { enableOnFormTags: true, enableOnContentEditable: true });

  const renderPreview = () => {
    if (isProcessing) return (
      <div className="h-full flex items-center justify-center">
        <span className="font-sans">Processing...</span>
      </div>
    );
    if (error) return (
      <div className="h-full flex items-center justify-center text-red-500">
        <span className="font-sans">Error: {error.message}</span>
      </div>
    );
    return <MJMLPreview html={html} />;
  }

  return (
    <div className="h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full"
      >
        <ResizablePanel 
          ref={leftPanelRef}
          defaultSize={leftPanelSize}
          minSize={0}
        >
          <MJMLEditor value={content} />
        </ResizablePanel>
        <ResizableHandle 
          withHandle 
          className="relative group data-[panel-group-direction=horizontal]:w-2"
          isAltPressed={isAltPressed}
          leftHint="<"
          rightHint=">"
        />
        <ResizablePanel 
          ref={rightPanelRef}
          defaultSize={rightPanelSize}
          minSize={0}
        >
          {renderPreview()}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PreviewBuilder; 