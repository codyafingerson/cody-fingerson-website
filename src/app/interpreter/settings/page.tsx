"use client";

import { ChangeEvent, useContext, useState } from 'react';
import { CodeEditorThemeContext, ThemeKey } from '@/app/provider';

export default function SettingsPage() {
  const { theme: currentTheme, setTheme: applyTheme } = useContext(CodeEditorThemeContext);
  const { fontSize: currentFontSize, setFontSize: applyFontSize } = useContext(CodeEditorThemeContext);

  const [pendingTheme, setPendingTheme] = useState<ThemeKey>(currentTheme);
  const [pendingFontSize, setPendingFontSize] = useState<number>(currentFontSize);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPendingTheme(e.target.value as ThemeKey);
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPendingFontSize(Number(e.target.value));
  };

  const handleSaveChanges = () => {
    applyTheme(pendingTheme);
    applyFontSize(pendingFontSize);
    setSuccessMessage('Settings saved successfully!');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="mb-5 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Settings
      </h2>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Code Editor Theme:
      </label>
      <select
        id="theme-select"
        value={pendingTheme}
        onChange={handleThemeChange}
        className="block w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="dracula">Dracula</option>
        <option value="vscode-light">VSCode Light</option>
        <option value="vscode-dark">VSCode Dark</option>
      </select>
      <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
        Font Size:
      </label>
      <input
        type="number"
        id="font-size"
        value={pendingFontSize}
        onChange={handleFontSizeChange}
        className="block w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="10"
        max="30"
        step="1"
      />
      <button
        onClick={handleSaveChanges}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Save Changes
      </button>
    </div>
  );
}