import { Outlet } from "react-router-dom";
import SubNavbar from "./SubNavbar";
import { motion } from "framer-motion";

export default function InterpreterLayout() {
    return (
        <>
            <SubNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto p-8"
                >
                    <Outlet />
                </motion.div>
            </div>
        </>
    )
}