import CodePlayground from '../../components/CodePlayground';
import { Scanner } from '../../lib/scanner/Scanner';
import { Parser as CosmoParser } from '../../lib/parser/Parser';
import { Interpreter } from '../../lib/interpreter/Interpreter';

const description = `
  The runtime is the heart of the interpreter, where the magic happens. It takes the parsed
  statements and executes them. The runtime is responsible for managing the program's state,
  handling variable assignments, and performing operations.
`;

const runRuntime = (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let aggregatedOutput = "";
    try {
      const handleOutput = (message: string) => {
        aggregatedOutput += message + "\n";
      };

      const scanner = new Scanner(code);
      const tokens = scanner.scanTokens();

      const parser = new CosmoParser(tokens);
      const statements = parser.parse();

      const interpreter = new Interpreter(handleOutput);
      interpreter.interpret(statements);

      resolve(aggregatedOutput.trimEnd());
    } catch (error: any) {
      reject(error);
    }
  });
};

const formatRuntimeError = (error: any): string => {
    return `${error}`;
}


export default function RuntimePage() {
  return (
    <CodePlayground
      title="Runtime"
      description={description}
      onRunCode={runRuntime}
      errorFormatter={formatRuntimeError}
    />
  );
}