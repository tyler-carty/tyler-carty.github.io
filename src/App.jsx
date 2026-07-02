import { site } from './content/site.js'
import Nav from './components/Nav.jsx'
import ProgressRail from './components/ProgressRail.jsx'
import Hero from './components/Hero.jsx'
import Prologue from './components/Prologue.jsx'
import Chapter from './components/Chapter.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import EducationSection from './components/EducationSection.jsx'
import ToolkitSection from './components/ToolkitSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-signal focus:text-void focus:px-4 focus:py-2 font-mono text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <ProgressRail />
      <main id="main" className="relative z-10">
        <Hero />
        <Prologue />
        {site.chapters.map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))}
        <ProjectsSection />
        <EducationSection />
        <ToolkitSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
