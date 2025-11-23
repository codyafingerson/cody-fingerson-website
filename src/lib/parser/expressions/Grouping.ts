import { Expression } from './Expression'
import { ExpressionVisitor } from './ExpressionVisitor'

export class Grouping extends Expression {
    readonly expression: Expression

    constructor(expression: Expression) {
        super()
        this.expression = expression
    }

    toString(): string {
        return `Grouping { ${this.expression} }`
    }

    accept<R>(visitor: ExpressionVisitor<R>): R {
        return visitor.visitGroupingExpression(this)
    }
}
