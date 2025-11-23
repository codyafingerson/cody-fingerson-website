import { Statement } from './Statement'
import { StatementVisitor } from './StatementVisitor'

export class BlockStatement extends Statement {
    readonly statements: Statement[]

    constructor(statements: Statement[]) {
        super()
        this.statements = statements
    }

    toString(): string {
        return `Block { ${this.statements.map(s => s.toString()).join('; ')} }`
    }
    accept<R>(visitor: StatementVisitor<R>): R {
        return visitor.visitBlockStatement(this)
    }
}
