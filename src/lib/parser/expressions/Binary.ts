import { Token } from '../../scanner/Token'
import { Expression } from './Expression'
import { ExpressionVisitor } from './ExpressionVisitor'

export class Binary extends Expression {
    readonly left: Expression
    readonly operator: Token
    readonly right: Expression

    constructor(left: Expression, operator: Token, right: Expression) {
        super()
        this.left = left
        this.operator = operator
        this.right = right
    }

    toString(): string {
        return `Binary { left: ${this.left}, op: ${this.operator.lexeme}, right: ${this.right} }`
    }

    accept<R>(visitor: ExpressionVisitor<R>): R {
        return visitor.visitBinaryExpression(this)
    }
}
