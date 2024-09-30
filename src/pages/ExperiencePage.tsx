import Container from "../components/Container";
import experiences from "../data/experience";

export default function ExperiencePage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          My Professional Experience
        </h1>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-md bg-white dark:bg-gray-800"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {experience.company}
              </h2>

              <div className="mt-4 space-y-4">
                {experience.roles.map((role, roleIndex) => (
                  <div key={roleIndex}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {role.title}
                    </h3>
                    <p className="text-md text-gray-500 dark:text-gray-400">
                      {role.date}
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300 space-y-2">
                      {role.description
                        .trim()
                        .split("\n")
                        .map((line, lineIndex) => (
                          <li key={lineIndex} className="leading-relaxed">
                            {line.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
