import { getProjects, otherWork } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { SmartLink } from "@/components/SmartLink";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Engineering case studies by Gaurika Diwan: permission-scoped AI tooling for infrastructure, local-LLM data analysis, and energy demand forecasting research.",
  path: "/projects/",
});

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Case studies"
        lede={
          <p>
            Each case study covers the problem, my role, the architecture and design decisions, how it was tested and the
            outcome. Where the source code is public, it is linked.
          </p>
        }
      />
      <div className="page pb-10">
        <div className="border-t border-ink pt-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>

      <section aria-labelledby="more-title" className="page pb-24">
        <div className="grid gap-8 border-t border-ink pt-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Also</p>
            <h2 id="more-title" className="mt-3 text-[1.9rem] font-normal text-ink">More work</h2>
          </div>
          <ul className="divide-y divide-rule md:col-span-8">
            {otherWork.map((w) => (
              <li key={w.title} className="py-5 first:pt-0">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-sans text-[1.1rem] font-medium tracking-normal text-ink">{w.title}</h3>
                  <p className="font-mono text-xs text-ink-3">{w.period}</p>
                </div>
                <p className="mt-1.5 text-[0.97rem] text-ink-2">{w.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
                    {w.stack.map((s) => (
                      <li key={s} className="tag">{s}</li>
                    ))}
                  </ul>
                  {w.repo && (
                    <SmartLink href={w.repo} className="link text-[0.92rem]">
                      Source on GitHub<span className="sr-only">: {w.title}</span>
                    </SmartLink>
                  )}
                  {w.note && <span className="font-mono text-[0.7rem] text-ink-3">{w.note}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
