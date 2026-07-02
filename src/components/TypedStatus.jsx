import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Terminal-style readout that types itself in once `active` is true.
export default function TypedStatus({ lines, active }) {
  const reduced = useReducedMotion()
  const total = lines.reduce((n, line) => n + line.length, 0)
  const [typed, setTyped] = useState(0)
  const done = typed >= total

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setTyped(total)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(i)
      if (i >= total) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [active, reduced, total])

  let remaining = typed
  return (
    <div className="font-mono text-sm sm:text-base text-signal space-y-2" aria-label={lines.join('. ')}>
      {lines.map((line) => {
        const shown = line.slice(0, Math.max(0, remaining))
        const isTypingHere = remaining > 0 && remaining < line.length
        remaining -= line.length
        return (
          <p key={line} aria-hidden="true" className="min-h-[1.5em]">
            <span className="text-fog mr-2">&gt;</span>
            {shown}
            {(isTypingHere || (done && remaining === 0 && line === lines[lines.length - 1])) && (
              <span className="animate-pulse">▊</span>
            )}
          </p>
        )
      })}
    </div>
  )
}
