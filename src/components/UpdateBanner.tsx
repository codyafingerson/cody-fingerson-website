import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UpdateBanner() {
    return (
        <aside
            aria-label="Website update notice"
            className="border-b border-amber-300 bg-amber-100 px-4 py-3 text-amber-950 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
        >
            <div className="container mx-auto flex items-center justify-center gap-3 text-center text-sm font-medium sm:text-base">
                <FaTools aria-hidden="true" className="shrink-0" />
                <p>This website is currently being updated. Some content and features may change unexpectedly. Read more <Link to="/updates" className="underline hover:no-underline">here</Link>.</p>
            </div>
        </aside>
    );
}
