import type { Diagram } from "@/lib/projects";

/**
 * Data-driven architecture / data-flow diagram used by project case studies.
 * Steps flow left-to-right on wide screens and top-to-bottom on phones.
 * Optional "side" outputs hang off a step (e.g. an audit log).
 */
export function FlowDiagram({ diagram, compact = false }: { diagram: Diagram; compact?: boolean }) {
  return (
    <figure className={compact ? "" : "my-2"}>
      <div className="grid-paper overflow-hidden rounded-[6px] border border-rule bg-[#f8f6f0] p-4 sm:p-6">
        {diagram.title && <p className="eyebrow mb-5">{diagram.title}</p>}
        <ol className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
          {diagram.steps.map((step, i) => {
            const side = diagram.side?.filter((s) => s.from === i + 1) ?? [];
            const last = i === diagram.steps.length - 1;
            return (
              <li key={step.label} className="flex flex-col lg:flex-1 lg:flex-row">
                <div className="flex flex-col lg:flex-1">
                  <div
                    className={`rounded-[5px] border bg-paper p-3 ${
                      step.emphasis ? "border-accent ring-1 ring-accent/30" : "border-rule-strong"
                    }`}
                  >
                    <p className="font-mono text-[0.68rem] text-ink-3">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-[0.95rem] leading-snug font-medium text-ink">{step.label}</p>
                    {step.note && <p className="mt-1 text-[0.8rem] leading-snug text-ink-3">{step.note}</p>}
                  </div>
                  {side.map((s) => (
                    <div key={s.label} className="flex flex-col items-start pl-4 lg:pl-3">
                      <span aria-hidden="true" className="h-4 w-px border-l border-dashed border-ink-3" />
                      <div className="rounded-[5px] border border-dashed border-ink-3 bg-paper-2/80 px-3 py-2">
                        <p className="text-[0.85rem] font-medium text-ink">{s.label}</p>
                        {s.note && <p className="text-[0.78rem] leading-snug text-ink-3">{s.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                {!last && (
                  <span aria-hidden="true" className="flex items-center justify-center py-1.5 text-accent lg:px-1.5 lg:py-0 lg:pt-7 lg:items-start">
                    <svg viewBox="0 0 24 24" className="size-4 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 12h15M14 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {diagram.caption && (
        <figcaption className="mt-3 max-w-2xl text-[0.85rem] leading-snug text-ink-3">{diagram.caption}</figcaption>
      )}
    </figure>
  );
}
