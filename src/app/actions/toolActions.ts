'use server';

import prisma from '@/lib/prisma';
import { Tool, ToolCategory } from '../../../generated/prisma';

/**
 * The data required to create a new tool.
 */
export interface CreateToolData {
  name: string;
  category: ToolCategory;
  proficiency?: number | null;
  url?: string | null;
  icon?: string | null;
}

/**
 * The data allowed when editing an existing tool.
 * All fields are optional—any omitted fields will retain their current values.
 */
export type EditToolData = Partial<CreateToolData>;

/**
 * Fetches all tools.
 */
export async function getAllTools(): Promise<
  | {
      id: string;
      name: string;
      category: ToolCategory;
      proficiency: number | null;
      url: string | null;
      icon: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  | { error: string }
> {
  try {
    const tools = await prisma.tool.findMany();

    return tools.map((tool: Tool) => ({
      id: tool.id,
      name: tool.name,
      category: tool.category,
      proficiency: tool.proficiency,
      url: tool.url,
      icon: tool.icon,
      createdAt: tool.createdAt,
      updatedAt: tool.updatedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    return { error: 'Database error occurred.' };
  }
}

/**
 * Creates a new tool.
 */
export async function createTool(
  data: CreateToolData
): Promise<Tool | { error: string }> {
  try {
    const { name, category, proficiency, url, icon } = data;

    // Basic validation
    if (!name || category === undefined || category === null) {
      return { error: 'Name and category are required.' };
    }

    const newTool = await prisma.tool.create({
      data: {
        name,
        category,
        proficiency,
        url,
        icon,
      },
    });

    return newTool;
  } catch (error) {
    console.error('Failed to create tool:', error);
    return { error: 'Database error occurred.' };
  }
}

/**
 * Updates an existing tool.
 */
export async function editTool(
  id: string,
  data: EditToolData
): Promise<Tool | { error: string }> {
  try {
    const existing = await prisma.tool.findUnique({ where: { id } });
    if (!existing) return { error: 'Tool not found.' };

    const updated = await prisma.tool.update({
      where: { id },
      data: {
        name: data.name ?? existing.name,
        category: data.category ?? existing.category,
        proficiency: data.proficiency ?? existing.proficiency,
        url: data.url ?? existing.url,
        icon: data.icon ?? existing.icon,
      },
    });

    return updated;
  } catch (error) {
    console.error('Failed to edit tool:', error);
    return { error: 'Database error occurred.' };
  }
}

/**
 * Deletes a tool by its ID.
 */
export async function deleteTool(
  id: string
): Promise<{ success: true } | { error: string }> {
  try {
    const existing = await prisma.tool.findUnique({ where: { id } });
    if (!existing) return { error: 'Tool not found.' };

    await prisma.tool.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete tool:', error);
    return { error: 'Database error occurred.' };
  }
}
