import { Expression } from '../expressions/Expression'
import { Statement } from './Statement'
import { StatementVisitor } from './StatementVisitor'

export class WhileStatement extends Statement {
    readonly condition: Expression
    readonly body: Statement

    constructor(condition: Expression, body: Statement) {
        super()
        this.condition = condition
        this.body = body
    }

    toString(): string {
        return `While { cond: ${this.condition}, body: ${this.body} }`
    }

    accept<R>(visitor: StatementVisitor<R>): R {
        return visitor.visitWhileStatement(this)
    }
}
