import Container from "../components/Container";

export default function SkillsPage() {
    return (
        <Container>
            <div className="py-12">
                <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
                    Skills & Technologies
                </h1>

                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Languages
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li className="text-lg text-gray-700 dark:text-gray-300">Java</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">JavaScript/Typescript</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Python</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Bash</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">HTML/CSS</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">C</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">C#</li>

                        </ul>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Frameworks & Libraries
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li className="text-lg text-gray-700 dark:text-gray-300">React</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Node.js</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Express</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Spring Boot</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Vue</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">NextJS</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">WPF</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">TailwindCSS</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Tools & Technologies
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li className="text-lg text-gray-700 dark:text-gray-300">Docker</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Git/GitHub/GitLab</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Addigy MDM Software</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Google Workspace</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">MongoDB</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">PostgreSQL</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">Redis</li>
                            <li className="text-lg text-gray-700 dark:text-gray-300">MySQL</li>

                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
}