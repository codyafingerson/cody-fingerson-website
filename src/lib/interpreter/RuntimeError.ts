import type { Token } from '../scanner/Token'

/**
 * Custom error class for reporting errors that occur during interpretation (runtime).
 */
export class RuntimeError extends Error {
    readonly token: Token

    constructor(token: Token, message: string) {
        super(`${message}`)
        this.name = 'Runtime Error'
        this.token = token
    }
}
