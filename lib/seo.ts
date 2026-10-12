import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Consistent per-page metadata: title, description, canonical URL and social cards. */
export function pageMetadata({ title, description, path, type = "website", publishedTime }: PageMeta): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.title;
  const desc = description ?? site.description;
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: ["/og.png"],
    },
  };
}
