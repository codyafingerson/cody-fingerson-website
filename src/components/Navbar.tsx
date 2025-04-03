import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
      : "text-slate-800 dark:text-white";

  const linkHoverStyle = "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500";

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/skills", label: "Skills" },
    { path: "/terminal", label: "Terminal" },
    { path: "/interpreter", label: "Interpreter" },
  ];

  return (
    <nav className="bg-white dark:bg-slate-800 p-6 relative shadow-md">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <Link
          to="/"
          className="text-slate-800 dark:text-white text-xl font-semibold"
          onClick={closeMobileMenu}
        >
          Cody Fingerson
        </Link>

        {/* Hamburger Button - Only on Mobile! */}
        <button
          className="md:hidden p-2 rounded-md text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/> </svg>
          )}
        </button>

        <div className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              // Applying active state, hover style, and base transition
              className={`${isActive(link.path)} ${linkHoverStyle} transition duration-300`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Links - Shown only when isMobileMenuOpen is true */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} w-full absolute left-0 top-full bg-white dark:bg-slate-800 shadow-md z-20`}
        id="mobile-menu"
      >
        <div className="px-6 pt-2 pb-4 space-y-3 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${isActive(
                link.path
              )} ${linkHoverStyle} block py-2 rounded-md text-base font-medium transition duration-300`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}