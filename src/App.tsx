import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import CatchAll from "./pages/CatchAll";
import ExperiencePage from "./pages/ExperiencePage";
import IndexPage from "./pages/IndexPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import TerminalPage from "./pages/TerminalPage";
import InterpreterPage from "./pages/Interpreter/InterpreterPage";
import LexerPage from "./pages/Interpreter/LexerPage";
import ParserPage from "./pages/Interpreter/ParserPage";
import RuntimePage from "./pages/Interpreter/RuntimePage";
import InterpreterLayout from "./components/InterpreterLayout";

export default function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="/interpreter" element={<InterpreterLayout />}>
              <Route index element={<InterpreterPage />} /> {/* Default page at /interpreter */}
              <Route path="lexer" element={<LexerPage />} />
              <Route path="parser" element={<ParserPage />} />
              <Route path="runtime" element={<RuntimePage />} />
            </Route>

            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<CatchAll />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
