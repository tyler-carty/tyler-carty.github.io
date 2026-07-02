import Metric from './Metric.jsx'

export default function Chapter({ chapter }) {
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-heading`} className="relative">
      <div className="min-h-screen flex items-center px-5 sm:px-10 lg:px-20 py-24">
        <div className="max-w-6xl w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center">
          <div>
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-5">
              {chapter.kicker}
            </p>
            <h2
              id={`${chapter.id}-heading`}
              className="font-display font-bold tracking-tight text-bright text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]"
            >
              {chapter.headline}
            </h2>
            <p className="mt-6 text-fog text-base sm:text-lg leading-relaxed max-w-xl">
              {chapter.body}
            </p>
            <ul className="mt-8 space-y-3 max-w-xl">
              {chapter.achievements.map((line) => (
                <li key={line} className="flex gap-3 text-bright/90 text-sm sm:text-base leading-relaxed">
                  <span className="text-signal mt-[2px]" aria-hidden="true">
                    +
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[11px] sm:text-xs tracking-[0.14em] text-fog/80 uppercase">
              {chapter.tech.join(' · ')}
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <Metric metric={chapter.metric} />
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
        </div>
      </div>
    </section>
  )
}
