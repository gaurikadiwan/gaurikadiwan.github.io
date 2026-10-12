import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate, getArticle, getArticles, relatedArticles } from "@/lib/writing";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";
import { links, site } from "@/content/site";
import { SmartLink } from "@/components/SmartLink";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleList } from "@/components/ArticleList";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  const articles = getArticles();
  // Static export needs at least one param; a placeholder renders the 404 page when there are no articles.
  return articles.length ? articles.map((a) => ({ slug: a.slug })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { robots: { index: false } };
  return {
    ...pageMetadata({ title: a.title, description: a.description, path: `/writing/${a.slug}/`, type: "article", publishedTime: a.date }),
    ...(a.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { html, headings } = await renderMarkdown(article.body);
  const related = relatedArticles(article);
  const url = `${site.url}/writing/${article.slug}/`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <article>
      <header className="page pt-10 pb-8 md:pt-14">
        <Link href="/writing/" className="inline-flex items-center gap-1.5 text-[0.92rem] text-ink-3 hover:text-ink">
          <ArrowLeft aria-hidden="true" className="size-4" /> All writing
        </Link>
        <div className="mx-auto mt-10 max-w-[var(--container-prose)] lg:mx-0 lg:ml-[calc(33.333%+0.5rem)]">
          <p className="eyebrow rise text-accent">
            {article.category}
            {article.draft && <span className="ml-2 rounded-[3px] bg-paper-3 px-1.5 py-0.5 text-ink-2">Draft · not published</span>}
          </p>
          <h1 className="rise rise-1 mt-4 text-[2.4rem] leading-[1.06] font-normal text-ink md:text-[3.2rem]">{article.title}</h1>
          <p className="rise rise-2 mt-5 text-[1.15rem] leading-relaxed text-ink-2">{article.description}</p>
          <p className="rise rise-3 mt-6 flex flex-wrap gap-x-4 gap-y-1 border-y border-rule py-3 font-mono text-xs text-ink-3">
            <span>{site.name}</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>{article.minutes} min read</span>
          </p>
        </div>
      </header>

      <div className="page grid gap-10 pb-16 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <TableOfContents headings={headings} />
        </aside>
        <div className="mx-auto w-full min-w-0 max-w-[var(--container-prose)] lg:col-span-8 lg:col-start-5 lg:mx-0">
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

          <footer className="mt-16 space-y-10">
            <div className="flex flex-col gap-4 rounded-[6px] border border-rule bg-paper-2/60 p-5 sm:flex-row sm:items-center">
              <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg text-paper">
                gd
              </span>
              <p className="text-[0.95rem] text-ink-2">
                <strong className="font-medium text-ink">{site.name}</strong> is a software engineer working on backend
                services, cloud automation and AI systems. <Link href="/about/" className="link">More about me</Link>.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-[0.95rem]">
              <Link href="/writing/" className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink">
                <ArrowLeft aria-hidden="true" className="size-4" /> Back to writing
              </Link>
              <p className="flex gap-4">
                <span className="text-ink-3">Share:</span>
                <SmartLink href={shareLinkedIn} className="link">LinkedIn</SmartLink>
                <SmartLink href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`} className="link">
                  Email
                </SmartLink>
              </p>
            </div>
            {related.length > 0 && (
              <section aria-labelledby="related-title">
                <h2 id="related-title" className="eyebrow mb-3 font-mono font-normal">Related</h2>
                <ArticleList articles={related} />
              </section>
            )}
            <p className="text-[0.92rem] text-ink-3">
              Questions or corrections? <SmartLink href={`mailto:${links.email}`} className="link">Email me</SmartLink>.
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
