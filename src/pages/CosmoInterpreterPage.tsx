import 'github-markdown-css';
import ReactMarkdown from "react-markdown";
import Container from "../components/Container";
import { cosmoEBNF } from "../interpreter/ebnf";

export default function CosmoInterpreterPage() {
  return (
    <Container>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Cosmo Interpreter
      </h1>
      <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Cosmo is the interpreter absolutely no one asked for, but I built it anyway! Crafted from scratch,
        Cosmo was my grand adventure into the mysterious realm of interpreter design and
        programming language implementation. Does it serve a practical purpose?
        Absolutely not. But creating Cosmo was a blast and taught me more about interpreters than
        I ever thought I'd know. Why I chose TypeScript is beyond me, but here we are, lmao!
      </p>
      <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Features
      </h2>
      <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300">
        <li>A custom syntax (see below)</li>
        <li>Basic arithmetic operations: addition, subtraction, multiplication, and division.</li>
        <li>Variable assignment and retrieval.</li>
        <li>A very simple standard library of <code>add(x, y)</code> and <code>sqrt(x)</code></li>
      </ul>
      <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Conclusion
      </h2>
      <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Cosmo may not revolutionize technology as we know it, but it sure made my coding journey more
        interesting. It's proof that with a bit of determination (and a disregard for sanity),
        you can create something uniquely your own—even if it serves absolutely no practical purpose.
      </p>
      <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
        EBNF Grammar
      </h2>
      <div className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        <div className="markdown-body p-5">
          <ReactMarkdown children={cosmoEBNF} />
        </div>
      </div>
    </Container>
  );
}
