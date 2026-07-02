const formatValue = (value, format) => {
  switch (format) {
    case 'gbp-compact':
      return value >= 1000 ? `£${Math.round(value / 1000)}K` : `£${Math.round(value)}`
    case 'percent-plus':
      return `+${Math.round(value)}%`
    default:
      return new Intl.NumberFormat('en-GB').format(Math.round(value))
  }
}

function BigNumber({ display, label }) {
  return (
    <div>
      <p className="font-display font-bold text-signal tabular-nums tracking-tight text-[clamp(3rem,8vw,6.5rem)] leading-none">
        {display}
      </p>
      <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mt-3">{label}</p>
    </div>
  )
}

// Static renderer for a chapter's metric set-piece. Count-up animation
// is layered on in the scroll orchestration phase.
export default function Metric({ metric }) {
  if (!metric) return null

  if (metric.type === 'text') {
    return <BigNumber display={metric.display} label={metric.label} />
  }

  if (metric.type === 'count') {
    return <BigNumber display={formatValue(metric.value, metric.format)} label={metric.label} />
  }

  if (metric.type === 'dual') {
    return (
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
        <BigNumber
          display={formatValue(metric.primary.value, metric.primary.format)}
          label={metric.primary.label}
        />
        <BigNumber
          display={formatValue(metric.secondary.value, metric.secondary.format)}
          label={metric.secondary.label}
        />
      </div>
    )
  }

  if (metric.type === 'status') {
    return (
      <div className="font-mono text-sm sm:text-base text-signal space-y-2">
        {metric.lines.map((line) => (
          <p key={line}>
            <span className="text-fog mr-2">&gt;</span>
            {line}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export { formatValue }
