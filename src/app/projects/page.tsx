import ProjectCard from "@/components/ProjectCard"
import { getAllProjects } from "@/app/actions/projectActions"
import { Project } from "../../../generated/prisma"

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(projects) ? projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        )) : <div className="text-red-500">Error: {projects.error}</div>}
      </div>
    </section>
  )
}