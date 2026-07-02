import { motion, useReducedMotion } from 'motion/react'

// Entrance wrapper for normal-flow sections. Falls back to opacity-only
// under prefers-reduced-motion.
export default function Reveal({ children, delay = 0, className }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
