import Link from "next/link";
import { site } from "@/content/site";
import { SiteNav } from "./SiteNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper [--header-h:4.25rem]">
      <div className="page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2.5" aria-label={`${site.name}, home`}>
          <span aria-hidden="true" className="font-mono text-xs text-accent transition-transform duration-300 group-hover:-translate-y-px">
            gd/
          </span>
          <span className="font-display text-[1.32rem] leading-none font-medium tracking-[-0.02em] text-ink">
            {site.name}
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
