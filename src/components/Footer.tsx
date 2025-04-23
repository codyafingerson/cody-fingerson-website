'use client'

import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="dark:bg-gray-900 dark:text-white text-center py-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-2">
          <a href="https://github.com/codyafingerson" target='_blank' rel="noopener noreferrer" className="hover:text-blue-400">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/codyfingerson" target='_blank' rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div>&copy; {new Date().getFullYear()} {' '}
          <Link href="/signin">
            Cody A. Fingerson
          </Link>
          </div>
      </div>
    </footer>
  )
}