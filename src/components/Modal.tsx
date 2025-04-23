"use client";

import { Fragment, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-opacity-50 transition-opacity backdrop-blur-lg
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className={`
          fixed inset-0 flex items-center justify-center px-4
          transition-transform z-50
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          >
            ✕
          </button>

          {/* Modal content */}
          {children}
        </div>
      </div>
    </Fragment>
  );
}
