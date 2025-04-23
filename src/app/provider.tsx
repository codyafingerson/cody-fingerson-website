"use client"; // Unlike React, contexts need to be marked as client components in Next.js

import { createContext, useState, ReactNode, useEffect } from 'react';

// Define the possible theme keys for the code editor
export type ThemeKey = 'vscode-dark' | 'vscode-light' | 'dracula';

// Interface for the context type, defining the shape of the context value
interface CodeEditorThemeContextType {
  theme: ThemeKey; // Current theme
  fontSize: number; // Current font size
  setTheme: (theme: ThemeKey) => void; // Function to update the theme
  setFontSize: (size: number) => void; // Function to update the font size
}

// Default values for theme and font size
const defaultTheme: ThemeKey = 'vscode-dark';
const defaultFontSize = 14;

// Create a context with default values
export const CodeEditorThemeContext = createContext<CodeEditorThemeContextType>({
  theme: defaultTheme,
  fontSize: defaultFontSize,
  setTheme: () => {}, // Placeholder function
  setFontSize: () => {}, // Placeholder function
});

// Props interface for the provider component
interface ThemeProviderProps {
  children: ReactNode; // React children to be wrapped by the provider
}

// Provider component for managing and providing theme and font size state
export const CodeEditorThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeKey>(defaultTheme); // State for the current theme
  const [fontSize, setFontSizeState] = useState<number>(defaultFontSize); // State for the current font size
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted

  // Effect to initialize state from localStorage when the component mounts
  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted
    const storedTheme = localStorage.getItem('codeEditorTheme'); // Retrieve stored theme
    const storedFontSize = localStorage.getItem('codeEditorFontSize'); // Retrieve stored font size

    if (storedTheme) {
      setThemeState(storedTheme as ThemeKey); // Set the theme from localStorage
    }
    if (storedFontSize) {
      setFontSizeState(parseInt(storedFontSize, 10)); // Set the font size from localStorage
    }
  }, []);

  // Effect to persist the theme to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('codeEditorTheme', theme);
    }
  }, [theme, isMounted]);

  // Effect to persist the font size to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('codeEditorFontSize', fontSize.toString());
    }
  }, [fontSize, isMounted]);

  // Function to update the theme state
  const setTheme = (newTheme: ThemeKey) => {
    setThemeState(newTheme);
  };

  // Function to update the font size state
  const setFontSize = (newSize: number) => {
    setFontSizeState(newSize);
  };

  // Provide the theme and font size state, along with their setters, to the context
  return (
    <CodeEditorThemeContext.Provider value={{ theme, fontSize, setTheme, setFontSize }}>
      {children} {/* Render the children wrapped by the provider */}
    </CodeEditorThemeContext.Provider>
  );
};