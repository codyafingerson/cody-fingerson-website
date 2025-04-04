import { Token, TokenType } from "../scanner/Token";
import {
    ExpressionVisitor,
    Expression,
    Assign,
    Binary,
    Call,
    Grouping,
    Literal,
    Logical,
    Unary,
    Variable
} from "../parser/expressions";
import {
    StatementVisitor,
    Statement,
    BlockStatement,
    CreateStatement,
    ExpressionStatement,
    FunctionStatement,
    IfStatement,
    OutputStatement,
    ReturnStatement,
    WhileStatement
} from "../parser/statements";
import { Callable } from "./Callable";
import { Environment } from "./Environment";
import { FunctionObject } from "./FunctionObject";
import { ReturnException } from "./ReturnException";
import { RuntimeError } from "./RuntimeError";
import { AddFunction, SquareRootFunction, ClockFunction, RandomFunction, AbsoluteFunction, SubstringFunction, StringLengthFunction, TypeOfFunction } from "./StandardLib";

export class Interpreter implements ExpressionVisitor<unknown>, StatementVisitor<void> {
    readonly globals: Environment = new Environment();
    private environment: Environment = this.globals;
    private readonly outputHandler: (output: string) => void;

    constructor(outputHandler: (output: string) => void = console.log) {
        this.outputHandler = outputHandler;

        this.globals.define('add', new AddFunction());
        this.globals.define('sqrt', new SquareRootFunction());
        this.globals.define('clock', new ClockFunction());
        this.globals.define('random', new RandomFunction());
        this.globals.define('abs', new AbsoluteFunction());
        this.globals.define('substring', new SubstringFunction());
        this.globals.define('length', new StringLengthFunction());
        this.globals.define('typeof', new TypeOfFunction());
    }

    public interpret(statements: Statement[] | null): void {
        if (statements === null) {
            console.error("Interpretation skipped due to parsing errors.");
            throw new Error("Interpretation skipped due to parsing errors.");
            return;
        }

        try {
            for (const statement of statements) {
                this.execute(statement);
            }
        } catch (error: unknown) {
            this.reportRuntimeError(error);
        }
    }

    public executeBlock(statements: Statement[], environment: Environment): void {
        const previous = this.environment;
        try {
            this.environment = environment;
            for (const statement of statements) {
                this.execute(statement);
            }
        } finally {
            this.environment = previous;
        }
    }

    private execute(stmt: Statement): void {
        stmt.accept(this);
    }

    private evaluate(expr: Expression): unknown {
        return expr.accept(this);
    }

    public visitBlockStatement(stmt: BlockStatement): void {
        this.executeBlock(stmt.statements, new Environment(this.environment));
    }

    public visitCreateStatement(stmt: CreateStatement): void {
        let value: unknown = null;
        if (stmt.initializer !== null) {
            value = this.evaluate(stmt.initializer);
        }
        this.environment.define(stmt.name.lexeme, value);
    }

    public visitExpressionStatement(stmt: ExpressionStatement): void {
        this.evaluate(stmt.expression);
    }

    public visitFunctionStatement(stmt: FunctionStatement): void {
        const functionObj = new FunctionObject(stmt, this.environment);
        this.environment.define(stmt.name.lexeme, functionObj);
    }

    public visitIfStatement(stmt: IfStatement): void {
        const conditionValue = this.evaluate(stmt.condition);
        if (this.isTruthy(conditionValue)) {
            this.execute(stmt.thenBranch);
        } else if (stmt.elseBranch !== null) {
            this.execute(stmt.elseBranch);
        }
    }

    public visitOutputStatement(stmt: OutputStatement): void {
        const value = this.evaluate(stmt.expression);
        this.outputHandler(this.stringify(value));
    }

    public visitReturnStatement(stmt: ReturnStatement): void {
        let returnValue: unknown = null;
        if (stmt.value !== null) {
            returnValue = this.evaluate(stmt.value);
        }
        throw new ReturnException(returnValue);
    }

    public visitWhileStatement(stmt: WhileStatement): void {
        while (this.isTruthy(this.evaluate(stmt.condition))) {
            this.execute(stmt.body);
        }
    }

    public visitAssignExpression(expr: Assign): unknown {
        const value = this.evaluate(expr.value);
        this.environment.assign(expr.name, value);
        return value;
    }

    public visitBinaryExpression(expr: Binary): unknown {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right;
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return left + right;
                }
                if (typeof left === 'string' || typeof right === 'string') {
                    return this.stringify(left) + this.stringify(right);
                }
                throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings (or one string).");

            case TokenType.MINUS:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) - (right as number);
            case TokenType.STAR:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) * (right as number);
            case TokenType.SLASH:
                this.checkNumberOperands(expr.operator, left, right);
                if ((right as number) === 0) {
                    throw new RuntimeError(expr.operator, "Division by zero.");
                }
                return (left as number) / (right as number);
            case TokenType.MODULO:
                this.checkNumberOperands(expr.operator, left, right);
                if ((right as number) === 0) {
                    throw new RuntimeError(expr.operator, "Modulo by zero.");
                }
                return (left as number) % (right as number);

            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) > (right as number);
            case TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) >= (right as number);
            case TokenType.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) < (right as number);
            case TokenType.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) <= (right as number);

            case TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
            case TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
        }

        throw new RuntimeError(expr.operator, `Unsupported binary operator '${expr.operator.lexeme}'.`);
    }

    public visitCallExpression(expr: Call): unknown {
        const callee = this.evaluate(expr.callee);

        const args: unknown[] = [];
        for (const argument of expr.args) {
            args.push(this.evaluate(argument));
        }

        if (!(callee instanceof Callable)) {
            throw new RuntimeError(expr.paren, "Can only call functions.");
        }

        const func: Callable = callee;

        if (args.length !== func.arity()) {
            throw new RuntimeError(expr.paren, `Expected ${func.arity()} arguments but got ${args.length}.`);
        }

        return func.call(this, args);
    }

    public visitGroupingExpression(expr: Grouping): unknown {
        return this.evaluate(expr.expression);
    }

    public visitLiteralExpression(expr: Literal): unknown {
        return expr.value;
    }

    public visitLogicalExpression(expr: Logical): unknown {
        const left = this.evaluate(expr.left);

        if (expr.operator.type === TokenType.OR) {
            if (this.isTruthy(left)) return left;
        } else {
            if (!this.isTruthy(left)) return left;
        }

        return this.evaluate(expr.right);
    }

    public visitUnaryExpression(expr: Unary): unknown {
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -(right as number);
            case TokenType.BANG:
                return !this.isTruthy(right);
            case TokenType.NOT:
                return !this.isTruthy(right);
        }

        throw new RuntimeError(expr.operator, `Unsupported unary operator '${expr.operator.lexeme}'.`);
    }

    public visitVariableExpression(expr: Variable): unknown {
        return this.lookUpVariable(expr.name);
    }

    private isTruthy(value: unknown): boolean {
        if (value === null) return false;
        if (typeof value === 'boolean') return value;
        if (value === 0) return false;
        return true;
    }

    private isEqual(a: unknown, b: unknown): boolean {
        if (a === null && b === null) return true;
        if (a === null || b === null) return false;
        return a === b;
    }

    private stringify(value: unknown): string {
        if (value === null) return "null";
        if (typeof value === 'number') {
            return String(value);
        }
        if (value instanceof Callable) {
            return value.toString();
        }
        return String(value);
    }

    private lookUpVariable(name: Token): unknown {
        return this.environment.get(name);
    }

    private checkNumberOperand(operator: Token, operand: unknown): void {
        if (typeof operand === 'number') return;
        throw new RuntimeError(operator, `Operand must be a number (got ${typeof operand}).`);
    }

    private checkNumberOperands(operator: Token, left: unknown, right: unknown): void {
        if (typeof left === 'number' && typeof right === 'number') return;
        let message = "Operands must be numbers.";
        if (typeof left !== 'number') message += ` Left operand is ${typeof left}.`;
        if (typeof right !== 'number') message += ` Right operand is ${typeof right}.`;
        throw new RuntimeError(operator, message);
    }

    private reportRuntimeError(error: unknown): void {
        if (error instanceof RuntimeError) {
            console.error(error.message);
            throw new RuntimeError(error.token, error.message);
        } else if (error instanceof Error) {
            console.error(`Unexpected JavaScript Error during interpretation: ${error.message}`);
            console.error(error.stack);
        } else {
            console.error("An unknown error occurred during interpretation.");
            console.error(error);
        }
    }
}