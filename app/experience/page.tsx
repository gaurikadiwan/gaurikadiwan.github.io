import { experience, formatRange } from "@/content/experience";
import { education } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Gaurika Diwan's professional and research experience: graduate engineering on 5G infrastructure automation, ML engineering at Reliance Jio Brain, energy forecasting research at UQ, and network automation with L2X (Cisco Sydney).",
  path: "/experience/",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Professional and research experience"
        lede={<p>Backend services, automation and applied machine learning, in reverse chronological order.</p>}
      >
        <Button href="/resume/" variant="secondary">View resume</Button>
      </PageHeader>

      <div className="page pb-20">
        <ol className="relative border-t border-ink">
          {experience.map((role) => (
            <li key={role.id} className="grid gap-6 border-b border-rule py-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-ink-3">{formatRange(role)}</p>
                <p className="eyebrow mt-2 text-accent">{role.kind}</p>
                <p className="mt-3 text-[1.02rem] font-medium text-ink">{role.organisation ?? "Current role"}</p>
              </div>
              <div className="md:col-span-8">
                <h2 className="text-[1.7rem] leading-tight font-normal text-ink">{role.title}</h2>
                <p className="mt-2 text-[1.05rem] text-ink-2">{role.summary}</p>

                <h3 className="eyebrow mt-6 font-mono font-normal">What I worked on</h3>
                <ul className="prose mt-2 !max-w-none">
                  {role.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>

                {role.results && (
                  <>
                    <h3 className="eyebrow mt-6 font-mono font-normal">Results</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {role.results.map((r) => (
                        <li key={r} className="rounded-[3px] border border-accent/30 bg-accent-soft px-2.5 py-1.5 text-[0.88rem] text-accent-deep">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
                  {role.stack.map((s) => (
                    <li key={s} className="tag">{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <section aria-labelledby="education-title" className="grid gap-6 py-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="font-mono text-xs text-ink-3">Completed {education.completed}</p>
            <p className="eyebrow mt-2 text-accent">Education</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="education-title" className="text-[1.7rem] leading-tight font-normal text-ink">
              {education.degree}
            </h2>
            <p className="mt-2 text-[1.05rem] text-ink-2">
              {education.institution} · {education.minor}
            </p>
            <ul className="prose mt-3 !max-w-none">
              {education.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
