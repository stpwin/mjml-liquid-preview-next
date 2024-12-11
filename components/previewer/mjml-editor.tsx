"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import CodeMirrorBase, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { Save, RotateCcw } from "lucide-react";
import { useMJMLProcessor } from "@/hooks/use-mjml-processor";
import { useHotkeys } from "react-hotkeys-hook";
import { DEFAULT_MJML, HOTKEYS, UI_STATE } from "@/lib/constants";
import { useUIState } from "@/hooks/use-ui-state";

export interface MJMLEditorProps {
  value: string;
}

export const MJMLEditor = ({ value }: MJMLEditorProps) => {
  const { theme } = useTheme();
  const { autoSave, setAutoSave, setContent } = useMJMLProcessor();
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('light');
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const { onOpenChange  } = useUIState(UI_STATE.MJML_EDITOR);

  useEffect(() => {
    setEditorTheme(
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : theme === 'dark' ? 'dark' : 'light'
    );
  }, [theme]);

  const handleChange = (newValue: string) => {
    setContent(newValue);
  };

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
    if (!autoSave) {
      setContent(value);
    }
  };

  const resetStorage = () => {
    setContent(DEFAULT_MJML);
    if (autoSave) {
      setContent(DEFAULT_MJML);
    }
  };

  useHotkeys(HOTKEYS.FOCUS_EDITOR, (e) => {
    e.preventDefault();
    onOpenChange(true);
    setTimeout(() => {
      editorRef.current?.view?.focus();
    }, 300);
  }, { enableOnFormTags: true, enableOnContentEditable: true });

  return (
    <div className="relative h-full">
      <CodeMirrorBase 
        ref={editorRef}
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
          title="Reset content"
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
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" />
          )}
        </button>
      </div>
    </div>
  );
}

export default MJMLEditor;
