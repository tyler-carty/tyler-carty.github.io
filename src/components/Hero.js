import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Hero = ({ data, isDarkMode }) => {
  const { name, title, tagline, links } = data;

  const handleDownloadResume = async () => {
    const { generateResume } = await import('../utils/resumeGenerator');
    generateResume(portfolioData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={item}
            className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${
              isDarkMode
                ? 'from-slate-200 to-slate-400'
                : 'from-slate-700 to-slate-900'
            } bg-clip-text text-transparent`}
          >
            {name}
          </motion.h1>

          <motion.p
            variants={item}
            className={`text-xl md:text-2xl mb-6 font-medium ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            {title}
          </motion.p>

          <motion.p
            variants={item}
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={handleDownloadResume}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex gap-6 justify-center mt-12"
          >
            <motion.a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
