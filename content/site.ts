/**
 * Single source of truth for profile details, links and homepage content.
 * Everything here is taken from Gaurika's resume (see README "Content sources").
 * Edit this file to update the site; components never hardcode these values.
 */

export const site = {
  name: "Gaurika Diwan",
  role: "Software Engineer",
  focus: "Cloud, Platform & AI Systems",
  title: "Gaurika Diwan · Software Engineer, Cloud, Platform & AI Systems",
  description:
    "Gaurika Diwan is a software engineer working on backend services, cloud and infrastructure automation, and AI-assisted workflows. University of Queensland Software Engineering (Honours) graduate with full Australian work rights.",
  // Change this if the site is deployed somewhere else (also see README).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaurikadiwan.github.io",
  locale: "en_AU",
  workRights: "Full Australian work rights (Subclass 485 visa)",
  availability:
    "Open to Software, Cloud, DevOps, Platform and AI Engineering roles in Australia.",
} as const;

export const links = {
  email: "gaurika.diwan@outlook.com",
  linkedin: "https://linkedin.com/in/gaurika-diwan",
  github: "https://github.com/gaurikadiwan",
  resumePdf: "/resume/Gaurika-Diwan-Resume.pdf",
} as const;

export const nav = [
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/writing/", label: "Writing" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Verified highlights from the resume. Each one names where the number comes from. */
export const evidence = [
  {
    figure: "40%",
    label: "less network provisioning effort",
    context:
      "Automated network deployment workflows with Python and Docker during a software engineering internship.",
    source: "L2X Brazil (Cisco Sydney) · 2023 to 2024",
  },
  {
    figure: "91%",
    label: "model accuracy on 50,000+ records",
    context:
      "Built the feature engineering and preprocessing, then served predictions through a Flask REST API.",
    source: "Reliance Jio Brain · 2024 to 2025",
  },
  {
    figure: "15%",
    label: "better demand-forecast accuracy",
    context:
      "Python forecasting pipelines over 10+ years of Queensland weather and electricity data; 5+ models benchmarked.",
    source: "University of Queensland research · 2024 to 2025",
  },
  {
    figure: "BE (Hons)",
    label: "Software Engineering, minor in Data Science",
    context: "Graduated December 2025. Women in Engineering Student Leader.",
    source: "The University of Queensland",
  },
] as const;

/**
 * "Current focus" appears on the homepage and the About page.
 * Update it here only.
 */
export const currentFocus = {
  updated: "2026-10",
  items: [
    {
      label: "Building",
      text: "NetPilot: permission-scoped, audit-logged infrastructure tools that an AI assistant can call without being able to silently change anything.",
      href: "/projects/netpilot/",
    },
    {
      label: "Exploring",
      text: "The Model Context Protocol (MCP), agent-to-agent workflows, and how to give automated agents narrow, reviewable access to infrastructure.",
    },
    {
      label: "Learning",
      text: "Kubernetes and Terraform for NetPilot's next milestone, and cloud architecture and distributed systems more broadly.",
    },
    {
      label: "Writing about",
      text: "Engineering notes on backend services, platform automation and building AI systems that are safe to operate.",
      href: "/writing/",
    },
  ],
} as const;

export const skills = [
  { group: "Cloud", items: ["Microsoft Azure", "AWS", "Cloud deployment", "Infrastructure automation"] },
  { group: "DevOps", items: ["Docker", "CI/CD", "GitHub Actions", "Linux", "Git"] },
  { group: "Programming", items: ["Python", "Java", "SQL", "JavaScript", "PostgreSQL"] },
  { group: "Backend", items: ["Flask", "REST APIs", "Node.js", "Microservices", "API integration"] },
  {
    group: "Architecture & delivery",
    items: [
      "Solution and system design",
      "Requirements gathering",
      "Agile / Scrum",
      "Technical documentation",
    ],
  },
] as const;

export const education = {
  institution: "The University of Queensland",
  degree: "Bachelor of Engineering (Honours), Software Engineering",
  minor: "Minor in Data Science",
  completed: "December 2025",
  notes: ["Women in Engineering Student Leader, UQ"],
} as const;

export type Site = typeof site;
