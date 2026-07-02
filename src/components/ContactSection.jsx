import { site } from '../content/site.js'
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from './ui/Icons.jsx'
import Reveal from './ui/Reveal.jsx'

export default function ContactSection() {
  const { contact, person } = site
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="min-h-screen flex items-center px-5 sm:px-10 lg:pl-20 lg:pr-44"
    >
      <Reveal className="max-w-6xl w-full py-28">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-5">
          {contact.kicker}
        </p>
        <h2
          id="contact-heading"
          className="font-display font-bold tracking-tight text-bright text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]"
        >
          {contact.headline}
        </h2>
        <p className="mt-6 text-fog text-base sm:text-lg max-w-xl">{contact.sub}</p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={`mailto:${person.email}`}
            className="inline-flex items-center gap-3 bg-signal text-void font-display font-bold px-6 py-3.5 hover:bg-signal/85 transition-colors"
          >
            <MailIcon size={16} />
            {person.email}
          </a>
          <a
            href={person.cvPath}
            download
            className="inline-flex items-center gap-3 border border-line text-bright font-display px-6 py-3.5 hover:border-signal hover:text-signal transition-colors"
          >
            <DownloadIcon size={16} />
            Download CV
          </a>
          <a
            href={person.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center border border-line text-fog px-4 py-3.5 hover:border-signal hover:text-signal transition-colors"
          >
            <LinkedInIcon />
          </a>
          <a
            href={person.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center border border-line text-fog px-4 py-3.5 hover:border-signal hover:text-signal transition-colors"
          >
            <GitHubIcon />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
