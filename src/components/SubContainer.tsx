import { ReactNode } from "react";

interface SubContainerProps {
    children?: ReactNode;
}

export default function SubContainer({ children }: SubContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </div>
  )
}