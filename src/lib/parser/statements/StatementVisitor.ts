import type { BlockStatement } from "./BlockStatement";
import type { CreateStatement } from "./CreateStatement";
import type { ExpressionStatement } from "./ExpressionStatement";
import type { FunctionStatement } from "./FunctionStatement";
import type { IfStatement } from "./IfStatement";
import type { OutputStatement } from "./OutputStatement";
import type { ReturnStatement } from "./ReturnStatement";
import type { WhileStatement } from "./WhileStatement";

export interface StatementVisitor<R> {
    visitBlockStatement(statement: BlockStatement): R;

    visitCreateStatement(statement: CreateStatement): R;

    visitExpressionStatement(statement: ExpressionStatement): R;

    visitFunctionStatement(statement: FunctionStatement): R;

    visitIfStatement(statement: IfStatement): R;

    visitOutputStatement(statement: OutputStatement): R;

    visitReturnStatement(statement: ReturnStatement): R;

    visitWhileStatement(statement: WhileStatement): R;
}
