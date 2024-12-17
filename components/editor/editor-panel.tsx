'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CodeEditor } from './code-editor'

interface EditorPanelProps {
  icon: LucideIcon
  title: string
  language: 'html' | 'css' | 'javascript'
  value: string
  onChange: (value: string) => void
}

export function EditorPanel({
  icon: Icon,
  title,
  language,
  value,
  onChange,
}: EditorPanelProps) {
  return (
    <div className={cn("h-full flex flex-col bg-[#1e1e1e] overflow-hidden border-r border-[#3c3c3c]")}>
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-4 py-2 flex items-center gap-2 text-[#cccccc]">
        <Icon className="h-4 w-4" />
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex-1 min-h-0">
        <CodeEditor 
          value={value}
          onChange={onChange}
          language={language}
        />
      </div>
    </div>
  )
}