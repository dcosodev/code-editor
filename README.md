# Code Editor By dcoso.dev 🚀

[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco-0.45-027ACC?logo=visual-studio-code)](https://microsoft.github.io/monaco-editor/)

A modern, lightweight code editor built with Next.js and TypeScript. Write, preview, and download HTML, CSS, and JavaScript code in real-time.


## ✨ Features

- 🎨 Real-time code preview
- 🌓 Dark/Light mode support
- 💾 Download code as HTML file
- ⚡ Fast and responsive
- 🎯 Monaco Editor integration
- 📱 Mobile-friendly design

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/dcosodev/code-editor.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## 📁 Project Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── editor/         # Editor-related components
│   └── ui/             # UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🧩 Components

### Editor Components

- `Editor`: Main editor component with HTML, CSS, and JS panels
- `EditorPanel`: Individual code editor panel
- `Preview`: Live preview of the code
- `CodeEditor`: Monaco editor wrapper

### UI Components

- `Navbar`: Application header with theme toggle
- `ModeToggle`: Dark/light mode switcher
- `Button`: Reusable button component

## 🎯 Usage

1. Write HTML, CSS, and JavaScript code in their respective panels
2. See real-time preview in the bottom panel
3. Toggle between dark and light themes using the theme switcher
4. Download your code as an HTML file using the download button

## 📄 License

MIT License - feel free to use this code for your own projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.