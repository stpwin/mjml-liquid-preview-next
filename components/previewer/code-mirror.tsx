"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CodeMirrorBase from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { Save, RotateCcw } from "lucide-react";
import { DEFAULT_MJML } from "@/hooks/use-mjml-processor";

export interface CodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeMirror = ({ value, onChange }: CodeMirrorProps) => {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('light');
  const [autoSave, setAutoSave] = useState(false);
  
  const STORAGE_KEY = "editor_content";

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      onChange(savedContent);
    }
  }, []);

  useEffect(() => {
    setEditorTheme(
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : theme === 'dark' ? 'dark' : 'light'
    );
  }, [theme]);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (autoSave) {
      localStorage.setItem(STORAGE_KEY, newValue);
    }
  };

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
    
    if (!autoSave) {
      localStorage.setItem(STORAGE_KEY, value);
    }
  };

  const resetStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    onChange(DEFAULT_MJML);
  };

  return (
    <div className="relative h-full">
      <CodeMirrorBase 
        theme={editorTheme}
        extensions={[html()]}
        height="100%"
        className="h-full"
        value={value}
        onChange={handleChange}
      />
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={resetStorage}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Reset stored content"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        
        <button
          onClick={toggleAutoSave}
          className={`p-2 rounded-full relative ${
            autoSave 
              ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" 
              : "bg-gray-100 dark:bg-gray-800"
          } hover:bg-opacity-80 transition-colors`}
          title="Toggle auto-save"
        >
          <Save className="w-4 h-4" />
          {autoSave && (
            <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75" />
          )}
        </button>
      </div>
    </div>
  );
}

export default CodeMirror;
