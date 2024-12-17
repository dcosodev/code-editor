'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeEditor } from './code-editor'

interface EditorTabsProps {
  html: string
  css: string
  js: string
  onHtmlChange: (value: string) => void
  onCssChange: (value: string) => void
  onJsChange: (value: string) => void
}

export function EditorTabs({
  html,
  css,
  js,
  onHtmlChange,
  onCssChange,
  onJsChange,
}: EditorTabsProps) {
  return (
    <Tabs defaultValue="html" className="h-full">
      <TabsList className="w-full justify-start rounded-none border-b">
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
        <TabsTrigger value="js">JavaScript</TabsTrigger>
      </TabsList>
      <TabsContent value="html" className="h-[calc(100%-2.5rem)] mt-0 p-0">
        <CodeEditor
          value={html}
          onChange={onHtmlChange}
          language="html"
        />
      </TabsContent>
      <TabsContent value="css" className="h-[calc(100%-2.5rem)] mt-0 p-0">
        <CodeEditor
          value={css}
          onChange={onCssChange}
          language="css"
        />
      </TabsContent>
      <TabsContent value="js" className="h-[calc(100%-2.5rem)] mt-0 p-0">
        <CodeEditor
          value={js}
          onChange={onJsChange}
          language="javascript"
        />
      </TabsContent>
    </Tabs>
  )
}