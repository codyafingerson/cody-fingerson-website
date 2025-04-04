import CodePlayground from '../../components/CodePlayground';
import { Scanner } from '../../lib/scanner/Scanner';
import { Parser as CosmoParser } from '../../lib/parser/Parser';

const description = `
  The parser is the second stage of the interpreter. It takes the tokens generated by the scanner
  and builds a syntax tree. This tree represents the structure of the code and is used for
  evaluating the code. The parser checks for syntax errors and ensures that the code follows
  the rules defined in the grammar. If the code is valid, the parser generates an abstract
  syntax tree (AST) that represents the code in a way that is easier for the interpreter to
  understand.
`;

const runParser = (code: string): string => {
  const scanner = new Scanner(code);
  const tokens = scanner.scanTokens();
  if (!tokens) {
    throw new Error("Scanning failed. No tokens were generated.");
  }
  const parser = new CosmoParser(tokens);
  const ast = parser.parse();

  return `Generated AST:\n\n${JSON.stringify(ast, null, 2)}`;
};

const formatParserError = (error: any): string => {
  return `${error}`;
}

export default function ParserPage() {
  return (
    <CodePlayground
      title="Parser"
      description={description}
      onRunCode={runParser}
      errorFormatter={formatParserError}
    />
  );
}