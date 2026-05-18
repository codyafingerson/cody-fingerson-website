import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import headshot from '../assets/headshot.jpg' // adjust to match your path

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
                        Hi, I'm Cody! I'm a recent Computer Science graduate from Montana State University, a backend
                        enthusiast, and currently an IT Specialist at <strong>AdvicePay</strong>. I love building clean,
                        reliable software that solves real-world problems and elevates the way people interact with
                        technology.
                    </p>
                    <p>
                        Before diving deep into software engineering, I worked in healthcare as a pharmacy technician and 
                        gained hands-on experience in electromechanical work. Those roles heavily shaped my detail-oriented 
                        approach to both people and complex systems. Since then, my tech journey has spanned a wide variety 
                        of projects: I've developed internal QCL lab calibration tools for <strong>Wavelength Electronics</strong>, 
                        built software for a local non-profit, and even designed a quirky toy programming language called <strong>Cosmo</strong> 
                        just for the fun (and chaos) of it.
                    </p>
                    <p>
                        I thrive on finding structure in complexity. While my technical toolkit includes Node.js, Spring Boot, React, Vue, Express, and WPF, 
                        what truly drives me isn't the tech stack — it's the challenge of designing systems that are both 
                        highly efficient and incredibly maintainable.
                    </p>
                    <p>
                        When I'm away from the keyboard, you'll usually find me snapping photos, or hanging out with my partner and our dog.
                    </p>
                    <p>
                        Curious about my work or interested in collaborating?
                        <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                            Say hi →
                        </Link>
                    </p>
                </div>
            </section>
        </motion.main>
    )
}