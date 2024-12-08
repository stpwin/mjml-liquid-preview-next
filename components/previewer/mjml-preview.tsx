"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useViewport } from "@/hooks/use-viewport";
import { Maximize, Minimize } from "lucide-react";

interface MJMLPreviewProps {
  html?: string;
}

export const MJMLPreview = ({ html }: MJMLPreviewProps) => {
  const { size } = useViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isScaleMode, setIsScaleMode] = useState(true);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Calculate scale based on container width and desired viewport width
      const newScale = Math.min(1, (containerWidth - 48) / size.width); // 48px for padding
      setScale(newScale);
    }
  }, [size.width]);

  useEffect(() => {
    if (!isScaleMode) {
      setScale(1);
      return;
    }

    updateScale();

    // Add resize observer
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [size.width, isScaleMode, updateScale]);

  if (!html) return (
    <div className="h-full flex items-center justify-center">
      <span className="font-sans">No preview available</span>
    </div>
  );
  
  return (
    <div 
      ref={containerRef}
      className={`relative h-full w-full flex items-start justify-center bg-gray-100 dark:bg-gray-800 p-6 ${
        isScaleMode ? 'overflow-y-hidden overflow-x-hidden' : 'overflow-auto'
      }`}
    >
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
        />
      </div>
      
      <button
        onClick={() => setIsScaleMode(!isScaleMode)}
        className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${
          isScaleMode 
            ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" 
            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        title={isScaleMode ? "Switch to overflow mode" : "Switch to scale mode"}
      >
        {isScaleMode ? (
          <Minimize className="w-4 h-4" />
        ) : (
          <Maximize className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

export default MJMLPreview;
