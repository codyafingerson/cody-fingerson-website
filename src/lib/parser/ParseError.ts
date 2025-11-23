import type { Token } from '../scanner/Token'

export class ParseError extends Error {
    readonly line: number
    readonly token: Token

    constructor(message: string, token: Token) {
        const where = token.lexeme === 'EOF' ? ' at end' : ` at '${token.lexeme}'`
        super(`[Line ${token.line}] Error${where}: ${message}`)
        this.name = 'ParseError'
        this.line = token.line
        this.token = token
    }
}
