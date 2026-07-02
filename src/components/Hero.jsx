import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import { site } from '../content/site.js'
import { ChevronDownIcon } from './ui/Icons.jsx'

export default function Hero() {
  const { hero } = site
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0.25, 0.8], [1, 0])
  const rawY = useTransform(scrollYProgress, [0.25, 0.8], [0, -60])
  const y = useSpring(rawY, { stiffness: 90, damping: 30, restDelta: 0.001 })
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const style = reduced ? undefined : { opacity, y }

  return (
    <section ref={ref} id="hero" aria-label="Introduction" className="relative h-[130vh]">
      <div className="sticky top-0 h-screen">
        <div className="h-full flex flex-col justify-center px-5 sm:px-10 lg:px-20 max-w-6xl">
          <motion.div style={style}>
            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-6"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold tracking-tight text-bright text-[clamp(3rem,10vw,8rem)] leading-[0.95]"
            >
              {hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-8 max-w-xl text-fog text-lg sm:text-xl leading-relaxed"
            >
              {hero.subline}
            </motion.p>
          </motion.div>
        </div>
        <motion.p
          style={reduced ? undefined : { opacity: cueOpacity }}
          className="absolute bottom-8 left-5 sm:left-10 lg:left-20 font-mono text-xs text-fog/60"
        >
          {hero.annotation}
        </motion.p>
        <motion.div
          style={reduced ? undefined : { opacity: cueOpacity }}
          className="absolute bottom-8 inset-x-0 flex justify-center text-fog/60"
          aria-hidden="true"
        >
          {reduced ? (
            <ChevronDownIcon />
          ) : (
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDownIcon />
            </motion.span>
          )}
        </motion.div>
      </div>
    </section>
  )
}
