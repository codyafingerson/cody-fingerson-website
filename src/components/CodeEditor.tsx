import AceEditor from "react-ace";

// This ensures that the AceEditor is loaded with the correct mode and theme
import ace from "ace-builds";
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
ace.config.setModuleUrl('ace/mode/typescript', '/node_modules/ace-builds/src-min-noconflict/mode-typescript.js');

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
    return (
        <AceEditor
            width="100%"
            height="400px"
            mode="typescript"
            name="code-editor"
            theme="terminal"
            onChange={onChange}
            fontSize={14}
            lineHeight={19}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={value}
        />
    );
}