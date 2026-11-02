import { motion } from "framer-motion";
import { FaCode, FaFileAlt, FaPenNib, FaRocket, FaTools } from "react-icons/fa";

const updates = [
    {
        title: "Modernizing the foundation",
        description:
            "I'm upgrading the site to a newer Node.js runtime and refreshing its underlying tooling and dependencies.",
        icon: FaCode,
    },
    {
        title: "Moving to Next.js",
        description:
            "I'm rebuilding the site with Next.js to improve search visibility, performance, and the overall browsing experience.",
        icon: FaRocket,
    },
    {
        title: "Refreshing my professional profile",
        description:
            "My resume, skills, experience, and project highlights are being rewritten to better reflect the work I do today.",
        icon: FaFileAlt,
    },
    {
        title: "Adding a writing section",
        description:
            "I’m exploring a space for occasional posts about software engineering, projects, and lessons learned. There won’t be a fixed publishing schedule—just thoughtful updates when I have something worthwhile to share.",
        icon: FaPenNib,
    },
];

export default function UpdatesPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl pb-16"
        >
            <section className="mb-12 text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <FaTools aria-hidden="true" className="text-2xl" />
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                    Work in progress
                </p>
                <h1 className="mb-5 text-4xl font-bold sm:text-5xl">A new website is on the way</h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    The current version of this website is about three years old and long overdue for an update so I'm
                    giving it a complete overhaul by modernizing the technology behind it and refreshing the content to
                    better represent my current experience, skills, and work.
                </p>
            </section>

            <section aria-labelledby="whats-changing" className="space-y-5">
                <h2 id="whats-changing" className="mb-6 text-2xl font-bold">
                    What’s changing
                </h2>
                {updates.map(({ title, description, icon: Icon }) => (
                    <article
                        key={title}
                        className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800"
                    >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <Icon aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                            <p className="leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
                        </div>
                    </article>
                ))}
            </section>

            <p className="mt-10 rounded-xl bg-gray-200 px-6 py-5 text-center leading-relaxed text-gray-700 dark:bg-slate-800 dark:text-gray-300">
                While the work is underway, some pages may be incomplete or change without notice. Thanks for your
                patience—please check back soon to see what’s new.
            </p>
        </motion.div>
    );
}
