import {
    Assign, Binary, Call, Grouping, Literal, Logical, Unary, Variable } from "../parser/expressions"

import {
    BlockStatement, CreateStatement, ExpressionStatement, FunctionStatement,
    IfStatement, OutputStatement, ReturnStatement, WhileStatement
} from "../parser/statements";

import { ExpressionVisitor } from "../parser/expressions";
import { StatementVisitor } from "../parser/statements";
import { Statement } from "../parser/statements";
import { Expression } from "../parser/expressions";
import { TokenType } from '../scanner/Token';

export class JavaScriptCompiler implements ExpressionVisitor<string>, StatementVisitor<string> {
    private indentLevel: number = 0;

    /**
     * Compiles an array of Cosmo statements into a JavaScript code string.
     * @param statements The array of Statement nodes from the parser.
     * @returns A string containing the generated JavaScript code, or an error message.
     */
    compile(statements: Statement[] | null): string {
        if (!statements) {
            return "// Cannot compile due to parsing errors.";
        }
        const date = new Date().toDateString();
        const time = new Date().toLocaleTimeString();
        // Start with strict mode and a comment
        let output = `/** \n* Generated by Cosmo Compiler on ${date} at ${time}\n**/\n \n'use strict';\n\n`;
        this.indentLevel = 0; // Reset indentation

        try {
            for (const stmt of statements) {
                // Use the accept method to dispatch to the correct visit method
                // generateStmt adds indentation
                output += this.generateStmt(stmt);
            }
        } catch (error) {
            // Basic error handling during generation
            console.error("Code generation error:", error);
            return `// Error during code generation: ${error instanceof Error ? error.message : error}`;
        }

        return output;
    }

    // --- Helper Methods ---

    /** Returns the current indentation string (e.g., "  ", "    "). */
    private indent(): string {
        return '  '.repeat(this.indentLevel); // Using 2 spaces per level
    }

    /** Generates code for a statement, applying current indentation. */
    private generateStmt(stmt: Statement): string {
        return this.indent() + stmt.accept(this);
    }

    /** Generates code for an expression (no indentation applied directly). */
    private generateExpr(expr: Expression): string {
        return expr.accept(this);
    }

    /** Generates code for a block or wraps a single statement in braces. */
    private generateBlockOrStmt(stmt: Statement): string {
        // If the statement is already a block, just generate it (visitor handles braces)
        if (stmt instanceof BlockStatement) {
            return " " + stmt.accept(this); // Space before opening brace
        } else {
            // Otherwise, wrap the single statement in braces
            let code = " {\n";
            this.indentLevel++;
            code += this.generateStmt(stmt); // generateStmt adds indentation
            this.indentLevel--;
            code += this.indent() + "}\n";
            return code;
        }
    }

    // --- StatementVisitor Implementation ---

    visitBlockStatement(statement: BlockStatement): string {
        let code = "{\n";
        this.indentLevel++;
        for (const innerStmt of statement.statements) {
            code += this.generateStmt(innerStmt); // Adds indentation
        }
        this.indentLevel--;
        code += this.indent() + "}\n"; // Newline after block
        return code;
    }

    visitCreateStatement(statement: CreateStatement): string {
        // Translate 'create' to 'let' (or 'var' if preferred)
        let code = `let ${statement.name.lexeme}`;
        if (statement.initializer) {
            code += ` = ${this.generateExpr(statement.initializer)}`;
        } else {
            code += ` = null`; // Cosmo default init is null
        }
        return code + ";\n"; // Terminate statement
    }

    visitExpressionStatement(statement: ExpressionStatement): string {
        return this.generateExpr(statement.expression) + ";\n"; // Terminate statement
    }

    visitFunctionStatement(statement: FunctionStatement): string {
        const params = statement.params.map(p => p.lexeme).join(", ");
        // Manually handle body block since it's Statement[]
        let bodyCode = "{\n";
        this.indentLevel++;
        for (const bodyStmt of statement.body) {
            bodyCode += this.generateStmt(bodyStmt);
        }
        this.indentLevel--;
        bodyCode += this.indent() + "}"; // Closing brace for body
        // Add newline after the function definition
        return `function ${statement.name.lexeme}(${params}) ${bodyCode}\n`;
    }

    visitIfStatement(statement: IfStatement): string {
        const conditionCode = this.generateExpr(statement.condition);
        // generateBlockOrStmt ensures the branches are properly braced
        const thenBranchCode = this.generateBlockOrStmt(statement.thenBranch);
        let code = `if (${conditionCode})${thenBranchCode}`; // thenBranchCode includes space and braces

        if (statement.elseBranch) {
            const elseBranchCode = this.generateBlockOrStmt(statement.elseBranch);
            // Remove trailing newline from thenBranchCode before adding else
            code = code.trimEnd() + ` else ${elseBranchCode}`;
        }
        // generateBlockOrStmt adds the final newline
        return code;
    }

    visitOutputStatement(statement: OutputStatement): string {
        // Map Cosmo 'output' to JS 'console.log'
        return `console.log(${this.generateExpr(statement.expression)});\n`;
    }

    visitReturnStatement(statement: ReturnStatement): string {
        if (statement.value) {
            return `return ${this.generateExpr(statement.value)};\n`;
        } else {
            return "return;\n"; // JS 'return;' returns undefined
        }
    }

    visitWhileStatement(statement: WhileStatement): string {
        const conditionCode = this.generateExpr(statement.condition);
        const bodyCode = this.generateBlockOrStmt(statement.body); // Ensures braces
        return `while (${conditionCode})${bodyCode}`; // bodyCode includes final newline
    }

    // --- ExpressionVisitor Implementation ---

    visitAssignExpression(expr: Assign): string {
        // JS assignment evaluates to the assigned value, parenthesize if used within larger expression
        return `(${expr.name.lexeme} = ${this.generateExpr(expr.value)})`;
    }

    visitBinaryExpression(expr: Binary): string {
        const left = this.generateExpr(expr.left);
        const right = this.generateExpr(expr.right);
        let op = expr.operator.lexeme;

        // Map Cosmo operators to JS operators if they differ
        if (op === '==') op = '==='; // Map to strict equality
        if (op === '!=') op = '!=='; // Map to strict inequality
        // +, -, *, /, %, >, >=, <, <= usually map directly

        // Parenthesize binary operations for safety regarding precedence
        return `(${left} ${op} ${right})`;
    }

    visitCallExpression(expr: Call): string {
        const calleeCode = this.generateExpr(expr.callee);
        const argsCode = expr.args.map(arg => this.generateExpr(arg)).join(", ");

        // --- Handle Standard Library Translation ---
        // Check if the callee is a simple variable name matching a stdlib function
        if (expr.callee instanceof Variable) {
            const calleeName = expr.callee.name.lexeme;
            switch (calleeName) {
                case 'add':
                    // 'add' always takes 2 args, translate to JS '+'
                    // This bypasses runtime type checks defined in NativeCallable!
                    return `(${expr.args.map(arg => this.generateExpr(arg)).join(' + ')})`;
                case 'sqrt':
                    // Translate to Math.sqrt - assumes 1 arg
                    // Bypasses runtime checks (e.g., for negative numbers)
                    return `Math.sqrt(${argsCode})`;
                case 'clock':
                    // Translate to JS equivalent - assumes 0 args
                    return `(Date.now() / 1000.0)`;
                case 'random':
                    // Translate to JS equivalent - assumes 0 args
                    return `Math.random()`;
                case 'typeof':
                    // Translate to JS equivalent - assumes 1 arg
                    return `typeof ${this.generateExpr(expr.args[0])}`;
                case 'substring':
                    // Translate to JS equivalent - assumes 3 args
                    return `${this.generateExpr(expr.args[0])}.substring(${this.generateExpr(expr.args[1])}, ${this.generateExpr(expr.args[2])})`;
                case 'length':
                    // Translate to JS equivalent - assumes 1 arg
                    return `${this.generateExpr(expr.args[0])}.length`;
                case 'abs':
                    // Translate to JS equivalent - assumes 1 arg
                    return `Math.abs(${this.generateExpr(expr.args[0])})`;
                // 'output' is handled as a statement
            }
        }

        // Default: Generate a standard JS function call for user functions
        return `${calleeCode}(${argsCode})`;
    }

    visitGroupingExpression(expr: Grouping): string {
        // Parentheses for grouping
        return `(${this.generateExpr(expr.expression)})`;
    }

    visitLiteralExpression(expr: Literal): string {
        const value = expr.value;
        if (typeof value === 'string') {
            // Use JSON.stringify for proper escaping of quotes, backslashes etc.
            return JSON.stringify(value);
        }
        if (value === null) {
            return "null";
        }
        // Numbers and booleans typically convert correctly with String()
        return String(value);
    }

    visitLogicalExpression(expr: Logical): string {
        // Map Cosmo 'or'/'and' to JS '||'/'&&'
        const op = expr.operator.type === TokenType.OR ? '||' : '&&';
        // Parenthesize for safety
        return `(${this.generateExpr(expr.left)} ${op} ${this.generateExpr(expr.right)})`;
    }

    visitUnaryExpression(expr: Unary): string {
        // Map Cosmo '!'/'not' to JS '!' and '-' to '-'
        const operator = (expr.operator.type === TokenType.BANG || expr.operator.type === TokenType.NOT) ? '!' : '-';
        // Parenthesize operand for safety, e.g., !(a && b) or -(a + b)
        return `${operator}(${this.generateExpr(expr.right)})`;
    }

    visitVariableExpression(expr: Variable): string {
        // Variable names map directly
        return expr.name.lexeme;
    }
}