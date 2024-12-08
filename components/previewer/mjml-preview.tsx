"use client";

import { useViewport } from "@/hooks/use-viewport";

interface MJMLPreviewProps {
  html?: string;
  width?: number;
  height?: number;
}

export const MJMLPreview = ({ html }: MJMLPreviewProps) => {
  const { size } = useViewport();
  if (!html) return (
    <div className="h-full flex items-center justify-center">
      <span className="font-sans">No preview available</span>
    </div>
  );
  
  return (
    <div className="h-full w-full flex justify-center bg-gray-100 dark:bg-gray-800 overflow-auto p-4">
      <div 
        className="bg-white shadow-lg"
        style={{
          width: size.width,
          height: size.height,
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
    </div>
  );
}

export default MJMLPreview;
