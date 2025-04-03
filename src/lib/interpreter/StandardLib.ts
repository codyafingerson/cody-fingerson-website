import { Callable } from './Callable';
import { RuntimeError } from './RuntimeError';
import type { Interpreter } from './Interpreter';
import type { Token } from '../scanner/Token';

/**
 * Abstract base class for native functions provided by the interpreter.
 */
abstract class NativeCallable extends Callable {

    /**
     * Helper to get the appropriate token for error reporting.
     * Uses the provided callToken if available, otherwise creates a dummy token.
     * @param callToken The optional token from the call site.
     * @param defaultLexeme A lexeme to use for the dummy token if needed.
     * @returns A Token object to use for RuntimeError.
     */
    protected getErrorToken(callToken: Token | undefined, defaultLexeme: string = '<native>'): Token {
        if (callToken) {
            return callToken;
        } else {
            // Create a basic dummy token if none was passed
            return { type: 'NATIVE_CALL', lexeme: defaultLexeme, literal: null, line: 0 } as unknown as Token;
        }
    }

     // Abstract methods required by Callable
     abstract arity(): number;
     abstract call(interpreter: Interpreter, args: unknown[], callToken?: Token): unknown;
     abstract toString(): string;
}

export class AddFunction extends NativeCallable {
    public arity(): number {
        return 2;
    }

    // Accept the optional callToken
    public call(_interpreter: Interpreter, args: unknown[], callToken?: Token): unknown {
        const a = args[0];
        const b = args[1];
        // Get the token to use for errors
        const errorToken = this.getErrorToken(callToken, 'add');

        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new RuntimeError(errorToken, `Operands for 'add' must both be numbers (got ${typeof a} and ${typeof b}).`);
        }
        return a + b;
    }

    public toString(): string {
        return "<native fn add>";
    }
}

export class SquareRootFunction extends NativeCallable {
    public arity(): number {
        return 1;
    }

    // Accept the optional callToken
    public call(_interpreter: Interpreter, args: unknown[], callToken?: Token): unknown {
        const a = args[0];
        const errorToken = this.getErrorToken(callToken, 'sqrt');

        if (typeof a !== 'number') {
            throw new RuntimeError(errorToken, `Operand for 'sqrt' must be a number (got ${typeof a}).`);
        }
        if (a < 0) {
             throw new RuntimeError(errorToken, "Operand for 'sqrt' must not be negative.");
        }
        return Math.sqrt(a);
    }

    public toString(): string {
        return "<native fn sqrt>";
    }
}

export class ClockFunction extends NativeCallable {
    public arity(): number {
        return 0;
    }

    // Accept the optional callToken (though Clock doesn't throw errors here)
    public call(_interpreter: Interpreter, _args: unknown[], _callToken?: Token): unknown {
        return Date.now() / 1000.0;
    }

    public toString(): string {
        return "<native fn clock>";
    }
}

export class RandomFunction extends NativeCallable {
    public arity(): number {
        return 0;
    }

    public call(_interpreter: Interpreter, _args: unknown[], _callToken?: Token): unknown {
        return Math.random();
    }

    public toString(): string {
        return "<native fn random>";
    }
}