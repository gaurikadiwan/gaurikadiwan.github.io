/** Smaller pieces of work listed under "More work" on the Projects page. */
export type OtherWork = {
  title: string;
  period: string;
  description: string;
  stack: string[];
  repo?: string;
  note?: string;
};

export const otherWork: OtherWork[] = [
  {
    title: "Gowalla Data Explorer",
    period: "May 2025",
    description:
      "Interactive explorer for the Gowalla location-based social network dataset: popular check-in spots near a point, friends who visit the same places, and hourly and weekly check-in patterns, using spatial queries in PostgreSQL.",
    stack: ["Node.js", "Express", "React", "PostgreSQL", "PostGIS", "Leaflet"],
    repo: "https://github.com/gaurikadiwan/gowalla-data-explorer",
  },
];
