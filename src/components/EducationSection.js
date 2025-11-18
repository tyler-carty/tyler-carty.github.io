import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';

/**
 * Education Card Component
 *
 * Displays education details including degree, institution, and achievements.
 */
const EducationCard = ({ education, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <GraduationCap className="w-8 h-8 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1">{education.degree}</h3>
          <p className="text-lg text-blue-400 font-medium">{education.institution}</p>
        </div>
      </div>

      {/* Grade and Period */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
          <Award className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">{education.grade}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg">
          <Calendar className="w-5 h-5 text-slate-400" />
          <span className="text-slate-300">{education.period}</span>
        </div>
      </div>

      {/* Achievements */}
      {education.achievements && education.achievements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-400" />
            Achievements & Highlights
          </h4>
          <ul className="space-y-2">
            {education.achievements.map((achievement, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                className="text-slate-300 flex items-start gap-2"
              >
                <span className="text-blue-400 mt-1">•</span>
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

/**
 * Education Section Component
 *
 * Displays academic background and achievements.
 */
const EducationSection = ({ education }) => {
  return (
    <section id="education" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Academic foundation and continuous learning
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
