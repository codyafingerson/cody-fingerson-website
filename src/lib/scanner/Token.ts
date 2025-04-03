export enum TokenType {
    // Single-character tokens.
    LEFT_PAREN = 'Left Parenthesis',
    RIGHT_PAREN = 'Right Parenthesis',
    LEFT_BRACE = 'Left Brace',
    RIGHT_BRACE = 'Right Brace',
    COMMA = 'Comma',
    DOT = 'Dot',
    MINUS = 'Minus',
    PLUS = 'Plus',
    SEMICOLON = 'Semicolon',
    SLASH = 'Slash',
    STAR = 'Star',
    MODULO = 'Modulo',

    // One or two character tokens.
    BANG = 'Bang',
    BANG_EQUAL = 'Bang Equal',
    EQUAL = 'Equal',
    EQUAL_EQUAL = 'Equal Equal',
    GREATER = 'Greater',
    GREATER_EQUAL = 'Greater Equal',
    LESS = 'Less',
    LESS_EQUAL = 'Less Equal',

    // Literals.
    IDENTIFIER = 'Identifier',
    STRING = 'String',
    NUMBER = 'Number',

    // Keywords.
    AND = 'And',
    CREATE = 'Create',
    ELSE = 'Else',
    FALSE = 'False',
    FOR = 'For',
    FUNC = 'Function',
    IF = 'If',
    NULL = 'Null',
    NOT = 'Not',
    OR = 'Or',
    OUTPUT = 'Output',
    RETURN = 'Return',
    TRUE = 'True',
    WHILE = 'While',

    EOF = 'End of File'
}

/**
 * Represents a token in the source code.
 */
export class Token {
    readonly type: TokenType;
    readonly lexeme: string;
    readonly literal: unknown;
    readonly line: number;

    constructor(type: TokenType, lexeme: string, literal: unknown, line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    toString(): string {
        return `${this.type} ${this.lexeme} ${this.literal === null ? 'null' : this.literal}`;
    }
}