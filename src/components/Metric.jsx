import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import TypedStatus from './TypedStatus.jsx'

export const formatValue = (value, format) => {
  switch (format) {
    case 'gbp-compact':
      return value >= 1000 ? `£${Math.round(value / 1000)}K` : `£${Math.round(value)}`
    case 'percent-plus':
      return `+${Math.round(value)}%`
    default:
      return new Intl.NumberFormat('en-GB').format(Math.round(value))
  }
}

function CountUp({ value, format, active }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active || !ref.current) return
    if (reduced) {
      ref.current.textContent = formatValue(value, format)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'circOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatValue(v, format)
      },
    })
    return () => controls.stop()
  }, [active, reduced, value, format])

  return <span ref={ref}>{formatValue(reduced ? value : 0, format)}</span>
}

// Sizes are per-variant so long values ("hours → minutes") and side-by-side
// duals stay inside their column instead of spilling over the viewport.
const SIZES = {
  text: 'text-[clamp(2.25rem,4vw,4rem)]',
  single: 'text-[clamp(3rem,6vw,6rem)]',
  dual: 'text-[clamp(2.5rem,4vw,4.5rem)]',
}

function BigNumber({ children, label, size = 'single' }) {
  return (
    <div className="min-w-0">
      <p
        className={`font-display font-bold text-signal tabular-nums tracking-tight leading-none ${SIZES[size]}`}
      >
        {children}
      </p>
      <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mt-3">{label}</p>
    </div>
  )
}

// A chapter's metric set-piece. `active` flips true once, when the chapter's
// scroll progress passes its trigger point.
export default function Metric({ metric, active = true }) {
  if (!metric) return null

  if (metric.type === 'text') {
    return (
      <BigNumber label={metric.label} size="text">
        {metric.display}
      </BigNumber>
    )
  }

  if (metric.type === 'count') {
    return (
      <BigNumber label={metric.label}>
        <CountUp value={metric.value} format={metric.format} active={active} />
      </BigNumber>
    )
  }

  if (metric.type === 'dual') {
    return (
      <div className="flex flex-col gap-10 xl:flex-row xl:gap-12 min-w-0">
        <BigNumber label={metric.primary.label} size="dual">
          <CountUp value={metric.primary.value} format={metric.primary.format} active={active} />
        </BigNumber>
        <BigNumber label={metric.secondary.label} size="dual">
          <CountUp value={metric.secondary.value} format={metric.secondary.format} active={active} />
        </BigNumber>
      </div>
    )
  }

  if (metric.type === 'status') {
    return <TypedStatus lines={metric.lines} active={active} />
  }

  return null
}
