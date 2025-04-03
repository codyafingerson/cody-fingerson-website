import { TokenType, Token } from './Token';

/**
 * A scanner utility that reads the source code and converts it into a list of tokens.
 * @class
 */
export class Scanner {
    private readonly source: string;
    private readonly tokens: Token[] = [];
    private start: number = 0;
    private current: number = 0;
    private line: number = 1;
    private hasError: boolean = false;

    private static readonly keywords: Readonly<Record<string, TokenType>> = {
        'and': TokenType.AND,
        'create': TokenType.CREATE,
        'else': TokenType.ELSE,
        'false': TokenType.FALSE,
        'func': TokenType.FUNC,
        'for': TokenType.FOR,
        'if': TokenType.IF,
        'null': TokenType.NULL,
        'not': TokenType.NOT,
        'or': TokenType.OR,
        'output': TokenType.OUTPUT,
        'return': TokenType.RETURN,
        'true': TokenType.TRUE,
        'while': TokenType.WHILE
    };

    constructor(source: string) {
        this.source = source;
    }

    /**
     * Scans the source code and returns a list of tokens.
     * Returns null if scanning errors were encountered.
     * @returns {Token[] | null} The list of tokens found or null if errors occurred.
     */
    public scanTokens(): Token[] | null {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));

        // Return null if errors were found during scanning
        if (this.hasError) {
            return null;
        }

        return this.tokens;
    }

    private scanToken(): void {
        const c = this.advance();
        switch (c) {
            // Single-character tokens.
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;
            case '%': this.addToken(TokenType.MODULO); break; // Added

            // One or two character tokens.
            case '!':
                this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
                break;
            case '<':
                this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
                break;
            case '>':
                this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
                break;

            // Slash could be division or a comment.
            case '/':
                if (this.match('/')) {
                    // A comment goes until the end of the line.
                    while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
                } else {
                    this.addToken(TokenType.SLASH);
                }
                break;

            // Whitespace characters.
            case ' ':
            case '\r':
            case '\t':
                // Ignore whitespace.
                break;

            case '\n':
                this.line++;
                break;

            // String literals.
            case '"': this.string(); break;

            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    this.report(`Unexpected character '${c}'.`);
                }
                break;
        }
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    }

    private advance(): string {
        return this.source.charAt(this.current++);
    }

    private addToken(type: TokenType, literal: unknown = null): void {
        const text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, text, literal, this.line));
    }

    private match(expected: string): boolean {
        if (this.isAtEnd()) return false;
        if (this.source.charAt(this.current) !== expected) return false;

        this.current++;
        return true;
    }

    private peek(): string {
        if (this.isAtEnd()) return '\0'; // Use null character to signify end
        return this.source.charAt(this.current);
    }

    private peekNext(): string {
        if (this.current + 1 >= this.source.length) return '\0';
        return this.source.charAt(this.current + 1);
    }

    private string(): void {
        while (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') this.line++;
            // Handle escape sequences (basic example: \\ and \")
            if (this.peek() === '\\' && (this.peekNext() === '"' || this.peekNext() === '\\')) {
                this.advance(); // Consume the backslash
            }
            this.advance();
        }

        if (this.isAtEnd()) {
            this.report("Unterminated string.");
            return;
        }

        // The closing ".
        this.advance();

        // Trim the surrounding quotes and unescape characters.
        let value = this.source.substring(this.start + 1, this.current - 1);

        // Basic unescaping for \" and \\
        value = value.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        this.addToken(TokenType.STRING, value);
    }

    private number(): void {
        while (this.isDigit(this.peek())) this.advance();

        // Look for a fractional part.
        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
            // Consume the ".".
            this.advance();

            while (this.isDigit(this.peek())) this.advance();
        }

        const value = this.source.substring(this.start, this.current);
        this.addToken(TokenType.NUMBER, Number(value));
    }

    private identifier(): void {
        while (this.isAlphaNumeric(this.peek())) this.advance();

        const text = this.source.substring(this.start, this.current);
        let type = Scanner.keywords[text];
        let literal: unknown = null; // Use unknown

        if (type === undefined) {
            type = TokenType.IDENTIFIER;
        } else {
            // Set literal values only for boolean and null types represented by keywords
            if (type === TokenType.TRUE) {
                literal = true;
            } else if (type === TokenType.FALSE) {
                literal = false;
            } else if (type === TokenType.NULL) { // Check against NULL
                literal = null;
            }
        }

        // Only override literal if it's specifically true, false, or null keyword
        if (type === TokenType.TRUE || type === TokenType.FALSE || type === TokenType.NULL) {
            this.addToken(type, literal);
        } else {
            // For other keywords or identifiers, the literal is null
            this.addToken(type, null);
        }
    }

    private isDigit(c: string): boolean {
        // Check if c is a single character before comparing
        return c.length === 1 && c >= '0' && c <= '9';
    }

    private isAlpha(c: string): boolean {
        // Check if c is a single character before comparing
        return c.length === 1 &&
            ((c >= 'a' && c <= 'z') ||
                (c >= 'A' && c <= 'Z') ||
                c === '_');
    }

    private isAlphaNumeric(c: string): boolean {
        return this.isAlpha(c) || this.isDigit(c);
    }

    // Helper to report errors and set the error flag
    private report(message: string): void {
        reportError(this.line, message);
        this.hasError = true;
    }
}

function reportError(line: number, message: string): void {
    console.error(`[line ${line}] Error: ${message}`);
}