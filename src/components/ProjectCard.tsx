interface ProjectCardProps {
  title: string;
  description: string;
  sourceCodeLink: string;
  projectLink?: string;
}

export default function ProjectCard({ title, description, sourceCodeLink, projectLink }: ProjectCardProps) {
  return (
    <div className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="mt-auto flex gap-4">
        <a
          href={sourceCodeLink}
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
        {projectLink && (
          <a
            href={projectLink}
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Link
          </a>
        )}
      </div>
    </div>
  );
}