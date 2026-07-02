// Particle scene behaviors. Each scene writes a particle's target state for
// the current frame into `out`; the engine springs particles toward it and
// cross-fades between scenes at timeline boundaries.
//
// target(i, s, time, t, out):
//   i    particle index
//   s    { n, w, h, r0, r1, r2 } — counts, canvas size, per-particle seeds
//   time seconds since start
//   t    progress 0..1 within this scene's scroll window
//   out  { x, y, alpha, hue } — hue: 0 dim · 1 signal · 2 flag · 3 amber
//
// overlay(ctx, s, time, t, weight): optional extra drawing for the scene.

const TAU = Math.PI * 2

export const HUE_DIM = 0
export const HUE_SIGNAL = 1
export const HUE_FLAG = 2
export const HUE_AMBER = 3

// Beat 0 — pure noise: dim drifting points, sparse flicker.
export const noise = {
  target(i, s, time, t, out) {
    const drift = 46
    out.x = s.r0[i] * s.w + Math.sin(time * 0.11 + s.r1[i] * TAU) * drift
    out.y = s.r1[i] * s.h + Math.cos(time * 0.13 + s.r2[i] * TAU) * drift
    const flicker = Math.sin(time * (1.5 + s.r2[i] * 2) + s.r0[i] * TAU)
    out.alpha = 0.13 + s.r2[i] * 0.16 + (flicker > 0.97 ? 0.25 : 0)
    out.hue = HUE_DIM
  },
}

// CH.01 — telemetry lattice; pulses travel the grid; a node flares and is caught.
export const grid = {
  target(i, s, time, t, out) {
    const spacing = 56
    const cols = Math.max(2, Math.floor(s.w / spacing))
    const rows = Math.max(2, Math.floor(s.h / spacing))
    const node = i % (cols * rows)
    const cx = (node % cols + 0.5) * (s.w / cols)
    const cy = (Math.floor(node / cols) + 0.5) * (s.h / rows)
    out.x = cx + (s.r0[i] - 0.5) * 3
    out.y = cy + (s.r1[i] - 0.5) * 3
    const row = Math.floor(node / cols)
    const col = node % cols
    const wave = Math.sin(time * 1.4 - row * 0.55 - col * 0.18)
    out.alpha = 0.1 + Math.max(0, wave) * 0.3
    out.hue = HUE_DIM

    // every ~5s one node flares (incident) then resolves (caught)
    const cycle = Math.floor(time / 5)
    const phase = (time % 5) / 5
    const hot = (cycle * 7919) % (cols * rows)
    if (node === hot) {
      out.alpha = 0.9
      out.hue = phase < 0.45 ? HUE_FLAG : HUE_SIGNAL
    }
  },
}

// CH.02 — turbulent lanes converging into clean channels as t rises.
export const streams = {
  target(i, s, time, t, out) {
    const lanes = 9
    const lane = Math.floor(s.r1[i] * lanes)
    const laneY = (lane + 0.5) * (s.h / lanes)
    const speed = 50 + s.r2[i] * 90
    const x = (s.r0[i] * s.w + time * speed) % s.w
    const turbulence = (1 - t) * 46
    out.x = x
    out.y =
      laneY +
      Math.sin(x * 0.02 + s.r2[i] * TAU + time * 0.7) * turbulence +
      (s.r0[i] - 0.5) * 8
    out.alpha = 0.16 + s.r2[i] * 0.2 + t * 0.08
    out.hue = s.r2[i] > 0.985 && t > 0.5 ? HUE_SIGNAL : HUE_DIM
  },
}

// CH.03 — the signature moment: a scatter plot where a handful of points
// flare and get flagged. Engine reads flaggedIndex to place HTML labels.
export const anomaly = {
  flaggedCount: 7,
  isFlagged(i, s) {
    const stride = Math.max(1, Math.floor(s.n / anomaly.flaggedCount))
    return i % stride === Math.floor(stride / 2) && Math.floor(i / stride) < anomaly.flaggedCount
  },
  target(i, s, time, t, out) {
    const padX = s.w * 0.12
    const padY = s.h * 0.16
    out.x = padX + s.r0[i] * (s.w - padX * 2)
    out.y = padY + s.r1[i] * (s.h - padY * 2)
    out.alpha = 0.14 + s.r2[i] * 0.14
    out.hue = HUE_DIM
    if (anomaly.isFlagged(i, s)) {
      // on wide screens the left half is the chapter's text column — keep the
      // flagged set-pieces (rings + labels) out of it for legibility
      if (s.w >= 1024) out.x = s.w * (0.52 + s.r0[i] * 0.36)
      // flare in sequence as the chapter progresses
      const stride = Math.max(1, Math.floor(s.n / anomaly.flaggedCount))
      const order = Math.floor(i / stride) / anomaly.flaggedCount
      const lit = t > 0.15 + order * 0.35
      out.alpha = lit ? 0.95 : 0.2
      out.hue = lit ? HUE_FLAG : HUE_DIM
    }
  },
  overlay(ctx, s, time, t, weight, particles) {
    // rings + crosshairs around lit anomalies
    const stride = Math.max(1, Math.floor(s.n / anomaly.flaggedCount))
    ctx.strokeStyle = `rgba(255, 107, 87, ${0.65 * weight})`
    ctx.lineWidth = 1
    for (let k = 0; k < anomaly.flaggedCount; k++) {
      const i = k * stride + Math.floor(stride / 2)
      if (i >= s.n) break
      const order = k / anomaly.flaggedCount
      if (t <= 0.15 + order * 0.35) continue
      const px = particles.x[i]
      const py = particles.y[i]
      const pulse = 7 + Math.sin(time * 2 + k) * 1.5
      ctx.beginPath()
      ctx.arc(px, py, pulse, 0, TAU)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(px - pulse - 5, py)
      ctx.lineTo(px - pulse, py)
      ctx.moveTo(px + pulse, py)
      ctx.lineTo(px + pulse + 5, py)
      ctx.moveTo(px, py - pulse - 5)
      ctx.lineTo(px, py - pulse)
      ctx.moveTo(px, py + pulse)
      ctx.lineTo(px, py + pulse + 5)
      ctx.stroke()
    }
  },
}

// CH.04 — particles orbit pipeline nodes; a pulse travels the chain.
const NODE_COUNT = 4
const nodePos = (k, w, h) => ({
  x: w * (0.2 + k * 0.2),
  y: h * (0.5 + (k % 2 === 0 ? -0.04 : 0.04)),
})

export const production = {
  target(i, s, time, t, out) {
    const k = i % NODE_COUNT
    const node = nodePos(k, s.w, s.h)
    const radius = 26 + s.r1[i] * 85
    const speed = (0.18 + s.r2[i] * 0.35) * (s.r0[i] > 0.5 ? 1 : -1)
    const angle = s.r0[i] * TAU + time * speed
    out.x = node.x + Math.cos(angle) * radius
    out.y = node.y + Math.sin(angle) * radius * 0.6
    out.alpha = 0.15 + s.r2[i] * 0.2
    out.hue = HUE_DIM
  },
  overlay(ctx, s, time, t, weight) {
    const nodes = []
    for (let k = 0; k < NODE_COUNT; k++) nodes.push(nodePos(k, s.w, s.h))
    // chain
    ctx.strokeStyle = `rgba(138, 151, 171, ${0.22 * weight})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(nodes[0].x, nodes[0].y)
    for (let k = 1; k < NODE_COUNT; k++) ctx.lineTo(nodes[k].x, nodes[k].y)
    ctx.stroke()
    // nodes
    for (let k = 0; k < NODE_COUNT; k++) {
      ctx.fillStyle = `rgba(69, 224, 176, ${0.75 * weight})`
      ctx.beginPath()
      ctx.arc(nodes[k].x, nodes[k].y, 3, 0, TAU)
      ctx.fill()
    }
    // heartbeat pulse travelling the chain
    const pos = (time * 0.45) % NODE_COUNT
    const seg = Math.min(NODE_COUNT - 2, Math.floor(pos))
    const frac = Math.min(1, pos - seg)
    const px = nodes[seg].x + (nodes[seg + 1].x - nodes[seg].x) * frac
    const py = nodes[seg].y + (nodes[seg + 1].y - nodes[seg].y) * frac
    ctx.fillStyle = `rgba(69, 224, 176, ${0.9 * weight})`
    ctx.beginPath()
    ctx.arc(px, py, 4.5, 0, TAU)
    ctx.fill()
    ctx.fillStyle = `rgba(69, 224, 176, ${0.25 * weight})`
    ctx.beginPath()
    ctx.arc(px, py, 10, 0, TAU)
    ctx.fill()
  },
}

// Beat 7 — the field resolves into one calm waveform and holds.
export const constellation = {
  target(i, s, time, t, out) {
    const frac = i / s.n
    const x = frac * s.w
    const envelope = Math.sin(frac * Math.PI)
    const y =
      s.h * 0.52 +
      Math.sin(frac * TAU * 2 + time * 0.5) * s.h * 0.07 * envelope +
      (s.r1[i] - 0.5) * 10
    out.x = x
    out.y = y
    const shimmer = Math.sin(time * 1.2 + frac * TAU * 3)
    out.alpha = 0.25 + shimmer * 0.1 + s.r2[i] * 0.15
    out.hue = s.r2[i] > 0.92 ? HUE_SIGNAL : HUE_DIM
  },
}

export const SCENES = { noise, grid, streams, anomaly, production, constellation }
