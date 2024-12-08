"use client";

import CodeMirrorBase from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
// import { dracula } from "thememirror"; // TODO: Update themes in ThemeProvider

export interface CodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeMirror = ({ value, onChange }: CodeMirrorProps) => {
  return (
    <div className="h-full">
      <CodeMirrorBase 
        // theme={dracula} 
        extensions={[html()]}
        height="100%"
        className="h-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeMirror;
