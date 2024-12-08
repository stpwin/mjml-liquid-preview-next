"use client"

import { useState, useEffect } from "react";
import { Liquid } from "liquidjs";

const DEFAULT_MJML = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello {{ message }}</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

const useMJMLProcessor = (initialContent: string = DEFAULT_MJML) => {
  const [content, setContent] = useState(initialContent);
  const [html, setHtml] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processTemplate = async () => {
      setIsProcessing(true);
      setError(null);
      
      try {
        const mjml2html = (await import("mjml-browser")).default;
        const engine = new Liquid();
        
        // Get stored liquid templates
        const localLiquid = localStorage.getItem("local_liquid") || "{}";
        const sharedLiquid = localStorage.getItem("shared_liquid") || "{}";
        
        // Parse liquid templates
        const localVars = JSON.parse(localLiquid);
        const sharedVars = JSON.parse(sharedLiquid);
        
        // Process liquid template
        const processedContent = await engine.parseAndRender(content, {
          ...localVars,
          ...sharedVars,
        });
        
        // Process MJML
        const result = mjml2html(processedContent).html;
        setHtml(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to process template"));
        console.error(e);
      } finally {
        setIsProcessing(false);
      }
    };

    processTemplate();
  }, [content]);

  // Listen for liquid template updates
  useEffect(() => {
    const handleLiquidUpdate = () => {
      setContent(prev => prev); // Trigger reprocess
    };

    window.addEventListener("liquid_updated", handleLiquidUpdate);
    return () => window.removeEventListener("liquid_updated", handleLiquidUpdate);
  }, []);

  return {
    content,
    setContent,
    html,
    error,
    isProcessing
  };
};

export default useMJMLProcessor;
