import { site } from '../content/site.js'

export default function ToolkitSection() {
  const { toolkit } = site
  return (
    <section id="toolkit" aria-labelledby="toolkit-heading" className="px-5 sm:px-10 lg:px-20 py-20">
      <div className="max-w-6xl border-t border-line pt-16">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-5">
          {toolkit.kicker}
        </p>
        <h2
          id="toolkit-heading"
          className="font-display font-bold tracking-tight text-bright text-2xl sm:text-3xl mb-10"
        >
          {toolkit.headline}
        </h2>
        <dl className="space-y-4">
          {toolkit.groups.map((group) => (
            <div
              key={group.label}
              className="grid sm:grid-cols-[180px_minmax(0,1fr)] gap-2 sm:gap-6 border-b border-line/60 pb-4"
            >
              <dt className="font-mono text-[11px] tracking-[0.18em] text-fog pt-1">{group.label}</dt>
              <dd className="font-mono text-sm text-bright/90">{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
