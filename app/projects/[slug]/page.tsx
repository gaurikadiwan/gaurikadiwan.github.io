import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjects } from "@/lib/projects";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";
import { FlowDiagram } from "@/components/FlowDiagram";
import { SmartLink } from "@/components/SmartLink";
import { Button } from "@/components/Button";
import { TableOfContents } from "@/components/TableOfContents";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.tagline, path: `/projects/${p.slug}/`, type: "article" });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { html, headings } = await renderMarkdown(project.body);
  const all = getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article>
      <header className="page pt-10 pb-10 md:pt-14">
        <Link href="/projects/" className="inline-flex items-center gap-1.5 text-[0.92rem] text-ink-3 hover:text-ink">
          <ArrowLeft aria-hidden="true" className="size-4" /> All projects
        </Link>
        <p className="eyebrow rise mt-10">
          {[project.kind, project.period, project.team, project.status].filter(Boolean).join(" · ")}
        </p>
        <h1 className="rise rise-1 mt-4 max-w-4xl text-[2.75rem] leading-[1.03] font-normal text-ink md:text-[4.2rem]">
          {project.title}
        </h1>
        <p className="rise rise-2 mt-5 max-w-3xl text-[1.2rem] leading-relaxed text-ink-2 md:text-[1.35rem]">
          {project.tagline}
        </p>

        <dl className="rise rise-3 mt-10 grid gap-px border-y border-ink bg-rule text-[0.93rem] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-paper py-4 sm:pr-5">
            <dt className="eyebrow">Problem</dt>
            <dd className="mt-1.5 text-ink-2">{project.problem}</dd>
          </div>
          <div className="bg-paper py-4 sm:px-5">
            <dt className="eyebrow">My contribution</dt>
            <dd className="mt-1.5 text-ink-2">{project.contribution}</dd>
          </div>
          <div className="bg-paper py-4 sm:pr-5 lg:px-5">
            <dt className="eyebrow">Stack</dt>
            <dd className="mt-1.5 text-ink-2">{project.stack.join(", ")}</dd>
          </div>
          <div className="bg-paper py-4 sm:px-5">
            <dt className="eyebrow">Source</dt>
            <dd className="mt-1.5 text-ink-2">
              {project.repo ? (
                <SmartLink href={project.repo} className="link">
                  {project.repo.replace("https://", "")}
                </SmartLink>
              ) : (
                project.evidence === "private-repo"
                  ? "Private course repository, so it isn't linked."
                  : "Not public."
              )}
            </dd>
          </div>
        </dl>
      </header>

      {project.diagram && (
        <div className="page pb-6">
          <FlowDiagram diagram={project.diagram} />
        </div>
      )}

      <div className="page grid gap-10 pt-4 pb-20 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <TableOfContents headings={headings.filter((h) => h.depth === 2)} />
        </aside>
        <div className="prose lg:col-span-8 lg:col-start-5 [&>h2:first-child]:mt-0" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <footer className="page pb-24">
        <div className="flex flex-col gap-6 border-t border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
          {next && next.slug !== slug ? (
            <Link href={`/projects/${next.slug}/`} className="group">
              <span className="eyebrow block">Next case study</span>
              <span className="mt-1 inline-flex items-center gap-2 font-display text-2xl text-ink group-hover:text-accent">
                {next.title}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ) : <span />}
          <Button href="/resume/" variant="secondary">View resume</Button>
        </div>
      </footer>
    </article>
  );
}
