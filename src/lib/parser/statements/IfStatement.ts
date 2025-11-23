import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'
import { StatementVisitor } from './StatementVisitor'

export class IfStatement extends Statement {
    readonly condition: Expression
    readonly thenBranch: Statement
    readonly elseBranch: Statement | null

    constructor(condition: Expression, thenBranch: Statement, elseBranch: Statement | null) {
        super()
        this.condition = condition
        this.thenBranch = thenBranch
        this.elseBranch = elseBranch
    }

    toString(): string {
        return `If { cond: ${this.condition}, then: ${this.thenBranch}, else: ${this.elseBranch} }`
    }
    accept<R>(visitor: StatementVisitor<R>): R {
        return visitor.visitIfStatement(this)
    }
}
