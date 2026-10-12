import { CATEGORIES, getArticles } from "@/lib/writing";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ArticleList, WritingEmptyState } from "@/components/ArticleList";

export const metadata = pageMetadata({
  title: "Writing",
  description:
    "Engineering notes by Gaurika Diwan on software engineering, cloud and platform engineering, AI engineering, and agentic systems with MCP.",
  path: "/writing/",
});

export default function WritingPage() {
  const articles = getArticles();
  const used = CATEGORIES.filter((c) => articles.some((a) => a.category === c));
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Engineering notes"
        lede={
          <p>
            Practical write-ups on what I build and learn, covering backend services, platform automation and AI systems
            that are safe to operate.
          </p>
        }
      />
      <div className="page grid gap-10 pb-24 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <p className="eyebrow">Topics</p>
          <ul className="mt-3 flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
            {CATEGORIES.map((c) => (
              <li key={c} className={`tag ${used.includes(c) ? "!border-accent/40 !text-accent-deep" : ""}`}>
                {c}
              </li>
            ))}
          </ul>
        </aside>
        <div className="lg:col-span-9">
          {articles.length ? <ArticleList articles={articles} /> : <WritingEmptyState />}
        </div>
      </div>
    </>
  );
}
