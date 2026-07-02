import { site } from '../content/site.js'

export default function EducationSection() {
  const { education } = site
  return (
    <section id="education" aria-labelledby="education-heading" className="px-5 sm:px-10 lg:px-20 py-20">
      <div className="max-w-6xl border-t border-line pt-16">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-5">
          {education.kicker}
        </p>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
          <div>
            <h2
              id="education-heading"
              className="font-display font-bold tracking-tight text-bright text-2xl sm:text-3xl"
            >
              {education.headline}
            </h2>
            <p className="mt-4 text-bright/90">
              {education.degree} — <span className="text-signal">{education.grade}</span>
            </p>
            <p className="font-mono text-[11px] tracking-[0.12em] text-fog/70 mt-1 uppercase">
              {education.institution} · {education.period}
            </p>
          </div>
          <ul className="space-y-3 self-center">
            {education.notes.map((note) => (
              <li key={note} className="flex gap-3 text-fog text-sm sm:text-base leading-relaxed">
                <span className="text-signal mt-[2px]" aria-hidden="true">
                  +
                </span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
