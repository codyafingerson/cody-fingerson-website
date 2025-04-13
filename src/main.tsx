import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CodeEditorThemeProvider } from './context/CodeEditorThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeEditorThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CodeEditorThemeProvider>
  </StrictMode>,
)
