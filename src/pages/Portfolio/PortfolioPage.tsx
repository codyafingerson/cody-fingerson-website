import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import PortfolioProjectItem, { ProjectSection, ProjectImage } from '../../components/PortfolioProjectItem'
import { FaArrowUp, FaShare, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa'

type ProjectCategory = 'All' | 'UX Design' | 'Engineering' | 'Analytics'

export default function PortfolioPage() {
    const [showBackToTop, setShowBackToTop] = useState(false)
    const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({
        1: false,
        2: false,
        3: false
    })
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All')
    const [copiedProjectId, setCopiedProjectId] = useState<number | null>(null)
    const [shareError, setShareError] = useState<string | null>(null)
    const mainRef = useRef<HTMLElement>(null)
    const projectContentRefs = useRef<Record<number, HTMLDivElement | null>>({})

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle URL hash navigation on mount and when hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash
            if (hash) {
                const projectIdMatch = hash.match(/#project-(\d+)/)
                if (projectIdMatch) {
                    const projectId = parseInt(projectIdMatch[1], 10)
                    const projectElement = document.getElementById(`project-${projectId}`)
                    if (projectElement) {
                        // Expand the project if it's collapsed
                        setExpandedProjects(prev => {
                            if (!prev[projectId]) {
                                // Scroll after expansion
                                setTimeout(() => {
                                    projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    // Focus the content area for accessibility
                                    const contentElement = projectContentRefs.current[projectId]
                                    if (contentElement) {
                                        contentElement.focus()
                                    }
                                }, 100)
                                return { ...prev, [projectId]: true }
                            } else {
                                // Already expanded, just scroll
                                setTimeout(() => {
                                    projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    const contentElement = projectContentRefs.current[projectId]
                                    if (contentElement) {
                                        contentElement.focus()
                                    }
                                }, 50)
                                return prev
                            }
                        })
                    }
                }
            }
        }

        // Check hash on mount
        handleHashChange()

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run on mount - hash changes are handled by hashchange event

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const toggleProject = (projectId: number) => {
        const willExpand = !expandedProjects[projectId]
        setExpandedProjects(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }))

        // Scroll management: if expanding, scroll to the project container so user sees the full project from the top
        if (willExpand) {
            setTimeout(() => {
                const projectElement = document.getElementById(`project-${projectId}`)
                if (projectElement) {
                    projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 100)
        }
    }

    const shareProject = async (projectId: number, title: string) => {
        const url = `${window.location.origin}${window.location.pathname}#project-${projectId}`
        setShareError(null)

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${title} - Cody Fingerson Portfolio`,
                    url: url
                })
            } catch (err: any) {
                // User cancelled (error name is 'AbortError') or other error occurred
                if (err?.name !== 'AbortError') {
                    // Only copy if it wasn't a user cancellation
                    copyToClipboard(url, projectId)
                }
            }
        } else {
            copyToClipboard(url, projectId)
        }
    }

    const copyToClipboard = (text: string, projectId: number) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    setCopiedProjectId(projectId)
                    setShareError(null)
                    setTimeout(() => setCopiedProjectId(null), 2000)
                })
                .catch(err => {
                    console.error('Failed to copy to clipboard:', err)
                    // Fallback: try using the older execCommand method
                    const textArea = document.createElement('textarea')
                    textArea.value = text
                    textArea.style.position = 'fixed'
                    textArea.style.left = '-999999px'
                    document.body.appendChild(textArea)
                    textArea.focus()
                    textArea.select()
                    try {
                        document.execCommand('copy')
                        setCopiedProjectId(projectId)
                        setShareError(null)
                        setTimeout(() => setCopiedProjectId(null), 2000)
                    } catch (e) {
                        console.error('Fallback copy failed:', e)
                        setShareError('Unable to copy link. Please try again.')
                        setTimeout(() => setShareError(null), 3000)
                    }
                    document.body.removeChild(textArea)
                })
        } else {
            // Fallback for browsers without clipboard API
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            try {
                document.execCommand('copy')
                setCopiedProjectId(projectId)
                setShareError(null)
                setTimeout(() => setCopiedProjectId(null), 2000)
            } catch (e) {
                console.error('Copy failed:', e)
                setShareError('Unable to copy link. Please try again.')
                setTimeout(() => setShareError(null), 3000)
            }
            document.body.removeChild(textArea)
        }
    }

    const projects = [
        {
            id: 1,
            title: 'Focused Note App',
            subtitle: 'CSCI 443 UX Design Course Project • Mobile/Web Prototype',
            category: 'UX Design' as ProjectCategory
        },
        {
            id: 2,
            title: 'QCL Calibration & Diagnostics Tool',
            subtitle: 'Engineering Tooling • C# + WPF',
            category: 'Engineering' as ProjectCategory
        },
        {
            id: 3,
            title: 'Internal Ticket Analytics & Reporting Tool',
            subtitle: 'Python + PyQt • Desktop',
            category: 'Analytics' as ProjectCategory
        }
    ]

    const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

    return (
        <>
            {/* Skip to main content link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
            >
                Skip to main content
            </a>

            <motion.main
                ref={mainRef}
                id="main-content"
                role="main"
                aria-label="Portfolio content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto space-y-16 print:space-y-8"
            >
                {/* Table of Contents Navigation */}
                <nav
                    aria-label="Portfolio navigation"
                    className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 py-3 print:hidden"
                >
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                        <a
                            href="#about"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                            onClick={e => {
                                e.preventDefault()
                                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            About
                        </a>
                        <a
                            href="#skills"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                            onClick={e => {
                                e.preventDefault()
                                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Skills
                        </a>
                        <a
                            href="#projects"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                            onClick={e => {
                                e.preventDefault()
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Projects
                        </a>
                    </div>
                </nav>

                {/* Intro */}
                <section id="about" className="space-y-4">
                    <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        CSCI 443 - UI &amp; UX Portfolio
                    </p>

                    <h1 className="text-4xl font-bold dark:text-white">Cody Fingerson</h1>

                    <p className="text-lg text-gray-800 dark:text-gray-300">
                        I'm a senior Computer Science student at Montana State University and a backend-focused engineer
                        who cares a lot about clarity, reliability, and thoughtful user experience. I blend strong
                        backend architecture with interface design and UX research to build tools that feel fast,
                        intuitive, and grounded in real user needs.
                    </p>
                </section>

                {/* Skills */}
                <section id="skills" className="space-y-6 print:break-inside-avoid">
                    <h2 className="text-3xl font-bold dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-6">
                        Skills & Experience
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Core Skills */}
                        <div>
                            <h3 className="font-semibold mb-2 dark:text-gray-200">Core Skills</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                <li>UX research, interviews, affinity mapping, personas</li>
                                <li>Information architecture and end-to-end prototyping (low to hi-fi)</li>
                                <li>React and TypeScript, component-driven UI development</li>
                                <li>Backend engineering with Java, Spring Boot, Node, and Express</li>
                                <li>REST API design, systems thinking, and maintainable architecture</li>
                                <li>Data analysis and tooling using Python, NumPy, Pandas, and Matplotlib</li>
                            </ul>
                        </div>

                        {/* Tools & Technologies */}
                        <div>
                            <h3 className="font-semibold mb-2 dark:text-gray-200">Tools & Technologies</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                <li>Figma, Frame0, and rapid UI prototyping workflows</li>
                                <li>Docker, Git, GitHub Actions, VS Code, JetBrains IDEs</li>
                                <li>PostgreSQL, MongoDB, Redis, MySQL</li>
                                <li>WPF and C# for desktop tools and internal engineering applications</li>
                                <li>R, RStudio, and ggplot2 for stats-oriented coursework</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="space-y-16 print:break-inside-avoid">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2">
                            Selected Projects
                        </h2>

                        {/* Filter Buttons */}
                        <div
                            className="flex flex-wrap gap-2 mb-8 print:hidden"
                            role="group"
                            aria-label="Filter projects by category"
                        >
                            {(['All', 'UX Design', 'Engineering', 'Analytics'] as ProjectCategory[]).map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                                        activeFilter === category
                                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                    aria-pressed={activeFilter === category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredProjects.length === 0 && (
                            <div className="text-center py-12 px-4">
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                                    No projects found in this category.
                                </p>
                                <button
                                    onClick={() => setActiveFilter('All')}
                                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                >
                                    Show all projects
                                </button>
                            </div>
                        )}

                        {/* Project 1 – Focused Note App (UX Course Project) */}
                        {filteredProjects.some(p => p.id === 1) && (
                            <div id="project-1" className="print:break-inside-avoid">
                                <div className="flex items-center justify-between mb-2 mt-6 print:hidden flex-wrap gap-2">
                                    <button
                                        onClick={() => toggleProject(1)}
                                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                        aria-expanded={expandedProjects[1]}
                                        aria-controls="project-1-content"
                                    >
                                        {expandedProjects[1] ? (
                                            <>
                                                <FaChevronUp className="text-xs" />
                                                <span>Show less</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaChevronDown className="text-xs" />
                                                <span>Read more</span>
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center gap-2">
                                        {shareError && copiedProjectId === 1 && (
                                            <span className="text-sm text-red-600 dark:text-red-400" role="alert">
                                                {shareError}
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => shareProject(1, 'Focused Note App')}
                                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                            aria-label="Share Focused Note App project"
                                        >
                                            {copiedProjectId === 1 ? (
                                                <>
                                                    <FaCheck className="text-green-600" />
                                                    <span className="text-green-600">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaShare />
                                                    <span>Share</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <PortfolioProjectItem
                                    title="Focused Note App"
                                    subtitle="CSCI 443 UX Design Course Project • Mobile/Web Prototype"
                                >
                                    {/* Problem - Always visible */}
                                    <ProjectSection title="The problem">
                                        <p className="text-gray-800 dark:text-gray-300">
                                            Students and early-career professionals increasingly rely on digital tools
                                            to capture lectures, tasks, and ideas. However, tools like Notion, OneNote,
                                            and Evernote often feel cluttered, slow, and overloaded with features that
                                            don&apos;t match real needs. Users spend too much time managing notebooks,
                                            pages, tags, and workspaces instead of actually learning or doing focused
                                            work. Common pain points include scattered notes across multiple apps,
                                            difficulty recalling important information, and interfaces that create
                                            cognitive overload instead of clarity.
                                        </p>
                                    </ProjectSection>

                                    {/* Rest of content - Collapsible */}
                                    <div
                                        id="project-1-content"
                                        ref={el => {
                                            projectContentRefs.current[1] = el
                                        }}
                                        tabIndex={-1}
                                        className={expandedProjects[1] ? '' : 'hidden print:block'}
                                    >
                                        {/* Tools used */}
                                        <ProjectSection title="Tools used">
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>Frame0 for low-fidelity wireframes</li>
                                                <li>Figma for high-fidelity prototyping and interaction flows</li>
                                                <li>Google Docs / Sheets for interview notes and synthesis</li>
                                                <li>Python (for basic analysis of usability testing metrics)</li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Discovery & research */}
                                        <ProjectSection title="Discovery &amp; research">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                I followed the full UX Design Thinking process from empathize to test.
                                                The goal was to deeply understand how people actually take notes, where
                                                existing tools fail them, and what &quot;fast, simple, and
                                                reliable&quot; would look like in practice.
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        User interviews (5 participants)
                                                    </span>{' '}
                                                    aged 19–30, a mix of undergraduate students, a graduate student, and
                                                    early-career professionals who regularly use digital note-taking
                                                    tools. I focused on frequency of note taking, tools used,
                                                    organization habits, and frustrations with current apps.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Empathy maps
                                                    </span>{' '}
                                                    created for each participant to capture what they say, think, feel,
                                                    and do around note-taking, helping to visualize emotional and
                                                    behavioral patterns.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Persona generation
                                                    </span>{' '}
                                                    by synthesizing interview findings into a primary persona,
                                                    &quot;Sarah Kim,&quot; a 22-year-old student who wants a simple,
                                                    fast, and dependable note manager that doesn&apos;t get in her way.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Business Model Canvas
                                                    </span>{' '}
                                                    focusing on value through clarity, speed, and effortless recall
                                                    rather than &quot;feature checklists.&quot; The target audience is
                                                    students and early-career professionals who feel overwhelmed by
                                                    current tools.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Ideation & mind mapping */}
                                        <ProjectSection title="Ideation &amp; concepting">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                Using the research insights and persona, I ran a structured ideation
                                                phase to turn user needs into concrete product directions.
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    Created a{' '}
                                                    <span className="font-semibold dark:text-gray-200">mind map</span>{' '}
                                                    centered on the core problem, branching into four main themes:
                                                    <span className="font-semibold dark:text-gray-200"> speed</span>,
                                                    <span className="font-semibold dark:text-gray-200">
                                                        {' '}
                                                        organization
                                                    </span>
                                                    ,<span className="font-semibold dark:text-gray-200"> recall</span>,
                                                    and
                                                    <span className="font-semibold dark:text-gray-200">
                                                        {' '}
                                                        simplicity
                                                    </span>
                                                    .
                                                </li>
                                                <li>
                                                    Explored ideas such as offline mode, quick capture shortcuts, smart
                                                    folders grouped by course, linked notes for remembering concepts,
                                                    and a minimal interface that avoids visual noise.
                                                </li>
                                                <li>
                                                    Clustered similar ideas and prioritized those that balanced
                                                    desirability, feasibility, and usability, resulting in three main
                                                    concepts:{' '}
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Smart Note Capture
                                                    </span>
                                                    ,{' '}
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Lightning Search
                                                    </span>
                                                    , and a{' '}
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Three-Pane Interface
                                                    </span>
                                                    .
                                                </li>
                                            </ul>

                                            {/* Mind map image */}
                                            <ProjectImage
                                                src="/csci443/mind_map.png"
                                                alt="Mind map exploring concepts for a streamlined note taking app"
                                                caption="Mind map exploring core themes of speed, organization, recall, and simplicity for the focused note-taking app"
                                            />
                                        </ProjectSection>

                                        {/* Prototyping */}
                                        <ProjectSection title="Prototyping">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                I moved from rough structure to detailed interactions through
                                                low-fidelity and high-fidelity prototypes.
                                            </p>

                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300 mb-4">
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Low-fidelity wireframes (Frame0)
                                                    </span>{' '}
                                                    for the main notes view and the new note view. These explored the
                                                    three-pane layout that separates navigation (folders/tags), note
                                                    list, and editing/reading area to reduce cognitive load.
                                                </li>
                                                <li>
                                                    Applied early UX laws directly in the sketches:
                                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                                        <li>
                                                            <span className="font-semibold dark:text-gray-200">
                                                                Fitts&apos;s Law
                                                            </span>{' '}
                                                            to size and place primary actions like &quot;New Note&quot;
                                                            and &quot;Save&quot; near the editing area.
                                                        </li>
                                                        <li>
                                                            <span className="font-semibold dark:text-gray-200">
                                                                Hick&apos;s Law
                                                            </span>{' '}
                                                            to limit visible options on each screen and keep decisions
                                                            quick.
                                                        </li>
                                                        <li>
                                                            <span className="font-semibold dark:text-gray-200">
                                                                Jacob&apos;s Law
                                                            </span>{' '}
                                                            by using patterns users expect (search bar at the top, left
                                                            navigation).
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            {/* Low-fi wireframe */}
                                            <ProjectImage
                                                src="/csci443/wireframe_newnote.png"
                                                alt="Low fidelity wireframe of the new note view"
                                                caption="Low-fidelity wireframe exploring the three-pane layout for creating and editing notes"
                                                className="mb-4"
                                            />

                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                I then built a{' '}
                                                <span className="font-semibold dark:text-gray-200">
                                                    high-fidelity prototype in Figma
                                                </span>{' '}
                                                that added color, typography, spacing, and realistic content:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                                                <li>
                                                    Defined a simple style guide for colors, typography, buttons, and
                                                    layout spacing to keep the UI consistent.
                                                </li>
                                                <li>
                                                    Used Auto Layout and Component Sets for consistent buttons, inputs,
                                                    and icons across screens.
                                                </li>
                                                <li>
                                                    Connected screens into interactive flows for opening notes, creating
                                                    notes, editing, and saving.
                                                </li>
                                            </ul>

                                            {/* Hi-fi prototype */}
                                            <ProjectImage
                                                src="/csci443/hifi_proto.png"
                                                alt="High fidelity prototype of the focused note app"
                                                caption="High-fidelity prototype showing the final design with color, typography, and realistic content"
                                            />
                                        </ProjectSection>

                                        {/* User testing */}
                                        <ProjectSection title="User testing">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                After the high-fidelity prototype was built, I ran a small usability
                                                study with 5 participants matching the original target demographic. Each
                                                participant completed core tasks such as:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>Creating and saving a new note for a specific class</li>
                                                <li>Finding a previously entered note using search</li>
                                                <li>Organizing notes into folders and applying tags</li>
                                            </ul>
                                            <p className="text-gray-800 dark:text-gray-300 mt-2">
                                                I recorded task completion times, error counts, and subjective
                                                satisfaction ratings, then used Python to compute summary statistics
                                                (means, standard deviations) and visualize the results. Feedback led to
                                                adjustments in labeling, spacing, and button prominence to make primary
                                                actions easier to notice and use.
                                            </p>
                                        </ProjectSection>

                                        {/* Heuristics & UX laws */}
                                        <ProjectSection title="Usability heuristics &amp; UX laws applied">
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Visibility of system status:
                                                    </span>{' '}
                                                    live word/character counters and timestamps like &quot;Edited 2
                                                    hours ago&quot; to show activity and state.
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Match between system and the real world:
                                                    </span>{' '}
                                                    clear, familiar terms such as &quot;New Note,&quot;
                                                    &quot;Folders,&quot; and &quot;Tags&quot; with common icons.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        User control and freedom:
                                                    </span>{' '}
                                                    explicit Cancel and Back options in editing views so users never
                                                    feel locked in.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Consistency and standards:
                                                    </span>{' '}
                                                    consistent layout, typography, and iconography across all screens,
                                                    following the Principle of Least Astonishment.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Error prevention:
                                                    </span>{' '}
                                                    &quot;Save Note&quot; is disabled until both a title and body are
                                                    present, reducing incomplete or accidental saves.
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Recognition rather than recall:
                                                    </span>{' '}
                                                    key navigation (folders, tags, search) is always visible, minimizing
                                                    memory load.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Flexibility and efficiency of use:
                                                    </span>{' '}
                                                    supports both beginners (visible controls) and advanced users
                                                    (keyboard shortcuts such as Cmd+S).
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Aesthetic and minimalist design:
                                                    </span>{' '}
                                                    minimal surfaces focused on the text and the main note pane, with
                                                    unnecessary decoration removed.
                                                </li>
                                                <li>
                                                    Explicit use of{' '}
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Fitts&apos;s Law, Hick&apos;s Law, and Jacob&apos;s Law
                                                    </span>{' '}
                                                    to size primary actions correctly, limit visible choices, and keep
                                                    patterns familiar.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Outcome */}
                                        <ProjectSection title="Outcome">
                                            <p className="text-gray-800 dark:text-gray-300">
                                                The final design is a lightweight note manager focused on a single job:
                                                capture, organize, and retrieve notes quickly. The three-pane layout
                                                reduces cognitive load, the global search and tagging system speed up
                                                recall, and the minimal interface keeps users focused on content rather
                                                than configuration. The project demonstrates a complete UX process from
                                                research through testing, tying each design decision back to real user
                                                needs and established UX principles.
                                            </p>
                                        </ProjectSection>
                                    </div>
                                </PortfolioProjectItem>
                            </div>
                        )}

                        {/* Project 2 – QCL Calibration & Diagnostics Tool */}
                        {filteredProjects.some(p => p.id === 2) && (
                            <div id="project-2" className="print:break-inside-avoid">
                                <div className="flex items-center justify-between mb-2 mt-6 print:hidden flex-wrap gap-2">
                                    <button
                                        onClick={() => toggleProject(2)}
                                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                        aria-expanded={expandedProjects[2]}
                                        aria-controls="project-2-content"
                                    >
                                        {expandedProjects[2] ? (
                                            <>
                                                <FaChevronUp className="text-xs" />
                                                <span>Show less</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaChevronDown className="text-xs" />
                                                <span>Read more</span>
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center gap-2">
                                        {shareError && copiedProjectId === 2 && (
                                            <span className="text-sm text-red-600 dark:text-red-400" role="alert">
                                                {shareError}
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => shareProject(2, 'QCL Calibration & Diagnostics Tool')}
                                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                            aria-label="Share QCL Calibration & Diagnostics Tool project"
                                        >
                                            {copiedProjectId === 2 ? (
                                                <>
                                                    <FaCheck className="text-green-600" />
                                                    <span className="text-green-600">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaShare />
                                                    <span>Share</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <PortfolioProjectItem
                                    title="QCL Calibration &amp; Diagnostics Tool"
                                    subtitle="Engineering Tooling • C# + WPF"
                                >
                                    {/* Problem - Always visible */}
                                    <ProjectSection title="The problem">
                                        <p className="text-gray-800 dark:text-gray-300">
                                            Calibration technicians working with quantum cascade laser (QCL) systems
                                            needed a way to perform precise, repeatable calibrations, visualize
                                            instrument behavior, and archive historical results. The existing process
                                            relied on manual interaction with lab instruments and excel spreadsheets,
                                            which made it hard to maintain consistency, increased the risk of
                                            transcription errors, and limited the ability to quickly compare calibration
                                            runs over time.
                                        </p>
                                    </ProjectSection>

                                    {/* Rest of content - Collapsible */}
                                    <div
                                        id="project-2-content"
                                        ref={el => {
                                            projectContentRefs.current[2] = el
                                        }}
                                        tabIndex={-1}
                                        className={expandedProjects[2] ? '' : 'hidden print:block'}
                                    >
                                        {/* Tools used */}
                                        <ProjectSection title="Tools used">
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>C# with WPF (MVVM pattern) for the desktop application</li>
                                                <li>SCPI command interfaces (IEEE-488.2) for device control</li>
                                                <li>IVI/VISA and GPIB for instrument communication</li>
                                                <li>
                                                    Multiple linear regression for calibration coefficient computation
                                                </li>
                                                <li>CSV and image export for reports and offline analysis</li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Discovery & design process */}
                                        <ProjectSection title="Discovery &amp; design process">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                Because this was an internal engineering tool, discovery focused on
                                                understanding technician workflow, calibration constraints, and how
                                                existing lab equipment was already used.
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    Conducted informal interviews and observation sessions with
                                                    calibration technicians and senior engineers to map out the current
                                                    calibration steps, pain points, and failure modes.
                                                </li>
                                                <li>
                                                    Sketched early layouts of a multi-panel interface that could show
                                                    raw waveforms, fitted curves, residuals, and key calibration
                                                    parameters simultaneously.
                                                </li>
                                                <li>
                                                    Collaborated with domain experts to define which metrics needed to
                                                    be visible at all times (for example, power, current, temperature,
                                                    and stability indicators) versus those that could be tucked into
                                                    detail views.
                                                </li>
                                                <li>
                                                    Iterated on wireframes before implementation to ensure the UI
                                                    matched the order of tasks technicians naturally perform during
                                                    calibration.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Implementation notes (without proprietary detail) */}
                                        <ProjectSection title="Implementation overview">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                At a high level, the tool automates data collection and applies a
                                                statistically grounded calibration workflow while keeping the user
                                                experience focused on clarity and trust.
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    Uses standard{' '}
                                                    <span className="font-semibold dark:text-gray-200">
                                                        SCPI commands
                                                    </span>{' '}
                                                    over GPIB/IVI-VISA to communicate with laboratory instruments,
                                                    enabling automated sweeps and parameter adjustments.
                                                </li>
                                                <li>
                                                    Employs{' '}
                                                    <span className="font-semibold dark:text-gray-200">
                                                        multiple linear regression
                                                    </span>{' '}
                                                    to derive calibration coefficients from collected data, then applies
                                                    linear corrections before coefficients are written to the device.
                                                </li>
                                                <li>
                                                    Presents results in synchronized plots and tables so technicians can
                                                    visually validate fit quality and identify anomalies quickly.
                                                </li>
                                            </ul>
                                            <blockquote className="border-l-4 border-gray-400 dark:border-gray-500 pl-4 py-2 my-4 bg-gray-50 dark:bg-gray-900/50 italic text-gray-700 dark:text-gray-400">
                                                <p>
                                                    Due to proprietary constraints and internal confidentiality
                                                    agreements, detailed system behavior, source code, and UI
                                                    screenshots cannot be shared.
                                                </p>
                                            </blockquote>
                                        </ProjectSection>

                                        {/* User testing / validation */}
                                        <ProjectSection title="User testing &amp; validation">
                                            <p className="text-gray-800 dark:text-gray-300">
                                                Validation took the form of close collaboration with calibration
                                                technicians. They exercised the tool on real hardware, compared results
                                                against known-good calibration runs, and verified that computed
                                                coefficients and plots matched expectations. Feedback led to changes in
                                                panel layout, labeling, and default ranges to make the most important
                                                diagnostics visible at a glance.
                                            </p>
                                        </ProjectSection>

                                        {/* Heuristics & UX principles */}
                                        <ProjectSection title="Usability principles applied">
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Visibility of system status:
                                                    </span>{' '}
                                                    live plots and status indicators that update as sweeps run and
                                                    coefficients are computed.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Error prevention:
                                                    </span>{' '}
                                                    guard rails around critical operations such as writing calibration
                                                    values, with confirmation steps and clear messaging.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Match to technician workflow:
                                                    </span>{' '}
                                                    panel ordering and control layout mirror how calibrations are
                                                    performed in the lab, reducing mental translation.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Recognition over recall:
                                                    </span>{' '}
                                                    parameter names, units, and labels follow existing lab conventions
                                                    to minimize learning curve.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Aesthetic and minimalist design:
                                                    </span>{' '}
                                                    dense information is organized into logical panels, avoiding
                                                    unnecessary decoration or non-essential data.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        <ProjectSection title="Flow Diagram (Generic)">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                The following diagram illustrates the high-level workflow and component
                                                interactions of the QCL Calibration Desktop UI, showing how a
                                                calibration technician interacts with various panels to perform the
                                                calibration process from device connection through data acquisition,
                                                visualization, diagnostics, and final calibration summary.
                                            </p>
                                            <ProjectImage
                                                src="/csci443/qcl_generic_uiflow.png"
                                                alt="Flow diagram showing the QCL Calibration Desktop UI workflow and component interactions"
                                                caption="Flow diagram illustrating the QCL Calibration Desktop UI workflow from device connection through calibration completion"
                                            />
                                        </ProjectSection>

                                        {/* Outcome */}
                                        <ProjectSection title="Outcome">
                                            <p className="text-gray-800 dark:text-gray-300">
                                                The QCL Calibration &amp; Diagnostics Tool increased calibration
                                                throughput, reduced technician error, and created consistent long-term
                                                traceability for device performance. SCPI-driven automation removed many
                                                manual adjustments, while the visualization-first UI gave technicians
                                                immediate insight into calibration quality without needing to manage raw
                                                data files or separate plotting tools.
                                            </p>
                                        </ProjectSection>
                                    </div>
                                </PortfolioProjectItem>
                            </div>
                        )}

                        {/* Project 3 – Internal Ticket Analytics & Reporting Tool */}
                        {filteredProjects.some(p => p.id === 3) && (
                            <div id="project-3" className="print:break-inside-avoid">
                                <div className="flex items-center justify-between mb-2 mt-6 print:hidden flex-wrap gap-2">
                                    <button
                                        onClick={() => toggleProject(3)}
                                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                        aria-expanded={expandedProjects[3]}
                                        aria-controls="project-3-content"
                                    >
                                        {expandedProjects[3] ? (
                                            <>
                                                <FaChevronUp className="text-xs" />
                                                <span>Show less</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaChevronDown className="text-xs" />
                                                <span>Read more</span>
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center gap-2">
                                        {shareError && copiedProjectId === 3 && (
                                            <span className="text-sm text-red-600 dark:text-red-400" role="alert">
                                                {shareError}
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                shareProject(3, 'Internal Ticket Analytics & Reporting Tool')
                                            }
                                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1"
                                            aria-label="Share Internal Ticket Analytics & Reporting Tool project"
                                        >
                                            {copiedProjectId === 3 ? (
                                                <>
                                                    <FaCheck className="text-green-600" />
                                                    <span className="text-green-600">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaShare />
                                                    <span>Share</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <PortfolioProjectItem
                                    title="Internal Ticket Analytics &amp; Reporting Tool"
                                    subtitle="Python + PyQt • Desktop"
                                >
                                    {/* Problem - Always visible */}
                                    <ProjectSection title="The problem">
                                        <p className="text-gray-800 dark:text-gray-300">
                                            Support and operations teams were exporting raw CSV reports from their
                                            ticketing system and manually building charts and summaries in spreadsheets.
                                            This process was slow, repetitive, and error-prone. Simple questions like
                                            &quot;How long do high-priority tickets take to resolve?&quot; or &quot;Is
                                            our response time improving?&quot; required one-off spreadsheet work instead
                                            of being answered on demand.
                                        </p>
                                    </ProjectSection>

                                    {/* Rest of content - Collapsible */}
                                    <div
                                        id="project-3-content"
                                        ref={el => {
                                            projectContentRefs.current[3] = el
                                        }}
                                        tabIndex={-1}
                                        className={expandedProjects[3] ? '' : 'hidden print:block'}
                                    >
                                        {/* Tools used */}
                                        <ProjectSection title="Tools used">
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>Python for data ingestion and processing</li>
                                                <li>Pandas and NumPy for statistical analysis</li>
                                                <li>Matplotlib for charts and visualizations</li>
                                                <li>PyQt6 for the desktop user interface</li>
                                                <li>CSV as the primary data input format</li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Discovery & process */}
                                        <ProjectSection title="Discovery &amp; design process">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                While this project was more engineering-focused, I still used a
                                                UX-centered process to design the workflow.
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    Talked with support staff and managers to understand which metrics
                                                    they actually cared about: average response time, median resolution
                                                    time, ticket volume by category and time period, and backlog trends.
                                                </li>
                                                <li>
                                                    Collected sample CSV exports and manually walked through their
                                                    current spreadsheet process to observe pain points, such as
                                                    repetitive formulas and inconsistent chart setups.
                                                </li>
                                                <li>
                                                    Sketched simple screens showing a three-step flow: load CSV,
                                                    configure analysis options, then view charts and summary statistics.
                                                </li>
                                                <li>
                                                    Iterated on field naming and layout so that labels matched their
                                                    mental model (for example, &quot;First response time&quot; vs
                                                    internal column names) rather than database terminology.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        {/* User Journey */}
                                        <ProjectSection title="User Journey">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                I mapped out the user journey to understand how support staff would
                                                interact with the tool, from loading CSV data through generating
                                                reports:
                                            </p>
                                            <ProjectImage
                                                src="/csci443/csv_analysis_uj.png"
                                                alt="User journey diagram showing the workflow for the Internal Ticket Analytics & Reporting Tool"
                                                caption="User journey map showing how support staff interact with the tool from CSV loading through report generation"
                                            />
                                        </ProjectSection>

                                        {/* Prototyping */}
                                        <ProjectSection title="Prototyping">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                I started with a crude, internal-only prototype that ran in the
                                                terminal, then layered on a PyQt interface once the core calculations
                                                were stable.
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    Early prototypes focused on correctness of metrics (calculating
                                                    means, medians, groupings) using Pandas and verifying them against
                                                    the spreadsheet results support staff already trusted.
                                                </li>
                                                <li>
                                                    The PyQt UI was built around a main window with tabs for:
                                                    configuration, tabular summaries, and charts, reflecting how users
                                                    naturally move from setup to overview to visual detail.
                                                </li>
                                                <li>
                                                    Controls were limited to the most important options (date range,
                                                    ticket type filters, priority) to keep the interface approachable.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        {/* User testing */}
                                        <ProjectSection title="User testing">
                                            <p className="text-gray-800 dark:text-gray-300 mb-2">
                                                I tested the tool with the same support analysts who previously
                                                maintained the spreadsheet reports:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    Asked them to load their existing CSV exports and generate a set of
                                                    standard reports (weekly volume, average resolution time, SLA
                                                    compliance).
                                                </li>
                                                <li>
                                                    Observed where they hesitated, which options they looked for first,
                                                    and which terms were confusing.
                                                </li>
                                                <li>
                                                    Compared the tool&apos;s output to their old spreadsheets to build
                                                    trust and verify that numbers matched expectations.
                                                </li>
                                            </ul>
                                            <p className="text-gray-800 dark:text-gray-300 mt-2">
                                                Feedback from these sessions led to clearer labeling, a simplified
                                                default configuration, and the addition of a &quot;quick report&quot;
                                                mode that runs a common set of analyses in one click.
                                            </p>
                                        </ProjectSection>

                                        {/* Heuristics & UX principles */}
                                        <ProjectSection title="Usability heuristics &amp; UX principles applied">
                                            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-300">
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Visibility of system status:
                                                    </span>{' '}
                                                    progress indicators during CSV loading and clear messages when
                                                    analysis completes.
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Match between system and the real world:
                                                    </span>{' '}
                                                    labels and options described in the language of support operations,
                                                    not database schemas.
                                                </li>
                                                <li>
                                                    <span className="font-semibold dark:text-gray-200">
                                                        Error prevention:
                                                    </span>{' '}
                                                    basic validation on CSV structure, with helpful messaging when
                                                    expected columns are missing.
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Recognition rather than recall:
                                                    </span>{' '}
                                                    analysis types and time ranges shown as explicit options rather than
                                                    buried in configuration files.
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Aesthetic and minimalist design:
                                                    </span>{' '}
                                                    limited number of controls per screen, focusing attention on charts
                                                    and key metrics.
                                                </li>
                                            </ul>
                                        </ProjectSection>

                                        {/* Outcome */}
                                        <ProjectSection title="Outcome">
                                            <p className="text-gray-800 dark:text-gray-300">
                                                The Internal Ticket Analytics &amp; Reporting Tool reduced weekly
                                                reporting time significantly and allowed non-technical staff to answer
                                                their own questions about operational performance without writing
                                                formulas or scripts. By treating the tool as a UX problem instead of
                                                just a data problem, the final product became a simple, focused
                                                interface on top of a flexible analysis backend.
                                            </p>
                                        </ProjectSection>
                                    </div>
                                </PortfolioProjectItem>
                            </div>
                        )}
                    </div>
                </section>

                {/* Back to Top Button */}
                {showBackToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 print:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        aria-label="Back to top"
                    >
                        <FaArrowUp size={20} />
                    </button>
                )}
            </motion.main>
        </>
    )
}
