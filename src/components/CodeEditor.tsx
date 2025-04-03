import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";

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
            style={{ fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace', fontSize: '14px' }}
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            onChange={(value) => {
                onChange(value);
            }}
        />
    );
}