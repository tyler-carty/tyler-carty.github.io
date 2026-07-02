import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import Metric from './Metric.jsx'
import ScrollFade from './ui/ScrollFade.jsx'

const METRIC_TRIGGER = 0.45

export default function Chapter({ chapter }) {
  const outerRef = useRef(null)
  const reduced = useReducedMotion()
  const [metricActive, setMetricActive] = useState(false)

  // 0 when the section's top reaches the viewport bottom, 1 when its bottom
  // leaves the viewport top. The inner block pins for the middle stretch.
  const { scrollYProgress: p } = useScroll({
    target: outerRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(p, 'change', (v) => {
    if (v > METRIC_TRIGGER) setMetricActive(true)
  })

  const exitOpacity = useTransform(p, [0.88, 0.98], [1, 0])

  return (
    <section
      ref={outerRef}
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className="relative min-h-screen lg:min-h-[220vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex items-center px-5 sm:px-10 lg:pl-20 lg:pr-44 py-24 lg:py-0">
        <motion.div
          style={reduced ? undefined : { opacity: exitOpacity }}
          className="max-w-6xl w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center"
        >
          <div>
            <ScrollFade p={p} range={[0.2, 0.32]} reduced={reduced}>
              <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-5">
                {chapter.kicker}
              </p>
              <h2
                id={`${chapter.id}-heading`}
                className="font-display font-bold tracking-tight text-bright text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]"
              >
                {chapter.headline}
              </h2>
            </ScrollFade>
            <ScrollFade p={p} range={[0.26, 0.38]} reduced={reduced}>
              <p className="mt-6 text-fog text-base sm:text-lg leading-relaxed max-w-xl">
                {chapter.body}
              </p>
            </ScrollFade>
            <ul className="mt-8 space-y-3 max-w-xl">
              {chapter.achievements.map((line, i) => (
                <li key={line}>
                  <ScrollFade p={p} range={[0.32 + i * 0.04, 0.44 + i * 0.04]} y={20} reduced={reduced}>
                    <span className="flex gap-3 text-bright/90 text-sm sm:text-base leading-relaxed">
                      <span className="text-signal mt-[2px]" aria-hidden="true">
                        +
                      </span>
                      {line}
                    </span>
                  </ScrollFade>
                </li>
              ))}
            </ul>
            <ScrollFade p={p} range={[0.45, 0.55]} y={12} reduced={reduced}>
              <p className="mt-8 font-mono text-[11px] sm:text-xs tracking-[0.14em] text-fog/80 uppercase">
                {chapter.tech.join(' · ')}
              </p>
            </ScrollFade>
          </div>
          <ScrollFade p={p} range={[0.35, 0.5]} y={36} reduced={reduced}>
            <div className="flex flex-col gap-10">
              <Metric metric={chapter.metric} active={reduced || metricActive} />
              {chapter.secondaryStats.length > 0 && (
                <div className="flex gap-10">
                  {chapter.secondaryStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display font-bold text-bright text-2xl sm:text-3xl tabular-nums">
                        {stat.value}
                      </p>
                      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-fog mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollFade>
        </motion.div>
      </div>
    </section>
  )
}
