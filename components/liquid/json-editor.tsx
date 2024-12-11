"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import CodeMirrorBase from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { EditorView } from "@codemirror/view"

export interface JSONEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
  isExpanded?: boolean
}

export function JSONEditor({ value, onChange, className, isExpanded }: JSONEditorProps) {
  const { theme } = useTheme()
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setEditorTheme(
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : theme === 'dark' ? 'dark' : 'light'
    )
  }, [theme])

  return (
    <div className="overflow-auto">
      <CodeMirrorBase 
        value={value}
        onChange={onChange}
        theme={editorTheme}
        extensions={[
          json(),
          EditorView.lineWrapping
        ]}
        className={className}
        height={isExpanded ? "500px" : "300px"}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          autocompletion: true,
        }}
      />
    </div>
  )
} 