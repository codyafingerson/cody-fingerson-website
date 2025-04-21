import { describe, it, expect } from 'vitest'
import { Parser } from './Parser'
import { Token, TokenType } from '../scanner/Token'
import { ExpressionStatement, CreateStatement } from './statements'
import { Binary, Literal, Grouping } from './expressions'

function makeToken(type: TokenType, lexeme = type.toString(), literal: any = null) {
    return new Token(type, lexeme, literal, 1)
}

describe('Parser', () => {
    it('parses a single numeric literal expression', () => {
        const tokens = [
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        
        const stmts = new Parser(tokens).parse()
        expect(stmts).not.toBeNull()
        expect(stmts).toHaveLength(1)

        const stmt = (stmts as any)[0]
        expect(stmt).toBeInstanceOf(ExpressionStatement)

        const expr = stmt.expression
        expect(expr).toBeInstanceOf(Literal)
        expect((expr as Literal).value).toBe(1)
    })

    it('respects operator precedence in 1 + 2 * 3', () => {
        const tokens = [
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.PLUS, '+'),
            makeToken(TokenType.NUMBER, '2', 2),
            makeToken(TokenType.STAR, '*'),
            makeToken(TokenType.NUMBER, '3', 3),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]

        const expr = (new Parser(tokens).parse() as any)[0].expression as Binary
        expect(expr).toBeInstanceOf(Binary)
        expect(expr.operator.type).toBe(TokenType.PLUS)
        expect(expr.left).toBeInstanceOf(Literal)
        expect((expr.left as Literal).value).toBe(1)

        const right = expr.right as Binary
        expect(right).toBeInstanceOf(Binary)
        expect(right.operator.type).toBe(TokenType.STAR)
        expect((right.left as Literal).value).toBe(2)
        expect((right.right as Literal).value).toBe(3)
    })

    it('parses grouped expressions (1 + 2) * 3', () => {
        const tokens = [
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.PLUS, '+'),
            makeToken(TokenType.NUMBER, '2', 2),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.STAR, '*'),
            makeToken(TokenType.NUMBER, '3', 3),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const expr = (new Parser(tokens).parse() as any)[0].expression as Binary
        expect(expr.operator.type).toBe(TokenType.STAR)
        expect(expr.left).toBeInstanceOf(Grouping)

        const inner = (expr.left as Grouping).expression as Binary
        expect(inner).toBeInstanceOf(Binary)
        expect(inner.operator.type).toBe(TokenType.PLUS)
        expect((inner.left as Literal).value).toBe(1)
        expect((inner.right as Literal).value).toBe(2)
        expect((expr.right as Literal).value).toBe(3)
    })

    it('parses variable declaration CREATE x = 42;', () => {
        const tokens = [
            makeToken(TokenType.CREATE, 'CREATE'),
            makeToken(TokenType.IDENTIFIER, 'x'),
            makeToken(TokenType.EQUAL, '='),
            makeToken(TokenType.NUMBER, '42', 42),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const stmts = new Parser(tokens).parse()
        expect(stmts).not.toBeNull()
        const stmt = (stmts as any)[0]
        expect(stmt).toBeInstanceOf(CreateStatement)
        expect(stmt.name.lexeme).toBe('x')
        const init = stmt.initializer
        expect(init).toBeInstanceOf(Literal)
        expect((init as Literal).value).toBe(42)
    })

    it('returns null on invalid assignment 1 = 2;', () => {
        const tokens = [
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.EQUAL, '='),
            makeToken(TokenType.NUMBER, '2', 2),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const result = new Parser(tokens).parse()
        expect(result).toBeNull()
    })
})