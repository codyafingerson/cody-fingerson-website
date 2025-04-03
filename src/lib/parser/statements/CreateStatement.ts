import { Token } from "../../scanner/Token";
import { Expression } from "../expressions/Expression";
import { Statement } from "./Statement";
import { StatementVisitor } from "./StatementVisitor";

export class CreateStatement extends Statement {
    readonly name: Token;
    readonly initializer: Expression | null;

    constructor(name: Token, initializer: Expression | null) {
        super();
        this.name = name;
        this.initializer = initializer;
    }

     toString(): string {
        return `Create { name: ${this.name.lexeme}, init: ${this.initializer} }`;
    }
    accept<R>(visitor: StatementVisitor<R>): R { return visitor.visitCreateStatement(this); }
}