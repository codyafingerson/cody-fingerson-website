import { Token } from '../../scanner/Token'
import { Expression } from './Expression'
import { ExpressionVisitor } from './ExpressionVisitor'

export class Call extends Expression {
    readonly callee: Expression
    readonly paren: Token
    readonly args: Expression[]

    constructor(callee: Expression, paren: Token, args: Expression[]) {
        super()
        this.callee = callee
        this.paren = paren
        this.args = args
    }

    toString(): string {
        return `Call { callee: ${this.callee}, args: [${this.args.join(', ')}] }`
    }

    accept<R>(visitor: ExpressionVisitor<R>): R {
        return visitor.visitCallExpression(this)
    }
}
