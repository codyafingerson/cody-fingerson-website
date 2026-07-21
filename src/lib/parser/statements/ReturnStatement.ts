import type { Token } from "../../scanner/Token";
import type { Expression } from "../expressions/Expression";
import { Statement } from "./Statement";
import type { StatementVisitor } from "./StatementVisitor";

export class ReturnStatement extends Statement {
    readonly keyword: Token;
    readonly value: Expression | null;

    constructor(keyword: Token, value: Expression | null) {
        super();
        this.keyword = keyword;
        this.value = value;
    }

    toString(): string {
        return `Return { keyword: ${this.keyword.lexeme}, value: ${this.value} }`;
    }
    accept<R>(visitor: StatementVisitor<R>): R {
        return visitor.visitReturnStatement(this);
    }
}
