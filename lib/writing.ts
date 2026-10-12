import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "./markdown";

export const CATEGORIES = [
  "Software Engineering",
  "Cloud & Platform Engineering",
  "AI Engineering",
  "Agentic Systems & MCP",
  "Engineering Notes",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: Category;
  tags: string[];
  draft: boolean;
  minutes: number;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "writing");

/** Drafts are visible in `npm run dev`, or in a build with SHOW_DRAFTS=1. Never in a normal production build. */
export const showDrafts = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

function read(file: string): Article {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  for (const key of ["title", "description", "date", "category"]) {
    if (data[key] === undefined) throw new Error(`content/writing/${file}: missing frontmatter "${key}"`);
  }
  if (!CATEGORIES.includes(data.category)) {
    throw new Error(`content/writing/${file}: unknown category "${data.category}". Use one of: ${CATEGORIES.join(", ")}`);
  }
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date,
    category: data.category,
    tags: data.tags ?? [],
    draft: Boolean(data.draft),
    minutes: readingTime(content),
    body: content,
  };
}

export function getArticles(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(read)
    .filter((a) => showDrafts || !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/** Same category first, then shared tags; at most `limit`. */
export function relatedArticles(article: Article, limit = 2): Article[] {
  return getArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: (a.category === article.category ? 2 : 0) + a.tags.filter((t) => article.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
