import type { Heading } from "@/lib/markdown";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;
  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="eyebrow">On this page</p>
      <ol className="mt-3 space-y-2 border-l border-rule text-[0.88rem]">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-7" : "pl-4"}>
            <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-0 text-ink-3 hover:text-accent">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
