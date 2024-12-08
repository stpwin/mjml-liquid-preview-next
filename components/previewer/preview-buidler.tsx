"use client";

import { useState, useEffect } from "react";
import mjml2html from "mjml-browser";
import { Liquid } from "liquidjs";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable"
import CodeMirror from "@/components/previewer/code-mirror"
import MJMLPreview from "@/components/previewer/mjml-preview"

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    try {
      const engine = new Liquid();
      const html = mjml2html(mjmlContent).html;
      setParsedHtml(html);
      console.log(html);
    } catch (e) {
      console.log(e);
    }
  }, [mjmlContent, isMounted]);

  if (!isMounted) {
    return null; // or a loading state
  }

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
