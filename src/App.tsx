import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import CatchAll from "./pages/CatchAll";
import ExperiencePage from "./pages/ExperiencePage";
import IndexPage from "./pages/IndexPage";
import ProjectsPage from "./pages/ProjectsPage";
import TerminalPage from "./pages/TerminalPage";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="*" element={<CatchAll />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
