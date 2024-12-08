"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CodeMirrorBase from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

export interface CodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeMirror = ({ value, onChange }: CodeMirrorProps) => {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setEditorTheme(
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : theme === 'dark' ? 'dark' : 'light'
    );
  }, [theme]);

  return (
    <div className="h-full">
      <CodeMirrorBase 
        theme={editorTheme}
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
