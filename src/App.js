import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

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
 * - Dark/Light theme toggle
 * - Smooth scroll behavior
 * - Responsive design
 * - Framer Motion animations
 */
function App() {
  // Theme state - defaults to dark
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference to localStorage and update document class
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AnimatePresence mode="wait">
      <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        {/* Background Elements */}
        <div className={`fixed inset-0 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
        }`} />

        {/* Grid Pattern Overlay */}
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-10' : 'opacity-5'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${
              isDarkMode ? 'white' : 'black'
            } 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          className={`fixed top-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
            isDarkMode
              ? 'bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-yellow-400 border border-slate-700'
              : 'bg-white/80 backdrop-blur-sm hover:bg-slate-100 text-slate-800 border border-slate-200'
          }`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Main Content */}
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <Hero data={portfolioData.personalInfo} />

            {/* Experience Section */}
            <ExperienceSection
              experience={portfolioData.experience}
              freelanceExperience={portfolioData.freelanceExperience}
            />

            {/* Projects Section */}
            <ProjectsSection projects={portfolioData.projects} />

            {/* Skills Section */}
            <SkillsSection skills={portfolioData.skills} />

            {/* Education Section */}
            <EducationSection education={portfolioData.education} />

            {/* Footer / Contact */}
            <Footer data={portfolioData.personalInfo} />
          </motion.div>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
