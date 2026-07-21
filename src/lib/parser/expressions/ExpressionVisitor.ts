import type { Assign } from "./Assign";
import type { Binary } from "./Binary";
import type { Call } from "./Call";
import type { Grouping } from "./Grouping";
import type { Literal } from "./Literal";
import type { Logical } from "./Logical";
import type { Unary } from "./Unary";
import type { Variable } from "./Variable";

export interface ExpressionVisitor<R> {
    visitAssignExpression(expr: Assign): R;
    visitBinaryExpression(expr: Binary): R;
    visitCallExpression(expr: Call): R;
    visitGroupingExpression(expr: Grouping): R;
    visitLiteralExpression(expr: Literal): R;
    visitLogicalExpression(expr: Logical): R;
    visitUnaryExpression(expr: Unary): R;
    visitVariableExpression(expr: Variable): R;
}
