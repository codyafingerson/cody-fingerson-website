import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CatchAllPage() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
        >
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                404
            </h1>
            <p className="text-2xl text-black dark:text-white">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition text-white"
            >
                Go Back Home
            </Link>
        </motion.section>
    )
}