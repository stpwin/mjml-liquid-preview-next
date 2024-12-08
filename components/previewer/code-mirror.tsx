"use client";

import CodeMirrorBase from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
// import { dracula } from "thememirror"; // TODO: Update themes in ThemeProvider

export const CodeMirror = () => {
  return (
    <div className="h-full">
      <CodeMirrorBase 
        // theme={dracula} 
        extensions={[html()]}
        height="100%"
        className="h-full"
      />
    </div>
  );
}
