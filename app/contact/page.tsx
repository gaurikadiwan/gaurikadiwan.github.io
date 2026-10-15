import { Mail, BriefcaseBusiness, FolderGit2, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { links, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { SmartLink } from "@/components/SmartLink";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Gaurika Diwan by email or LinkedIn about technology roles in Australia, across software, cloud, data and AI.",
  path: "/contact/",
});

const channels: { label: string; value: string; href: string; icon: LucideIcon; note: string; asset?: boolean }[] = [
  { label: "Email", value: links.email, href: `mailto:${links.email}`, icon: Mail, note: "The best way to reach me." },
  { label: "LinkedIn", value: "linkedin.com/in/gaurika-diwan", href: links.linkedin, icon: BriefcaseBusiness, note: "Connect or send a message." },
  { label: "GitHub", value: "github.com/gaurikadiwan", href: links.github, icon: FolderGit2, note: "Public code and project history." },
  { label: "Resume", value: "Gaurika-Diwan-Resume.pdf", href: links.resumePdf, icon: FileText, note: "1-page PDF.", asset: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        lede={
          <p>
            {site.availability} {site.workRights}. I&apos;m also happy to hear from engineers who want to talk shop
            about anything I&apos;ve built.
          </p>
        }
      />
      <div className="page pb-24">
        <ul className="grid gap-px border-y border-ink bg-rule md:grid-cols-2">
          {channels.map((c) => (
            <li key={c.label} className="bg-paper">
              <SmartLink
                href={c.href}
                asset={c.asset}
                showExternalIcon={false}
                className="group flex h-full items-start gap-4 py-7 transition-colors md:px-6 md:[li:nth-child(odd)_&]:pl-0"
              >
                <c.icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="eyebrow block">{c.label}</span>
                  <span className="mt-1 block font-display text-[1.35rem] leading-snug break-words text-ink decoration-accent decoration-1 underline-offset-4 group-hover:underline sm:text-[1.6rem]">
                    {c.value}
                  </span>
                  <span className="mt-1 block text-[0.92rem] text-ink-2">{c.note}</span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
