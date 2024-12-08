"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable"
import CodeMirror from "@/components/previewer/code-mirror"
import MJMLPreview from "@/components/previewer/mjml-preview"
import useMJMLProcessor from "@/hooks/use-mjml-processor"

export const PreviewBuilder = () => {
  const {
    content,
    setContent,
    html,
    error,
    isProcessing
  } = useMJMLProcessor();

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
        <ResizablePanel defaultSize={50}>
          <CodeMirror value={content} onChange={setContent} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          {renderPreview()}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PreviewBuilder; 