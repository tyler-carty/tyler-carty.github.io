import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { site } from '../content/site.js'

// Desktop-only fixed rail: one dot per beat, active tracks scroll,
// click jumps to the section.
export default function ProgressRail() {
  const [active, setActive] = useState(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const mid = y + window.innerHeight / 2
    let idx = 0
    site.nav.forEach((item, i) => {
      const el = document.getElementById(item.target)
      if (el && el.offsetTop <= mid) idx = i
    })
    setActive(idx)
  })

  const jump = (target) => {
    document.getElementById(target)?.scrollIntoView()
  }

  return (
    <nav
      aria-label="Sections"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5"
    >
      {site.nav.map((item, i) => (
        <button
          key={item.id}
          type="button"
          onClick={() => jump(item.target)}
          aria-current={active === i ? 'true' : undefined}
          className="group flex items-center gap-3 p-1 cursor-pointer"
        >
          <span
            className={`font-mono text-[10px] tracking-[0.16em] transition-colors ${
              active === i ? 'text-signal' : 'text-fog/0 group-hover:text-fog'
            }`}
          >
            {item.label}
          </span>
          <span
            aria-hidden="true"
            className={`block w-2 h-2 rounded-full transition-colors ${
              active === i ? 'bg-signal' : 'bg-line group-hover:bg-fog'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
