import { useState, useCallback } from 'react'
import CodeEditor from '../../components/CodeEditor'
import { CodeProcessor } from '../../utils/codeProcessor'
import { FaInfoCircle, FaExclamationCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Renders a playground where users can write code and perform actions:
 * - Tokenize
 * - Parse
 * - Execute via an interpreter
 * - Compile to JavaScript and run
 */
export default function PlaygroundPage() {
    /**
     * The current code in the editor
     */
    const [code, setCode] = useState('')

    /**
     * The output to display, updated by interpreter/lexer/parser/compiler
     */
    const [output, setOutput] = useState('')

    /**
     * Indicates if sample code is in the process of loading
     */
    const [isLoadingSample, setIsLoadingSample] = useState(false)

    /**
     * Indicates if code is running (tokenizing, parsing, executing, or compiling)
     */
    const [isRunningCode, setIsRunningCode] = useState(false)

    /**
     * Controls the visibility of the "Compile" message
     */
    const [showCompileMessage, setShowCompileMessage] = useState(false)

    /**
     * Formats and returns a string for errors encountered
     * @param error Any kind of thrown error
     * @returns Readable error message
     */
    const errorFormatter = (error: any): string => `Error: ${error?.message || String(error)}`

    /**
     * Retrieves sample code from /sample-code.cos via a fetch request
     * and sets the editor content to the loaded code
     */
    const loadSampleCode = useCallback(async () => {
        setIsLoadingSample(true)
        setOutput('')
        setShowCompileMessage(false)
        try {
            const response = await fetch('/sample-code.cos')
            if (!response.ok) {
                throw new Error(`Failed to load sample code (status: ${response.status})`)
            }
            const text = await response.text()
            setCode(text)
        } catch (error: any) {
            setOutput(errorFormatter(error))
        } finally {
            setIsLoadingSample(false)
        }
    }, [errorFormatter])

    /**
     * Clears the editor and output
     */
    const clear = useCallback(() => {
        setCode('')
        setOutput('')
        setShowCompileMessage(false)
    }, [])

    /**
     * Runs code using one of the CodeProcessor methods (lexer, parser, runtime, or compiler)
     * @param runnerName The name of the method to call on CodeProcessor
     */
    const handleRun = useCallback(
        async (runnerName: keyof CodeProcessor) => {
            setIsRunningCode(true)
            setOutput('')
            setShowCompileMessage(false)

            if (runnerName === 'runCompiler') {
                setShowCompileMessage(true)
            }

            try {
                const processor = new CodeProcessor(code)
                let result: string
                if (runnerName === 'runRuntime') {
                    // Runtime can provide incremental output
                    result = processor.runRuntime((msg: string) => {
                        setOutput(prev => prev + msg + '\n')
                    })
                } else {
                    result = processor[runnerName]()
                }
                setOutput(result)
            } catch (error: any) {
                setOutput(errorFormatter(error))
                setShowCompileMessage(false)
            } finally {
                setIsRunningCode(false)
            }
        },
        [code, errorFormatter]
    )

    return (
        <>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Playground</h1>

            {/* Info alert about the available actions */}
            <p className="mt-2 p-4 bg-sky-100 border-l-4 border-sky-500 text-sky-800 rounded-md" role="alert">
                <FaInfoCircle className="inline mr-2 align-middle" />
                <span className="align-middle">
                    You can tokenize, parse, execute, or compile the code independently.
                    <strong className="ml-1">Execute</strong> runs the code via the interpreter and shows output below.
                    <strong className="ml-1">Compile</strong> generates JavaScript code and and runs it via the
                    interpreter to the DevTools console.
                </span>
            </p>

            {/* Link to settings page where the user can change the code editor theme */}
            <p className="mt-4 text-gray-500 italic">
                Tip: You can change the theme of the code editor on the{' '}
                <Link to="/interpreter/settings" className="text-blue-500 hover:underline">
                    Settings
                </Link>{' '}
                page.
            </p>

            {/* Buttons for loading sample code or clearing the editor */}
            <div className="mt-4 space-x-2 mb-3">
                <button
                    onClick={loadSampleCode}
                    disabled={isLoadingSample || isRunningCode}
                    title="Load sample code (Optional)"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
                    dark:focus:ring-green-800 cursor-pointer"
                >
                    {isLoadingSample ? 'Loading...' : 'Load Sample Code'}
                </button>
                <button
                    onClick={clear}
                    disabled={isLoadingSample || isRunningCode}
                    title="Clear the code and output (Optional)"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg 
                    border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 
                    focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 
                    dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
                >
                    Clear
                </button>
            </div>

            {/* Main code editor where user types the code */}
            <CodeEditor value={code} onChange={setCode} />

            {/* Multiple action buttons for the code */}
            <div className="mt-4 space-x-2">
                {/* Tokenize Button */}
                <button
                    onClick={() => handleRun('runLexer')}
                    disabled={isRunningCode || isLoadingSample || !code.trim()}
                    title="Tokenize the code (Optional)"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm 
                    font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 
                    group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 
                        rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
                    >
                        {isRunningCode ? 'Running...' : 'Tokenize'}
                    </span>
                </button>

                {/* Parse Button */}
                <button
                    onClick={() => handleRun('runParser')}
                    disabled={isRunningCode || isLoadingSample || !code.trim()}
                    title="Parse the code (Optional)"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm 
                    font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 
                    group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 cursor-pointer 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 
                        rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
                    >
                        {isRunningCode ? 'Running...' : 'Parse'}
                    </span>
                </button>

                {/* Execute Button - interprets the code */}
                <button
                    onClick={() => handleRun('runRuntime')}
                    disabled={isRunningCode || isLoadingSample || !code.trim()}
                    title="Run the code using the interpreter"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm 
                    font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 
                    group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 
                        rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
                    >
                        {isRunningCode ? 'Running...' : 'Execute'}
                    </span>
                </button>

                {/* Compile Button - generates and runs JavaScript code */}
                <button
                    onClick={() => handleRun('runCompiler')}
                    disabled={isRunningCode || isLoadingSample || !code.trim()}
                    title="Compile the code to JavaScript, and executes it as JavaScript"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm 
                    font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 
                    group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span
                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 
                        rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
                    >
                        {isRunningCode ? 'Running...' : 'Compile'}
                    </span>
                </button>
            </div>

            {/* Alert shown only for compile, indicating JS code is shown in output */}
            {output && showCompileMessage && (
                <p
                    className="mt-2 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md"
                    role="alert"
                >
                    <FaExclamationCircle className="inline mr-2 align-middle" />
                    <span className="align-middle">
                        Output has been logged to the DevTools console. The compiled JavaScript code is shown below.
                    </span>
                </p>
            )}

            {/* Displays output in a styled pre block when available */}
            {output && (
                <motion.pre
                    key="output"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 p-4 bg-gray-900 text-green-400 font-mono overflow-auto whitespace-pre-wrap 
                     break-words max-h-[100rem] rounded-lg shadow border border-gray-700"
                >
                    {output}
                </motion.pre>
            )}
        </>
    )
}
