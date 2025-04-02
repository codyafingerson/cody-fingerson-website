import React, { useState, useCallback } from 'react';
import CodeEditor from './CodeEditor';
import Container from './Container';

interface CodePlaygroundProps {
  title: string;
  description: React.ReactNode;
  onRunCode: (code: string) => Promise<string> | string;
  sampleCodeUrl?: string;
  runButtonText?: string;
  outputFormatter?: (result: string) => string;
  errorFormatter?: (error: any) => string;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  title,
  description,
  onRunCode,
  sampleCodeUrl = "/sample-code.txt",
  runButtonText = "Run Code",
  outputFormatter = (result) => result,
  errorFormatter = (error) => `Error: ${error?.message ?? String(error)}`,
}) => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoadingSample, setIsLoadingSample] = useState<boolean>(false);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);

  const loadSampleCode = useCallback(async () => {
    setIsLoadingSample(true);
    setOutput("");
    try {
      const response = await fetch(sampleCodeUrl);
      if (!response.ok) {
        throw new Error(`Failed to load sample code (status: ${response.status})`);
      }
      const text = await response.text();
      setCode(text);
    } catch (error: any) {
      setOutput(errorFormatter(error));
    } finally {
      setIsLoadingSample(false);
    }
  }, [sampleCodeUrl, errorFormatter]);

  const clear = useCallback(() => {
    setCode("");
    setOutput("");
  }, []);

  const handleRunCode = useCallback(async () => {
    setIsRunningCode(true);
    setOutput("");
    try {
      const result = await onRunCode(code);
      setOutput(outputFormatter(result));
    } catch (error: any) {
      setOutput(errorFormatter(error));
    } finally {
      setIsRunningCode(false);
    }
  }, [code, onRunCode, outputFormatter, errorFormatter]);

  return (
    <Container>
      <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
      <div className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </div>
      <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">Test it for yourself!</h2>
      <p className="mt-1 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Enter your code or press the button below to load the default sample code.
      </p>
      <div className="mt-4 mb-4 space-x-2">
        <button
          onClick={loadSampleCode}
          disabled={isLoadingSample || isRunningCode}
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingSample ? 'Loading...' : 'Load Sample Code'}
        </button>
        <button
          onClick={clear}
          disabled={isLoadingSample || isRunningCode}
          className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
      <CodeEditor value={code} onChange={setCode} />
      <button
        onClick={handleRunCode}
        disabled={isRunningCode || isLoadingSample || !code.trim()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunningCode ? 'Running...' : runButtonText}
      </button>
      {output && (
        <pre className="mt-4 p-4 bg-black text-green-400 font-mono overflow-auto whitespace-pre-wrap break-words">
          {output}
        </pre>
      )}
    </Container>
  );
};

export default CodePlayground;