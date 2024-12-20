'use client'

import { useState, useEffect } from 'react'
import { Download, FileCode, FileType, FileType2 } from 'lucide-react'
import { EditorPanel } from './editor-panel'
import { Preview } from './preview'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useDebounce } from '@/hooks/use-debounce'
import { Button } from '../ui/button'
import { Navbar } from '../navbar'

// Code Preview thanks to https://codepen.io/leimapapa/pen/JjQdJoQ

const defaultHtml = `<svg id="touchstone" viewBox="-70 -70 300 194">
	<defs>
		<radialGradient id="grad">
			<stop offset="25%" stop-color="#ECEEEA" />
			<stop offset="26%" stop-color="#ECEEEA" />
			<stop offset="26%" stop-color="yellow" />
			<stop offset="30%" stop-color="yellow" />
			<stop offset="30%" stop-color="rgb(250, 132, 60)" />
			<stop offset="60%" stop-color="rgba(250, 132, 60, 0.5)" />
			<stop offset="100%" stop-color="rgba(250, 132, 60, 0)" />
		</radialGradient>
		<path id="bolt" d="M 17 31 l 2 -2 l 4 -4 l 0.75 -0.52 l 1.81 -2.82 l 3.44 -2.66 l 1 -2 l 3 -3 l 2 -3 l -5 5 l -4 1 l 8.36 -10.03 l 1.31 -0.15 l 4.98 -5.23 l 0.25 0.45 l -1.96 3.27 l -1.86 2.16 l 2.01 -0.75 l -1.15 2.41 l 3.92 -3.07 l 0.5 0.36 l -1.36 2.16 l -2.01 2.37 l -1.41 0.05 l -0.7 1.05 l 0.15 0.91 l -1.91 2.26 l -0.25 1.06 l 0.55 0.25 l 0.81 -1.11 l 1.05 -0.15 l 0.5 -1.61 l 1.56 -2.16 l 2.12 -2.26 l 3.72 -4.03 l 4.03 -4.78 l 0.45 -0.2 l 0.35 0.8 l -0.7 1.21 l -1.76 2.06 l -0.06 1.26 l -1.61 0.2 l -0.2 2.07 l -0.35 1.2 l -0.35 1.01 l -1.31 1.21 l -4.33 5.23 l -2.41 2.52 l -1.51 1.96 l -1.51 0.25 l 0.86 -1.31 l 0.15 -0.9 l -0.66 -0.1 l -0.35 0.7 l -0.4 1.81 l -1.01 0.71 l -0.15 1 l -1.01 0.56 l -0.25 -0.51 l -2.01 0.56 l 2.87 -3.28 l 0.35 -1.05 l 0.8 -0.81 l 0.16 -0.8 l -0.36 -0.45 l -0.45 0.45 l -1.11 1.91 l -1.25 0.91 l -1.21 0.05 l -0.2 0.75 l -3.98 4.83 l -2.46 2.27 l -0.56 -0.26 l 0.76 -1.15 l -1.46 0.95 l -1.31 2.12 l -0.65 -0.46 z m 1.7 12.04 l 1.34 -3.49 l 2.19 -2.1 l 0.33 -1.28 l 1.05 -0.41 l 1.12 -0.76 l 0.41 -0.71 l 1.02 -1.27 l 0.57 -0.28 l 0.02 -0.86 l -0.52 -0.09 l -0.05 -0.53 l 0.55 -0.78 l 0.67 -0.39 l 0.43 -0.4 l 1.26 -1.39 l 0.49 -0.8 l 1.31 -0.79 l 0.34 -0.89 l 0.77 -0.95 l 1.46 0.03 l 0.86 -1.16 l 1.19 -0.82 l 0.61 0.55 l -0.18 0.7 l 1.74 -1.89 l 0.58 -0.31 l 0.27 0.12 l 0 0.74 l -0.55 0.61 l -1.95 2.32 l -0.86 0.7 l -1.22 1.41 l -0.49 1.16 l -0.85 0.49 l -0.65 1.1 l -0.24 0.49 l 0.06 1.04 l -2.14 1.89 l -0.15 1.19 l -0.7 0.8 l -0.72 -0.06 l 0.24 -1.36 l -0.2 -0.08 l -0.41 1.83 l -0.72 -0.24 l -0.06 -0.92 l 0.77 -1.4 l 0 -0.55 l -0.33 0.55 l -0.69 1.33 l 0.12 1.28 l 0.74 0.6 l -1.25 2.26 l 1.49 -0.12 l -1.95 1.4 l -2.75 2.96 l 0.8 -3.3 l -0.68 -0.09 l -0.79 0.09 z m 14.34 -11.18 l 1.9 -3.31 l 3.91 -4.18 l 2.69 -3.55 l 2.14 -2.69 l 1.5 -0.33 l 0.12 0.55 l -2.78 3.76 l -2.6 3.33 l -4.55 4.92 l -1.62 1.86 l -0.73 0.22 z m 12.5 -14.82 l -0.06 -0.67 l 0.64 -0.74 l 0.52 -0.02 l 0.28 0.48 l -0.28 0.74 l -0.45 0.52 l -0.46 -0.06 z" />
		<path id="boltShadow" d="M 17 31 l 2 -2 l 4 -4 l 0.75 -0.52 l 1.81 -2.82 l 3.44 -2.66 l 1 -2 l 3 -3 l 2 -3 l -5 5 l -4 1 l 8.36 -10.03 l 1.31 -0.15 l 4.98 -5.23 l 0.25 0.45 l -1.96 3.27 l -1.86 2.16 l 2.01 -0.75 l -1.15 2.41 l 3.92 -3.07 l 0.5 0.36 l -1.36 2.16 l -2.01 2.37 l -1.41 0.05 l -0.7 1.05 l 0.15 0.91 l -1.91 2.26 l -0.25 1.06 l 0.55 0.25 l 0.81 -1.11 l 1.05 -0.15 l 0.5 -1.61 l 1.56 -2.16 l 2.12 -2.26 l 3.72 -4.03 l 4.03 -4.78 l 0.45 -0.2 l 0.35 0.8 l -0.7 1.21 l -1.76 2.06 l -0.06 1.26 l -1.61 0.2 l -0.2 2.07 l -0.35 1.2 l -0.35 1.01 l -1.31 1.21 l -4.33 5.23 l -2.41 2.52 l -1.51 1.96 l -1.51 0.25 l 0.86 -1.31 l 0.15 -0.9 l -0.66 -0.1 l -0.35 0.7 l -0.4 1.81 l -1.01 0.71 l -0.15 1 l -1.01 0.56 l -0.25 -0.51 l -2.01 0.56 l 2.87 -3.28 l 0.35 -1.05 l 0.8 -0.81 l 0.16 -0.8 l -0.36 -0.45 l -0.45 0.45 l -1.11 1.91 l -1.25 0.91 l -1.21 0.05 l -0.2 0.75 l -3.98 4.83 l -2.46 2.27 l -0.56 -0.26 l 0.76 -1.15 l -1.46 0.95 l -1.31 2.12 l -0.65 -0.46 z m 1.7 12.04 l 1.34 -3.49 l 2.19 -2.1 l 0.33 -1.28 l 1.05 -0.41 l 1.12 -0.76 l 0.41 -0.71 l 1.02 -1.27 l 0.57 -0.28 l 0.02 -0.86 l -0.52 -0.09 l -0.05 -0.53 l 0.55 -0.78 l 0.67 -0.39 l 0.43 -0.4 l 1.26 -1.39 l 0.49 -0.8 l 1.31 -0.79 l 0.34 -0.89 l 0.77 -0.95 l 1.46 0.03 l 0.86 -1.16 l 1.19 -0.82 l 0.61 0.55 l -0.18 0.7 l 1.74 -1.89 l 0.58 -0.31 l 0.27 0.12 l 0 0.74 l -0.55 0.61 l -1.95 2.32 l -0.86 0.7 l -1.22 1.41 l -0.49 1.16 l -0.85 0.49 l -0.65 1.1 l -0.24 0.49 l 0.06 1.04 l -2.14 1.89 l -0.15 1.19 l -0.7 0.8 l -0.72 -0.06 l 0.24 -1.36 l -0.2 -0.08 l -0.41 1.83 l -0.72 -0.24 l -0.06 -0.92 l 0.77 -1.4 l 0 -0.55 l -0.33 0.55 l -0.69 1.33 l 0.12 1.28 l 0.74 0.6 l -1.25 2.26 l 1.49 -0.12 l -1.95 1.4 l -8.503 10.614 l 0.235 -1.452 l 3.65 -5.573 l 2.277 -2.708 L 23.479 36.096 L 22.694 37.077 z m 14.34 -11.18 l 1.9 -3.31 l 3.91 -4.18 l 2.69 -3.55 l 2.14 -2.69 l 1.5 -0.33 l 0.12 0.55 l -2.78 3.76 l -2.6 3.33 l -4.55 4.92 l -1.62 1.86 l -0.73 0.22 z m 12.5 -14.82 l -0.06 -0.67 l 0.64 -0.74 l 0.52 -0.02 l 0.28 0.48 l -0.28 0.74 l -0.45 0.52 l -0.46 -0.06 z" />
		<g id="title" font-weight="550">
			<text style="font-family: 'Times New Roman', Times, serif;" x="47" y="32" font-size="20">TOUCHSTONE</text>
			<text style="font-family: 'Times New Roman', Times, serif;" x="50" y="49" font-size="15.5">PICTURES</text>
		</g>
		<filter id="blur" x="-100%" y="-100%" width="300%" height="300%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="1" />
		</filter>
		<filter id="blur4" x="-100%" y="-100%" width="300%" height="300%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="4" />
		</filter>
		<mask id="m">
			<rect x="0" y="0" width="150" height="50" fill="#000" />
			<circle cx="50" cy="50" r="20" fill="#000" />
			<use href="#title" fill="#fff" filter="url(#blur)" />
		</mask>
	</defs>
	<path d="M 250 54 a 1 1 0 0 0 0 -40 h -26 a 1 1 0 0 0 0 40 z" fill="#287CEC">
		<animate attributeName="d" values="M 300 54 a 1 1 0 0 0 0 -40 h 0 a 1 1 0 0 0 0 40 z; M 220 54 a 1 1 0 0 0 0 -40 h -200 a 1 1 0 0 0 0 40 z; M 20 54 a 1 1 0 0 0 0 -40 h 0 a 1 1 0 0 0 0 40 z" dur="3s" begin="0s" repeatCount="none" fill="freeze" />
	</path>
	<g transform="translate(202 0)">
		<use href="#title" fill="#287CEC" />
		<animateTransform attributeName="transform" attributeType="XML" type="translate" values="262 0; 0 0" dur="2s" begin="1s" repeatCount="0" fill="freeze" />
	</g>
	<rect fill="gold" mask="url(#m)" x="200" y="10" width="8" height="40" filter="url(#blur)">
		<animate attributeName="x" values="200;35" dur="1.5s" begin="3s" repeatCount="none" fill="freeze" />
	</rect>
	<g id="lightningBolt" opacity="0">
		<use href="#boltShadow" transform="translate(-3 2)" />
		<use href="#bolt" fill="rgb(250, 132, 60)" />
		<animate attributeName="opacity" values="0;1" dur=".8s" begin="4.5s" repeatCount="none" fill="freeze" keyTimes="0;1" keySplines="0 0.9 0 0.9" calcMode="spline" />
	</g>
	<circle cx="20" cy="34" r="0" fill="url(#grad)" filter="url(#blur4)" opacity="0.9">
		<animate attributeName="r" values="0;80;0" dur=".6s" begin="4.5s" repeatCount="none" fill="freeze" keyTimes="0;0.5;1" keySplines="0 0.9 0 0.9; 1 0 1 0" calcMode="spline" />
	</circle>
</svg>`

const defaultCss = `body {
	background: #000;
}
svg {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 70%;
/* 	border: 2px solid red; */
}
teeext {
	font-family: "Noto Serif Tamil", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}`

const defaultJs = `function attachClickListener() {
            document.getElementById('touchstone').addEventListener('click', () => {
                const svg = document.getElementById('touchstone');
                const newSvg = svg.cloneNode(true);
                svg.parentNode.replaceChild(newSvg, svg);
                attachClickListener();  // Re-attach the event listener to the new SVG
            });
        }

        attachClickListener();  // Initial attachment of the event listener`

export function Editor() {
  const [html, setHtml] = useState(defaultHtml)
  const [css, setCss] = useState(defaultCss)
  const [js, setJs] = useState(defaultJs)

  const debouncedHtml = useDebounce(html, 500)
  const debouncedCss = useDebounce(css, 500)
  const debouncedJs = useDebounce(js, 500)

  const handleDownload = () => {
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Editor Export</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    // Auto-focus HTML editor on mount
    const editorElement = document.querySelector('.monaco-editor textarea')
    if (editorElement) {
      ;(editorElement as HTMLTextAreaElement).focus()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-end p-2 border-b bg-[#1f2937]">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="text-gray-400 hover:text-white hover:bg-[#374151]"
        >
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </div>
      <ResizablePanelGroup
        direction="vertical"
        className="flex-1 min-h-0"
      >
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={33}>
              <EditorPanel
                icon={FileType}
                title="HTML"
                language="html"
                value={html}
                onChange={setHtml}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={33}>
              <EditorPanel
                icon={FileType2}
                title="CSS"
                language="css"
                value={css}
                onChange={setCss}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={33}>
              <EditorPanel
                icon={FileCode}
                title="JavaScript"
                language="javascript"
                value={js}
                onChange={setJs}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <Preview
            html={debouncedHtml}
            css={debouncedCss}
            js={debouncedJs}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}