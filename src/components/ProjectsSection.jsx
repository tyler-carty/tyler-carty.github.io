import { site } from '../content/site.js'
import { GitHubIcon, ExternalIcon } from './ui/Icons.jsx'
import Reveal from './ui/Reveal.jsx'

function ProjectCard({ project }) {
  return (
    <article className="group relative w-full border border-line bg-panel/40 p-6 sm:p-8 flex flex-col gap-4 transition-colors hover:border-fog/40">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-fog/60">{project.index}</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-signal border border-signal/30 px-2 py-1">
          {project.metricChip}
        </span>
      </div>
      <div>
        <h3 className="font-display font-bold text-bright text-xl">{project.title}</h3>
        <p className="font-mono text-[11px] tracking-[0.12em] text-fog/70 mt-1 uppercase">
          {project.client}
        </p>
      </div>
      <p className="text-fog text-sm leading-relaxed">{project.description}</p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <p className="font-mono text-[10px] tracking-[0.12em] text-fog/60 uppercase">
          {project.tech.join(' · ')}
        </p>
        <div className="flex gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-fog hover:text-signal transition-colors p-2 -m-2"
            >
              <GitHubIcon size={16} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="text-fog hover:text-signal transition-colors p-2 -m-2"
            >
              <ExternalIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const { projects } = site
  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-5 sm:px-10 lg:pl-20 lg:pr-44 py-28">
      <div className="max-w-6xl">
        <Reveal>
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-fog mb-5">
            {projects.kicker}
          </p>
          <h2
            id="projects-heading"
            className="font-display font-bold tracking-tight text-bright text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]"
          >
            {projects.headline}
          </h2>
          <p className="mt-4 text-fog text-base sm:text-lg max-w-xl">{projects.sub}</p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.items.map((project, i) => (
            <Reveal key={project.index} delay={i * 0.12} className="flex">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
