/**
 * Represents a project with its details.
 */
export interface Project {
    id: number
    title: string
    description: string
    technologies: string[]
    sourceCode?: string
    liveDemo?: string
}

/**
 * An array of projects showcasing various software development works.
 */
export const projects: Array<Project> = [
    {
        id: 1,
        title: 'Cosmo Interpreter',
        description:
            "Cosmo is the interpreter no one asked for—but I built it anyway, completely from scratch in TypeScript. It boasts a custom syntax, basic arithmetic, variable assignments, and a tiny standard library with functions like add, sqrt, and clock. While it's not meant for practical use, building Cosmo was an exciting dive into interpreter design. \n\n I also have a Java implementation as well!",
        technologies: ['TypeScript', 'Node.js'],
        sourceCode: 'https://github.com/codyafingerson/cody-fingerson-website/tree/main/src/lib',
        liveDemo: 'https://codyfingerson.com/interpreter'
    },
    {
        id: 2,
        title: 'QCL Calibration Utility',
        description:
            'Developed an internal calibration utility for Wavelength Electronics’ QCL Lab instruments to automate and replace the existing manual process. Collaborated with senior engineers to improve precision using linear regression for calibration coefficients and integrated SCPI commands for GPIB communication. Enhanced accuracy with dual multimeter measurements for real-time current and voltage monitoring.',
        technologies: ['C#', 'WPF', 'MVVM', 'IVI VISA (instrument control)', 'GPIB']
    },
    {
        id: 3,
        title: 'Internal Ticket Processing Tool',
        description:
            'Developed an internal ticket processing tool designed to streamline performance analysis by ingesting CSV files containing ticket data. The software parses and processes key metrics—such as response times, resolution durations, and ticket volume—and calculates a variety of statistical averages and trends. Built with a focus on automation, accuracy, and usability to reduce manual reporting overhead.',
        technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'PyQT6']
    },
    {
        id: 4,
        title: 'Insight ERP',
        description:
            'Insight ERP is a user-friendly, all-in-one enterprise resource planning solution built for small to medium-sized businesses. It streamlines operations by unifying key business functions, improving collaboration, and delivering actionable insights—without the complexity of legacy systems. \n\nCurrently in development!',
        technologies: ['TypeScript', 'Express', 'Docker', 'PostgreSQL', 'React'],
        sourceCode: 'https://github.com/codyafingerson/insight-erp-api',
        liveDemo: 'https://app.insighterp.tech'
    },
    {
        id: 5,
        title: 'HRDC Warming Center Booking Software',
        description:
            'This custom software solution, developed with a team for our capstone project, enhances the operations of the HRDC’s homeless warming center in Bozeman, Montana. It streamlines guest management for front desk staff, reducing the operational burden and learning curve to ensure more efficient handling of guests.',
        technologies: ['TypeScript', 'Vue.js', 'Figma', 'Node.js', 'Express', 'MongoDB'],
        sourceCode: 'https://github.com/423s24/Group_3'
    },
    {
        id: 6,
        title: 'State Border Graph',
        description:
            'This Java program constructs an undirected graph to represent common borders between U.S. states. It reads data from a file containing state pairs that share borders and maps each state as a vertex. The program outputs a list of states, along with their bordering neighbors, providing a clear visualization of state connectivity.',
        technologies: ['Java'],
        sourceCode: 'https://github.com/codyafingerson/StateBorderGraph'
    }
]
