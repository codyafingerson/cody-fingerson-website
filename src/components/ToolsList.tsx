import { ToolCategory } from "../../generated/prisma";
import { Tool } from '@/app/admin/tools/page';
import ProficiencyBar from "./ProficiencyBar";

const CATEGORY_GROUPS: Record<string, ToolCategory[]> = {
  Languages: [ToolCategory.LANGUAGE],
  'Frameworks & Libraries': [ToolCategory.FRAMEWORK, ToolCategory.LIBRARY],
  Databases: [ToolCategory.DATABASE],
  Tools: [ToolCategory.TOOL],
  Misc: [ToolCategory.MISC],
};

interface ToolsListProps {
  tools: Tool[];
}

export default function ToolsList({ tools }: ToolsListProps) {
  return (
    <div className="space-y-12">
      {Object.entries(CATEGORY_GROUPS).map(([heading, cats]) => {
        const group = tools.filter((t) => cats.includes(t.category));
        if (!group.length) return null;

        return (
          <div key={heading}>
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
              {heading}
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {group.map((tool) => (
                <div
                  key={tool.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-6 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    {tool.icon && (
                      <div className="bg-blue-50 dark:bg-blue-900 p-2 rounded-full mr-3">
                        <img
                          src={tool.icon}
                          alt={`${tool.name} icon`}
                          className="w-6 h-6"
                        />
                      </div>
                    )}
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h4>
                  </div>

                  {tool.proficiency != null && (
                    <div className="mb-4">
                      <ProficiencyBar value={tool.proficiency} />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        {tool.proficiency} / 10
                      </p>
                    </div>
                  )}

                  {tool.url && (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block px-4 py-2 text-sm font-medium bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                    >
                      Visit
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
