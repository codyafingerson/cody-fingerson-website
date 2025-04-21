import { describe, it, expect } from 'vitest'
import { Parser } from './Parser'
import { Token, TokenType } from '../scanner/Token'
import { BlockStatement, CreateStatement, ExpressionStatement, FunctionStatement, IfStatement, OutputStatement, ReturnStatement,
    WhileStatement
 } from './statements'
import { Assign, Binary, Call, Grouping, Literal, Logical, Unary, Variable } from './expressions'

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

    it('parses variable assignment x = 42;', () => {
        const tokens = [
            makeToken(TokenType.IDENTIFIER, 'x'),
            makeToken(TokenType.EQUAL, '='),
            makeToken(TokenType.NUMBER, '42', 42),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const stmts = new Parser(tokens).parse()
        expect(stmts).not.toBeNull()
        const stmt = (stmts as any)[0]
        expect(stmt).toBeInstanceOf(ExpressionStatement)
        const expr = stmt.expression as Assign
        expect(expr.name.lexeme).toBe('x')
        expect(expr.value).toBeInstanceOf(Literal)
        expect((expr.value as Literal).value).toBe(42)
    })

    it('parses logical expressions', () => {
        const tokens = [
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.OR, 'or'),
            makeToken(TokenType.NUMBER, '2', 2),
            makeToken(TokenType.AND, 'and'),
            makeToken(TokenType.NUMBER, '3', 3),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const expr = (new Parser(tokens).parse() as any)[0].expression as Logical
        expect(expr).toBeInstanceOf(Logical)
        expect(expr.operator.type).toBe(TokenType.OR)
        expect(expr.left).toBeInstanceOf(Literal)
        expect((expr.left as Literal).value).toBe(1)

        const right = expr.right as Logical
        expect(right).toBeInstanceOf(Logical)
        expect(right.operator.type).toBe(TokenType.AND)
        expect((right.left as Literal).value).toBe(2)
        expect((right.right as Literal).value).toBe(3)
    })

    it('parses unary expressions', () => {
        const tokens = [
            makeToken(TokenType.MINUS, '-'),
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const expr = (new Parser(tokens).parse() as any)[0].expression as Unary
        expect(expr).toBeInstanceOf(Unary)
        expect(expr.operator.type).toBe(TokenType.MINUS)
        expect(expr.right).toBeInstanceOf(Literal)
        expect((expr.right as Literal).value).toBe(1)
    })

    it('parses function calls', () => {
        const tokens = [
            makeToken(TokenType.IDENTIFIER, 'myFunction'),
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.COMMA, ','),
            makeToken(TokenType.NUMBER, '2', 2),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const expr = (new Parser(tokens).parse() as any)[0].expression as Call
        expect(expr).toBeInstanceOf(Call)
        expect(expr.callee).toBeInstanceOf(Variable)
        expect((expr.callee as Variable).name.lexeme).toBe('myFunction')
        expect(expr.args).toHaveLength(2)
        expect((expr.args[0] as Literal).value).toBe(1)
        expect((expr.args[1] as Literal).value).toBe(2)
    })

    it('parses chained assignments x = y = 42;', () => {
        const tokens = [
            makeToken(TokenType.IDENTIFIER, 'x'),
            makeToken(TokenType.EQUAL, '='),
            makeToken(TokenType.IDENTIFIER, 'y'),
            makeToken(TokenType.EQUAL, '='),
            makeToken(TokenType.NUMBER, '42', 42),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ]
        const stmts = new Parser(tokens).parse()
        expect(stmts).not.toBeNull()
        const stmt = (stmts as any)[0]
        expect(stmt).toBeInstanceOf(ExpressionStatement)
        const expr = stmt.expression as Assign
        expect(expr.name.lexeme).toBe('x')
        expect(expr.value).toBeInstanceOf(Assign)
        const innerAssign = expr.value as Assign
        expect(innerAssign.name.lexeme).toBe('y')
        expect(innerAssign.value).toBeInstanceOf(Literal)
        expect((innerAssign.value as Literal).value).toBe(42)
    })

        it('parses if statements', () => {
        const tokens = [
            makeToken(TokenType.IF, 'if'),
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.TRUE, 'true', true),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.LEFT_BRACE, '{'),
            makeToken(TokenType.OUTPUT, 'output'),
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.RIGHT_BRACE, '}'),
            makeToken(TokenType.EOF, '')
        ]
    
        const stmts = new Parser(tokens).parse()
        expect(stmts).not.toBeNull()
        expect(stmts).toHaveLength(1)
    
        const stmt = (stmts as any)[0]
        expect(stmt).toBeInstanceOf(IfStatement)
        const ifStmt = stmt as IfStatement
    
        // condition
        expect(ifStmt.condition).toBeInstanceOf(Literal)
        expect((ifStmt.condition as Literal).value).toBe(true)
    
        // then branch
        expect(ifStmt.thenBranch).toBeInstanceOf(BlockStatement)
        const block = ifStmt.thenBranch as BlockStatement
        expect(block.statements).toHaveLength(1)
    
        const inner = block.statements[0]
        expect(inner).toBeInstanceOf(OutputStatement)
        const outputStmt = inner as OutputStatement
        expect(outputStmt.expression).toBeInstanceOf(Literal)
        expect((outputStmt.expression as Literal).value).toBe(1)
    
        // no else branch
        expect(ifStmt.elseBranch).toBeNull()
    })

    it('parses return statements', () => {
        const tokens = [
            makeToken(TokenType.RETURN, 'return'),
            makeToken(TokenType.NUMBER, '99', 99),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ];
        const stmts = new Parser(tokens).parse();
        expect(stmts).not.toBeNull();
        expect(stmts).toHaveLength(1);
    
        const stmt = (stmts as any)[0];
        expect(stmt).toBeInstanceOf(ReturnStatement);
        const returnStmt = stmt as ReturnStatement;
        expect(returnStmt.value).toBeInstanceOf(Literal);
        expect((returnStmt.value as Literal).value).toBe(99);
    });
    
    it('parses while statements', () => {
        const tokens = [
            makeToken(TokenType.WHILE, 'while'),
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.FALSE, 'false', false),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.OUTPUT, 'output'),
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.NUMBER, '1', 1),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.EOF, '')
        ];
        const stmts = new Parser(tokens).parse();
        expect(stmts).not.toBeNull();
        expect(stmts).toHaveLength(1);
    
        const stmt = (stmts as any)[0];
        expect(stmt).toBeInstanceOf(WhileStatement);
        const whileStmt = stmt as WhileStatement;
        expect(whileStmt.condition).toBeInstanceOf(Literal);
        expect((whileStmt.condition as Literal).value).toBe(false);
    
        // body should be an ExpressionStatement or OutputStatement if inline
        expect(whileStmt.body).toBeInstanceOf(OutputStatement);
        const outputStmt = whileStmt.body as OutputStatement;
        expect((outputStmt.expression as Literal).value).toBe(1);
    });
    
    it('parses function declarations', () => {
        const tokens = [
            makeToken(TokenType.FUNC, 'function'),
            makeToken(TokenType.IDENTIFIER, 'foo'),
            makeToken(TokenType.LEFT_PAREN, '('),
            makeToken(TokenType.RIGHT_PAREN, ')'),
            makeToken(TokenType.LEFT_BRACE, '{'),
                makeToken(TokenType.RETURN, 'return'),
                makeToken(TokenType.NUMBER, '42', 42),
                makeToken(TokenType.SEMICOLON, ';'),
            makeToken(TokenType.RIGHT_BRACE, '}'),
            makeToken(TokenType.EOF, '')
        ];
        const stmts = new Parser(tokens).parse();
        expect(stmts).not.toBeNull();
        expect(stmts).toHaveLength(1);
    
        const stmt = (stmts as any)[0];
        expect(stmt).toBeInstanceOf(FunctionStatement);
        const funcStmt = stmt as FunctionStatement;
        expect(funcStmt.name.lexeme).toBe('foo');
        expect(funcStmt.params).toEqual([]);
        expect(funcStmt.body).toHaveLength(1);
    
        // body[0] should be the return statement
        const bodyStmt = funcStmt.body[0];
        expect(bodyStmt).toBeInstanceOf(ReturnStatement);
        const ret = bodyStmt as ReturnStatement;
        expect(ret.value).toBeInstanceOf(Literal);
        expect((ret.value as Literal).value).toBe(42);
    });
})