import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

/**
 * Project Card Component
 *
 * Displays individual project information with links and technologies.
 */
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group"
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors">
          <Folder className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View live demo"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>

      {/* Category Badge */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
          {project.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-300 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs text-slate-400 bg-slate-700/50 rounded border border-slate-600"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Projects Section Component
 *
 * Displays portfolio projects with filtering by category.
 * Categories: All, Work, Freelance, Personal, Research
 */
const ProjectsSection = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A selection of work I've built and contributed to
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
