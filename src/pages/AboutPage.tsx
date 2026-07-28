import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import headshot from "../assets/headshot.jpg";

export default function AboutPage() {
    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-6 px-4 py-8"
            aria-labelledby="about-heading"
        >
            <header className="text-center">
                <h2 id="about-heading" className="text-4xl font-bold mb-6">
                    About Me
                </h2>
            </header>

            <section className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 space-y-6 md:space-y-0">
                <motion.img
                    src={headshot}
                    alt="Headshot of Cody A. Fingerson"
                    className="w-64 h-64 rounded-full object-cover border-4 border-blue-400 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                />

                <div className="space-y-5 text-justify">
                    <p>
                        Hi, I'm Cody. I earned my B.S. in Computer Science from Montana State University in May 2026,
                        and I currently work as an <strong>IT Specialist</strong> at <strong>AdvicePay</strong>. I enjoy
                        building reliable, maintainable software that solves real problems and makes technology easier
                        to use.
                    </p>

                    <p>
                        At AdvicePay, I build internal tools, integrations, and automation, while supporting our team in their daily operations.
                        My work includes a Python
                        incident management bot that allows employees to start an incident response directly from Slack,
                        a Genuity and Addigy integration that replaced manual spreadsheet tracking for device ownership
                        and compliance, and macOS fleet automation for more than 50 laptops. I also help translate
                        written security policies into enforced device configurations in support of AdvicePay's SOC 2
                        Type II audit.
                    </p>

                    <p>
                        Before moving into software engineering, I worked as a pharmacy technician and gained hands-on
                        experience with electromechanical systems. Those roles shaped the detail-oriented approach I
                        bring to both people and complex technical problems.
                    </p>

                    <p>
                        Since then, I have worked on a wide range of projects. At{" "}
                        <strong>Wavelength Electronics</strong>, I developed calibration and test software for QCL laser
                        systems. I also built{" "}
                        <strong>
                            <a
                                href="https://app.riskpane.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Riskpane
                            </a>
                        </strong>
                        , a software governance platform for managing vendor risk and compliance records, shipped
                        software for a local nonprofit, and created a small programming language called{" "}
                        <strong>Cosmo</strong> for fun.
                    </p>

                    <p>
                        I enjoy finding structure in complex problems. My technical experience includes TypeScript,
                        Python, Java, C#, React, Next.js, Spring Boot, Node.js, Express, and WPF. More than any particular
                        technology, I care about designing systems that are efficient, dependable, and easy to maintain.
                    </p>

                    <p>
                        Outside of work, I enjoy photography and spending time with my partner and our dog.
                    </p>

                    <p>
                        Interested in my work or want to collaborate?
                        <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                            Say hi →
                        </Link>
                    </p>
                </div>

            </section>
        </motion.main>
    );
}
