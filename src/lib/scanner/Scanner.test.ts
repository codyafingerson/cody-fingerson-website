import { expect, describe, it } from 'vitest';
import { Scanner } from './Scanner';
import { TokenType } from './Token';

describe('Scanner', () => {
    it('scans integer and float numbers', () => {
        const tokens = new Scanner('123 45.67').scanTokens()!;
        expect(tokens.map(t => t.type)).toEqual([
            TokenType.NUMBER,
            TokenType.NUMBER,
            TokenType.EOF
        ]);
        expect(tokens[0].literal).toBe(123);
        expect(tokens[1].literal).toBe(45.67);
    });

    it('scans simple and escaped string literals', () => {
        const src = `"hello" "he said \\"wow\\"" "\\\\"`;
        const tokens = new Scanner(src).scanTokens()!;
        expect(tokens.map(t => t.type)).toEqual([
            TokenType.STRING,
            TokenType.STRING,
            TokenType.STRING,
            TokenType.EOF
        ]);
        expect(tokens[0].literal).toBe('hello');
        expect(tokens[1].literal).toBe('he said "wow"');
        expect(tokens[2].literal).toBe('\\');
    });

    it('recognizes identifiers and keywords with correct literals', () => {
        const src = 'if else true false null not and or varName _var';
        const tokens = new Scanner(src).scanTokens()!;
        const types = tokens.map(t => t.type);
        expect(types).toEqual([
            TokenType.IF,
            TokenType.ELSE,
            TokenType.TRUE,
            TokenType.FALSE,
            TokenType.NULL,
            TokenType.NOT,
            TokenType.AND,
            TokenType.OR,
            TokenType.IDENTIFIER,
            TokenType.IDENTIFIER,
            TokenType.EOF
        ]);
        expect(tokens[2].literal).toBe(true);
        expect(tokens[3].literal).toBe(false);
        expect(tokens[4].literal).toBeNull();
        expect(tokens[8].lexeme).toBe('varName');
        expect(tokens[9].lexeme).toBe('_var');
    });

    it('scans various single and multi-character operators', () => {
        const src = '(){}.,-+;*% != == < <= > >= /=';
        const tokens = new Scanner(src).scanTokens()!;
        const types = tokens.map(t => t.type);
        expect(types).toEqual([
            TokenType.LEFT_PAREN,
            TokenType.RIGHT_PAREN,
            TokenType.LEFT_BRACE,
            TokenType.RIGHT_BRACE,
            TokenType.DOT,
            TokenType.COMMA,
            TokenType.MINUS,
            TokenType.PLUS,
            TokenType.SEMICOLON,
            TokenType.STAR,
            TokenType.MODULO,
            TokenType.BANG_EQUAL,
            TokenType.EQUAL_EQUAL,
            TokenType.LESS,
            TokenType.LESS_EQUAL,
            TokenType.GREATER,
            TokenType.GREATER_EQUAL,
            TokenType.SLASH,
            TokenType.EQUAL,
            TokenType.EOF
        ]);
    });

    it('ignores comments and produces tokens after newline', () => {
        const src = '// comment here\n+';
        const tokens = new Scanner(src).scanTokens()!;
        expect(tokens.map(t => t.type)).toEqual([TokenType.PLUS, TokenType.EOF]);
    });

    it('returns null on unterminated string literal', () => {
        expect(new Scanner('"unterminated').scanTokens()).toBeNull();
    });

    it('returns null on unexpected characters', () => {
        expect(new Scanner('@').scanTokens()).toBeNull();
    });
});