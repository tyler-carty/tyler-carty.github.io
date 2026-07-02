import { site } from '../content/site.js'
import { GitHubIcon, LinkedInIcon } from './ui/Icons.jsx'

export default function Nav() {
  const { person } = site
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-5 sm:px-8 h-14 bg-panel/70 backdrop-blur-md border-b border-line"
      >
        <a
          href="#hero"
          className="font-mono text-sm font-bold tracking-[0.2em] text-bright hover:text-signal transition-colors"
          aria-label="Back to top"
        >
          TC
        </a>
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href={site.person.cvPath}
            download
            className="font-mono text-xs tracking-[0.12em] text-fog hover:text-signal transition-colors py-3"
          >
            CV
          </a>
          <a
            href={`mailto:${person.email}`}
            className="font-mono text-xs tracking-[0.12em] text-fog hover:text-signal transition-colors py-3"
          >
            CONTACT
          </a>
          <a
            href={person.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-fog hover:text-signal transition-colors p-2 -m-2"
          >
            <GitHubIcon />
          </a>
          <a
            href={person.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-fog hover:text-signal transition-colors p-2 -m-2"
          >
            <LinkedInIcon />
          </a>
        </div>
      </nav>
    </header>
  )
}
