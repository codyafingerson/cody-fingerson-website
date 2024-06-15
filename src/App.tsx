import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Global components
import Navbar from "./components/Navbar"


// Pages
import IndexPage from "./pages/IndexPage"
import ProjectsPage from "./pages/ProjectsPage"
import ResumePage from "./pages/ResumePage"
import AboutPage from "./pages/AboutPage"
import CatchAll from "./pages/CatchAll"

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<CatchAll />} />
      </Routes>
    </Router>
  )
}