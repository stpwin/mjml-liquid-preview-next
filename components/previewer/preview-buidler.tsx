"use client";

import { useState, useEffect } from "react";
import { Liquid } from "liquidjs";
import dynamic from "next/dynamic";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable"
import CodeMirror from "@/components/previewer/code-mirror"

// Dynamically import MJMLPreview with no SSR
const MJMLPreview = dynamic(() => import("@/components/previewer/mjml-preview"), {
  ssr: false
});

export const PreviewBuilder = () => {
  const [mjmlContent, setMjmlContent] = useState(`<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello World</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`);
  const [parsedHtml, setParsedHtml] = useState("");

  useEffect(() => {
    const processMJML = async () => {
      // Dynamically import mjml-browser only on client side
      const mjml2html = (await import("mjml-browser")).default;
      const engine = new Liquid();
      const html = mjml2html(mjmlContent).html;
      setParsedHtml(html);
    };

    processMJML();
  }, [mjmlContent]);

  return (
    <div className="h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full"
      >
        <ResizablePanel defaultSize={50}>
          <CodeMirror value={mjmlContent} onChange={setMjmlContent} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <MJMLPreview html={parsedHtml} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PreviewBuilder;
