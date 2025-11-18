import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Brain, Database, Globe, Wrench } from 'lucide-react';

/**
 * Skill Category Component
 *
 * Displays a category of skills with an icon and list of technologies.
 */
const SkillCategory = ({ title, skills, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
            className="px-3 py-2 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600 hover:border-blue-500/50 hover:bg-slate-700 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Skills Section Component
 *
 * Displays technical skills organized by category.
 * Categories: Languages, Cloud, Data Science, Data Engineering, Web Development, Tools
 */
const SkillsSection = ({ skills }) => {
  // Map skill categories to icons
  const skillCategories = [
    {
      title: 'Languages',
      skills: skills.languages,
      icon: Code
    },
    {
      title: 'Cloud & Infrastructure',
      skills: skills.cloud,
      icon: Cloud
    },
    {
      title: 'Data Science & ML',
      skills: skills.dataScience,
      icon: Brain
    },
    {
      title: 'Data Engineering',
      skills: skills.dataEngineering,
      icon: Database
    },
    {
      title: 'Web Development',
      skills: skills.webDevelopment,
      icon: Globe
    },
    {
      title: 'Tools & Methodologies',
      skills: skills.tools,
      icon: Wrench
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              icon={category.icon}
              index={index}
            />
          ))}
        </div>

        {/* Tech Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-lg text-blue-400 font-medium">
              "Whatever you throw at me" - Always learning, always adapting
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
