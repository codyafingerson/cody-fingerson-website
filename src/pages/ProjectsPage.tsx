import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import { Project } from "../types/types";

export default function ProjectsPage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          My Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project, index: number) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              sourceCodeLink={project.sourceCodeLink}
              projectLink={project.projectLink}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}