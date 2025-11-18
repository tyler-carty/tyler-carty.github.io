import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

/**
 * Skills Section Component
 *
 * Displays philosophy on technology and adaptability.
 */
const SkillsSection = ({ isDarkMode }) => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Technology Stack
          </h2>

          {/* Main Message Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-xl p-8 md:p-12 shadow-xl border ${
              isDarkMode
                ? 'bg-slate-800/50 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              isDarkMode
                ? 'bg-blue-500/10'
                : 'bg-blue-50'
            }`}>
              <Code2 className={`w-8 h-8 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>

            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Whatever you throw at me
            </h3>

            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              I believe in using the right tool for the job, not forcing square pegs into round holes. My focus is on solving problems effectively, whether that means learning a new technology, leveraging existing expertise, or combining approaches in novel ways.
            </p>

            <div className={`mt-8 pt-8 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <div className="flex items-center justify-center gap-3">
                <Sparkles className={`w-5 h-5 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <p className={`text-base md:text-lg font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Adaptable. Pragmatic. Results-driven.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-8 text-base ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
            Experience across Python, JavaScript, cloud platforms, machine learning frameworks, and more—but always learning.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
