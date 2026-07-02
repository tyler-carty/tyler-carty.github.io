import { site } from '../content/site.js'
import { ChevronDownIcon } from './ui/Icons.jsx'

export default function Hero() {
  const { hero } = site
  return (
    <section id="hero" aria-label="Introduction" className="relative">
      <div className="min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-20 max-w-6xl">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-6">
          {hero.eyebrow}
        </p>
        <h1 className="font-display font-bold tracking-tight text-bright text-[clamp(3rem,10vw,8rem)] leading-[0.95]">
          {hero.headline}
        </h1>
        <p className="mt-8 max-w-xl text-fog text-lg sm:text-xl leading-relaxed">
          {hero.subline}
        </p>
      </div>
      <p className="absolute bottom-8 left-5 sm:left-10 lg:left-20 font-mono text-xs text-fog/60">
        {hero.annotation}
      </p>
      <div className="absolute bottom-8 inset-x-0 flex justify-center text-fog/60" aria-hidden="true">
        <ChevronDownIcon />
      </div>
    </section>
  )
}
