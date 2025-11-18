import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';

/**
 * Hero Component
 *
 * Main landing section with name, title, and call-to-action buttons.
 * Features smooth animations and responsive design.
 */
const Hero = ({ data }) => {
  const { name, title, tagline, resumeUrl, links } = data;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            {name}
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-400 mb-6 font-medium"
          >
            {title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* View Work Button */}
            <motion.button
              onClick={() => {
                const experienceSection = document.getElementById('experience');
                experienceSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Download Resume Button */}
            <motion.a
              href={resumeUrl}
              download="tyler-cartwright-resume.pdf"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl border border-slate-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-6 justify-center mt-12"
          >
            <motion.a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
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
              className="text-slate-400 hover:text-white transition-colors"
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
