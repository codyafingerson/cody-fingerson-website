import { useContext } from 'react';
import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import cosmoExtension from "../utils/cosmoExtensions";
import { CodeEditorThemeContext, ThemeKey } from "../context/CodeEditorThemeContext";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const themesMap: Record<ThemeKey, any> = {
  'dracula': dracula,
  'vscode-dark': vscodeDark,
  'vscode-light': vscodeLight,
};

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  // Get the current theme key from context.
  const { theme, fontSize } = useContext(CodeEditorThemeContext);

  return (
    <ReactCodeMirror
      value={value}
      height="400px"
      // Use the mapped theme object from our themesMap.
      theme={themesMap[theme]}
      style={{
        fontFamily: '"JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
        fontSize: `${fontSize}px`,
      }}
      extensions={[cosmoExtension, EditorView.lineWrapping]}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
}
