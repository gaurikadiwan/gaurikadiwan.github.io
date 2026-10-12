import Link from "next/link";
import { Button } from "@/components/Button";

export const metadata = { title: "Page not found · Gaurika Diwan", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="page py-20 md:py-28">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 max-w-3xl text-[2.6rem] leading-[1.05] font-normal text-ink md:text-[3.8rem]">
        This page doesn&apos;t exist, or it has moved.
      </h1>
      <pre aria-hidden="true" className="mt-8 overflow-x-auto font-mono text-sm text-ink-3">
{`GET ${"<this url>"}  →  404 Not Found
hint: try one of the routes below`}
      </pre>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" variant="primary">Go home</Button>
        <Button href="/projects/" variant="secondary">Projects</Button>
        <Button href="/resume/" variant="secondary">Resume</Button>
      </div>
      <p className="mt-8 text-ink-2">
        Looking for something specific? <Link href="/contact/" className="link">Get in touch</Link>.
      </p>
    </section>
  );
}
