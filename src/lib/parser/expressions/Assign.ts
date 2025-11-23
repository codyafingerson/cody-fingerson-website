import { Token } from '../../scanner/Token'
import { Expression } from './Expression'
import { ExpressionVisitor } from './ExpressionVisitor'

export class Assign extends Expression {
    readonly name: Token
    readonly value: Expression

    constructor(name: Token, value: Expression) {
        super()
        this.name = name
        this.value = value
    }

    toString(): string {
        return `Assign { name: ${this.name.lexeme}, value: ${this.value} }`
    }

    accept<R>(visitor: ExpressionVisitor<R>): R {
        return visitor.visitAssignExpression(this)
    }
}
