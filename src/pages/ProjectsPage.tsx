import Container from "../components/Container";

const projects = [
  {
    title: "HRDC Homeless Warming Center Software",
    description:
      "This custom software solution, developed with a team for our capstone project, enhances the operations of the HRDC’s homeless warming center in Bozeman, Montana. It streamlines guest management for front desk staff, reducing the operational burden and learning curve to ensure more efficient handling of guests.",
    link: "https://github.com/codyafingerson/hrdc-app",
  },
  {
    title: "State Border Graph",
    description:
      "This Java program constructs an undirected graph to represent common borders between U.S. states. It reads data from a file containing state pairs that share borders and maps each state as a vertex. The program outputs a list of states, along with their bordering neighbors, providing a clear visualization of state connectivity.",
    link: "https://github.com/codyafingerson/StateBorderGraph",
  },
  {
    title: "Insight ERP",
    description:
      "Currently in active development, Insight ERP is a full-stack ERP system designed for small to medium-sized businesses. Built using Next.js, MySQL, and TypeScript, it offers a simple and user-friendly interface to manage business operations efficiently.",
    link: "https://github.com/yourgithub/project-three",
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          My Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <a
                href={project.link}
                className="mt-auto text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
