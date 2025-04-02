import { Token } from "../scanner/Token";

export class ParseError extends Error {
    public line: number;
    public token: Token;

    constructor(message: string, token: Token) {
        super(`[Line ${token.line}] - ${message}`);
        this.name = "Parse Error";
        this.line = token.line;
        this.token = token;
    }
}