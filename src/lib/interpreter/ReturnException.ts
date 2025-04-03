/**
 * A special class used solely for control flow to handle 'return' statements.
 * It's caught by the function's call method.
 */
export class ReturnException extends Error {
    readonly value: unknown;

    constructor(value: unknown) {
        super("Function return control flow exception");
        this.name = "Return Exception";
        this.value = value;
    }
}