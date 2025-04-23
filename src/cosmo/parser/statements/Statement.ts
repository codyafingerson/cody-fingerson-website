import { StatementVisitor } from "./StatementVisitor";

export abstract class Statement {
    abstract accept<R>(visitor: StatementVisitor<R>): R;
}