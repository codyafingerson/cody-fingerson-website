import { Assign } from "./Assign";
import { Binary } from "./Binary";
import { Call } from "./Call";
import { Grouping } from "./Grouping";
import { Literal } from "./Literal";
import { Logical } from "./Logical";
import { Unary } from "./Unary";
import { Variable } from "./Variable";

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