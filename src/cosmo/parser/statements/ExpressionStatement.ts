import { Expression } from "../expressions/Expression";
import { Statement } from "./Statement";
import { StatementVisitor } from "./StatementVisitor";

export class ExpressionStatement extends Statement {
    readonly expression: Expression;

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }

     toString(): string {
        return `ExprStatement { ${this.expression} }`;
    }
    accept<R>(visitor: StatementVisitor<R>): R { return visitor.visitExpressionStatement(this); }
}