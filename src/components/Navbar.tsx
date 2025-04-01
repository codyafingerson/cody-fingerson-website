import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get the current location

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
      : "text-slate-800 dark:text-white";

  return (
    <nav className="bg-white dark:bg-slate-800 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-slate-800 dark:text-white">
          Cody Fingerson
        </Link>
        <div className="space-x-4 flex items-center">
          <Link
            to="/projects"
            className={`${isActive(
              "/projects"
            )} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
          >
            Projects
          </Link>
          <Link
            to="/experience"
            className={`${isActive(
              "/experience"
            )} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
          >
            Experience
          </Link>
          <Link
            to="/terminal"
            className={`${isActive(
              "/terminal"
            )} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
          >
            Terminal
          </Link>
          <div className="relative group inline-block">
            <Link
              to="/interpreter"
              className={`${isActive(
                "/interpreter"
              )} inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
            >
              Interpreter
            </Link>
            <div className="absolute left-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link
                to="/interpreter/lexer"
                className="block px-4 py-2 text-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Lexer
              </Link>
              <Link
                to="/interpreter/parser"
                className="block px-4 py-2 text-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Parser
              </Link>
              <Link
                to="/interpreter/execution"
                className="block px-4 py-2 text-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Execution
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}