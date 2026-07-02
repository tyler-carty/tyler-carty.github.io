import { SCENES } from './scenes.js'

// Canvas-2D particle engine. Owns its own rAF loop and reads scroll position
// directly from the DOM each frame — no React re-renders on scroll.

const COLORS = {
  0: [138, 151, 171], // dim   (fog)
  1: [69, 224, 176], //  signal
  2: [255, 107, 87], //  flag
  3: [255, 194, 75], //  amber
}

const FADE_HALF = 0.03 // scroll-fraction half-width of a scene cross-fade
const smoothstep = (e0, e1, v) => {
  const x = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)))
  return x * x * (3 - 2 * x)
}

export function createEngine(canvas, timeline, { onAnomalies } = {}) {
  const ctx = canvas.getContext('2d')

  // Read scroll progress straight from the DOM — cheap, and avoids coupling
  // the rAF loop to any external animation pipeline.
  const readProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }

  // Scene boundaries derived from the anchor sections' measured positions, so
  // scene changes track the narrative at any viewport size. Refreshed on
  // resize and periodically (layout shifts as fonts/images load).
  let bounds = timeline.map((entry, i) => ({ scene: entry.scene, at: i / timeline.length }))
  function measureBounds() {
    const vh = window.innerHeight
    const max = document.documentElement.scrollHeight - vh
    if (max <= 0) return
    bounds = timeline.map((entry, i) => {
      if (i === 0) return { scene: entry.scene, at: 0 }
      const el = document.getElementById(entry.anchor)
      const at = el
        ? Math.min(1, Math.max(0, (el.offsetTop - vh * 0.55) / max))
        : i / timeline.length
      return { scene: entry.scene, at }
    })
  }
  let raf = 0
  let running = false
  let lastTime = 0
  let startTime = performance.now() / 1000
  let idleFrames = 0
  let frameCount = 0
  let slowFrames = 0
  let frameToggle = false
  let lastProgress = -1
  let staticMode = false
  let lastStaticSegment = -1

  const state = { n: 0, w: 0, h: 0, r0: null, r1: null, r2: null }
  const particles = { x: null, y: null, vx: null, vy: null, alpha: null, hue: null }
  const out = { x: 0, y: 0, alpha: 0, hue: 0 }
  const outB = { x: 0, y: 0, alpha: 0, hue: 0 }

  function desiredCount() {
    let n = Math.round((state.w * state.h) / 1400)
    n = Math.min(1800, Math.max(500, n))
    if (navigator.deviceMemory && navigator.deviceMemory <= 4) n = Math.round(n / 2)
    if (slowFrames >= 5) n = Math.round(n * 0.7)
    return n
  }

  function allocate() {
    const w = state.w
    const h = state.h
    const n = desiredCount()

    state.n = n
    state.r0 = new Float32Array(n)
    state.r1 = new Float32Array(n)
    state.r2 = new Float32Array(n)
    particles.x = new Float32Array(n)
    particles.y = new Float32Array(n)
    particles.vx = new Float32Array(n)
    particles.vy = new Float32Array(n)
    particles.alpha = new Float32Array(n)
    particles.hue = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      state.r0[i] = Math.random()
      state.r1[i] = Math.random()
      state.r2[i] = Math.random()
      particles.x[i] = state.r0[i] * w
      particles.y[i] = state.r1[i] * h
    }
  }

  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    const dprCap = w < 768 ? 1.5 : 2
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    state.w = w
    state.h = h
    // Only re-seed the field when the count is meaningfully off (a mobile
    // URL-bar show/hide shouldn't scatter every particle).
    if (!particles.x || Math.abs(desiredCount() - state.n) / state.n > 0.25) allocate()
    measureBounds()
    lastStaticSegment = -1 // force static redraw after resize
  }

  // Resolve (sceneA, sceneB, blendWeight, tA, tB) for a scroll progress value.
  function resolveScenes(prog) {
    let idx = 0
    for (let i = 0; i < bounds.length; i++) {
      if (prog >= bounds[i].at) idx = i
    }
    const cur = bounds[idx]
    const next = bounds[idx + 1]
    const segStart = cur.at
    const segEnd = next ? next.at : 1
    const t = segEnd > segStart ? (prog - segStart) / (segEnd - segStart) : 1

    let blend = 0
    let nextScene = null
    if (next && prog > segEnd - FADE_HALF) {
      blend = smoothstep(segEnd - FADE_HALF, segEnd + FADE_HALF, prog)
      nextScene = SCENES[next.scene]
    }
    return { sceneA: SCENES[cur.scene], sceneB: nextScene, blend, t, idx }
  }

  function step(prog, time, dt) {
    const { sceneA, sceneB, blend, t } = resolveScenes(prog)
    const n = state.n
    const spring = 4.2
    const damping = Math.exp(-3.2 * dt)

    for (let i = 0; i < n; i++) {
      sceneA.target(i, state, time, t, out)
      let tx = out.x
      let ty = out.y
      let ta = out.alpha
      let hue = out.hue
      if (sceneB && blend > 0.001) {
        sceneB.target(i, state, time, 0, outB)
        tx += (outB.x - tx) * blend
        ty += (outB.y - ty) * blend
        ta += (outB.alpha - ta) * blend
        if (blend > 0.5) hue = outB.hue
      }
      particles.vx[i] = (particles.vx[i] + (tx - particles.x[i]) * spring * dt) * damping
      particles.vy[i] = (particles.vy[i] + (ty - particles.y[i]) * spring * dt) * damping
      particles.x[i] += particles.vx[i]
      particles.y[i] += particles.vy[i]
      particles.alpha[i] += (ta - particles.alpha[i]) * Math.min(1, 6 * dt)
      particles.hue[i] = hue
    }
  }

  function draw(prog, time) {
    const { sceneA, sceneB, blend, t } = resolveScenes(prog)
    ctx.clearRect(0, 0, state.w, state.h)

    // batched draw: one pass per hue bucket
    for (let hue = 0; hue < 4; hue++) {
      const [r, g, b] = COLORS[hue]
      // dim particles as sub-pixel rects, accents as slightly larger squares
      for (let i = 0; i < state.n; i++) {
        if (particles.hue[i] !== hue) continue
        const a = particles.alpha[i]
        if (a < 0.01) continue
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
        const size = hue === 0 ? 1.6 : 2.4
        ctx.fillRect(particles.x[i] - size / 2, particles.y[i] - size / 2, size, size)
        if (hue !== 0) {
          // faked glow: second, larger, low-alpha square
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.18})`
          ctx.fillRect(particles.x[i] - size * 1.8, particles.y[i] - size * 1.8, size * 3.6, size * 3.6)
        }
      }
    }

    if (sceneA.overlay) sceneA.overlay(ctx, state, time, t, 1 - blend, particles)
    if (sceneB && sceneB.overlay && blend > 0.001) sceneB.overlay(ctx, state, time, 0, blend, particles)
  }

  function reportAnomalies(prog) {
    if (!onAnomalies) return
    const { sceneA, t } = resolveScenes(prog)
    if (sceneA !== SCENES.anomaly) {
      onAnomalies([])
      return
    }
    const positions = []
    const stride = Math.max(1, Math.floor(state.n / SCENES.anomaly.flaggedCount))
    for (let k = 0; k < SCENES.anomaly.flaggedCount; k++) {
      const i = k * stride + Math.floor(stride / 2)
      if (i >= state.n) break
      if (t > 0.15 + (k / SCENES.anomaly.flaggedCount) * 0.35) {
        positions.push({ x: particles.x[i], y: particles.y[i], k })
      }
    }
    onAnomalies(positions)
  }

  function frame(nowMs) {
    if (!running) return
    raf = requestAnimationFrame(frame)

    const frameStart = performance.now()
    const now = nowMs / 1000
    const dt = Math.min(0.05, Math.max(0.001, now - lastTime))
    const prog = readProgress()

    // idle throttle: quiescent + no scroll → 30fps
    if (Math.abs(prog - lastProgress) < 0.00005) idleFrames++
    else idleFrames = 0
    lastProgress = prog
    if (idleFrames > 180) {
      frameToggle = !frameToggle
      if (frameToggle) {
        lastTime = now
        return
      }
    }
    lastTime = now

    // layout can shift after fonts/content load; re-measure occasionally
    frameCount++
    if ((frameCount & 127) === 64) measureBounds()

    const time = now - startTime
    step(prog, time, dt)
    draw(prog, time)
    reportAnomalies(prog)

    // frame budget guard: persistently slow → permanently cut particle count
    if (performance.now() - frameStart > 24) {
      slowFrames++
      if (slowFrames === 5) allocate()
    } else if (slowFrames < 5) {
      slowFrames = 0
    }
  }

  // Reduced-motion: render one static composition per scene segment,
  // redrawing only when the active segment changes.
  function renderStatic() {
    const prog = readProgress()
    const { sceneA, t, idx } = resolveScenes(prog)
    if (idx === lastStaticSegment) return
    lastStaticSegment = idx
    for (let i = 0; i < state.n; i++) {
      sceneA.target(i, state, 0, Math.max(t, 0.9), out)
      particles.x[i] = out.x
      particles.y[i] = out.y
      particles.alpha[i] = out.alpha
      particles.hue[i] = out.hue
    }
    ctx.clearRect(0, 0, state.w, state.h)
    draw(prog, 0)
    reportAnomalies(prog)
  }

  let scrollListener = null
  let visibilityListener = null
  let resizeListener = null
  let resizeTimer = 0

  function start({ reducedMotion = false } = {}) {
    resize()
    staticMode = reducedMotion

    resizeListener = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        if (staticMode) renderStatic()
      }, 150)
    }
    window.addEventListener('resize', resizeListener)

    if (staticMode) {
      renderStatic()
      scrollListener = () => renderStatic()
      window.addEventListener('scroll', scrollListener, { passive: true })
      return
    }

    running = true
    lastTime = performance.now() / 1000
    raf = requestAnimationFrame(frame)

    visibilityListener = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        lastTime = performance.now() / 1000
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', visibilityListener)
  }

  function destroy() {
    running = false
    cancelAnimationFrame(raf)
    clearTimeout(resizeTimer)
    if (resizeListener) window.removeEventListener('resize', resizeListener)
    if (scrollListener) window.removeEventListener('scroll', scrollListener)
    if (visibilityListener) document.removeEventListener('visibilitychange', visibilityListener)
  }

  // Manual single frame for dev tooling/tests (bypasses rAF).
  function tick(dt = 1 / 60) {
    const prog = readProgress()
    const time = performance.now() / 1000 - startTime
    step(prog, time, dt)
    draw(prog, time)
    reportAnomalies(prog)
  }

  return { start, destroy, tick }
}
