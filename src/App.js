import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import Footer from './components/Footer';

// Import data
import portfolioData from './data/portfolioData';

/**
 * Main App Component
 *
 * Root component that assembles all sections of the portfolio.
 * Features:
 * - Automatic dark/light theme based on system preferences
 * - Smooth scroll behavior
 * - Responsive design
 * - Framer Motion animations
 */
function App() {
  // Theme state - follows system preference
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    // Add listener for theme changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update document class based on theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <AnimatePresence mode="wait">
      <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
      }`}>
        {/* Background Elements */}
        <div className={`fixed inset-0 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
            : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'
        }`} />

        {/* Grid Pattern Overlay */}
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-10' : 'opacity-[0.02]'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${
              isDarkMode ? 'white' : 'rgb(51, 65, 85)'
            } 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Main Content */}
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <Hero data={portfolioData.personalInfo} isDarkMode={isDarkMode} />

            {/* Experience Section */}
            <ExperienceSection
              experience={portfolioData.experience}
              freelanceExperience={portfolioData.freelanceExperience}
              isDarkMode={isDarkMode}
            />

            {/* Projects Section */}
            <ProjectsSection projects={portfolioData.projects} isDarkMode={isDarkMode} />

            {/* Skills Section */}
            <SkillsSection isDarkMode={isDarkMode} />

            {/* Education Section */}
            <EducationSection education={portfolioData.education} isDarkMode={isDarkMode} />

            {/* Footer / Contact */}
            <Footer data={portfolioData.personalInfo} isDarkMode={isDarkMode} />
          </motion.div>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
