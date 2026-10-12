# gaurikadiwan.github.io

The personal site and engineering publication of **Gaurika Diwan**, a software engineer working on cloud, platform and AI systems.

It is a static Next.js site written in TypeScript and styled with Tailwind CSS. Articles and case studies are Markdown files. The site has no backend, no database and no paid services, and it deploys free to GitHub Pages.

## Prerequisites

- Node.js 20 or later (22 recommended)
- npm (bundled with Node)

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000, with drafts visible
```

## Build and test

```bash
npm test             # type-check, then production build to out/, then link check
npm run build        # production build only (static files in out/)
npm start            # serve out/ locally to preview the production build
```

`npm run check:links` checks every internal link, asset and `#anchor` in `out/`, and fails if any page contains placeholder text such as "lorem ipsum" or "TODO".

## Where things live

```
app/                    Routes (App Router). One folder per page.
  page.tsx              Homepage
  projects/[slug]/      Case-study pages, generated from content/projects/*.md
  writing/[slug]/       Article pages, generated from content/writing/*.md
  sitemap.ts robots.ts  SEO files, generated at build time
components/             Reusable UI (header, buttons, diagrams, cards)
content/
  site.ts               Name, links, highlights, current focus, skills, education
  experience.ts         Roles, newest first
  other-work.ts         Smaller projects listed under "More work"
  projects/*.md         Case studies (frontmatter + Markdown)
  writing/*.md          Articles (frontmatter + Markdown)
lib/                    Content loaders, Markdown rendering, SEO helpers
public/
  resume/Gaurika-Diwan-Resume.pdf   The resume PDF that the site links to
  og.png                Social preview image (1200×630)
scripts/                Link checker and social-image generator
.github/workflows/      GitHub Pages deployment
```

All content is kept separate from presentation. Components read from `content/`, and the same fact is never typed into two places.

## Update the resume PDF

1. Export the new resume to PDF.
2. Replace `public/resume/Gaurika-Diwan-Resume.pdf`, keeping the same filename so existing links keep working.
3. If the summary, skills or roles changed, update `content/site.ts` and `content/experience.ts` to match.

## Update experience

Edit `content/experience.ts`. Each role has a title, organisation, dates (`YYYY-MM`, or `end: null` for a current role), a summary, a list of the work, optional results and a short stack list. The homepage, Experience page and Resume page all read from this file.

## Update highlights and "Current focus"

Both are in `content/site.ts`. The `evidence` array is the homepage highlights strip, and every entry should name its source. `currentFocus` appears on the homepage and the About page. Bump `updated` when you change it.

## Add or update a project

Create `content/projects/<slug>.md`. The filename becomes the URL `/projects/<slug>/`.

```yaml
---
title: Project name
tagline: One sentence on what it does.
kind: Personal project
period: Jan 2027
status: In progress            # optional
problem: The problem, in one or two sentences.
contribution: What you personally did.
stack: [Python, FastAPI]
repo: https://github.com/gaurikadiwan/<repo>   # omit if not public
evidence: public-repo          # or "resume" if the source is not public
featured: true                 # show on the homepage
order: 4                       # position in lists
diagram:                       # optional architecture/data-flow figure
  title: Request path
  caption: One sentence explaining the figure.
  steps:
    - { label: Client, note: Who calls it }
    - { label: API, note: What happens here, emphasis: true }
  side:
    - { from: 2, label: Audit log, note: Hangs off step 2 }
---

## Overview
...
```

Suggested sections are Overview, Problem, Why it matters, My role, Technical approach, Architecture, Technology choices, Testing and reliability, Results and limitations, and What I'd improve. Use only what you can support.

## Publish an article

1. Copy `content/writing/_template.md` to `content/writing/<slug>.md`. Files that start with `_` are ignored.
2. Fill in the frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `category` and `tags`.
3. Write in Markdown. `##` and `###` headings build the table of contents. Code fences are highlighted at build time, and `title="file.py"` adds a filename label.
4. Preview with `npm run dev`, where drafts are visible.
5. Set `draft: false`, or delete the line, then commit and push. The site redeploys itself.

The categories are Software Engineering, Cloud & Platform Engineering, AI Engineering, Agentic Systems & MCP, and Engineering Notes. They are defined in `lib/writing.ts`.

Reading time is calculated automatically. Articles in the same category, or that share tags, are linked as related articles.

Drafts never appear in a production build. To preview them in one, run `SHOW_DRAFTS=1 npm run build`.

## Deploy (GitHub Pages, free)

The recommended setup is a repository named exactly **`gaurikadiwan.github.io`**. The site is then served from `https://gaurikadiwan.github.io/` with no extra configuration.

1. Create a public repository on GitHub named `gaurikadiwan.github.io`.
2. Push this folder to its `main` branch:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/gaurikadiwan/gaurikadiwan.github.io.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` runs `npm test` and deploys `out/`. Watch it under the **Actions** tab. When it finishes, the site is live at `https://gaurikadiwan.github.io/`.
5. Open the site on your phone and check that the resume downloads, then add the URL to your LinkedIn profile under Contact info and Featured.

**Using a different repository name** (for example `portfolio`): add these to the build step's `env:` in the workflow:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /portfolio
  NEXT_PUBLIC_SITE_URL: https://gaurikadiwan.github.io/portfolio
```

**Custom domain later:** set `NEXT_PUBLIC_SITE_URL` to the new domain and follow GitHub's custom domain guide. Nothing else changes.

## Regenerate the social preview image

Edit `scripts/og.html`, then run `node scripts/make-og.cjs`. This needs Playwright and Chromium.

## Content sources

Every claim on the site comes from the resume PDF or from public repositories that were inspected while building it. Case studies show their source: "Public source" links to the repository, and "Summary from resume" marks work whose code isn't public.
