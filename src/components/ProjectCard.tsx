import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg transition transform hover:shadow-2xl hover:shadow-slate-900 dark:hover:shadow-gray-600"
        >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="mb-4 whitespace-pre-line">{project.description}</p>
            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                    <span key={tech} className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-4">
                {project.architecture && (
                    <Link
                        to={project.architecture}
                        className="hover:text-blue-400 transition flex items-center"
                        aria-label={`View the ${project.title} architecture`}
                    >
                        <FaArrowRight size={18} />
                        <span className="ml-2">Architecture</span>
                    </Link>
                )}
                {project.sourceCode && (
                    <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition flex items-center"
                    >
                        <FaGithub size={20} />
                        <span className="ml-2">Source Code</span>
                    </a>
                )}
                {project.liveDemo && (
                    <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition flex items-center"
                    >
                        <FaExternalLinkAlt size={20} />
                        <span className="ml-2">Live demo</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}
