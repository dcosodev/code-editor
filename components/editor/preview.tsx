'use client'

interface PreviewProps {
  html: string
  css: string
  js: string
}

export function Preview({ html, css, js }: PreviewProps) {
  const source = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `

  return (
    <iframe
      title="preview"
      srcDoc={source}
      className="w-full h-full bg-white dark:bg-[#1e1e1e] border-none overflow-auto"
      sandbox="allow-scripts"
    />
  )
}