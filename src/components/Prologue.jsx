import { site } from '../content/site.js'

export default function Prologue() {
  const { prologue } = site
  return (
    <section aria-label="Prologue" className="px-5 sm:px-10 py-32 sm:py-44 flex justify-center">
      <div className="max-w-2xl text-center space-y-8">
        <p className="text-bright text-xl sm:text-2xl leading-relaxed">{prologue.lines[0]}</p>
        <p className="font-mono text-sm tracking-[0.12em] text-signal uppercase">
          {prologue.lines[1]}
        </p>
      </div>
    </section>
  )
}
