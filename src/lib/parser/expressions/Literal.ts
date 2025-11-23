import { Expression } from './Expression'
import { ExpressionVisitor } from './ExpressionVisitor'

export class Literal extends Expression {
    readonly value: string | number | boolean | null | unknown

    constructor(value: string | number | boolean | null | unknown) {
        super()
        this.value = value
    }

    toString(): string {
        if (this.value === null) return 'Literal { null }'
        if (typeof this.value === 'string') return `Literal { "${this.value}" }`
        return `Literal { ${this.value} }`
    }

    accept<R>(visitor: ExpressionVisitor<R>): R {
        return visitor.visitLiteralExpression(this)
    }
}
