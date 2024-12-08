"use client";

interface MJMLPreviewProps {
  html?: string;
}

export const MJMLPreview = ({ html }: MJMLPreviewProps) => {
  if (!html) return <div className="h-full flex items-center justify-center">No preview available</div>;
  
  return (
    <div 
      className="h-full w-full overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}

export default MJMLPreview;
