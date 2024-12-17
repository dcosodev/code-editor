import { Editor } from '@/components/editor/editor'
import { Navbar } from '@/components/navbar'

export default function NewProjectPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Editor />
      </main>
    </div>
  )
}