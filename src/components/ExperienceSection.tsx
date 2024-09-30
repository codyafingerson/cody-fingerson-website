import RoleSection from "./RoleSection";

type ExperienceSectionProps = {
  experience: {
    company: string;
    roles: Array<{
      title: string;
      date: string;
      description: string;
    }>;
  };
};

export default function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {experience.company}
      </h2>

      <div className="mt-4 space-y-4">
        {experience.roles.map((role, roleIndex) => (
          <RoleSection key={roleIndex} role={role} />
        ))}
      </div>
    </div>
  );
}
