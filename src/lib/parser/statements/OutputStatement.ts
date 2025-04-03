import { Expression } from "../expressions/Expression";
import { Statement } from "./Statement";
import { StatementVisitor } from "./StatementVisitor";

export class OutputStatement extends Statement {
    readonly expression: Expression;

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }

    toString(): string {
        return `Output { expr: ${this.expression} }`;
    }
    accept<R>(visitor: StatementVisitor<R>): R { return visitor.visitOutputStatement(this); }
}