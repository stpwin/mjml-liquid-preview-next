"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useViewport } from "@/hooks/use-viewport";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS, HOTKEYS } from "@/lib/constants";
import { Maximize, Minimize, RefreshCw } from "lucide-react";
import { useLayout } from "@/hooks/use-layout";
import { useHotkeys } from "react-hotkeys-hook";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useMJMLProcessor } from "@/hooks/use-mjml-processor";

interface MJMLPreviewProps {
  html?: string;
}

export const MJMLPreview = ({ html }: MJMLPreviewProps) => {
  const { isFullScreen } = useLayout();
  const { size } = useViewport();
  const { refreshTemplate } = useMJMLProcessor();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isScaleMode, setIsScaleMode] = useLocalStorage(STORAGE_KEYS.PREVIEW_SCALE_MODE, true);
  const { isAltPressed } = useKeyboard();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newScale = Math.min(1, (containerWidth - 48) / size.width);
      setScale(newScale);
    }
  }, [size.width]);

  useEffect(() => {
    if (!isScaleMode) {
      setScale(1);
      return;
    }

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [size.width, isScaleMode, updateScale]);

  useHotkeys(HOTKEYS.TOGGLE_PREVIEW_SCALE, (e) => {
    e.preventDefault();
    setIsScaleMode(!isScaleMode);
  }, { enableOnFormTags: true, enableOnContentEditable: true });

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshTemplate();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  useHotkeys(HOTKEYS.REFRESH_PREVIEW, (e) => {
    e.preventDefault();
    handleRefresh();
  }, { enableOnFormTags: true, enableOnContentEditable: true });

  if (!html) return (
    <div className="h-full flex items-center justify-center">
      <span className="font-sans">No preview available</span>
    </div>
  );
  
  return (
    <div className="relative h-full">
      <div 
        ref={containerRef}
        className={`h-full w-full flex items-start justify-center bg-gray-100 dark:bg-gray-800 p-6 ${
          isScaleMode ? 'overflow-y-hidden overflow-x-hidden' : 'overflow-auto'
        }`}
      >
        <div className={`${isFullScreen ? 'mt-14' : ''}`}>
          <div 
            className="bg-white shadow-lg origin-top"
            style={{
              width: size.width,
              height: size.height,
              transform: isScaleMode ? `scale(${scale})` : 'none',
              transformOrigin: 'top center',
              marginBottom: isScaleMode ? `${size.height * (1 - scale)}px` : '0'
            }}
          >
            <iframe
              srcDoc={html}
              className="w-full h-full"
              style={{
                border: "none",
                margin: "0 auto",
                width: size.width,
                height: size.height,
              }}
              onLoad={(e) => {
                const iframe = e.target as HTMLIFrameElement;
                if (iframe.contentWindow) {
                  // Forward all keyboard events from iframe to parent
                  ['keydown', 'keyup', 'keypress'].forEach(eventType => {
                    iframe.contentWindow?.addEventListener(eventType, ((event: Event) => {
                      const keyboardEvent = event as KeyboardEvent;
                      const simulatedEvent = new KeyboardEvent(eventType, {
                        key: keyboardEvent.key,
                        code: keyboardEvent.code,
                        ctrlKey: keyboardEvent.ctrlKey,
                        shiftKey: keyboardEvent.shiftKey,
                        altKey: keyboardEvent.altKey,
                        metaKey: keyboardEvent.metaKey,
                        bubbles: true,
                        cancelable: true,
                        composed: true
                      });
                      
                      document.dispatchEvent(simulatedEvent);
                    }) as EventListener);
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={handleRefresh}
          className={`p-2 rounded-full transition-colors relative ${
            isRefreshing 
              ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" 
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          title="Refresh preview"
        >
          <RefreshCw className={`h-[1.2rem] w-[1.2rem] ${isRefreshing ? 'animate-spin' : ''}`} />
          {isAltPressed && (
            <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
              r
            </span>
          )}
        </button>

        <button
          onClick={() => setIsScaleMode(!isScaleMode)}
          className={`p-2 rounded-full transition-colors relative ${
            isScaleMode 
              ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" 
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          title={isScaleMode ? "Switch to overflow mode" : "Switch to scale mode"}
        >
          {isScaleMode ? (
            <Minimize className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Maximize className="h-[1.2rem] w-[1.2rem]" />
          )}
          {isAltPressed && (
            <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
              f
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default MJMLPreview;
