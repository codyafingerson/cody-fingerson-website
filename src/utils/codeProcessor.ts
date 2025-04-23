import { Scanner } from '@/cosmo/scanner/Scanner';
import { Parser as CosmoParser, Parser } from '@/cosmo/parser/Parser';
import { Interpreter } from '@/cosmo/interpreter/Interpreter';
import { JavaScriptCompiler } from '@/cosmo/compiler/Compiler';

/**
 * Processes source code through various stages: lexing, parsing, interpreting, and compiling.
 */
export class CodeProcessor {
    private code: string;

    /**
     * Creates an instance of CodeProcessor.
     * @param code The source code string to process.
     */
    constructor(code: string) {
        this.code = code;
    }

    /**
     * Runs the lexer (scanner) on the code.
     * @returns A string containing the token count and the JSON representation of the tokens.
     * @throws {Error} If scanning fails to generate tokens.
     */
    public runLexer() {
        const scanner = new Scanner(this.code);
        const tokens = scanner.scanTokens();
        if (!tokens) { // Added check for null/undefined tokens based on potential Scanner behavior
            throw new Error("Scanning failed. No tokens were generated.");
        }
        return `Token count: ${tokens.length}\n\n${JSON.stringify(tokens, null, 2)}`;
    }

    /**
     * Runs the parser on the code.
     * @returns A string containing the JSON representation of the Abstract Syntax Tree (AST).
     * @throws {Error} If scanning fails or parsing returns no AST.
     */
    public runParser() {
        const scanner = new Scanner(this.code);
        const tokens = scanner.scanTokens();
        if (!tokens) {
            throw new Error("Scanning failed. No tokens were generated.");
        }
        const parser = new CosmoParser(tokens);
        const ast = parser.parse();
         if (!ast) { // Added check for null/undefined AST
            throw new Error("Parsing failed. No AST was generated.");
        }
        return `Generated AST:\n\n${JSON.stringify(ast, null, 2)}`;
    }

    /**
     * Runs the interpreter on the code.
     * Executes the code using a custom interpreter and captures its output.
     * @param handleOutput A callback function to handle output messages during interpretation.
     * @returns A string containing the aggregated output from the interpreter.
     * @throws {Error} If scanning or parsing fails.
     */
    public runRuntime(handleOutput: (arg0: any) => void) {
        let aggregatedOutput = "";
        const outputHandler = (message: string) => {
            aggregatedOutput += message + "\n";
            if (handleOutput) handleOutput(message);
        };

        const scanner = new Scanner(this.code);
        const tokens = scanner.scanTokens();
        if (!tokens) {
            throw new Error("Token scanning failed.");
        }
        const parser = new CosmoParser(tokens);
        const statements = parser.parse();
         if (!statements) {
            throw new Error("Parsing failed. No statements were generated.");
        }
        const interpreter = new Interpreter(outputHandler);
        interpreter.interpret(statements);
        return aggregatedOutput.trimEnd();
    }

    /**
     * Compiles the code to JavaScript and runs the interpreter.
     * Note: This method currently compiles the code but then executes it using the interpreter,
     * logging the compiled code to the console instead of executing it directly.
     * @returns The compiled JavaScript code as a string.
     * @throws {Error} If scanning, parsing, or compilation fails.
     */
    public runCompiler() {
        const scanner = new Scanner(this.code);
        const tokens = scanner.scanTokens();
        if (!tokens) {
            throw new Error("Token scanning failed.");
        }
        const parser = new Parser(tokens);
        const statements = parser.parse();
        if (!statements) {
            throw new Error("Parsing failed.");
        }
        const compiler = new JavaScriptCompiler();
        const compiledCode = compiler.compile(statements);
        if (!compiledCode) {
            throw new Error("Compilation failed.");
        }
        // Note: The interpreter is run here for demonstration/logging,
        // but the compiled code itself is returned.
        console.log("Interpreter output (compiled code is returned separately):");
        const outputHandler = (message: string) => {
            console.log(message);
        };
        const interpreter = new Interpreter(outputHandler);
        interpreter.interpret(statements); // Interprets the original AST, not the compiled JS
        return compiledCode;
    }
}