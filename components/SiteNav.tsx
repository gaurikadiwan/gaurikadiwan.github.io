"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { links, nav } from "@/content/site";
import { withBase } from "@/lib/paths";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href);
}

/** Desktop links + accessible mobile menu. The only client component in the header. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu and returns focus to the toggle; lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-[3px] px-3 py-2 text-[0.94rem] transition-colors duration-150 hover:text-ink ${
                active ? "text-ink" : "text-ink-3"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          );
        })}
        <a
          href={withBase(links.resumePdf)}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 inline-flex min-h-10 items-center gap-2 rounded-[4px] bg-accent px-4 text-[0.94rem] font-medium text-paper transition-colors hover:bg-accent-deep"
        >
          <FileText aria-hidden="true" className="size-4" />
          View resume
        </a>
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <a
          href={withBase(links.resumePdf)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-[4px] bg-accent px-3.5 text-[0.9rem] font-medium text-paper"
        >
          Resume
        </a>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-[4px] border border-rule text-ink"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-rule bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="page py-6">
          <ul className="divide-y divide-rule border-y border-rule">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/resume/", label: "Resume" }].map((item, i) => {
              const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline justify-between py-4 font-display text-2xl text-ink"
                  >
                    <span className={active ? "text-accent" : undefined}>{item.label}</span>
                    <span aria-hidden="true" className="font-mono text-xs text-ink-3">
                      {String(i).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
