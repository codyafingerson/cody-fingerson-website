'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
  { path: '/interpreter', label: 'Interpreter' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    getSession().then((sess) => setSession(sess));
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md dark:text-white dark:border-gray-700 dark:border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">
          Cody A. Fingerson
        </Link>
        {session && (
          <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400 ml-2">
            {session.user.email}
          </p>
        )}

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            {routes.map(({ path, label }) => {
              const isActive = pathname === path;
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className={
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1 dark:text-blue-400 dark:border-blue-400'
                        : 'hover:text-blue-500 transition dark:hover:text-blue-300'
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            {session && (
              <>
                <li key="/admin">
                  <Link
                    href="/admin"
                    className={
                      pathname === '/admin'
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1 dark:text-blue-400 dark:border-blue-400'
                        : 'hover:text-blue-500 transition dark:hover:text-blue-300'
                    }
                  >
                    Admin
                  </Link>
                </li>
                <li key="/signout">
                  <button
                    onClick={handleSignOut}
                    className="hover:text-blue-500 transition dark:hover:text-blue-300 cursor-pointer"
                  >
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-md text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-md dark:border-gray-700 dark:border-t`}
      >
        <nav>
          <ul className="flex flex-col items-center space-y-4 py-4">
            {routes.map(({ path, label }) => {
              const isActive = pathname === path;
              return (
                <li key={path} className="w-full">
                  <Link
                    href={path}
                    onClick={toggleMenu}
                    className={`block w-full text-center py-2 ${
                      isActive
                        ? 'text-blue-600 font-semibold dark:text-blue-400'
                        : 'hover:text-blue-500 transition dark:hover:text-blue-300'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            {session && (
              <>
                <li className="w-full">
                  <Link
                    href="/admin"
                    onClick={toggleMenu}
                    className={`block w-full text-center py-2 ${
                      pathname === '/admin'
                        ? 'text-blue-600 font-semibold dark:text-blue-400'
                        : 'hover:text-blue-500 transition dark:hover:text-blue-300'
                    }`}
                  >
                    Admin
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleSignOut();
                      toggleMenu();
                    }}
                    className="block w-full text-center py-2 hover:text-blue-500 transition dark:hover:text-blue-300 cursor-pointer"
                  >
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
