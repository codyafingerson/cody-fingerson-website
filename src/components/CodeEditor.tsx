import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import cosmoExtension from "../utils/cosmoExtensions";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
    return (
        <ReactCodeMirror
            value={value}
            height="400px"
            theme={dracula}
            style={{
                fontFamily: '"JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
            }}
            extensions={[cosmoExtension, EditorView.lineWrapping]}
            onChange={(value) => {
                onChange(value);
            }}
        />
    );
}