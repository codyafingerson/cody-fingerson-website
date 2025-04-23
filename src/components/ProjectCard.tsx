import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../../generated/prisma';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const descriptionWithBreaks = project.description.replace(/\n/g, '<br />');

    return (
        <div className="dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg transition transform hover:shadow-2xl hover:shadow-slate-900 dark:hover:shadow-gray-600"
        >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: descriptionWithBreaks }} />
            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                    <span
                        key={index}
                        className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex space-x-4">
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
        </div>
    );
}