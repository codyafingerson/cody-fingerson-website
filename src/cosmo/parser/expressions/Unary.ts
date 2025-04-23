import { Token } from "../../scanner/Token";
import { Expression } from "./Expression";
import { ExpressionVisitor } from "./ExpressionVisitor";

export class Unary extends Expression {
    readonly operator: Token;
    readonly right: Expression;

    constructor(operator: Token, right: Expression) {
        super();
        this.operator = operator;
        this.right = right;
    }

    toString(): string {
        return `Unary { op: ${this.operator.lexeme}, right: ${this.right} }`;
    }

    accept<R>(visitor: ExpressionVisitor<R>): R { return visitor.visitUnaryExpression(this); }
}