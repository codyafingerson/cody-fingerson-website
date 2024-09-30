import Container from "../components/Container";
import experiences from "../data/experience";
import ExperienceSection from "../components/ExperienceSection";

type Experience = {
  company: string;
  roles: Array<{
    title: string;
    date: string;
    description: string;
  }>;
};

export default function ExperiencePage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          My Professional Experience
        </h1>

        <div className="space-y-8">
          {experiences.map((experience: Experience, index: number) => (
            <ExperienceSection key={index} experience={experience} />
          ))}
        </div>
      </div>
    </Container>
  );
}
