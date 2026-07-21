import type { Token } from "../../scanner/Token";
import { Expression } from "./Expression";
import type { ExpressionVisitor } from "./ExpressionVisitor";

export class Variable extends Expression {
    readonly name: Token;

    constructor(name: Token) {
        super();
        this.name = name;
    }

    toString(): string {
        return `Variable { name: ${this.name.lexeme} }`;
    }

    accept<R>(visitor: ExpressionVisitor<R>): R {
        return visitor.visitVariableExpression(this);
    }
}
