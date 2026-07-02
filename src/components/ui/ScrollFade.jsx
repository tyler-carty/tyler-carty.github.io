import { motion, useTransform } from 'motion/react'

// Fades/slides children in as a scroll progress MotionValue passes through
// `range`. Transforms live on children of the sticky container, never the
// sticky element itself (Safari).
export default function ScrollFade({ p, range, y = 28, className, reduced, children }) {
  const opacity = useTransform(p, range, [0, 1])
  const ty = useTransform(p, range, [y, 0])
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} style={{ opacity, y: ty }}>
      {children}
    </motion.div>
  )
}
