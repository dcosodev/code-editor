'use client'

import { Maximize2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditorHeaderProps {
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

export function EditorHeader({ isFullscreen, onToggleFullscreen }: EditorHeaderProps) {
  return (
    <div className="bg-[#1f2937] border-b border-[#374151] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#cccccc]">Untitled Project</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-[#374151]"
        >
          <Save className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFullscreen}
          className="text-gray-400 hover:text-white hover:bg-[#374151]"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}