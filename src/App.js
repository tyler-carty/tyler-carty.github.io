import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import Footer from './components/Footer';

import portfolioData from './data/portfolioData';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className={`fixed inset-0 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'
      }`} />

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

      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero data={portfolioData.personalInfo} isDarkMode={isDarkMode} />
          <ExperienceSection
            experience={portfolioData.experience}
            freelanceExperience={portfolioData.freelanceExperience}
            isDarkMode={isDarkMode}
          />
          <ProjectsSection projects={portfolioData.projects} isDarkMode={isDarkMode} />
          <SkillsSection isDarkMode={isDarkMode} />
          <EducationSection education={portfolioData.education} isDarkMode={isDarkMode} />
          <Footer data={portfolioData.personalInfo} />
        </motion.div>
      </main>
    </div>
  );
}

export default App;
