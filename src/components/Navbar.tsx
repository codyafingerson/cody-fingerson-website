import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const routes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
    { path: '/interpreter', label: 'Interpreter' }
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement | null>(null)
    const location = useLocation()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [mobileMenuRef])

    if (location.pathname === '/portfolio') {
        return ''
    }

    return (
        <header className="bg-white dark:bg-slate-900 shadow-md dark:text-white dark:border-gray-700 dark:border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-semibold">
                    Cody A. Fingerson
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        {routes.map(({ path, label }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 border-b-2 border-blue-600 pb-1 dark:text-blue-400 dark:border-blue-400'
                                            : 'hover:text-blue-500 transition dark:hover:text-blue-300'
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className=" p-2 rounded-md text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-md dark:border-gray-700 dark:border-t`}
            >
                <nav>
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        {routes.map(({ path, label }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    onClick={toggleMenu} // Close menu on link click
                                    className={({ isActive }) =>
                                        `block w-full text-center py-2 ${
                                            isActive
                                                ? 'text-blue-600 font-semibold dark:text-blue-400'
                                                : 'hover:text-blue-500 transition dark:hover:text-blue-300'
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
