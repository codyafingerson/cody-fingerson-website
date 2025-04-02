import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
      : "text-slate-800 dark:text-white";

  // Commented out for future use
  // const activeClass = "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500";
  // const inactiveClass = "text-slate-800 dark:text-white";
  // const hoverClass = "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500";

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
            to="/skills"
            className={`${isActive(
              "/skills"
            )} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
          >
            Skills
          </Link>
          <Link
            to="/terminal"
            className={`${isActive(
              "/terminal"
            )} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
          >
            Terminal
          </Link>
          <Link
            to="/interpreter"
            className={`${isActive(
              "/interpreter"
            )} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500`}
          >
            Interpreter
          </Link>
        </div>
      </div>
    </nav>
  );
}