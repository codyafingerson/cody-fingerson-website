import { Callable } from './Callable';
import type { FunctionStatement } from '../parser/statements';
import { Environment } from './Environment';
import type { Interpreter } from './Interpreter';
import { ReturnException } from './ReturnException';

export class FunctionObject extends Callable {
    readonly declaration: FunctionStatement;
    readonly closure: Environment;

    constructor(declaration: FunctionStatement, closure: Environment) {
        super();
        this.declaration = declaration;
        this.closure = closure;
    }

    public arity(): number {
        return this.declaration.params.length;
    }

    /**
     * Executes the function. Creates a new environment for the function scope,
     * defines parameters, and executes the body. Handles return values via ReturnException.
     * @param interpreter The interpreter instance calling this function.
     * @param args The evaluated arguments passed to the function.
     * @returns The function's return value (or null if no explicit return).
     * @throws {RuntimeError} If an error occurs during function execution.
     */
    public call(interpreter: Interpreter, args: unknown[]): unknown {
        const environment = new Environment(this.closure);

        // Bind arguments to parameter names in the new environment
        for (let i = 0; i < this.declaration.params.length; i++) {
            const paramName = this.declaration.params[i].lexeme;
            environment.define(paramName, args[i]);
        }

        try {
            // Execute the function body in the new environment
            interpreter.executeBlock(this.declaration.body, environment);
        } catch (error: unknown) {
            // If a ReturnException was thrown, catch it and return its value
            if (error instanceof ReturnException) {
                return error.value;
            } else {
                throw error;
            }
        }

        return null;
    }

    public toString(): string {
        return `<fn ${this.declaration.name.lexeme}>`;
    }
}