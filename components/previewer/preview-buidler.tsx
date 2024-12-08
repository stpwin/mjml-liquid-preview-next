import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable"
import { CodeMirror } from "@/components/previewer/code-mirror"

export const PreviewBuilder = () => {
  return (
    <div className="h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full"
      >
        <ResizablePanel defaultSize={50}>
          <div className="h-full">
            <CodeMirror />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">MJML Preview</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PreviewBuilder;
