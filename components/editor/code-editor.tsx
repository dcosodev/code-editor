'use client'

import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: 'html' | 'css' | 'javascript'
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(value) => onChange(value || '')}
      theme="vs-dark"
      className="border-0 [&_.monaco-editor]:bg-[#1e1e1e] [&_.monaco-editor_.margin]:bg-[#1e1e1e]"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        padding: { top: 16, bottom: 16 },
        scrollbar: {
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10
        },
        renderLineHighlight: 'all',
        cursorStyle: 'line',
        cursorWidth: 2,
        cursorBlinking: 'smooth'
      }}
    />
  )
}