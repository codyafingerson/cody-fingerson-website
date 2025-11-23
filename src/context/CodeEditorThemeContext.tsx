import React, { createContext, useState, ReactNode, useEffect } from 'react'

// Define a type for the available theme keys.
export type ThemeKey = 'vscode-dark' | 'vscode-light' | 'dracula'

interface CodeEditorThemeContextType {
    theme: ThemeKey
    fontSize: number
    setTheme: (theme: ThemeKey) => void
    setFontSize: (size: number) => void
}

// Helper function to get initial theme from local storage
const getInitialTheme = (): ThemeKey => {
    const storedTheme = localStorage.getItem('codeEditorTheme')
    return (storedTheme as ThemeKey) || 'vscode-dark'
}

// Helper function to get initial font size from local storage
const getInitialFontSize = (): number => {
    const storedFontSize = localStorage.getItem('codeEditorFontSize')
    return storedFontSize ? parseInt(storedFontSize, 10) : 14
}

export const CodeEditorThemeContext = createContext<CodeEditorThemeContextType>({
    theme: getInitialTheme(),
    fontSize: getInitialFontSize(),
    setTheme: () => {},
    setFontSize: () => {}
})

interface ThemeProviderProps {
    children: ReactNode
}

export const CodeEditorThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeKey>(getInitialTheme)
    const [fontSize, setFontSizeState] = useState<number>(getInitialFontSize)

    useEffect(() => {
        localStorage.setItem('codeEditorTheme', theme)
    }, [theme])

    useEffect(() => {
        localStorage.setItem('codeEditorFontSize', fontSize.toString())
    }, [fontSize])

    // Wrapper functions to update state and local storage
    const setTheme = (newTheme: ThemeKey) => {
        setThemeState(newTheme)
    }

    const setFontSize = (newSize: number) => {
        setFontSizeState(newSize)
    }

    return (
        <CodeEditorThemeContext.Provider value={{ theme, fontSize, setTheme, setFontSize }}>
            {children}
        </CodeEditorThemeContext.Provider>
    )
}
