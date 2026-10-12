import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export type Heading = { id: string; text: string; depth: 2 | 3 };

/** Open external links in a new tab, with rel attributes. */
function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const href = node.tagName === "a" ? node.properties?.href : undefined;
      if (typeof href === "string" && /^https?:\/\//.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener", "noreferrer"];
      }
    });
  };
}

function textOf(node: Element): string {
  let out = "";
  visit(node, "text", (t: { value: string }) => {
    out += t.value;
  });
  return out;
}

/** Collect h2/h3 headings (after slugging) for a table of contents. */
function rehypeCollectHeadings(headings: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && typeof node.properties?.id === "string") {
        headings.push({ id: node.properties.id, text: textOf(node), depth: node.tagName === "h2" ? 2 : 3 });
      }
    });
  };
}

/**
 * Markdown → HTML at build time. Code is highlighted by Shiki here,
 * so no syntax-highlighting JavaScript is shipped to the browser.
 */
export async function renderMarkdown(source: string): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings(headings))
    .use(rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["anchor"] } })
    .use(rehypePrettyCode, { theme: "github-light", keepBackground: false })
    .use(rehypeExternalLinks)
    .use(rehypeStringify)
    .process(source);
  return { html: String(file), headings };
}

/** ~225 words per minute; code blocks count, which slightly overestimates for code-heavy posts. */
export function readingTime(source: string): number {
  const words = source.replace(/```[\s\S]*?```/g, (m) => m.split(/\s+/).slice(0, 80).join(" ")).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}
