import { Token } from "../../scanner/Token";
import { Statement } from "./Statement";
import { StatementVisitor } from "./StatementVisitor";

export class FunctionStatement extends Statement {
    readonly name: Token;
    readonly params: Token[];
    readonly body: Statement[];

    constructor(name: Token, params: Token[], body: Statement[]) {
        super();
        this.name = name;
        this.params = params;
        this.body = body;
    }

     toString(): string {
        return `Func { name: ${this.name.lexeme}, params: [${this.params.map(p => p.lexeme).join(', ')}], body: Block { ... } }`;
    }
    accept<R>(visitor: StatementVisitor<R>): R { return visitor.visitFunctionStatement(this); }
}