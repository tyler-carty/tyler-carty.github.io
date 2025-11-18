import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Experience Card Component
 *
 * Expandable card showing work experience details.
 * Click to expand/collapse for more information.
 */
const ExperienceCard = ({ experience, index }) => {
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
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full mt-2 z-10 ring-4 ring-slate-900" />

      {/* Card */}
      <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}>
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{experience.role}</h3>
              <p className="text-blue-400 font-medium">{experience.company}</p>
              <p className="text-sm text-slate-400 mt-1">{experience.team}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </motion.div>
          </div>

          {/* Period */}
          <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {experience.period}
          </p>

          {/* Description */}
          <p className="text-slate-300 mb-4">{experience.description}</p>

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
                <div className="mb-4 pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600"
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
 * Displays work experience in a timeline format.
 * Includes both full-time roles and freelance projects.
 */
const ExperienceSection = ({ experience, freelanceExperience }) => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            My professional journey in software engineering and data science
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-slate-700 to-transparent" />

          {/* Full-time Experience */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>

          {/* Freelance Section */}
          {freelanceExperience && freelanceExperience.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="my-16 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-2">Freelance Work</h3>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
              </motion.div>

              <div className="space-y-12">
                {freelanceExperience.map((exp, index) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={{
                      ...exp,
                      role: exp.project,
                      company: exp.client,
                      team: 'Freelance Project',
                      period: exp.period,
                      description: exp.description,
                      achievements: exp.achievements,
                      technologies: exp.technologies
                    }}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
