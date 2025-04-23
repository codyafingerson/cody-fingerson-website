import { Interpreter } from "./Interpreter";

export abstract class Callable {
    abstract arity(): number;

    /**
     * Executes the callable's logic.
     * @param interpreter The interpreter instance, used for context if needed.
     * @param args The arguments passed to the callable.
     * @returns The result of the call.
     * @throws {RuntimeError} If a runtime error occurs during the call.
     */
    abstract call(interpreter: Interpreter, args: unknown[]): unknown;

    /**
     * Returns a string representation of the callable.
     */
    abstract toString(): string;
}