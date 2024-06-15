import { Link } from "react-router-dom"

export default function Navbar() {  
  return (
    <nav className="bg-white dark:bg-slate-800 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-slate-800 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500">
          Cody Fingerson
        </Link>
        <div className="space-x-4">
          <Link to="/projects" className="text-slate-800 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500">
            Projects
          </Link>
          <Link to="/resume" className="text-slate-800 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500">
            Resume
          </Link>
          <Link to="/about" className="text-slate-800 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}