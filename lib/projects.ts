import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type DiagramStep = { label: string; note?: string; emphasis?: boolean };
export type Diagram = {
  title?: string;
  caption?: string;
  steps: DiagramStep[];
  side?: { from: number; label: string; note?: string }[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  kind: string;
  period?: string;
  team?: string;
  status?: string;
  problem: string;
  contribution: string;
  stack: string[];
  repo?: string;
  /** Where the details come from: shown on the page so readers know what was verified. */
  evidence: "public-repo" | "private-repo" | "summary";
  featured: boolean;
  order: number;
  diagram?: Diagram;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "projects");

function read(file: string): Project {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  for (const key of ["title", "tagline", "kind", "problem", "contribution", "stack", "evidence"]) {
    if (data[key] === undefined) throw new Error(`content/projects/${file}: missing frontmatter "${key}"`);
  }
  return {
    slug,
    title: data.title,
    tagline: data.tagline,
    kind: data.kind,
    period: data.period,
    team: data.team,
    status: data.status,
    problem: data.problem,
    contribution: data.contribution,
    stack: data.stack,
    repo: data.repo,
    evidence: data.evidence,
    featured: Boolean(data.featured),
    order: Number(data.order ?? 99),
    diagram: data.diagram,
    body: content,
  };
}

export function getProjects(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(read)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Smaller entries listed under "More work" (no case study page). */
export { otherWork } from "@/content/other-work";
