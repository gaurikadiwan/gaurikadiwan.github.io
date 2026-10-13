import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { isExternal, withBase } from "@/lib/paths";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Static files (PDFs) bypass the router but still need the base path. */
  asset?: boolean;
  download?: boolean;
  /** Open in a new tab (used for the resume PDF). */
  newTab?: boolean;
  showExternalIcon?: boolean;
  "aria-label"?: string;
};

/**
 * One link component for the whole site:
 * internal routes use next/link, files get the base path, and external
 * links open in a new tab with a visible arrow and screen-reader text.
 */
export function SmartLink({ href, children, className, asset, download, newTab, showExternalIcon = true, ...rest }: Props) {
  if (asset) {
    return (
      <a
        href={withBase(href)}
        className={className}
        download={download ? "" : undefined}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  if (isExternal(href)) {
    const isMail = href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={className}
        {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
        {!isMail && showExternalIcon && (
          <>
            <ArrowUpRight aria-hidden="true" className="ml-0.5 inline-block size-[0.9em] -translate-y-px" />
            <span className="sr-only"> (opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
