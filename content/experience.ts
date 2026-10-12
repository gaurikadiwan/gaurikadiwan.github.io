/**
 * Professional and research experience, newest first.
 * Source: resume. The current employer is intentionally not named
 * (the resume does not name it either). Keep descriptions high-level.
 */

export type Role = {
  id: string;
  title: string;
  organisation: string | null;
  kind: "Full-time" | "Internship" | "Research";
  start: string; // YYYY-MM
  end: string | null; // null = present
  summary: string;
  work: string[];
  results?: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "graduate-engineer",
    title: "Graduate Engineer, Software & Network Infrastructure",
    organisation: null,
    kind: "Full-time",
    start: "2026-04",
    end: null,
    summary:
      "Python backend services and API-driven automation for operations across national-scale 5G network infrastructure.",
    work: [
      "Develop Python-based backend services, MCP server tooling and agent-to-agent (A2A) workflows that automate network operations.",
      "Engineer API-driven network provisioning solutions in Python to streamline infrastructure workflows across large-scale 5G environments.",
    ],
    stack: ["Python", "REST APIs", "MCP", "A2A workflows"],
  },
  {
    id: "jio-brain",
    title: "ML & Software Development Intern",
    organisation: "Reliance Jio Brain",
    kind: "Internship",
    start: "2024-12",
    end: "2025-02",
    summary:
      "Built and deployed machine learning models, and the Flask API that served their predictions.",
    work: [
      "Built ML models on 50,000+ records, with feature engineering and automated data-preprocessing pipelines.",
      "Developed and deployed a Flask REST API serving real-time predictions to production decision-making workflows.",
    ],
    results: ["91% model accuracy on 50,000+ records", "Sub-second API response times"],
    stack: ["Python", "Flask", "REST APIs", "Machine learning"],
  },
  {
    id: "uq-research",
    title: "Undergraduate Researcher",
    organisation: "The University of Queensland",
    kind: "Research",
    start: "2024-07",
    end: "2025-07",
    summary:
      "Electricity demand forecasting using Australian weather and energy data, in support of sustainable energy research.",
    work: [
      "Developed Python forecasting pipelines combining Australian weather and electricity datasets.",
      "Built reproducible data-processing workflows and benchmarked 5+ forecasting models across 10+ years of Queensland energy data.",
    ],
    results: ["15% improvement in demand-forecasting accuracy"],
    stack: ["Python", "Time-series forecasting", "Data pipelines"],
  },
  {
    id: "l2x-cisco",
    title: "Software Engineering Intern",
    organisation: "L2X Brazil (Cisco Sydney)",
    kind: "Internship",
    start: "2023-12",
    end: "2024-02",
    summary:
      "Network deployment automation, shipped through CI/CD as part of an Agile team.",
    work: [
      "Automated network deployment workflows using Python and Docker, improving deployment consistency.",
      "Shipped production releases with an Agile team through CI/CD pipelines, code review and unit testing.",
    ],
    results: ["40% reduction in provisioning effort", "15% fewer post-deployment defects"],
    stack: ["Python", "Docker", "CI/CD", "Unit testing"],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(role: Pick<Role, "start" | "end">): string {
  return `${formatMonth(role.start)} – ${role.end ? formatMonth(role.end) : "Present"}`;
}
