import { useState, useEffect } from "react";
import { Liquid } from "liquidjs";

const DEFAULT_MJML = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello World</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

// Custom hook for MJML processing
const useMJMLProcessor = (initialContent: string = DEFAULT_MJML) => {
  const [content, setContent] = useState(initialContent);
  const [html, setHtml] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processMJML = async () => {
      setIsProcessing(true);
      setError(null);
      
      try {
        const mjml2html = (await import("mjml-browser")).default;
        // const engine = new Liquid(); // TODO: Add Liquid support
        const result = mjml2html(content).html;
        // throw new Error("MJML processing failed - no HTML generated"); // TODO: To remove
        setHtml(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to process MJML"));
      } finally {
        setIsProcessing(false);
      }
    };

    processMJML();
  }, [content]);

  return {
    content,
    setContent,
    html,
    error,
    isProcessing
  };
};

export default useMJMLProcessor;
