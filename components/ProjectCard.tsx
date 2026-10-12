import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { SmartLink } from "./SmartLink";

export function EvidenceBadge({ evidence }: { evidence: Project["evidence"] }) {
  const label = {
    "public-repo": "Public source",
    "private-repo": "Private course repository",
    summary: "Summary · source not public",
  }[evidence];
  return <span className="font-mono text-[0.7rem] text-ink-3">{label}</span>;
}

/** Editorial project entry: what, problem, contribution, stack, links. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/projects/${project.slug}/`;
  return (
    <article className="group relative grid gap-5 border-b border-rule py-8 first:pt-0 md:grid-cols-[3rem_1fr] md:gap-6">
      <p aria-hidden="true" className="font-mono text-sm text-accent">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div>
        <p className="eyebrow">
          {[project.kind, project.period].filter(Boolean).join(" · ")}
        </p>
        <h3 className="mt-2 text-[1.65rem] leading-tight font-normal text-ink">
          <Link href={href} className="decoration-accent decoration-1 underline-offset-4 group-hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-2xl text-[1.02rem] text-ink-2">{project.tagline}</p>

        <dl className="mt-5 grid gap-4 text-[0.92rem] sm:grid-cols-2">
          <div>
            <dt className="eyebrow mb-1">Problem</dt>
            <dd className="text-ink-2">{project.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">My contribution</dt>
            <dd className="text-ink-2">{project.contribution}</dd>
          </div>
        </dl>

        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-accent hover:text-accent-deep"
          >
            Read the case study<span className="sr-only">: {project.title}</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.repo && (
            <SmartLink href={project.repo} className="text-[0.95rem] text-ink-2 underline decoration-rule-strong underline-offset-4 hover:text-ink hover:decoration-ink">
              Source on GitHub<span className="sr-only">: {project.title}</span>
            </SmartLink>
          )}
          <EvidenceBadge evidence={project.evidence} />
        </div>
      </div>
    </article>
  );
}
