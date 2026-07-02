import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { site } from '../../content/site.js'
import { createEngine } from './engine.js'

// Full-viewport decorative canvas behind all content. The engine runs its own
// rAF loop and reads scroll straight from the DOM; React only re-renders for
// the low-frequency anomaly annotation labels.
export default function ParticleField() {
  const canvasRef = useRef(null)
  const prefersReduced = useReducedMotion()
  // dev-only override so the static path can be exercised without OS settings
  const reduced =
    prefersReduced ||
    (import.meta.env.DEV && new URLSearchParams(window.location.search).has('reduced'))
  const [labels, setLabels] = useState([])
  const labelTimer = useRef(0)

  useEffect(() => {
    const engine = createEngine(canvasRef.current, site.sceneTimeline, {
      onAnomalies: (positions) => {
        // throttle label updates so scroll stays cheap
        const now = performance.now()
        if (now - labelTimer.current < 250) return
        labelTimer.current = now
        setLabels((prev) => {
          if (prev.length === positions.length) return prev
          return positions.slice(0, 3).map(({ x, y, k }) => ({
            x,
            y,
            k,
            p: [0.97, 0.93, 0.99][k % 3],
          }))
        })
      },
    })
    engine.start({ reducedMotion: reduced })
    if (import.meta.env.DEV) window.__particleField = engine
    return () => engine.destroy()
  }, [reduced])

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} />
      {labels.map((label) => (
        <span
          key={label.k}
          className="absolute font-mono text-[10px] tracking-[0.14em] text-flag/90 whitespace-nowrap"
          style={{ left: label.x + 14, top: label.y - 18 }}
        >
          FLAGGED · p={label.p}
        </span>
      ))}
    </div>
  )
}
