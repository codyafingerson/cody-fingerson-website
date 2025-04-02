import { NavLink, Outlet } from 'react-router-dom';

export default function InterpreterLayout() {
  const activeSubNavLinkClass = "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white";
  const inactiveSubNavLinkClass = "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600";

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <aside className="w-full md:w-48 md:pr-4 mb-4 pb-4 border-b md:mb-0 md:pb-0 md:border-b-0 md:border-r border-gray-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Interpreter</h2>
        <nav className="flex flex-col space-y-1">
           <NavLink
            to="/interpreter"
            end // Important: prevents matching sub-routes
            className={({ isActive }) =>
              `px-3 py-1 rounded ${isActive ? activeSubNavLinkClass : inactiveSubNavLinkClass}`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/interpreter/lexer"
            className={({ isActive }) =>
              `px-3 py-1 rounded ${isActive ? activeSubNavLinkClass : inactiveSubNavLinkClass}`
            }
          >
            Lexer
          </NavLink>
          <NavLink
            to="/interpreter/parser"
             className={({ isActive }) =>
              `px-3 py-1 rounded ${isActive ? activeSubNavLinkClass : inactiveSubNavLinkClass}`
            }
          >
            Parser
          </NavLink>
          <NavLink
            to="/interpreter/runtime"
             className={({ isActive }) =>
              `px-3 py-1 rounded ${isActive ? activeSubNavLinkClass : inactiveSubNavLinkClass}`
            }
          >
            Runtime
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 pt-4 md:pt-0 md:pl-4">
        <Outlet />
      </div>
    </div>
  );
}