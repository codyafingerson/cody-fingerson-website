import BulletPoints from "./BulletPoints";

type RoleSectionProps = {
  role: {
    title: string;
    date: string;
    description: string;
  };
};

export default function RoleSection({ role }: RoleSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {role.title}
      </h3>
      <p className="text-md text-gray-500 dark:text-gray-400">{role.date}</p>

      <BulletPoints description={role.description} />
    </div>
  );
}
