import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { getArticles } from "@/lib/writing";
import { Button } from "@/components/Button";
import { StackFigure } from "@/components/StackFigure";
import { Evidence } from "@/components/Evidence";
import { Section } from "@/components/Section";
import { ExperienceSummary } from "@/components/ExperienceSummary";
import { ProjectCard } from "@/components/ProjectCard";
import { ArticleList, WritingEmptyState } from "@/components/ArticleList";
import { FocusList } from "@/components/FocusList";
import { ContactBand } from "@/components/ContactBand";

export default function HomePage() {
  const featured = getProjects().filter((p) => p.featured);
  const articles = getArticles().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="page grid gap-12 pt-12 pb-14 md:pt-20 md:pb-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="rise eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-ink">{site.name}</span>
            <span aria-hidden="true" className="h-px w-6 bg-rule-strong" />
            <span>
              {site.role} · {site.focus}
            </span>
          </p>
          <h1
            id="hero-title"
            className="rise rise-1 mt-6 text-[2.75rem] leading-[1.02] font-normal tracking-[-0.025em] text-ink sm:text-[3.6rem] lg:text-[4.35rem]"
          >
            Building <em className="font-light text-accent">reliable</em> backend services, infrastructure automation
            and AI workflows.
          </h1>
          <p className="rise rise-2 mt-7 max-w-[36rem] text-[1.1rem] leading-relaxed text-ink-2 md:text-[1.2rem]">
            I&apos;m a University of Queensland Software Engineering (Honours) graduate, now working as a graduate
            engineer on Python services, MCP tooling and API-driven provisioning for national-scale 5G infrastructure.
            Before that, I built ML prediction APIs, energy-forecasting pipelines and network automation.
          </p>
          <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
            <Button href="/projects/" variant="primary">
              Explore my work
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/resume/" variant="secondary">
              <FileText aria-hidden="true" className="size-4" />
              View resume
            </Button>
            <Link href="/writing/" className="ml-1 px-1 py-2 text-[0.95rem] text-ink-2 underline decoration-rule-strong underline-offset-4 hover:text-ink hover:decoration-ink">
              Read my writing
            </Link>
          </div>
          <p className="rise rise-4 mt-9 flex items-start gap-2.5 text-[0.92rem] text-ink-2">
            <span aria-hidden="true" className="pulse mt-[0.45rem] block size-2 shrink-0 rounded-full bg-accent" />
            <span>
              {site.availability} <strong className="font-medium text-ink">{site.workRights}.</strong>
            </span>
          </p>
        </div>
        <div className="lg:col-span-5 lg:pt-3">
          <StackFigure />
        </div>
      </section>

      <Evidence />

      <Section
        id="experience"
        index="01"
        eyebrow="Experience"
        title="Where I've worked"
        intro="Across telecommunications, applied machine learning and energy research, with a consistent thread of Python, APIs and automation."
        link={{ href: "/experience/", label: "Full experience" }}
      >
        <ExperienceSummary />
      </Section>

      <Section
        id="projects"
        index="02"
        eyebrow="Selected projects"
        title="Work you can inspect"
        intro="Case studies that explain the problem, the design decisions and the limitations, not just the stack."
        link={{ href: "/projects/", label: "All projects" }}
        className="!pt-4 md:!pt-8"
      >
        <div>
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      <Section
        id="writing"
        index="03"
        eyebrow="Writing"
        title="Engineering notes"
        intro="Practical write-ups on what I build and learn."
        link={articles.length ? { href: "/writing/", label: "All writing" } : undefined}
        className="!pt-4 md:!pt-8"
      >
        {articles.length ? <ArticleList articles={articles} /> : <WritingEmptyState />}
      </Section>

      <Section
        id="focus"
        index="04"
        eyebrow="Now"
        title="Current focus"
        intro="What I'm building, exploring and learning at the moment."
        className="!pt-4 md:!pt-8"
      >
        <FocusList />
      </Section>

      <ContactBand />
    </>
  );
}
