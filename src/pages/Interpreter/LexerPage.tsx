import CodePlayground from '../../components/CodePlayground';
import { Scanner } from '../../lib/scanner/Scanner';

const description = `
  The lexer efficiently processes raw source code, character by character, to produce a stream of tokens representing elements
  like keywords, operators, identifiers, numbers, and strings. This tokenization is the
  crucial first step for any compiler or interpreter seeking to understand and execute code.
`;

const runLexer = (code: string): string => {
  const scanner = new Scanner(code);
  const tokens = scanner.scanTokens();
  return `Token count: ${tokens.length}\n\n${JSON.stringify(tokens, null, 2)}`;
};

const formatLexerError = (error: any): string => {
  return `Error: ${error.message}`;
}

export default function LexerPage() {
  return (
    <CodePlayground
      title="Lexer"
      description={description}
      onRunCode={runLexer}
      errorFormatter={formatLexerError}
    />
  );
}