import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Experience Card Component
 *
 * Expandable card showing work experience details.
 * Click to expand/collapse for more information.
 */
const ExperienceCard = ({ experience, index, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline Dot */}
      <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 ${
        experience.isFreelance ? 'bg-purple-500' : 'bg-blue-500'
      } rounded-full mt-2 z-10 ring-4 ${
        isDarkMode ? 'ring-slate-900' : 'ring-slate-50'
      }`} />

      {/* Card */}
      <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}>
        <motion.div
          className={`rounded-lg p-6 border transition-all duration-300 cursor-pointer shadow-lg ${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
              : 'bg-white border-slate-200 hover:border-blue-500/50'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>{experience.role}</h3>
                {experience.isFreelance && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full border border-purple-500/20">
                    Freelance
                  </span>
                )}
              </div>
              <p className={`font-medium ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>{experience.company}</p>
              {experience.team && (
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>{experience.team}</p>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronUp className={`w-5 h-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`} />
              )}
            </motion.div>
          </div>

          {/* Period */}
          <p className={`text-sm mb-3 flex items-center gap-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <Briefcase className="w-4 h-4" />
            {experience.period}
          </p>

          {/* Description */}
          <p className={`mb-4 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>{experience.description}</p>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Achievements */}
                <div className={`mb-4 pt-4 border-t ${
                  isDarkMode ? 'border-slate-700' : 'border-slate-200'
                }`}>
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Key Achievements:</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className={`text-sm flex items-start gap-2 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <span className={`mt-1 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          isDarkMode
                            ? 'bg-slate-700/50 text-slate-300 border-slate-600'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

/**
 * Experience Section Component
 *
 * Displays work experience in a unified timeline format.
 * Integrates both full-time roles and freelance projects.
 */
const ExperienceSection = ({ experience, freelanceExperience, isDarkMode }) => {
  // Merge and prepare all experiences for timeline
  const allExperiences = [
    ...experience.map(exp => ({ ...exp, isFreelance: false })),
    ...(freelanceExperience || []).map(exp => ({
      ...exp,
      role: exp.project,
      company: exp.client,
      team: exp.team || null,
      isFreelance: true
    }))
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Experience
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            My professional journey in software engineering and data science
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b ${
            isDarkMode
              ? 'from-blue-500 via-slate-700 to-transparent'
              : 'from-blue-500 via-slate-300 to-transparent'
          }`} />

          {/* All Experience Cards */}
          <div className="space-y-12">
            {allExperiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
