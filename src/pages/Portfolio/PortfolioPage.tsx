export default function PortfolioPage() {
  return (
    <main className="portfolio-page max-w-5xl mx-auto px-4 py-12 space-y-16">

      {/* Intro */}
      <section id="about" className="space-y-4 border-b pb-10">
        <p className="text-sm uppercase tracking-wide text-gray-500">
          CSCI 443 - UI &amp; UX Portfolio
        </p>

        <h1 className="text-4xl font-bold">Cody Fingerson</h1>

        <p className="text-lg text-gray-800">
          CS student building tools that feel fast, intuitive,
          and focused. I mix backend engineering, UI clarity, and UX research to
          create products that help people get work done with less friction.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="border-b pb-10">
        <h2 className="text-2xl font-semibold mb-6">Skills & Experience</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold mb-2">Core Skills</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>UX research and synthesis (interviews, empathy maps, personas)</li>
              <li>Information architecture, low-fi and hi-fi prototyping</li>
              <li>React, TypeScript, component-driven UI development</li>
              <li>Java, Spring Boot, Node, Express, REST API design</li>
              <li>Python, NumPy, Pandas, Matplotlib for analysis tooling</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tools & Technologies</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              <li>Figma, Frame0, Adobe XD workflows</li>
              <li>VS Code, JetBrains IDEs, GitHub & GitLab</li>
              <li>PostgreSQL, MongoDB, Docker</li>
              <li>R, RStudio, ggplot2 for stats/course work</li>
            </ul>
          </div>
        </div>
      </section>

      {/* UX Project */}
      <section id="projects" className="space-y-16">
        <div>
          <h2 className="text-2xl font-semibold mb-8">Selected Projects</h2>

          {/* Project 1 */}
          <article className="space-y-6">
            <header>
              <h3 className="text-xl font-semibold">Focused Note App</h3>
              <p className="text-sm text-gray-500">
                UX Design Case Study • Mobile/Web Prototype
              </p>
            </header>

            <p className="text-gray-800">
              Modern note apps are bloated and slow. Users spend more time
              managing notebooks, tags, and templates than actually learning or
              working. I designed Context Note to reduce friction: fast capture,
              predictable structure, and effortless recall.
            </p>

            {/* Show the hi-fi prototype screenshot */}
            <div className="rounded-lg shadow overflow-hidden">
              <img
                src="/csci443/hifi_proto.png"
                alt="High fidelity prototype"
                className="w-full"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-1">Process</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li>5 user interviews covering habits, frustrations, and workflows</li>
                <li>Empathy map + persona creation</li>
                <li>Mind mapping to identify four core themes</li>
                <li>Low-fidelity wireframes and clickable flows</li>
                <li>High-fidelity prototype built in Figma</li>
              </ul>
            </div>

            {/* Include low-fi wireframe */}
            <div className="rounded-lg shadow overflow-hidden">
              <img
                src="/csci443/wireframe_newnote.png"
                alt="Low fidelity wireframe"
                className="w-full"
              />
            </div>

            {/* Mind map */}
            <div className="rounded-lg shadow overflow-hidden">
              <img
                src="/csci443/mind_map.png"
                alt="Mind map"
                className="w-full"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-1">Outcome</h4>
              <p className="text-gray-800">
                The final system uses a three-pane layout to reinforce
                recognition instead of recall, a fast global search, simple
                folder and tag navigation, and a frictionless “new note”
                workflow that minimizes clicks.
              </p>
            </div>
          </article>

          {/* Project 2 – QCL Tool */}
          <article className="space-y-6">
            <header>
              <h3 className="text-xl font-semibold">QCL Calibration & Diagnostics Tool</h3>
              <p className="text-sm text-gray-500">Engineering Tooling • C# + WPF</p>
            </header>

            <p className="text-gray-800">
              Designed and developed an internal calibration and diagnostics tool for a
              quantum cascade laser system. The application supports waveform extraction,
              temperature sweep analysis, and real-time visualization of power, frequency,
              and stability metrics. Calibration coefficients are computed using multiple
              linear regression, linearly corrected, and then applied to device output to
              improve accuracy.
            </p>

            <p className="text-gray-800">
              The software communicates with laboratory instrumentation using standard
              SCPI command interfaces (IEEE-488.2), enabling automated data acquisition and device
              parameter adjustments. This communication layer integrates directly with
              the tool's calibration pipeline to support repeatable, automated sweeps.
            </p>

            <p className="text-gray-800 italic">
              Due to proprietary constraints and internal confidentiality agreements,
              the detailed system behavior, source code, and UI screenshots cannot be shared.
            </p>

            <div>
              <h4 className="font-semibold mb-1">My role</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li>
                  Built a multi-panel scientific visualization interface using WPF and MVVM
                </li>
                <li>
                  Implemented calibration routines in C# using multiple linear regression
                  with linear pre-correction stages
                </li>
                <li>
                  Developed interactive plotting components to inspect fits, residuals,
                  and calibration quality
                </li>
                <li>
                  Added export capabilities for CSV, PNG, and full calibration summary
                  reports
                </li>
                <li>
                  Integrated SCPI-based device control and data retrieval into a single
                  automated workflow
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Outcome</h4>
              <p className="text-gray-800">
                The tool increased calibration throughput, reduced technician error, and
                provided consistent long-term traceability for device performance. The
                SCPI-driven automation removed the need for manual adjustments, resulting
                in more reliable and repeatable calibrations.
              </p>
            </div>
          </article>

          {/* Project 3 */}
          <article className="space-y-6">
            <header>
              <h3 className="text-xl font-semibold">
                Internal Ticket Analytics & Reporting Tool
              </h3>
              <p className="text-sm text-gray-500">Python + PyQt • Desktop</p>
            </header>

            <p className="text-gray-800">
              Created a desktop tool that imports raw support ticket CSVs and
              generates graphs, trends, and summary statistics. Replaced manual
              spreadsheet workflows with automated insights.
            </p>

            <div>
              <h4 className="font-semibold mb-1">Impact</h4>
              <p className="text-gray-800">
                Reduced weekly reporting time by over 70 percent and enabled
                non technical staff to explore operational metrics without
                writing queries.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
