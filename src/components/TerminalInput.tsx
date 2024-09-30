import { FC, FormEvent, useState } from "react";

interface TerminalInputProps {
  handleCommand: (input: string) => void;
}

const TerminalInput: FC<TerminalInputProps> = ({ handleCommand }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === "") return;
    handleCommand(input);
    setInput(""); // clear input after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center">
      <label htmlFor="terminal-input" className="text-green-400">
        $
      </label>
      <input
        id="terminal-input"
        className="ml-2 bg-transparent border-none focus:outline-none text-white w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
    </form>
  );
};

export default TerminalInput;
