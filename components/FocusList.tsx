import Link from "next/link";
import { currentFocus } from "@/content/site";
import { formatMonth } from "@/content/experience";

export function FocusList() {
  return (
    <div>
      <ul className="divide-y divide-rule border-y border-rule">
        {currentFocus.items.map((item) => (
          <li key={item.label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="eyebrow pt-1 text-accent">{item.label}</p>
            <p className="text-[0.98rem] text-ink-2">
              {item.text}
              {"href" in item && item.href && (
                <>
                  {" "}
                  <Link href={item.href} className="link whitespace-nowrap">
                    More →
                  </Link>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[0.7rem] text-ink-3">Last updated {formatMonth(currentFocus.updated)}</p>
    </div>
  );
}
