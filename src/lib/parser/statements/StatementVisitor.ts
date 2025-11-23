import { BlockStatement } from './BlockStatement'
import { CreateStatement } from './CreateStatement'
import { ExpressionStatement } from './ExpressionStatement'
import { FunctionStatement } from './FunctionStatement'
import { IfStatement } from './IfStatement'
import { OutputStatement } from './OutputStatement'
import { ReturnStatement } from './ReturnStatement'
import { WhileStatement } from './WhileStatement'

export interface StatementVisitor<R> {
    visitBlockStatement(statement: BlockStatement): R

    visitCreateStatement(statement: CreateStatement): R

    visitExpressionStatement(statement: ExpressionStatement): R

    visitFunctionStatement(statement: FunctionStatement): R

    visitIfStatement(statement: IfStatement): R

    visitOutputStatement(statement: OutputStatement): R

    visitReturnStatement(statement: ReturnStatement): R

    visitWhileStatement(statement: WhileStatement): R
}
