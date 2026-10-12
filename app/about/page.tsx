import { education, links, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { FocusList } from "@/components/FocusList";
import { Button } from "@/components/Button";
import { SmartLink } from "@/components/SmartLink";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Gaurika Diwan: a software engineer working across backend systems, cloud and infrastructure automation, and applied ML.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Software engineer, working where infrastructure meets intelligence."
        lede={<p>A short version of how I got here and what I want to build next.</p>}
      />

      <div className="page grid gap-14 pb-20 lg:grid-cols-12">
        <div className="prose lg:col-span-7">
          <p>
            I studied Software Engineering (Honours) at the University of Queensland, with a minor in Data Science, and
            graduated in December 2025. That combination still shapes my direction: data and machine learning, applied through
            dependable software.
          </p>
          <p>
            My experience has followed that line. As an intern with L2X Brazil (Cisco Sydney), I automated network deployment
            workflows with Python and Docker and shipped releases through CI/CD with an Agile team. At Reliance Jio Brain, I
            built machine learning models and the Flask API that served their predictions. As an undergraduate researcher at
            UQ, I built reproducible forecasting pipelines over a decade of Queensland energy data.
          </p>
          <p>
            Today I work at Reliance Jio as a graduate engineer in software and network infrastructure. I develop Python backend services,
            MCP server tooling and agent-to-agent workflows that automate operations across national-scale 5G infrastructure.
          </p>
          <h2>What I want to build next</h2>
          <p>
            I&apos;m drawn to platform and cloud engineering, and to the growing overlap between that work and AI systems.
            Agents and language models are becoming another kind of client for infrastructure APIs. I want to build the layer
            that makes that safe, with narrow permissions, typed interfaces, audit trails and humans approving anything that
            changes state. My side project{" "}
            <SmartLink href="/projects/netpilot/">NetPilot</SmartLink> is a small, working version of that idea.
          </p>
          <h2>How I approach engineering</h2>
          <ul>
            <li>
              <strong>Start from the failure mode.</strong> In my{" "}
              <SmartLink href="/projects/ai-data-analyst/">AI Data Analyst</SmartLink> project, the model was kept away from
              arithmetic entirely, because that is where it fails.
            </li>
            <li>
              <strong>Make it reproducible.</strong> Pipelines, environments and deployments should give the same result twice.
            </li>
            <li>
              <strong>Write down the limitations.</strong> The case studies on this site say what is unfinished, because that
              is part of an honest engineering record.
            </li>
          </ul>
          <p>
            Outside of my core work, I was a Women in Engineering Student Leader at UQ. I&apos;m using this site to publish
            engineering notes as I learn.
          </p>
        </div>

        <aside className="space-y-10 lg:col-span-5 lg:pl-6">
          <div className="rounded-[6px] border border-rule bg-paper-2/60 p-6">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-4 space-y-4 text-[0.95rem]">
              <div>
                <dt className="font-medium text-ink">Education</dt>
                <dd className="text-ink-2">
                  {education.degree}, {education.minor.toLowerCase()} · {education.institution}, {education.completed}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Focus</dt>
                <dd className="text-ink-2">Backend services, cloud and platform automation, AI systems</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Work rights</dt>
                <dd className="text-ink-2">{site.workRights}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/resume/" variant="primary">View resume</Button>
              <Button href={links.linkedin} variant="secondary">LinkedIn</Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-normal text-ink">Current focus</h2>
            <div className="mt-4">
              <FocusList />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
