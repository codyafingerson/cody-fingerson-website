import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next"
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import InterpreterLayout from "./components/InterpreterLayout";
/* -- Global Components -- */
import Navbar from "./components/Navbar";
import UpdateBanner from "./components/UpdateBanner";
import AboutPage from "./pages/AboutPage";
import CatchAllPage from "./pages/CatchAllPage";
import ContactPage from "./pages/ContactPage";

/* -- Pages -- */
import HomePage from "./pages/HomePage";
import InterpreterPage from "./pages/Interpreter/InterpreterPage";
import PlaygroundPage from "./pages/Interpreter/PlaygroundPage";
import SettingsPage from "./pages/Interpreter/SettingsPage";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProjectsPage from "./pages/ProjectsPage";
import RiskpanePage from "./pages/RiskpanePage";
import UpdatesPage from "./pages/UpdatesPage";

export default function App() {
    const location = useLocation();
    return (
        <div className="flex flex-col min-h-screen">
            <UpdateBanner />
            <Navbar />
            <main className="grow container mx-auto px-4 py-10">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/projects/riskpane" element={<RiskpanePage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/interpreter" element={<InterpreterLayout />}>
                            <Route index element={<InterpreterPage />} />
                            <Route path="playground" element={<PlaygroundPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                        </Route>
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route path="/updates" element={<UpdatesPage />} />

                        <Route path="*" element={<CatchAllPage />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
            <Analytics />
        </div>
    );
}
