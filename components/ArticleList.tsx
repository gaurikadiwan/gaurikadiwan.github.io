import Link from "next/link";
import type { Article } from "@/lib/writing";
import { formatDate } from "@/lib/writing";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {articles.map((a) => (
        <li key={a.slug}>
          <article className="group grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="font-mono text-xs leading-6 text-ink-3">
              <time dateTime={a.date}>{formatDate(a.date)}</time>
              <span className="block">{a.minutes} min read</span>
            </p>
            <div>
              <p className="eyebrow text-accent">
                {a.category}
                {a.draft && <span className="ml-2 rounded-[3px] bg-paper-3 px-1.5 py-0.5 text-ink-2">Draft</span>}
              </p>
              <h3 className="mt-1.5 text-[1.4rem] leading-snug font-normal text-ink">
                <Link href={`/writing/${a.slug}/`} className="decoration-accent decoration-1 underline-offset-4 group-hover:underline">
                  {a.title}
                </Link>
              </h3>
              <p className="mt-1.5 max-w-2xl text-[0.98rem] text-ink-2">{a.description}</p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

/** Honest empty state: no fake posts, just what's coming and where it will appear. */
export function WritingEmptyState() {
  return (
    <div className="rounded-[6px] border border-dashed border-rule-strong bg-paper-2/60 p-6 md:p-8">
      <p className="eyebrow">No articles published yet</p>
      <p className="mt-3 max-w-xl font-display text-[1.35rem] leading-snug text-ink">
        The first engineering notes are in progress.
      </p>
      <p className="mt-3 max-w-xl text-[0.98rem] text-ink-2">
        Expect short, practical write-ups on backend services, platform automation, and building AI tools with clear
        permission boundaries, drawn from projects like NetPilot.
      </p>
    </div>
  );
}
