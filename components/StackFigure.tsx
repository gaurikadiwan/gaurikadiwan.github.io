/**
 * Fig. 1 on the homepage: the layers Gaurika's experience spans, each
 * populated with real items from the resume. HTML rather than SVG text
 * so labels stay legible on phones.
 */
const layers = [
  {
    n: "03",
    name: "Applied ML & AI",
    items: ["Forecasting pipelines", "Prediction API", "MCP tooling", "A2A workflows"],
  },
  {
    n: "02",
    name: "Backend & APIs",
    items: ["Python services", "Flask · FastAPI", "REST APIs", "PostgreSQL"],
  },
  {
    n: "01",
    name: "Cloud & platform",
    items: ["Docker", "CI/CD · GitHub Actions", "AWS · Azure", "Linux"],
  },
];

export function StackFigure() {
  return (
    <figure className="relative">
      <div className="grid-paper relative overflow-hidden rounded-[6px] border border-rule bg-[#f8f6f0] p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Fig. 1 · Where my work sits</p>
          <span aria-hidden="true" className="font-mono text-[0.7rem] text-ink-3">
            ↑ builds on ↓
          </span>
        </div>

        <ol className="relative mt-5 space-y-3">
          {/* The vertical "bus" connecting the layers */}
          <span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[0.6875rem] w-px bg-gradient-to-b from-accent via-accent/60 to-ink/40"
          />
          {layers.map((layer, i) => (
            <li key={layer.n} className={`rise rise-${i + 2} relative grid grid-cols-[1.375rem_1fr] gap-3`}>
              <span aria-hidden="true" className="relative mt-[1.05rem] flex justify-center">
                <span
                  className={`block size-[0.6875rem] rounded-full border-2 border-paper ${
                    i === 0 ? "pulse bg-accent" : "bg-ink"
                  } ring-1 ring-ink/30`}
                />
              </span>
              <div className="rounded-[5px] border border-rule bg-paper/95 p-3.5 shadow-[0_1px_0_rgba(26,26,24,0.04)]">
                <p className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.7rem] text-accent">{layer.n}</span>
                  <span className="font-display text-[1.08rem] leading-tight text-ink">{layer.name}</span>
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-[0.85rem] leading-snug text-ink-3">
        Each layer depends on the one beneath it: a model is only useful in production when it runs as a
        dependable service, on infrastructure that can be automated.
      </figcaption>
    </figure>
  );
}
