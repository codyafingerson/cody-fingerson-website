/**
 * Represents a project with its details.
 */
export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    sourceCode?: string;
    liveDemo?: string;
}

/**
 * An array of projects showcasing various software development works.
 */
export const projects: Array<Project> = [
    {
        id: 1,
        title: "Riskpane",
        description:
            "Riskpane is a software governance platform for assessing vendor risk, managing approvals, and maintaining auditable compliance records. I designed a role-based access model with custom roles, permissions, and org-scoped assignments, to separate reviewer, approver, and admin capabilities across multi-tenant organizations, and implemented authentication with Better Auth (passkeys, two-factor, session management) alongside an insert-only audit log that captures actor, action, and target for every review decision. It's deployed on Vercel with a GitHub Actions pipeline running Playwright end-to-end tests, integration tests, and Postgres migrations on every push. \n\n Please contact me for a demo if you're interested in seeing Riskpane in action!",
        technologies: ["TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "Playwright"],
        liveDemo: "https://app.riskpane.com",
    },
    {
        id: 2,
        title: "Cosmo Interpreter",
        description:
            "Cosmo is the interpreter no one asked for—but I built it anyway, completely from scratch in TypeScript. It has a tokenizer, recursive-descent parser, AST evaluator, variable scoping, and a small standard library with functions like add, sqrt, and clock. While it's not meant for practical use, building Cosmo was an exciting dive into interpreter design. \n\n I also have a Java implementation as well!",
        technologies: ["TypeScript", "React", "Node.js"],
        sourceCode: "https://github.com/codyafingerson/cody-fingerson-website/tree/main/src/lib",
        liveDemo: "https://codyfingerson.com/interpreter",
    },
    {
        id: 3,
        title: "HRDC Warming Center Guest Management System",
        description:
            "A guest management system built with a team for HRDC's homeless warming center in Bozeman, Montana, replacing the front desk's manual intake process. I built full-stack features across a Vue.js frontend and an Express/MongoDB backend covering guest check-in, bed assignment, and nightly occupancy tracking, and helped design an interface for high-turnover front desk staff and volunteers that minimizes training time and operational burden during intake.",
        technologies: ["TypeScript", "Vue.js", "Node.js", "Express", "MongoDB", "Figma"],
        sourceCode: "https://github.com/423s24/Group_3",
    },
    {
        id: 4,
        title: "QCL Calibration Utility",
        description:
            "An internal calibration utility for Wavelength Electronics' QCL lab instruments that automated and replaced the existing manual process. I implemented a linear-regression workflow to derive calibration coefficients from QCL output data, improving calibration accuracy and reducing runtime, and integrated SCPI and GPIB commands to control QCL instruments and dual multimeters for high-precision current and voltage tracking.",
        technologies: ["C#", "WPF", "MVVM", "IVI VISA (instrument control)", "SCPI", "GPIB"],
    },
    {
        id: 5,
        title: "Incident Management Bot",
        description:
            "A Python incident-management bot running on a GCP VM that lets any team member trigger the incident response process directly from Slack. It removed a single-person dependency that previously stalled incident response whenever that person was unavailable, and it standardizes how incidents are declared, tracked, and communicated.",
        technologies: ["Python", "Slack API", "GCP"],
    },
    {
        id: 6,
        title: "Internal Ticket Processing Tool",
        description:
            "An internal ticket processing tool designed to streamline performance analysis by ingesting CSV files containing ticket data. The software parses and processes key metrics—such as response times, resolution durations, and ticket volume—and calculates a variety of statistical averages and trends. Built with a focus on automation, accuracy, and usability to reduce manual reporting overhead.",
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "PyQT6"],
    }
];
