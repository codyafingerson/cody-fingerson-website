type BulletPointsProps = {
  description: string;
};

export default function BulletPoints({ description }: BulletPointsProps) {
  const bulletPoints = description.trim().split("\n");

  return (
    <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300 space-y-2">
      {bulletPoints.map((line, index) => (
        <li key={index} className="leading-relaxed">
          {line.trim()}
        </li>
      ))}
    </ul>
  );
}
