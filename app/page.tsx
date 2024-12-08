import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable"

export const Home = () => {
  return (
    <div className="h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Code Mirror</span>
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

export default Home;
