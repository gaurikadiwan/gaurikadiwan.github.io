import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SmartLink } from "./SmartLink";

type Props = {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  link?: { href: string; label: string };
  children: ReactNode;
  className?: string;
};

/** Homepage/editorial section: numbered marker, heading on the left rail, content on the right. */
export function Section({ id, index, eyebrow, title, intro, link, children, className = "" }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`page py-16 md:py-24 ${className}`}>
      <div className="grid gap-8 border-t border-ink pt-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <p className="eyebrow flex gap-3">
            {index && <span className="text-accent">{index}</span>}
            <span>{eyebrow}</span>
          </p>
          <h2 id={headingId} className="mt-4 text-[1.9rem] leading-[1.12] font-normal text-ink md:text-[2.2rem]">
            {title}
          </h2>
          {intro && <div className="mt-4 max-w-sm text-[0.98rem] text-ink-2">{intro}</div>}
          {link && (
            <SmartLink
              href={link.href}
              className="group mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-accent hover:text-accent-deep"
            >
              {link.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </SmartLink>
          )}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
