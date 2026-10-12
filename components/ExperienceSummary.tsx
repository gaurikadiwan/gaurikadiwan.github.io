import { experience, formatRange } from "@/content/experience";

/** Compact ledger of roles for the homepage. */
export function ExperienceSummary() {
  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {experience.map((role) => (
        <li key={role.id} className="grid gap-1.5 py-5 md:grid-cols-[11rem_1fr] md:gap-8">
          <p className="font-mono text-xs leading-6 text-ink-3">{formatRange(role)}</p>
          <div>
            <h3 className="font-sans text-[1.05rem] leading-snug font-medium tracking-normal text-ink">
              {role.title}
              {role.organisation && <span className="font-normal text-ink-2"> · {role.organisation}</span>}
            </h3>
            <p className="mt-1 text-[0.95rem] text-ink-2">{role.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
