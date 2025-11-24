# Cody Fingerson - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing projects, technical skills, and featuring an interactive custom programming language interpreter.

## 🚀 Features

- **Portfolio Showcase**: Display of projects with detailed descriptions, technologies used, and links
- **Custom Interpreter**: Interactive Cosmo programming language interpreter built from scratch
  - Live code editor with syntax highlighting
  - Interactive playground for testing code
  - Comprehensive documentation
  - Customizable themes
- **Responsive Design**: Fully responsive layout optimized for all device sizes
- **Dark Mode**: Built-in dark mode support
- **Smooth Animations**: Page transitions and animations powered by Framer Motion
- **Modern Tech Stack**: Built with React 19, TypeScript, and TailwindCSS

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Key Libraries
- **Framer Motion** - Animation library
- **CodeMirror** - Code editor component
- **React Icons** - Icon library

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── CodeEditor.tsx
│   ├── Footer.tsx
│   ├── InterpreterLayout.tsx
│   ├── Navbar.tsx
│   ├── PortfolioProjectItem.tsx
│   └── ProjectCard.tsx
├── context/            # React context providers
│   └── CodeEditorThemeContext.tsx
├── data/               # Static data
│   └── projects.ts
├── lib/                # Core interpreter implementation
│   ├── compiler/       # Compiler logic
│   ├── interpreter/    # Interpreter runtime
│   ├── parser/         # Parser implementation
│   └── scanner/        # Lexical scanner
├── pages/              # Page components
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   ├── Interpreter/    # Interpreter-related pages
│   └── Portfolio/      # Portfolio page
└── utils/              # Utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/codyafingerson/cody-fingerson-website.git
cd cody-fingerson-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Cosmo Interpreter

The website features a custom programming language interpreter called "Cosmo" built entirely from scratch in TypeScript. The interpreter includes:

- **Lexical Scanner**: Tokenizes source code
- **Parser**: Builds an abstract syntax tree (AST)
- **Interpreter**: Executes the AST
- **Standard Library**: Built-in functions (add, sqrt, clock, etc.)

### Interpreter Features

- Variable declarations with `create`
- Function definitions with `func`
- Control flow (if/else, while loops)
- Arithmetic and logical operations
- Standard library functions
- Error handling and reporting

Visit `/interpreter` to explore the documentation and `/interpreter/playground` to try it out!

## 📄 Pages

- **Home** (`/`) - Landing page with tech stack overview
- **About** (`/about`) - Personal background and journey
- **Projects** (`/projects`) - Overview of featured projects
- **Portfolio** (`/portfolio`) - Detailed project showcases
- **Contact** (`/contact`) - Contact information
- **Interpreter** (`/interpreter`) - Cosmo interpreter documentation
- **Playground** (`/interpreter/playground`) - Interactive code editor
- **Settings** (`/interpreter/settings`) - Interpreter configuration

## 🌐 Deployment

The site is configured for deployment on Vercel. The `vercel.json` file contains deployment configuration.

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

## 📝 License

This project is private and personal.

## 👤 Author

**Cody A. Fingerson**

- Website: [codyfingerson.com](https://codyfingerson.com)
- GitHub: [@codyafingerson](https://github.com/codyafingerson)
- LinkedIn: [codyfingerson](https://www.linkedin.com/in/codyfingerson)

---

Built with ❤️ using React, TypeScript, and Vite
