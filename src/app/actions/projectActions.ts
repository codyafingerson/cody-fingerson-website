'use server';

import prisma from '@/lib/prisma';
import { Project } from '../../../generated/prisma';

/**
 * The data required to create a new project.
 */
export interface CreateProjectData {
  title: string;
  description: string;
  technologies: string[];
  sourceCode?: string | null;
  liveDemo?: string | null;
}

/**
 * The data allowed when editing an existing project.
 * All fields are optional—any omitted fields will retain their current values.
 */
export type EditProjectData = Partial<CreateProjectData>;

/**
 * Fetches all projects.
 */
export async function getAllProjects(): Promise<
  | {
      id: string;
      title: string;
      description: string;
      technologies: string[];
      sourceCode: string | null;
      liveDemo: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  | { error: string }
> {
  try {
    const projects = await prisma.project.findMany();

    return projects.map((project: Project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      sourceCode: project.sourceCode,
      liveDemo: project.liveDemo,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return { error: 'Database error occurred.' };
  }
}

/**
 * Creates a new project.
 */
export async function createProject(
  data: CreateProjectData
): Promise<Project | { error: string }> {
  try {
    const { title, description, technologies, sourceCode, liveDemo } = data;

    // Basic validation
    if (!title || !description || !technologies) {
      return { error: 'All fields are required.' };
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        technologies,
        sourceCode,
        liveDemo,
      },
    });

    return newProject;
  } catch (error) {
    console.error('Failed to create project:', error);
    return { error: 'Database error occurred.' };
  }
}

/**
 * Updates an existing project.
 */
export async function editProject(
  id: string,
  data: EditProjectData
): Promise<Project | { error: string }> {
  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return { error: 'Project not found.' };

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        technologies: data.technologies ?? existing.technologies,
        sourceCode: data.sourceCode ?? existing.sourceCode,
        liveDemo: data.liveDemo ?? existing.liveDemo,
      },
    });

    return updated;
  } catch (error) {
    console.error('Failed to edit project:', error);
    return { error: 'Database error occurred.' };
  }
}

/**
 * Deletes a project by its ID.
 */
export async function deleteProject(
  id: string
): Promise<{ success: true } | { error: string }> {
  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return { error: 'Project not found.' };

    await prisma.project.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { error: 'Database error occurred.' };
  }
}
