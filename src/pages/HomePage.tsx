import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const languages = ["TypeScript", "Java", "Python", "C#", "JavaScript", "SQL", "Bash", "C", "HTML", "CSS", "R"];

const frameworksAndLibs = ["React", "Next.js", "Spring Boot", "Node.js", "Express", "Vue", "WPF", "TailwindCSS"];

const dataAndInfrastructure = [
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "GitHub Actions",
    "GCP",
    "Vercel",
    "Git",
    "Addigy MDM",
    "Google Workspace",
];

const testingAndApis = ["Playwright", "REST APIs", "Integration testing", "Jest", "JUnit"];

const instrumentation = ["SCPI", "GPIB", "IVI VISA", "Calibration & test automation"];

const skillCategories = [
    { heading: "Languages", items: languages },
    { heading: "Frameworks & Libraries", items: frameworksAndLibs },
    { heading: "Data & Infrastructure", items: dataAndInfrastructure },
    { heading: "Testing & APIs", items: testingAndApis },
    { heading: "Instrumentation", items: instrumentation },
];

const badgeStyle =
    "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm";

export default function HomePage() {
    return (
        <div className="space-y-16 md:space-y-24 pb-16">
            {/* --- Hero Section --- */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center text-center space-y-6 pt-8 md:pt-12"
            >
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Cody Fingerson
                </h1>
                <p className="max-w-2xl text-lg dark:text-gray-300">
                    I'm a software engineer with a B.S. in Computer Science who builds internal tools, integrations, and
                    automation in TypeScript, Python, Java, and C#. Explore my projects, learn more about my journey
                    from healthcare to tech, and see what I've been building.
                </p>
                <Link
                    to="/projects"
                    className="px-6 py-3 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition transform hover:scale-105"
                >
                    View Projects
                </Link>
            </motion.section>

            {/* --- Tech Stack Section --- */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4"
            >
                <h2 id="technologies" className="text-3xl font-bold text-center mb-12 dark:text-white">
                    Technologies I Work With
                </h2>

                {skillCategories.map(({ heading, items }, index) => (
                    <div key={heading} className={index === skillCategories.length - 1 ? "" : "mb-10"}>
                        <h3 className="text-xl font-semibold text-center mb-5 dark:text-gray-300">{heading}</h3>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {items.map((tech) => (
                                <span key={tech} className={badgeStyle}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.section>
        </div>
    );
}
