import { useState } from "react";

export default function TerminalPage() {
  const [input, setInput] = useState<string>(""); // explicitly define input as string
  const [output, setOutput] = useState<string[]>([]); // explicitly define output as array of strings

  // Function to handle user input and process commands
  const handleCommand = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim() === "") return;

    let response: string; // explicitly define response as a string
    switch (input.trim().toLowerCase()) {
      case "whoami":
        response =
          "I'm Cody Fingerson, a software engineer passionate about coding!";
        break;
      case "projects":
        response = `Check out my projects: HRDC Homeless Warming Center Software, State Border Graph, Insight ERP.`;
        break;
      case "help":
        response = "Available commands: whoami, projects, clear";
        break;
      case "clear":
        setOutput([]); // clear the output
        setInput("");
        return;
      default:
        response = `Command not recognized: ${input}`;
    }

    setOutput([...output, `> ${input}`, response]); // update output with the new command and response
    setInput(""); // clear the input field
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white">
      <div className="w-full max-w-4xl mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-1">Terminal</h1>
        <p className="text-center mb-4 text-gray-400">
          Type <code>help</code> for a list of available commands.
        </p>
        <div className="bg-gray-900 p-4 rounded-md shadow-lg h-96 overflow-y-auto">
          {/* Output Section */}
          <div className="terminal-output space-y-2">
            {output.map((line, index) => (
              <p key={index} className="text-green-400">
                {line}
              </p>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleCommand} className="mt-4 flex items-center">
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
        </div>
      </div>
    </div>
  );
}
