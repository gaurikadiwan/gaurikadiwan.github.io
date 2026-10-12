import { Download, ExternalLink } from "lucide-react";
import { education, links, site, skills } from "@/content/site";
import { experience, formatRange } from "@/content/experience";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { SmartLink } from "@/components/SmartLink";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Gaurika Diwan, Software Engineer (Backend, Cloud, Data & AI Systems). Summary, skills, experience and education, with a PDF download.",
  path: "/resume/",
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Resume"
        lede={
          <p>
            Software Engineering (Honours) graduate from the University of Queensland, with hands-on experience building
            cloud-native applications, backend systems and infrastructure automation using Azure, AWS, Python, Docker and
            CI/CD. {site.availability} {site.workRights}.
          </p>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href={links.resumePdf} asset download variant="accent">
            <Download aria-hidden="true" className="size-4" />
            Download resume (PDF)
          </Button>
          <SmartLink
            href={links.resumePdf}
            asset
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-ink/80 px-4.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            View PDF in browser
          </SmartLink>
        </div>
        <p className="mt-3 font-mono text-xs text-ink-3">2 pages · A4 · PDF</p>
      </PageHeader>

      <div className="page grid gap-14 pb-20 lg:grid-cols-12">
        <section aria-labelledby="skills-title" className="lg:col-span-4">
          <h2 id="skills-title" className="border-t border-ink pt-4 text-2xl font-normal text-ink">Core skills</h2>
          <dl className="mt-6 space-y-5">
            {skills.map((s) => (
              <div key={s.group}>
                <dt className="eyebrow">{s.group}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <li key={i} className="tag">{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="space-y-14 lg:col-span-8">
          <section aria-labelledby="exp-title">
            <h2 id="exp-title" className="border-t border-ink pt-4 text-2xl font-normal text-ink">Experience</h2>
            <ol className="mt-2 divide-y divide-rule">
              {experience.map((r) => (
                <li key={r.id} className="py-5">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="font-sans text-[1.05rem] font-medium tracking-normal text-ink">
                      {r.title}
                      {r.organisation && <span className="font-normal text-ink-2"> · {r.organisation}</span>}
                    </h3>
                    <p className="shrink-0 font-mono text-xs text-ink-3">{formatRange(r)}</p>
                  </div>
                  <ul className="prose mt-2 !max-w-none text-[0.97rem]">
                    {r.work.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                    {r.results?.map((res) => (
                      <li key={res}>
                        <strong>{res}</strong>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="edu-title">
            <h2 id="edu-title" className="border-t border-ink pt-4 text-2xl font-normal text-ink">Education</h2>
            <div className="mt-5 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-sans text-[1.05rem] font-medium tracking-normal text-ink">{education.degree}</h3>
              <p className="shrink-0 font-mono text-xs text-ink-3">{education.completed}</p>
            </div>
            <p className="mt-1 text-[0.97rem] text-ink-2">
              {education.institution} · {education.minor}
            </p>
            <p className="mt-1 text-[0.97rem] text-ink-2">{education.notes.join(" · ")}</p>
          </section>

          <p className="text-[0.95rem] text-ink-2">
            The PDF is the authoritative version. For project details, see the{" "}
            <SmartLink className="link" href="/projects/">case studies</SmartLink>. To get in touch, email{" "}
            <SmartLink className="link" href={`mailto:${links.email}`}>{links.email}</SmartLink>.
          </p>
        </div>
      </div>
    </>
  );
}
