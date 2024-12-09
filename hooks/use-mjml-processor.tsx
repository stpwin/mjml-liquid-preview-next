"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { Liquid } from "liquidjs";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";

export const DEFAULT_MJML = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello {{ message }}</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

interface MJMLContextType {
  content: string;
  setContent: (content: string) => void;
  html: string;
  error: Error | null;
  isProcessing: boolean;
  refreshTemplate: () => void;
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
}

const MJMLContext = createContext<MJMLContextType | null>(null);

export function MJMLProvider({ children }: { children: React.ReactNode }) {
  const [autoSave, setAutoSave] = useLocalStorage(STORAGE_KEYS.EDITOR_AUTO_SAVE, true);
  const [internalContent, setInternalContent] = useState(DEFAULT_MJML);
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEYS.EDITOR_CONTENT);
    if (savedContent) {
      setInternalContent(JSON.parse(savedContent));
    }
  }, []);

  const setContent: MJMLContextType["setContent"] = (newContent) => {
    setInternalContent(newContent);
    if (autoSave) {
      localStorage.setItem(STORAGE_KEYS.EDITOR_CONTENT, JSON.stringify(newContent));
    }
  };

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
        const processedContent = await engine.parseAndRender(internalContent, {
          ...localVars,
          ...sharedVars,
        });
        
        // Process MJML
        const { html: processedHtml } = mjml2html(processedContent);
        setHtml(processedHtml);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to process template"));
      } finally {
        setIsProcessing(false);
      }
    };

    processTemplate();
  }, [internalContent, refreshKey]);

  const refreshTemplate = () => setRefreshKey(k => k + 1);

  const contextValue: MJMLContextType = {
    content: internalContent,
    setContent,
    html,
    error,
    isProcessing,
    refreshTemplate,
    autoSave,
    setAutoSave
  };

  return (
    <MJMLContext.Provider value={contextValue}>
      {children}
    </MJMLContext.Provider>
  );
}

export function useMJMLProcessor() {
  const context = useContext(MJMLContext);
  if (!context) {
    throw new Error("useMJMLProcessor must be used within a MJMLProvider");
  }
  return context;
}

export default useMJMLProcessor;
