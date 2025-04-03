import type { Token } from "../scanner/Token";
import { RuntimeError } from "./RuntimeError";

/**
 * Manages variable scopes and their values during interpretation.
 * Supports nested scopes for blocks and functions.
 */
export class Environment {
    readonly enclosing: Environment | null;
    private readonly values: Map<string, unknown> = new Map();

    constructor(enclosing: Environment | null = null) {
        this.enclosing = enclosing;
    }

    /**
     * Defines a new variable in the *current* environment.
     * If the variable already exists in the current environment, it's effectively reassigned.
     * @param name The variable name (string lexeme).
     * @param value The initial value.
     */
    public define(name: string, value: unknown): void {
        this.values.set(name, value);
    }

    /**
     * Retrieves the value of a variable, searching the current environment
     * and then enclosing environments.
     * @param name The token representing the variable name (used for error reporting).
     * @returns The value of the variable.
     * @throws {RuntimeError} If the variable is not defined.
     */
    public get(name: Token): unknown {
        if (this.values.has(name.lexeme)) {
            // Ensure value is not undefined before returning (though Map shouldn't store undefined for existing keys)
            return this.values.get(name.lexeme) ?? null;
        }

        if (this.enclosing !== null) {
            return this.enclosing.get(name);
        }

        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }

    /**
     * Assigns a new value to an *existing* variable, searching the current environment
     * and then enclosing environments.
     * @param name The token representing the variable name.
     * @param value The new value to assign.
     * @throws {RuntimeError} If the variable is not defined in any accessible scope.
     */
    public assign(name: Token, value: unknown): void {
        if (this.values.has(name.lexeme)) {
            this.values.set(name.lexeme, value);
            return;
        }

        if (this.enclosing !== null) {
            this.enclosing.assign(name, value);
            return;
        }

        throw new RuntimeError(name, `Undefined variable '${name.lexeme}' for assignment.`);
    }
}