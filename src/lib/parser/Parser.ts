import { Token, TokenType } from '../scanner/Token'
import { ParseError } from './ParseError'
import { Expression, Assign, Binary, Call, Grouping, Literal, Logical, Unary, Variable } from './expressions'
import {
    Statement,
    BlockStatement,
    CreateStatement,
    ExpressionStatement,
    FunctionStatement,
    IfStatement,
    OutputStatement,
    ReturnStatement,
    WhileStatement
} from './statements'

function reportParseError(error: ParseError): void {
    console.error(error.message)
}

/**
 * Parser class for converting an array of tokens into an abstract syntax tree (AST).
 */
export class Parser {
    private readonly tokens: Token[]
    private current: number = 0
    private errors: ParseError[] = []

    // Initialize the parser with a list of tokens.
    constructor(tokens: Token[]) {
        this.tokens = tokens
    }

    /**
     * Parses tokens into a list of statements.
     * Returns null if any errors are encountered.
     */
    public parse(): Statement[] | null {
        this.errors = []
        const statements: Statement[] = []
        // Loop until all tokens are processed.
        while (!this.isAtEnd()) {
            const decl = this.declaration()
            if (decl !== null) {
                statements.push(decl)
            }
        }

        // If there were errors, report them and return null.
        if (this.errors.length > 0) {
            this.errors.forEach(reportParseError)
            return null
        }

        return statements
    }

    // Parses a declaration: either a function, variable, or statement.
    private declaration(): Statement | null {
        try {
            // Check for function declaration.
            if (this.match(TokenType.FUNC)) return this.functionDeclaration('function')
            // Check for variable/creation declaration.
            if (this.match(TokenType.CREATE)) return this.varDeclaration()
            // Otherwise, parse as a statement.
            return this.statement()
        } catch (error: unknown) {
            // Synchronize parser state after an error.
            this.synchronize(error)
            return null
        }
    }

    // Parses a function declaration.
    private functionDeclaration(kind: string): FunctionStatement {
        // Retrieve the function name.
        const name = this.consume(TokenType.IDENTIFIER, `Expect ${kind} name.`)
        // Parse the parameter list.
        this.consume(TokenType.LEFT_PAREN, `Expect '(' after ${kind} name.`)
        const parameters: Token[] = []
        if (!this.check(TokenType.RIGHT_PAREN)) {
            do {
                if (parameters.length >= 255) {
                    this.error(this.peek(), "Can't have more than 255 parameters.")
                }
                parameters.push(this.consume(TokenType.IDENTIFIER, 'Expect parameter name.'))
            } while (this.match(TokenType.COMMA))
        }
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after parameters.")

        // Parse the function body as a block.
        this.consume(TokenType.LEFT_BRACE, `Expect '{' before ${kind} body.`)
        const body = this.block()
        return new FunctionStatement(name, parameters, body)
    }

    // Parses a variable declaration (via CREATE keyword).
    private varDeclaration(): Statement {
        // Get the variable name.
        const name = this.consume(TokenType.IDENTIFIER, 'Expect variable name.')

        let initializer: Expression | null = null
        // If there is an initializer, parse the expression.
        if (this.match(TokenType.EQUAL)) {
            initializer = this.expression()
        }

        // Consume the semicolon at the end of the declaration.
        this.consume(TokenType.SEMICOLON, "Expect ';' after variable declaration.")
        return new CreateStatement(name, initializer)
    }

    // Parses a statement, which can be a control structure, block or expression.
    private statement(): Statement {
        if (this.match(TokenType.FOR)) return this.forStatement()
        if (this.match(TokenType.IF)) return this.ifStatement()
        if (this.match(TokenType.OUTPUT)) return this.outputStatement()
        if (this.match(TokenType.RETURN)) return this.returnStatement()
        if (this.match(TokenType.WHILE)) return this.whileStatement()
        if (this.match(TokenType.LEFT_BRACE)) return new BlockStatement(this.block())

        // Fallback to parsing an expression followed by a semicolon.
        return this.expressionStatement()
    }

    // Parses an if statement with an optional else clause.
    private ifStatement(): Statement {
        // Parse the condition enclosed in parentheses.
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'if'.")
        const condition = this.expression()
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after if condition.")

        // Parse the then branch and optional else branch.
        const thenBranch = this.statement()
        let elseBranch: Statement | null = null
        if (this.match(TokenType.ELSE)) {
            elseBranch = this.statement()
        }

        return new IfStatement(condition, thenBranch, elseBranch)
    }

    // Parses a for loop statement.
    private forStatement(): Statement {
        // Parse the clauses of the for loop.
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'for'.")

        // Parse initializer.
        let initializer: Statement | null
        if (this.match(TokenType.SEMICOLON)) {
            initializer = null
        } else if (this.match(TokenType.CREATE)) {
            initializer = this.varDeclaration()
        } else {
            initializer = this.expressionStatement()
        }

        // Parse loop condition.
        let condition: Expression | null = null
        if (!this.check(TokenType.SEMICOLON)) {
            condition = this.expression()
        }
        this.consume(TokenType.SEMICOLON, "Expect ';' after loop condition.")

        // Parse increment expression.
        let increment: Expression | null = null
        if (!this.check(TokenType.RIGHT_PAREN)) {
            increment = this.expression()
        }
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after for clauses.")

        // Parse the loop body.
        let body = this.statement()

        // If an increment exists, append it to the end of the body.
        if (increment !== null) {
            body = new BlockStatement([body, new ExpressionStatement(increment)])
        }

        // If no condition is provided, default to true.
        if (condition === null) condition = new Literal(true)
        body = new WhileStatement(condition, body)

        // Prepend the initializer if it exists.
        if (initializer !== null) {
            body = new BlockStatement([initializer, body])
        }

        return body
    }

    // Parses a while loop statement.
    private whileStatement(): Statement {
        // Parse the loop condition.
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'while'.")
        const condition = this.expression()
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after condition.")
        // Parse the loop body.
        const body = this.statement()

        return new WhileStatement(condition, body)
    }

    // Parses an output statement.
    private outputStatement(): Statement {
        // Parse the expression to be output.
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'output'.")
        const value = this.expression()
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after value.")
        this.consume(TokenType.SEMICOLON, "Expect ';' after output statement.")
        return new OutputStatement(value)
    }

    // Parses a return statement with an optional value.
    private returnStatement(): Statement {
        const keyword = this.previous()
        let value: Expression | null = null
        if (!this.check(TokenType.SEMICOLON)) {
            value = this.expression()
        }

        this.consume(TokenType.SEMICOLON, "Expect ';' after return value.")
        return new ReturnStatement(keyword, value)
    }

    // Parses a block of statements delimited by '{' and '}'.
    private block(): Statement[] {
        const statements: Statement[] = []

        // Loop until closing brace is found.
        while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
            const decl = this.declaration()
            if (decl !== null) {
                statements.push(decl)
            }
        }

        this.consume(TokenType.RIGHT_BRACE, "Expect '}' after block.")
        return statements
    }

    // Parses an expression statement ending with a semicolon.
    private expressionStatement(): Statement {
        const expr = this.expression()
        this.consume(TokenType.SEMICOLON, "Expect ';' after expression.")
        return new ExpressionStatement(expr)
    }

    // Parses an expression, currently starting with assignment.
    private expression(): Expression {
        return this.assignment()
    }

    // Parses an assignment expression.
    private assignment(): Expression {
        const expr = this.logicOr()

        // If an equal sign is encountered, it must be an assignment.
        if (this.match(TokenType.EQUAL)) {
            const equals = this.previous()
            const value = this.assignment()

            // Ensure the left-hand side is a valid assignment target.
            if (expr instanceof Variable) {
                const name: Token = expr.name
                return new Assign(name, value)
            }

            this.error(equals, 'Invalid assignment target.')

            if (expr instanceof Variable) {
                return new Assign(expr.name, value)
            } else {
                return expr
            }
        }

        return expr
    }

    // Parses logical OR expressions.
    private logicOr(): Expression {
        let expr = this.logicAnd()

        while (this.match(TokenType.OR)) {
            const operator = this.previous()
            const right = this.logicAnd()
            expr = new Logical(expr, operator, right)
        }

        return expr
    }

    // Parses logical AND expressions.
    private logicAnd(): Expression {
        let expr = this.equality()

        while (this.match(TokenType.AND)) {
            const operator = this.previous()
            const right = this.equality()
            expr = new Logical(expr, operator, right)
        }

        return expr
    }

    // Parses equality expressions (e.g., ==, !=).
    private equality(): Expression {
        let expr = this.comparison()

        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator = this.previous()
            const right = this.comparison()
            expr = new Binary(expr, operator, right)
        }

        return expr
    }

    // Parses comparison expressions (e.g., >, <, >=, <=).
    private comparison(): Expression {
        let expr = this.term()

        while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
            const operator = this.previous()
            const right = this.term()
            expr = new Binary(expr, operator, right)
        }

        return expr
    }

    // Parses addition and subtraction expressions.
    private term(): Expression {
        let expr = this.factor()

        while (this.match(TokenType.MINUS, TokenType.PLUS)) {
            const operator = this.previous()
            const right = this.factor()
            expr = new Binary(expr, operator, right)
        }

        return expr
    }

    // Parses multiplication, division, and modulo expressions.
    private factor(): Expression {
        let expr = this.unary()

        while (this.match(TokenType.SLASH, TokenType.STAR, TokenType.MODULO)) {
            const operator = this.previous()
            const right = this.unary()
            expr = new Binary(expr, operator, right)
        }

        return expr
    }

    // Parses unary expressions (e.g., !, -).
    private unary(): Expression {
        if (this.match(TokenType.BANG, TokenType.MINUS, TokenType.NOT)) {
            const operator = this.previous()
            const right = this.unary()
            return new Unary(operator, right)
        }

        return this.call()
    }

    // Parses function calls.
    private call(): Expression {
        let expr = this.primary()

        // Loop to capture chained calls.
        while (true) {
            if (this.match(TokenType.LEFT_PAREN)) {
                expr = this.finishCall(expr)
            } else {
                break
            }
        }

        return expr
    }

    // Finishes parsing arguments of a function call.
    private finishCall(callee: Expression): Expression {
        const args: Expression[] = []
        if (!this.check(TokenType.RIGHT_PAREN)) {
            do {
                if (args.length >= 255) {
                    this.error(this.peek(), "Can't have more than 255 arguments.")
                }
                args.push(this.expression())
            } while (this.match(TokenType.COMMA))
        }

        const paren = this.consume(TokenType.RIGHT_PAREN, "Expect ')' after arguments.")

        return new Call(callee, paren, args)
    }

    // Parses primary expressions: literals, identifiers and grouped expressions.
    private primary(): Expression {
        // Boolean literals.
        if (this.match(TokenType.FALSE)) return new Literal(false)
        if (this.match(TokenType.TRUE)) return new Literal(true)
        // Null literal.
        if (this.match(TokenType.NULL)) return new Literal(null)

        // Numeric and string literals.
        if (this.match(TokenType.NUMBER, TokenType.STRING)) {
            return new Literal(this.previous().literal)
        }

        // Variable reference.
        if (this.match(TokenType.IDENTIFIER)) {
            return new Variable(this.previous())
        }

        // Grouping with parentheses.
        if (this.match(TokenType.LEFT_PAREN)) {
            const expr = this.expression()
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.")
            return new Grouping(expr)
        }

        // If no valid primary is found, throw an error.
        throw this.error(this.peek(), 'Expect expression.')
    }

    // Checks if the current token matches any the provided types.
    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance()
                return true
            }
        }
        return false
    }

    // Consumes the token if it matches the expected type, otherwise throws an error.
    private consume(type: TokenType, message: string): Token {
        if (this.check(type)) return this.advance()
        throw this.error(this.peek(), message)
    }

    // Checks without consuming if the token type matches.
    private check(type: TokenType): boolean {
        if (this.isAtEnd()) return false
        return this.peek().type === type
    }

    // Advances the current token and returns the previous token.
    private advance(): Token {
        if (!this.isAtEnd()) this.current++
        return this.previous()
    }

    // Checks if the parser has reached the end of the token list.
    private isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF
    }

    // Gets the current token.
    private peek(): Token {
        return this.tokens[this.current]
    }

    // Gets the previous token.
    private previous(): Token {
        return this.tokens[this.current - 1]
    }

    // Reports an error by creating a ParseError and adding it to the errors list.
    private error(token: Token, message: string): ParseError {
        const error = new ParseError(message, token)
        this.errors.push(error)
        return error
    }

    // Synchronizes the parser after encountering an error.
    private synchronize(caughtError?: unknown): void {
        console.log(`Synchronization started due to:`, caughtError)
        this.advance()

        // Continue advancing until a statement boundary is found.
        while (!this.isAtEnd()) {
            if (this.previous().type === TokenType.SEMICOLON) return

            switch (this.peek().type) {
                case TokenType.FUNC:
                case TokenType.CREATE:
                case TokenType.FOR:
                case TokenType.IF:
                case TokenType.WHILE:
                case TokenType.OUTPUT:
                case TokenType.RETURN:
                    return
            }

            this.advance()
        }
    }
}
