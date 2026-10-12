import Link from "next/link";
import { links, nav, site } from "@/content/site";
import { SmartLink } from "./SmartLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl text-ink">{site.name}</p>
          <p className="mt-2 max-w-sm text-[0.95rem] text-ink-2">
            {site.role} · {site.focus}. {site.workRights}.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-[0.95rem] md:col-span-7 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-3">Site</p>
            <ul className="space-y-2">
              <li><Link className="text-ink-2 hover:text-accent" href="/">Home</Link></li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="text-ink-2 hover:text-accent" href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Profiles</p>
            <ul className="space-y-2">
              <li><SmartLink className="text-ink-2 hover:text-accent" href={links.linkedin}>LinkedIn</SmartLink></li>
              <li><SmartLink className="text-ink-2 hover:text-accent" href={links.github}>GitHub</SmartLink></li>
              <li><SmartLink className="text-ink-2 hover:text-accent" href={`mailto:${links.email}`}>Email</SmartLink></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Resume</p>
            <ul className="space-y-2">
              <li><Link className="text-ink-2 hover:text-accent" href="/resume/">Resume overview</Link></li>
              <li><SmartLink asset download className="text-ink-2 hover:text-accent" href={links.resumePdf}>Download PDF</SmartLink></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="page flex flex-col gap-2 border-t border-rule py-6 font-mono text-xs text-ink-3 sm:flex-row sm:justify-between">
        <p>© {year} {site.name}</p>
        <p>Static site · Next.js · hosted on GitHub Pages</p>
      </div>
    </footer>
  );
}
