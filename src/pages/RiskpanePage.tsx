import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaArrowLeft, FaEnvelope, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const stack = ["TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "Playwright"];

export default function RiskpanePage() {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = "Riskpane Architecture — Cody Fingerson";
        return () => {
            document.title = previousTitle;
        };
    }, []);

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-6xl pb-16"
        >
            <Link
                to="/projects"
                className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
                <FaArrowLeft aria-hidden="true" /> Back to projects
            </Link>

            <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-14 text-white shadow-2xl shadow-slate-950/20 sm:px-10 md:px-16 md:py-20">
                <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="relative max-w-4xl">
                    <p className="mb-5 font-mono text-sm uppercase tracking-[0.24em] text-cyan-300">
                        System architecture
                    </p>
                    <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">Riskpane</h1>
                    <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl">
                        A look at the architecture behind the software governance platform I built for vendor risk,
                        approvals, and auditable compliance records.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        {stack.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            <section className="py-16 md:py-24" aria-labelledby="architecture-heading">
                <div className="mb-8 max-w-3xl">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                        Technical overview
                    </p>
                    <h2 id="architecture-heading" className="mt-3 text-3xl font-bold md:text-4xl">
                        Riskpane system architecture
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        This diagram shows the platform’s client and edge layers, application services, data stores,
                        background jobs, observability, and external integrations. Select it to inspect the full-size
                        version.
                    </p>
                </div>

                <a
                    href="/riskpane-ad.svg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-xl shadow-slate-900/10 dark:border-slate-700"
                    aria-label="Open the full-size Riskpane system architecture diagram"
                >
                    <img
                        src="/riskpane-ad.svg"
                        alt="Riskpane system architecture diagram showing the client, edge, application, persistence, job, observability, and external integration layers"
                        className="h-auto w-full rounded-xl"
                    />
                    <span className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-600 transition group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
                        Open full-size diagram <FaExternalLinkAlt size={12} aria-hidden="true" />
                    </span>
                </a>
            </section>

            <section
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-10 md:p-14"
                aria-labelledby="code-access-heading"
            >
                <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                        <FaLock size={22} aria-hidden="true" />
                    </span>
                    <div>
                        <h2 id="code-access-heading" className="text-2xl font-bold">
                            Repository access is available by request.
                        </h2>
                        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                            I’m willing to grant repository access to employers for technical review, but I’m not ready
                            to open source Riskpane publicly.
                        </p>
                    </div>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-200"
                    >
                        Request access <FaEnvelope size={14} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </motion.article>
    );
}
