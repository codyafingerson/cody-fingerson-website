"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const defaultRoutes = [
  { path: '/interpreter', label: 'Documentation' },
  { path: '/interpreter/playground', label: 'Playground' },
  { path: '/interpreter/settings', label: 'Settings' },
];

export default function SubNavbar({ routes = defaultRoutes, className = '' }) {
  const pathname = usePathname();

  if (!routes || routes.length === 0) {
    return null;
  }

  const navClasses = `mx-auto max-w-7xl bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-1 ${className}`.trim();

  return (
    <nav className={navClasses} aria-label="Secondary navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <ul className="flex space-x-6">
          {routes.map(({ path, label }) => {
            const isActive = pathname === path || (path !== '/' && path !== '/admin' && path != '/interpreter' && pathname.startsWith(path + '/'));
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={
                    `transition duration-200 ease-in-out ${isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 dark:text-blue-400 dark:border-blue-400"
                      : "hover:text-blue-500 transition dark:hover:text-blue-300"
                    }`
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}