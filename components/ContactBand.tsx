import { Mail } from "lucide-react";
import { links, site } from "@/content/site";
import { Button } from "./Button";

/** Dark closing band: availability, work rights and one-click contact. */
export function ContactBand() {
  return (
    <section aria-labelledby="contact-band-title" className="bg-night text-on-night">
      <div className="page grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="eyebrow !text-on-night-2">Opportunities</p>
          <h2 id="contact-band-title" className="mt-4 text-[2.1rem] leading-[1.1] font-normal md:text-[2.9rem]">
            Looking for an engineer who builds reliable systems and sees them through to production?
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-6 md:col-span-5">
          <p className="text-[1.02rem] text-on-night-2">
            {site.availability} {site.workRights}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${links.email}`} variant="night">
              <Mail aria-hidden="true" className="size-4" />
              Email me
            </Button>
            <Button href={links.linkedin} variant="nightOutline">
              Connect on LinkedIn
            </Button>
          </div>
          <p className="font-mono text-xs text-on-night-2">{links.email}</p>
        </div>
      </div>
    </section>
  );
}
