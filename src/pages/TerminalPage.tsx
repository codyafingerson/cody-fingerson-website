import { useState } from "react";
import TerminalInput from "../components/TerminalInput";
import TerminalOutput from "../components/TerminalOutput";
import { bubbleSortDemo } from "../utils/bubbleSort";
import { fibonacci } from "../utils/fibonacci"; // Assuming you already have the fibonacci utility

export default function TerminalPage() {
  const [output, setOutput] = useState<string[]>([]); // explicitly define output as array of strings

  // Maximum allowed number for Fibonacci
  const MAX_FIBONACCI = 50;

  // Function to handle user input and process commands
  const handleCommand = (input: string) => {
    let response; // explicitly define response as a string
    const inputParts = input.trim().toLowerCase().split(" "); // Split input by spaces
    const command = inputParts[0]; // Extract command (e.g., 'fibonacci')
    const argument = inputParts[1]; // Extract argument (e.g., '10' for 'fibonacci 10')

    switch (command) {
      case "whoami":
        response =
          "I'm Cody Fingerson, a software engineer passionate about coding!";
        break;
      case "projects":
        response = (
          <div>
            Check out my projects:
            <ul>
              <li>
                <a
                  href="https://github.com/codyafingerson/hrdc-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HRDC Homeless Warming Center Software
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/codyafingerson/StateBorderGraph"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  State Border Graph
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/codyafingerson/insight-erp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Insight ERP
                </a>
              </li>
            </ul>
          </div>
        );
        break;
      case "help":
        response =
          "Available commands: whoami, projects, bubble-sort, fibonacci <x>, clear";
        break;
      case "bubble-sort":
        // Call bubble sort demo and output the steps
        const bubbleSortSteps = bubbleSortDemo();
        setOutput((prevOutput) => [
          ...prevOutput,
          `> ${input}`,
          ...bubbleSortSteps,
        ]);
        return;
      case "fibonacci":
        // Check if user has provided an argument for fibonacci
        if (argument) {
          const num = parseInt(argument, 10); // Parse the number after 'fibonacci'

          if (isNaN(num)) {
            response = `Invalid number: ${argument}. Please enter a valid number after 'fibonacci'.`;
          } else if (num > MAX_FIBONACCI) {
            response = `Number too large! Please enter a number less than or equal to ${MAX_FIBONACCI}.`;
          } else if (num < 1) {
            response = `Please enter a number greater than 0.`;
          } else {
            const sequence = fibonacci(num); // Generate Fibonacci sequence
            response = `Fibonacci sequence (${num} numbers): ${sequence.join(
              ", "
            )}`;
          }
        } else {
          response =
            "Please provide a number after 'fibonacci'. For example: 'fibonacci 10'.";
        }
        break;
      case "clear":
        setOutput([]); // clear the output
        return;
      default:
        response = `Command not recognized: ${input}`;
    }

    setOutput((prevOutput) => {
      const newOutput = [...prevOutput, `> ${input}`];
      const typedResponse = String(response); // Typecast response to string
      return [...newOutput, typedResponse];
    }); // update output with the new command and response
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white">
      <div className="w-full max-w-4xl mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-4">Terminal</h1>
        <p className="text-center text-gray-400 mb-4">
          Type <code>help</code> to see available commands
        </p>
        <div className="bg-gray-900 p-4 rounded-md shadow-lg h-96 overflow-y-auto">
          {/* Output Section */}
          <TerminalOutput output={output} />

          {/* Input Section */}
          <TerminalInput handleCommand={handleCommand} />
        </div>
      </div>
    </div>
  );
}
