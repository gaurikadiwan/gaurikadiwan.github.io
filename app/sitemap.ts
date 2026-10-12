import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { getArticles } from "@/lib/writing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["/", "/about/", "/experience/", "/projects/", "/writing/", "/resume/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...getProjects().map((p) => ({ url: `${base}/projects/${p.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getArticles()
      .filter((a) => !a.draft)
      .map((a) => ({ url: `${base}/writing/${a.slug}/`, lastModified: a.date, priority: 0.6 })),
  ];
}
