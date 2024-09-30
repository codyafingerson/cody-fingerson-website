import { FC } from "react";

interface TerminalOutputProps {
  output: string[];
}

const TerminalOutput: FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div className="terminal-output space-y-2">
      {output.map((line, index) => (
        <p key={index} className="text-green-400">
          {line}
        </p>
      ))}
    </div>
  );
};

export default TerminalOutput;