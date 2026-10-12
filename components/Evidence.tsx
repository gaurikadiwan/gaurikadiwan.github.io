import { evidence } from "@/content/site";

/** Verified highlights. Figures are modest in size and always carry their context and source. */
export function Evidence() {
  return (
    <section aria-labelledby="evidence-title" className="page">
      <h2 id="evidence-title" className="sr-only">
        Selected results
      </h2>
      <ol className="grid gap-px border-y border-ink bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {evidence.map((e, i) => (
          <li key={e.label} className="flex flex-col gap-2 bg-paper py-6 sm:px-6 sm:[&:nth-child(odd)]:pl-0 lg:[&:nth-child(odd)]:pl-6 lg:first:!pl-0">
            <p className="font-mono text-[0.7rem] text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-[2rem] leading-none font-normal tracking-[-0.02em] text-ink">{e.figure}</span>
              <span className="text-[0.95rem] font-medium leading-snug text-ink">{e.label}</span>
            </p>
            <p className="text-[0.9rem] leading-relaxed text-ink-2">{e.context}</p>
            <p className="mt-auto pt-2 font-mono text-[0.7rem] leading-snug text-ink-3">{e.source}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
